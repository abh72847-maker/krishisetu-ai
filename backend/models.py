from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from database import Base

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    mobile = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CropInput(Base):
    __tablename__ = "crop_inputs"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=True)
    crop = Column(String, nullable=False)
    quantity_kg = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    quality = Column(String, nullable=False)
    urgency = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Market(Base):
    __tablename__ = "markets"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String, index=True, nullable=False)
    market_name = Column(String, index=True, nullable=False)
    location = Column(String, nullable=False)
    price_per_quintal = Column(Float, nullable=False)
    distance_km = Column(Float, nullable=False)
    transport_cost = Column(Float, nullable=False)  # Rs/quintal
    handling_cost = Column(Float, nullable=False)   # Rs/quintal
    storage_cost = Column(Float, nullable=False)    # Rs/quintal
    expected_loss = Column(Float, nullable=False)   # Rs/quintal
    demand_score = Column(Float, nullable=False)    # 0 to 100
    buyer_reliability = Column(Float, nullable=False) # 0 to 100
    payment_score = Column(Float, nullable=False)   # 0 to 100

class Buyer(Base):
    __tablename__ = "buyers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    crop = Column(String, index=True, nullable=False)
    market = Column(String, nullable=False)
    price_per_kg = Column(Float, nullable=False)
    distance_km = Column(Float, nullable=False)
    minimum_quantity_kg = Column(Float, nullable=False)
    payment_days = Column(Integer, nullable=False)
    reliability_score = Column(Float, nullable=False)
    verified = Column(Boolean, default=True)

class PriceHistory(Base):
    __tablename__ = "price_history"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String, index=True, nullable=False)
    market = Column(String, index=True, nullable=False)
    date = Column(String, nullable=False)  # YYYY-MM-DD
    price_per_quintal = Column(Float, nullable=False)
