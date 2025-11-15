from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.data_loader import load_supplier_data, supplier_data
from contextlib import asynccontextmanager

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



# Basic Routes
@app.get("/")
def root():
    return {"message": "Steel Tradeoff API running"}

@app.get("/health")
def health():
    return {"status": "ok"}
