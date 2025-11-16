from math import radians, sin, cos, asin, sqrt
from typing import List, Dict

from app.services.data_loader import load_supplier_data, load_supplier_metadata

SUPPLIERS = ["CLF", "CMC", "FRD", "MT", "STLD", "X", "NUE"]
EMISSIONS = {
    "truck": 73.92, # Unit of Measurement: 73.92g CO₂e/tonne-km 
    "rail/train": 11.94, # Unit of Measurement: 11.94g CO₂e/tonne-km
    "ship": 3.94 # Unit of Measurement: 3.94g CO₂e/tonne-km
}

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
    rank_order = ["FRD", "STLD", "CMC", "MT", "X", "CLF"]

    # Convert rank → normalized score (1 = best, 0 = worst)
    cost_scores = {
        supplier: 1 - (i / (len(rank_order) - 1))
        for i, supplier in enumerate(rank_order)
    }

    return cost_scores

def calculate_risk_scores() -> Dict[str, float]:
    supplier_data = load_supplier_data()

    volatilities = [supplier_data[company]["volatility"] for company in SUPPLIERS]

    risk_scores = inverse_normalizer(volatilities)

    results = {}
    for company, score in zip(SUPPLIERS, risk_scores):
        results[company] = score

    return results

def calculate_co2_scores() -> Dict[str, float]:
    supplier_metadata = load_supplier_metadata()

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

def calculate_logistics_score(destination_lat, destination_lon, tonnage: float):
    supplier_metadata = load_supplier_metadata()

    MODE_MAP = {
        "Truck": "truck",
        "Rail": "rail/train",
        "Barge": "ship",
    }

    emissions = []

    for company in SUPPLIERS:
        origin_lat = supplier_metadata[company]["lat"]
        origin_lon = supplier_metadata[company]["lon"]
        distance = haversine(destination_lat, destination_lon, origin_lat, origin_lon)

        logistics_mode = supplier_metadata[company]["logistics_mode"]
        emission_mode = MODE_MAP[logistics_mode]
        emission = distance * tonnage * EMISSIONS[emission_mode]
        emissions.append(emission)
    
    logistics_scores = inverse_normalizer(emissions)

    results = {}
    for company, score in zip(SUPPLIERS, logistics_scores):
        results[company] = score
    
    return results

def calculate_final_scores(destination_lat, destination_lon, tonnage, weights):

    if weights is None:
        weights = {"cost": 0.25, "risk": 0.25, "co2": 0.25, "logistics": 0.25}
    else:
        total = sum(weights.values())
        if total > 0:
            weights = {k: v / total for k, v in weights.items()}

    cost_scores = calculate_cost_scores()
    risk_scores = calculate_risk_scores()
    co2_scores = calculate_co2_scores()
    logistics_scores = calculate_logistics_score(destination_lat, destination_lon, tonnage)
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
