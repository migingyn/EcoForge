from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create app
app = FastAPI(title="Steel Tradeoff API")

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
