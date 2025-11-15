import pandas as pd
import os

DATA_PATH = "../data"

SUPPLIERS = ["CLF", "CMC", "FRD", "MT", "STLD", "X"]

supplier_data = {}

def load_supplier_data():
    global supplier_data

    for company in SUPPLIERS:
        filepath = os.path.join(DATA_PATH, f"{company}_5Y_1DAY_FROM_PERPLEXITY.csv")
        df = pd.read_csv(filepath)

        avg_price = df["close"].mean()

        supplier_data[company] = {
            "avg_price": float(avg_price)
        }
    
    print(supplier_data)

load_supplier_data()
