from math import radians, sin, cos, asin, sqrt
from typing import List, Dict

from app.services.data_loader import supplier_data, supplier_metadata

SUPPLIERS = ["CLF", "CMC", "FRD", "MT", "STLD", "X"]

# Min gets set to 0, Max gets set to 1
def normalizer(values: List[float]) -> List[float]:
    min_val = min(values)
    max_val = max(values)

    if min_val == max_val:
        return [1.0 for _ in values]
    
    return [(val - min_val) / (max_val - min_val) for val in values]

# Min gets set to 1, Max gets set to 0
def inverse_normalizer(values: List[float]) -> List[float]:
    min_val = min(values)
    max_val = max(values)

    if min_val == max_val:
        return [1.0 for _ in values]
    
    return [(max_val - val) / (max_val - min_val) for val in values]
    
# Calculates score based on cost
def calculate_cost_scores() -> Dict[str, float]:
    closing_prices = [supplier_data[company]["avg_price"] for company in SUPPLIERS]

    # Want lowest price to have highest score
    cost_scores = inverse_normalizer(closing_prices)

    results = {}
    for company, score in zip(SUPPLIERS, cost_scores):
        results[company] = score
    
    return results

def calculate_risk_scores() -> Dict[str, float]:
    volatilities = [supplier_data[company]["volatility"] for company in SUPPLIERS]

    risk_scores = inverse_normalizer(volatilities)

    results = {}
    for company, score in zip(SUPPLIERS, risk_scores):
        results[company] = score

    return results

def calculate_co2_scores() -> Dict[str, float]:
    co2_usages = [supplier_metadata[company]["co2_per_ton"] for company in SUPPLIERS]

    co2_scores = inverse_normalizer(co2_usages)

    results = {}
    for company, score in zip(SUPPLIERS, co2_scores):
        results[company] = score

    return results

# Distance formula for GPS coordinates
def haversine(lat1: float, lon1: float, lat2:  float, lon2: float) -> float:
    R = 6371.0

    phi1, phi2 = radians(lat1), radians(lat2)
    dphi = radians(lat2 - lat1)
    dlambda = radians(lon2 - lon1)

    a = sin(dphi / 2.0) ** 2 + cos(phi1) * cos(phi2) * sin(dlambda / 2.0) ** 2
    c = 2 * asin(sqrt(a))

    return R * c

def calculate_logistics_score(destination_lat, destination_lon):
    distances = []

    for company in SUPPLIERS:
        origin_lat = supplier_metadata[company]["lat"]
        origin_lon = supplier_metadata[company]["lon"]
        distances.append(haversine(destination_lat, destination_lon, origin_lat, origin_lon))
    
    logistics_scores = inverse_normalizer(distances)

    results = {}
    for company, score in zip(SUPPLIERS, logistics_scores):
        results[company] = score
    
    return results

def calculate_final_scores(destination_lat, destination_lon, weights):
    cost_scores = calculate_cost_scores()
    risk_scores = calculate_risk_scores()
    co2_scores = calculate_co2_scores()
    logistics_scores = calculate_logistics_score(destination_lat, destination_lon)
    results = []

    for company in SUPPLIERS:
        cost = cost_scores[company]
        risk = risk_scores[company]
        co2 = co2_scores[company]
        logistics = logistics_scores[company]

        final_score = (
            cost * weights["cost"] +
            risk * weights["risk"] + 
            co2 * weights["co2"] + 
            logistics * weights["logistics"]
        )

        results.append({
            "company": company,
            "final_score": final_score,
            "scores": {
                "cost": cost,
                "risk": risk,
                "co2": co2,
                "logistics": logistics,
            },
            "weights": weights
        })

    results.sort(key=lambda r: r["final_score"], reverse=True)

    return results
EMISSIONS = {
    "truck": 73.92, # Unit of Measurement: 73.92g CO₂e/tonne-km 
    "rail/train": 11.94, # Unit of Measurement: 11.94g CO₂e/tonne-km
    "ship": 3.94 # Unit of Measurement: 3.94g CO₂e/tonne-km
}

def calculate_transport_emissions(distance: float, tonnage: float, mode: str):
    emission_factor = EMISSIONS[mode]
    emissions = distance * tonnage * emission_factor
    return emissions
