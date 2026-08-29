import os
import hashlib
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import models
import schemas
from database import engine, Base, get_db
from seed import seed_database, hash_password
from decision_engine import calculate_crop_decision
from price_prediction import calculate_what_if_scenarios

load_dotenv()

# Ensure DB tables exist and seed default data
Base.metadata.create_all(bind=engine)
try:
    seed_database()
except Exception as e:
    print(f"Startup seed notice: {e}")

app = FastAPI(
    title="KrishiSetu AI Backend",
    description="AI-powered agricultural market decision engine & financial what-if simulator",
    version="1.0.0"
)

# CORS Setup
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [
    frontend_url,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "*"  # Allows smooth testing across dev environments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permissive for prototype demo setup
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/auth/signup", response_model=schemas.AuthTokenResponse)
def signup(req: schemas.SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(models.Farmer).filter(models.Farmer.mobile == req.mobile).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Mobile number is already registered. Please login instead."
        )

    pass_hash = hash_password(req.password)
    new_farmer = models.Farmer(
        name=req.name,
        mobile=req.mobile,
        location=req.location,
        password_hash=pass_hash
    )
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)

    token = f"demo_token_farmer_{new_farmer.id}"
    return schemas.AuthTokenResponse(
        token=token,
        farmer_id=new_farmer.id,
        name=new_farmer.name,
        mobile=new_farmer.mobile,
        location=new_farmer.location
    )

@app.post("/api/auth/login", response_model=schemas.AuthTokenResponse)
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    farmer = db.query(models.Farmer).filter(models.Farmer.mobile == req.mobile).first()
    pass_hash = hash_password(req.password)
    
    if not farmer or farmer.password_hash != pass_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid mobile number or password."
        )

    token = f"demo_token_farmer_{farmer.id}"
    return schemas.AuthTokenResponse(
        token=token,
        farmer_id=farmer.id,
        name=farmer.name,
        mobile=farmer.mobile,
        location=farmer.location
    )

@app.post("/api/crop-analysis", response_model=schemas.AnalysisResponse)
def crop_analysis(req: schemas.CropAnalysisRequest, db: Session = Depends(get_db)):
    if req.quantity_kg <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0 kg.")
    
    # Store crop input in database
    try:
        new_input = models.CropInput(
            farmer_id=req.farmer_id,
            crop=req.crop,
            quantity_kg=req.quantity_kg,
            location=req.location,
            quality=req.quality,
            urgency=req.urgency
        )
        db.add(new_input)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Notice: Failed to record crop_input: {e}")

    # Compute AI decision recommendation
    return calculate_crop_decision(db, req)

@app.post("/api/what-if", response_model=schemas.WhatIfResponse)
def what_if_simulation(req: schemas.WhatIfRequest, db: Session = Depends(get_db)):
    return calculate_what_if_scenarios(db, req)

@app.get("/api/markets/{crop}")
def get_markets_by_crop(crop: str, db: Session = Depends(get_db)):
    markets = db.query(models.Market).filter(models.Market.crop.ilike(crop)).all()
    return markets

@app.get("/api/buyers/{crop}")
def get_buyers_by_crop(crop: str, db: Session = Depends(get_db)):
    buyers = db.query(models.Buyer).filter(models.Buyer.crop.ilike(crop)).all()
    return buyers

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
