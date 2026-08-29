import os
import hashlib
from datetime import datetime, timedelta
from database import SessionLocal, engine, Base
import models

def hash_password(password: str) -> str:
    # Use standard sha256 + salt for robust portable hashing in prototype
    salt = "krishisetu_sih_salt_2026"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Demo Farmer if not exists
        demo_farmer = db.query(models.Farmer).filter(models.Farmer.mobile == "9999999999").first()
        if not demo_farmer:
            demo_farmer = models.Farmer(
                name="Demo Farmer",
                mobile="9999999999",
                location="Nashik",
                password_hash=hash_password("demo123")
            )
            db.add(demo_farmer)
            db.commit()
            print("Seeded Demo Farmer (Mobile: 9999999999, Password: demo123)")

        # 2. Seed Markets if empty
        if db.query(models.Market).count() == 0:
            markets_data = [
                # Onion
                models.Market(crop="Onion", market_name="Lasalgaon Mandi", location="Lasalgaon", price_per_quintal=2400.0, distance_km=65.0, transport_cost=250.0, handling_cost=50.0, storage_cost=0.0, expected_loss=80.0, demand_score=95.0, buyer_reliability=94.0, payment_score=90.0),
                models.Market(crop="Onion", market_name="Pune Market Yard", location="Pune", price_per_quintal=2350.0, distance_km=210.0, transport_cost=350.0, handling_cost=60.0, storage_cost=10.0, expected_loss=50.0, demand_score=75.0, buyer_reliability=85.0, payment_score=80.0),
                models.Market(crop="Onion", market_name="Vashi APMC Mumbai", location="Mumbai", price_per_quintal=2500.0, distance_km=180.0, transport_cost=400.0, handling_cost=70.0, storage_cost=20.0, expected_loss=50.0, demand_score=85.0, buyer_reliability=80.0, payment_score=75.0),
                models.Market(crop="Onion", market_name="Ahmednagar APMC", location="Ahmednagar", price_per_quintal=2280.0, distance_km=140.0, transport_cost=280.0, handling_cost=45.0, storage_cost=5.0, expected_loss=60.0, demand_score=70.0, buyer_reliability=82.0, payment_score=85.0),
                models.Market(crop="Onion", market_name="Kolhapur Mandi", location="Kolhapur", price_per_quintal=2310.0, distance_km=320.0, transport_cost=450.0, handling_cost=50.0, storage_cost=15.0, expected_loss=70.0, demand_score=65.0, buyer_reliability=78.0, payment_score=80.0),

                # Tomato
                models.Market(crop="Tomato", market_name="Pimpalgaon Baswant", location="Nashik", price_per_quintal=3100.0, distance_km=35.0, transport_cost=180.0, handling_cost=40.0, storage_cost=20.0, expected_loss=120.0, demand_score=92.0, buyer_reliability=90.0, payment_score=95.0),
                models.Market(crop="Tomato", market_name="Pune Market Yard", location="Pune", price_per_quintal=3250.0, distance_km=210.0, transport_cost=360.0, handling_cost=55.0, storage_cost=30.0, expected_loss=150.0, demand_score=88.0, buyer_reliability=86.0, payment_score=85.0),
                models.Market(crop="Tomato", market_name="Vashi APMC Mumbai", location="Mumbai", price_per_quintal=3400.0, distance_km=180.0, transport_cost=420.0, handling_cost=65.0, storage_cost=40.0, expected_loss=160.0, demand_score=90.0, buyer_reliability=82.0, payment_score=80.0),

                # Potato
                models.Market(crop="Potato", market_name="Manchar APMC", location="Pune", price_per_quintal=1950.0, distance_km=160.0, transport_cost=270.0, handling_cost=35.0, storage_cost=10.0, expected_loss=45.0, demand_score=84.0, buyer_reliability=88.0, payment_score=90.0),
                models.Market(crop="Potato", market_name="Nashik APMC", location="Nashik", price_per_quintal=1900.0, distance_km=20.0, transport_cost=120.0, handling_cost=30.0, storage_cost=5.0, expected_loss=35.0, demand_score=80.0, buyer_reliability=92.0, payment_score=92.0),
                models.Market(crop="Potato", market_name="Vashi APMC Mumbai", location="Mumbai", price_per_quintal=2100.0, distance_km=180.0, transport_cost=380.0, handling_cost=50.0, storage_cost=15.0, expected_loss=50.0, demand_score=86.0, buyer_reliability=84.0, payment_score=85.0),

                # Wheat
                models.Market(crop="Wheat", market_name="Nagpur Mandi", location="Nagpur", price_per_quintal=2850.0, distance_km=480.0, transport_cost=550.0, handling_cost=40.0, storage_cost=0.0, expected_loss=25.0, demand_score=89.0, buyer_reliability=91.0, payment_score=95.0),
                models.Market(crop="Wheat", market_name="Ahmednagar APMC", location="Ahmednagar", price_per_quintal=2780.0, distance_km=140.0, transport_cost=260.0, handling_cost=35.0, storage_cost=0.0, expected_loss=20.0, demand_score=82.0, buyer_reliability=86.0, payment_score=90.0),
                models.Market(crop="Wheat", market_name="Pune Market Yard", location="Pune", price_per_quintal=2820.0, distance_km=210.0, transport_cost=340.0, handling_cost=45.0, storage_cost=0.0, expected_loss=25.0, demand_score=85.0, buyer_reliability=88.0, payment_score=88.0),

                # Rice
                models.Market(crop="Rice", market_name="Kolhapur APMC", location="Kolhapur", price_per_quintal=3600.0, distance_km=320.0, transport_cost=440.0, handling_cost=50.0, storage_cost=0.0, expected_loss=30.0, demand_score=91.0, buyer_reliability=93.0, payment_score=92.0),
                models.Market(crop="Rice", market_name="Nagpur APMC", location="Nagpur", price_per_quintal=3520.0, distance_km=480.0, transport_cost=560.0, handling_cost=45.0, storage_cost=0.0, expected_loss=28.0, demand_score=88.0, buyer_reliability=90.0, payment_score=90.0),
                models.Market(crop="Rice", market_name="Pune Market Yard", location="Pune", price_per_quintal=3580.0, distance_km=210.0, transport_cost=350.0, handling_cost=50.0, storage_cost=0.0, expected_loss=32.0, demand_score=86.0, buyer_reliability=87.0, payment_score=89.0),
            ]
            db.bulk_save_objects(markets_data)
            db.commit()
            print(f"Seeded {len(markets_data)} Market records.")

        # 3. Seed Buyers if empty
        if db.query(models.Buyer).count() == 0:
            buyers_data = [
                models.Buyer(name="FreshMart Agrotech", crop="Onion", market="Lasalgaon", price_per_kg=25.0, distance_km=18.0, minimum_quantity_kg=200.0, payment_days=1, reliability_score=94.0, verified=True),
                models.Buyer(name="Sahyadri Farmers Producer Co.", crop="Onion", market="Nashik", price_per_kg=24.5, distance_km=25.0, minimum_quantity_kg=500.0, payment_days=2, reliability_score=96.0, verified=True),
                models.Buyer(name="AgriProcure Wholesale Ltd", crop="Onion", market="Pune", price_per_kg=24.0, distance_km=210.0, minimum_quantity_kg=1000.0, payment_days=3, reliability_score=88.0, verified=True),
                models.Buyer(name="Reliance Fresh Agri Hub", crop="Tomato", market="Nashik", price_per_kg=32.0, distance_km=22.0, minimum_quantity_kg=300.0, payment_days=1, reliability_score=92.0, verified=True),
                models.Buyer(name="Metro Cash & Carry", crop="Tomato", market="Pune", price_per_kg=33.5, distance_km=210.0, minimum_quantity_kg=500.0, payment_days=2, reliability_score=89.0, verified=True),
                models.Buyer(name="MahaAgro Direct Procurement", crop="Potato", market="Pune", price_per_kg=20.0, distance_km=160.0, minimum_quantity_kg=400.0, payment_days=1, reliability_score=91.0, verified=True),
                models.Buyer(name="Godrej Agrovet Sourcing", crop="Wheat", market="Nagpur", price_per_kg=29.0, distance_km=480.0, minimum_quantity_kg=1000.0, payment_days=2, reliability_score=95.0, verified=True),
                models.Buyer(name="Patanjali Foods Direct", crop="Wheat", market="Ahmednagar", price_per_kg=28.2, distance_km=140.0, minimum_quantity_kg=800.0, payment_days=1, reliability_score=93.0, verified=True),
                models.Buyer(name="Kolhapur Organic Millers", crop="Rice", market="Kolhapur", price_per_kg=36.5, distance_km=320.0, minimum_quantity_kg=500.0, payment_days=1, reliability_score=94.0, verified=True),
                models.Buyer(name="Blinkit Agri Direct", crop="Onion", market="Mumbai", price_per_kg=25.5, distance_km=180.0, minimum_quantity_kg=500.0, payment_days=1, reliability_score=90.0, verified=True)
            ]
            db.bulk_save_objects(buyers_data)
            db.commit()
            print(f"Seeded {len(buyers_data)} Buyer records.")

        # 4. Seed Historical Prices if empty
        if db.query(models.PriceHistory).count() == 0:
            histories = []
            base_date = datetime.now() - timedelta(days=30)
            
            crops_markets = [
                ("Onion", "Lasalgaon", 2200.0, 8.0),
                ("Onion", "Pune", 2150.0, 6.0),
                ("Onion", "Mumbai", 2300.0, 7.0),
                ("Tomato", "Pimpalgaon Baswant", 2900.0, 10.0),
                ("Potato", "Manchar APMC", 1800.0, 5.0),
                ("Wheat", "Nagpur Mandi", 2700.0, 5.0),
                ("Rice", "Kolhapur APMC", 3450.0, 5.0),
            ]

            for crop, market, base_price, daily_trend in crops_markets:
                for i in range(30):
                    day_str = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
                    # Steady upward trend + slight noise
                    noise = (i % 3 - 1) * 12.0
                    price = round(base_price + (i * daily_trend) + noise, 2)
                    histories.append(models.PriceHistory(
                        crop=crop,
                        market=market,
                        date=day_str,
                        price_per_quintal=price
                    ))

            db.bulk_save_objects(histories)
            db.commit()
            print(f"Seeded {len(histories)} PriceHistory records.")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
