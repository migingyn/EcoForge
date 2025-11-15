# EcoForge

🚀 Project Roadmap
A step-by-step development plan for building the Steel Supplier Cost–Carbon–Logistics Optimizer during the hackathon.
🧱 PHASE 0 — Setup (≈ 30 min)
Goal: Establish a working development environment.
Initialize GitHub repo
Create frontend (Next.js recommended)
Create backend (FastAPI recommended)
Add one sample CSV to backend folder
Hardcode one supplier JSON (for testing)
Verify frontend ↔ backend connection with a test API call
📊 PHASE 1 — Core Data Processing (Backend) (≈ 2–3 hours)
Goal: Load stock CSVs and compute essential supplier metrics.
Tasks:
Load all supplier CSVs (CLF, X, STLD, CMC, MT, FRD)
For each supplier, compute:
Average closing price (cost proxy)
Daily returns
30-day volatility (risk proxy)
Trend slope (optional)
Average trading volume (optional)
Store results in an in-memory dictionary (for fast reuse)
Create a supplier metadata JSON containing:
Plant location (lat/lon)
Steel process (EAF vs BF)
Carbon intensity (CO₂/ton)
Default logistics mode (truck/rail/ship)
Deliverable:
Precomputed backend metrics: cost_score and risk_score.
🌍 PHASE 2 — Logistics & Carbon Model (Backend) (≈ 2–3 hours)
Goal: Implement optimization math and scoring system.
Tasks:
Implement Haversine distance calculation
Add transport emissions model:
Emission factors for truck/rail/ship
Distance × tonnage × emission factor
Compute material emissions using CO₂ per ton
Combine material + transport emissions into a carbon score
Compute final composite score:
final_score =
  w_cost * cost_score +
  w_co2 * co2_score +
  w_risk * stability_score +
  w_logistics * logistics_score
Build /optimize API endpoint:
Inputs: location, tonnage, weights, carbon price
Output: ranked list of suppliers + scores + distances + emissions
Deliverable:
Backend can fully rank suppliers using cost, carbon, risk, and logistics.
💻 PHASE 3 — Frontend UI (≈ 3–4 hours)
Goal: Let users enter inputs and visualize ranked suppliers.
Tasks:
Build the main input form:
Plant location (text field or dropdown)
Tonnage needed per year
Slider: Cost ↔ Carbon
Carbon price input
“Optimize Supplier” button
On submit, call backend /optimize
Render results in a clean table:
Supplier name
Final score
Total CO₂
Effective cost
Transport distance
Optional: Add charts (bar, radar, line)
Deliverable:
Frontend connected to backend with dynamic table of ranked suppliers.
🗺️ PHASE 4 — Map Visualization (≈ 2–3 hours)
Goal: Display suppliers and shipping routes on an interactive map.
Tasks:
Use Leaflet.js or Mapbox
Plot supplier plant locations
Plot user’s plant location
Draw route lines between user and suppliers
On hover: show distance & transport CO₂
Deliverable:
Interactive map showcasing supply routes and distances.
🤖 PHASE 5 — AI Explanation (Optional, ≈ 1 hour)
Goal: Automatically explain why the top supplier was recommended.
Tasks:
Feed optimization result into an LLM
Generate a short explanation such as:
“Steel Dynamics is optimal because it produces 35% less CO₂, has a stable cost trend, and is located closer to your plant.”
Deliverable:
AI-generated insight displayed on the results page.
🎨 PHASE 6 — Polish & Pitch (≈ 1–2 hours)
Goal: Refine UI/UX and prepare a strong final presentation.
Tasks:
Add project logo and team name
Create a simple “How it Works” page
Add Tailwind styling polish
Write demo script:
Problem → Solution → Demo → Impact → Future Work
Deliverable:
A polished, confident, hackathon-ready demo.
🧩 Recommended Team Breakdown
Backend Engineer
CSV parsing, analytics, scoring model, API
Frontend Engineer
UI, forms, tables, API integration
Visualization Engineer
Map, charts, results UI
Generalist / AI / Pitch Lead
Metadata research, AI explanation, presentation
If you want, I can also generate:
📁 Recommended repo structure
📜 API spec (JSON in/out)
🧮 Python functions for all scoring formulas
🎨 Wireframe mockups of the UI
🪄 A polished README template for the whole repo
Just tell me!
