import pandas as pd
import os
import json

DATA_PATH = "app/data"

SUPPLIERS = ["CLF", "CMC", "FRD", "MT", "STLD", "X", "AGS", "BAO", "BGSP", "BJS", "HBIS", "MAAN" ,"NANJ"]

supplier_data = {}

def load_supplier_data():
    global supplier_data

    for company in SUPPLIERS:
        filepath = os.path.join(DATA_PATH, f"{company}_5Y_1DAY_FROM_PERPLEXITY.csv")
        df = pd.read_csv(filepath)

        avg_price = df["close"].mean()

        df["return"] = df["close"].pct_change()
        volatility_30d = df["return"].rolling(window=30).std().iloc[-1]

        supplier_data[company] = {
            "avg_price": float(avg_price),
            "volatility": float(volatility_30d)
        }
    
    return supplier_data

supplier_metadata = None

def load_supplier_metadata():
    global supplier_metadata

    if supplier_metadata is None:
        us_filepath = os.path.join(DATA_PATH, "supplier_metadata_cleaned.json")
        china_filepath = os.path.join(DATA_PATH, "china_metadata_cleaned.json")
        
        combined_metadata = {}

        if os.path.exists(us_filepath):
            with open(us_filepath, "r") as f:
                us_data = json.load(f)
            combined_metadata.update(us_data)
        
        if os.path.exists(china_filepath):
            with open(china_filepath, "r") as f:
                china_data = json.load(f)
            combined_metadata.update(china_data)
        
        supplier_metadata = combined_metadata
    
    return supplier_metadata
        