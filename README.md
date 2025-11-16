# EcoForge

Setting up Python backend:

1. Make sure you have Python3.11 installed
3. `python3.11 -m venv .venv`
4. `source .venv/bin/activate`
5. `pip install -r requirements.txt`
6. To run: `uvicorn app.main:app --reload`

Installing .env's so api's work
1. `cp .env.example .env`
2. `npm install`
3. `npm run dev`

# PHASE 0 — Setup (≈ 30 min)
Goal: Establish a working development environment.
- Initialize GitHub repo
- Create frontend (Next.js recommended)
- Create backend (FastAPI recommended)
- Add one sample CSV to backend folder
- Hardcode one supplier JSON (for testing)
- Verify frontend ↔ backend connection with a test API call

# PHASE 1 — Core Data Processing (Backend) (≈ 2–3 hours)
Goal: Load stock CSVs and compute essential supplier metrics.

Tasks:

- Load all supplier CSVs (CLF, X, STLD, CMC, MT, FRD)
- For each supplier, compute:
  - Average closing price (cost proxy)
  - Daily returns
  - 30-day volatility (risk proxy)
  - Trend slope (optional)
  - Average trading volume (optional)
- Store results in an in-memory dictionary
- Create a supplier metadata JSON containing:
  - Plant location (lat/lon)
  - Steel process (EAF vs BF)
  - Carbon intensity (CO2/ton)
  - Default logistics mode (truck/rail/ship)
    
Deliverable: Backend can compute cost_score and risk_score.

# PHASE 2 — Logistics and Carbon Model (Backend) (≈ 2–3 hours)
Goal: Implement optimization math and scoring system.
Tasks:
- Implement Haversine distance calculation
- Add transport emissions model:
  - Emission factors for truck/rail/ship
  - Distance × tonnage × emission factor
- Compute material emissions using CO2 per ton
- Combine material + transport emissions into a carbon score
- Compute final composite score:
- final_score =
  `w_cost * cost_score +
  w_co2 * co2_score +
  w_risk * stability_score +
  w_logistics * logistics_score`
- Build /optimize API endpoint:
  - Inputs: location, tonnage, weights, carbon price
  - Output: ranked list of suppliers + scores + distances + emissions
    
Deliverable: Backend can rank suppliers using cost, carbon, risk, and logistics.

# PHASE 3 — Frontend UI (≈ 3–4 hours)
Goal: Allow users to enter inputs and visualize ranked suppliers.
Tasks:
- Build the main input form:
  - Plant location
  - Tonnage needed per year
  - Slider: Cost ↔ Carbon
  - Carbon price input
  - "Optimize Supplier" button
- On submit, call backend /optimize
- Render results in a table:
  - Supplier name
  - Final score
  - Total CO2
  - Effective cost
  - Transport distance
- Optional: Add charts (bar, radar, line)
  
Deliverable: Frontend connected to backend with dynamic results table.

# PHASE 4 — Map Visualization (≈ 2–3 hours)
Goal: Display suppliers and shipping routes on an interactive map.
Tasks:
- Use Leaflet.js or Mapbox
- Plot supplier plant locations
- Plot user’s plant location
- Draw route lines
- On hover: show distance and transport CO2
  
Deliverable: Interactive map showing supply routes.

# PHASE 5 — AI Explanation (Optional, ≈ 1 hour)
Goal: Automatically explain why the top supplier was recommended.
Tasks:
- Feed optimization result into an LLM
- Generate short text explanation summarizing cost, carbon, and logistics reasoning
  
Deliverable: AI-generated summary on results page.

PHASE 6 — Polish and Pitch (≈ 1–2 hours)
Goal: Refine UI/UX and prepare final presentation.
Tasks:
- Add simple styling (Tailwind recommended)
- Create a "How It Works" page
- Prepare pitch script:
  - Problem → Solution → Demo → Impact → Future Work
  
Deliverable: Polished, demo-ready project.



