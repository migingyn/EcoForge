import pandas as pd
import os

DATA_PATH = "app/data"

SUPPLIERS = ["CLF", "CMC", "FRD", "MT", "STLD", "X"]

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
    
    print(supplier_data)