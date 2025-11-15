from app.services.data_loader import supplier_data
from typing import List, Dict

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
    companies = list(supplier_data.keys())
    closing_prices = [supplier_data[company]["avg_price"] for company in companies]

    # Want lowest price to have highest score
    cost_scores = inverse_normalizer(closing_prices)

    results = {}
    for company, score in zip(companies, cost_scores):
        results[company] = score
    
    return results

def calculate_risk_scores() -> Dict[str, float]:
    companies = list(supplier_data.keys())
    volatilities = [supplier_data[company]["volatility"] for company in companies]

    risk_scores = inverse_normalizer(volatilities)

    results = {}
    for company, score in zip(companies, risk_scores):
        results[company] = score

    return results