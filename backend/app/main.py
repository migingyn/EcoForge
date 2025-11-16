from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import Dict
from dotenv import load_dotenv

import httpx
import os

from app.services.data_loader import load_supplier_data, load_supplier_metadata, load_supplier_metadata_complete, supplier_data
from app.services.scoring import calculate_cost_scores, calculate_risk_scores, calculate_co2_scores, calculate_logistics_score, calculate_final_scores
from app.routes import ai


load_dotenv()
# Create app
app = FastAPI(title="Steel Tradeoff API")

# CORS - MUST be before routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or better: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load data on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    load_supplier_data()
    load_supplier_metadata()
    print("Supplier data loaded.")

    yield

    print("Shutting down...")

app.router.lifespan_context = lifespan

app.include_router(ai.router, prefix="/api")

class OptimizeRequest(BaseModel):
    destination_lat: float
    destination_lon: float
    tonnage: int
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
def get_logistics_scores(destination_lat: float, destination_lon: float, tonnage: float):
    return calculate_logistics_score(destination_lat, destination_lon, tonnage)

@app.post("/optimize")
def optimize(req: OptimizeRequest):
    results = calculate_final_scores(
        destination_lat=req.destination_lat,
        destination_lon=req.destination_lon,
        tonnage=req.tonnage,
        weights=req.weights,
    )

    return {"results": results}

USER_AGENT_EMAIL = os.getenv("USER_AGENT_EMAIL")

@app.get("/metadata")
def get_metadata(company: str):
    metadata = load_supplier_metadata_complete()
    return metadata[company]

@app.get("/geocode")
async def geocode_location(q: str):
    """
    Proxy endpoint: frontend calls this, backend calls Nominatim.
    Example: GET /geocode?q=Chicago
    """
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "format": "json",
        "q": q,
    }
    headers = {
        "User-Agent": f"EcoForge/1.0 ({USER_AGENT_EMAIL})",
    }

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params, headers=headers)

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Geocoding service error")

    data = resp.json()
    if not data:
        raise HTTPException(status_code=404, detail="Location not found")

    first = data[0]
    return {
        "lat": float(first["lat"]),
        "lon": float(first["lon"]),
        "displayName": first["display_name"],
    }