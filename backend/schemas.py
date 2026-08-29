from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# --- Auth Schemas ---
class SignupRequest(BaseModel):
    name: str = Field(..., example="Demo Farmer")
    mobile: str = Field(..., example="9999999999")
    location: str = Field(..., example="Nashik")
    password: str = Field(..., example="demo123")

class LoginRequest(BaseModel):
    mobile: str = Field(..., example="9999999999")
    password: str = Field(..., example="demo123")

class AuthTokenResponse(BaseModel):
    token: str
    farmer_id: int
    name: str
    mobile: str
    location: str

class FarmerResponse(BaseModel):
    id: int
    name: str
    mobile: str
    location: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- Crop Analysis Schemas ---
class CropAnalysisRequest(BaseModel):
    farmer_id: Optional[int] = None
    crop: str = Field(default="Onion", example="Onion")
    quantity_kg: float = Field(gt=0, default=500, example=500)
    location: str = Field(default="Nashik", example="Nashik")
    quality: str = Field(default="Grade A", example="Grade A")
    urgency: str = Field(default="Need money within 3 days", example="Need money within 3 days")

class MarketBreakdown(BaseModel):
    market_name: str
    selling_price: float
    distance_km: float
    transport_cost: float
    handling_cost: float
    storage_cost: float
    expected_loss: float
    net_realisation: float
    expected_income: float
    demand_level: str  # High, Medium, Low
    ai_score: float    # 0 to 100
    is_recommended: bool

class RecommendedBuyer(BaseModel):
    name: str
    price_per_kg: float
    distance_km: float
    payment_terms: str
    reliability_score: float
    verified: bool

class AnalysisResponse(BaseModel):
    crop: str
    quantity_kg: float
    quantity_quintals: float
    quality: str
    farmer_location: str
    urgency: str
    recommended_market: MarketBreakdown
    all_markets: List[MarketBreakdown]
    reasons: List[str]
    recommended_buyer: RecommendedBuyer

# --- What-If Schemas ---
class WhatIfRequest(BaseModel):
    crop: str = "Onion"
    quantity_kg: float = 500
    location: str = "Nashik"
    urgency: str = "Need money within 3 days"
    current_net_realisation: float = 2020.0

class WhatIfOption(BaseModel):
    scenario_key: str # sell_now, wait_3_days, join_fpo
    title: str
    current_price: float
    forecast_price: Optional[float] = None
    net_realisation: float
    expected_income: float
    income_delta: float
    badge: str
    description: str
    details: dict

class WhatIfResponse(BaseModel):
    baseline_income: float
    options: List[WhatIfOption]
