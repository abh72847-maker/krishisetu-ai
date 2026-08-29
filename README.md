# KrishiSetu AI — Sell Smarter. Earn Better.

Internal Smart India Hackathon (SIH) Prototype Demonstration.

**"We don't just tell farmers where the price is highest. We tell them where they can earn the most after costs."**

---

## Executive Overview

### The Problem
Indian farmers often select selling markets (mandis) based solely on headline price per quintal. However, transport freight costs, loading/unloading fees, storage decay, transit losses, and delayed buyer settlements often erode nominal price advantages — resulting in lower actual income.

### The Solution
**KrishiSetu AI** evaluates the **Net Realisation** formula:
$$\text{Net Realisation} = \text{Selling Price} - \text{Transport} - \text{Handling} - \text{Storage} - \text{Expected Loss}$$

It ranks candidate mandis using a 5-factor AI algorithm and offers a **What-If Financial Simulator** to compare immediate sale (`SELL NOW`), ML forecasted price appreciation (`WAIT 3 DAYS`), and collective bargaining (`JOIN FPO`).

---

## 4-Screen SIH Workflow

```text
SCREEN 1: Landing + Login / Signup (Instant [TRY DEMO] access)
        ↓
SCREEN 2: Farmer Crop & Sale Input (Onion / Nashik / 500kg / Grade A / 3-day urgency)
        ↓
SCREEN 3: AI Selling Decision (Lasalgaon Mandi ₹2,020/q Net Realisation = ₹10,100 Income)
        ↓
SCREEN 4: What-If Financial Simulator (SELL NOW vs WAIT 3 DAYS (+₹500) vs JOIN FPO (+₹1,500))
```

---

## Technology Stack

- **Frontend**: React (v18), Vite, Tailwind CSS, Lucide React, Axios, React Router (v6).
- **Backend**: Python 3.14+, FastAPI, Uvicorn, SQLAlchemy (ORM), Pydantic v2, Pandas, Scikit-learn.
- **Database**: PostgreSQL (compatible with Supabase, SQLite default fallback for local dev).

---

## Project Structure

```text
krishisetu-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Screen 1
│   │   │   ├── FarmerInputPage.jsx   # Screen 2
│   │   │   ├── DecisionPage.jsx      # Screen 3
│   │   │   └── WhatIfPage.jsx        # Screen 4
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── main.py                       # FastAPI server entry point
│   ├── database.py                   # SQLAlchemy & DB engine
│   ├── models.py                     # DB Models (Farmer, Market, Buyer, PriceHistory)
│   ├── schemas.py                    # Pydantic schemas
│   ├── decision_engine.py            # Net Realisation & 5-Factor AI score formula
│   ├── price_prediction.py           # Scikit-learn ML forecast model
│   ├── seed.py                       # Database seeding script
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## SIH Demo Credentials

- **Mobile**: `9999999999`
- **Password**: `demo123`
- **Demo Farmer**: Demo Farmer (Location: Nashik)

---

## Local Setup & Quick Start

### 1. Backend Setup (FastAPI)

```bash
cd krishisetu-ai/backend

# Install dependencies
pip install -r requirements.txt

# Run backend server (auto-seeds database on startup)
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will run at `http://localhost:8000`. Swagger API docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup (React + Vite)

```bash
cd krishisetu-ai/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Frontend will run at `http://localhost:5173`.

---

## API Endpoints Spec

- `GET /api/health` — Health check endpoint (`{"status": "ok"}`).
- `POST /api/auth/signup` — Registers a new farmer.
- `POST /api/auth/login` — Authenticates farmer credentials.
- `POST /api/crop-analysis` — Computes mandi rankings, Net Realisation, AI scores & buyer recommendations.
- `POST /api/what-if` — Evaluates SELL NOW, WAIT 3 DAYS (ML forecast), and JOIN FPO scenarios.
- `GET /api/markets/{crop}` — Returns market records for a crop.
- `GET /api/buyers/{crop}` — Returns verified buyers for a crop.

---

## Cloud Deployment Architecture

```text
                JUDGE / USER
                     │
                     ▼
          VERCEL (React Frontend)
                     │
                     │ HTTPS / API
                     ▼
          RENDER (FastAPI Backend)
                     │
                     ▼
          SUPABASE (PostgreSQL DB)
```

- **Frontend Deployment (Vercel)**: Set `VITE_API_URL` environment variable pointing to Render backend URL.
- **Backend Deployment (Render)**: Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`. Environment variable: `DATABASE_URL` pointing to Supabase PostgreSQL connection string.

---

## Prototype Disclaimer Footer

*Prototype demonstration using simulated market data. Production version can integrate verified market data sources such as Agmarknet/data.gov.in.*
