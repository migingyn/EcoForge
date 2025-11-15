from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import Dict

from app.services.data_loader import load_supplier_data, supplier_data
from app.services.scoring import calculate_cost_scores, calculate_risk_scores, calculate_co2_scores, calculate_logistics_score, calculate_final_scores

# Load data on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    load_supplier_data()
    print("Supplier data loaded.")

    yield

    print("Shutting down...")

# Create app
app = FastAPI(title="Steel Tradeoff API", lifespan=lifespan)

# CORS 
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OptimizeRequest(BaseModel):
    destination_lat: float
    destination_lon: float
    weights: Dict[str, float] | None = None

# Basic Routes
@app.get("/")
def root():
    return {"message": "Steel Tradeoff API running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/suppliers")
def get_suppliers():
    return supplier_data

@app.get("/cost_scores")
def get_cost_scores():
    return calculate_cost_scores()

@app.get("/risk-scores")
def get_risk_scores():
    return calculate_risk_scores()

@app.get("/co2-scores")
def get_co2_scores():
    return calculate_co2_scores()

@app.get("/logistics-scores")
def get_logistics_scores(destination_lat: float, destination_lon: float):
    return calculate_logistics_score(destination_lat, destination_lon)

@app.post("/optimize")
def optimize(req: OptimizeRequest):
    results = calculate_final_scores(
        destination_lat=req.destination_lat,
        destination_lon=req.destination_lon,
        weights=req.weights,
    )

    return {"results": results}