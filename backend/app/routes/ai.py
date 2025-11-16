from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import os
import json

from dotenv import load_dotenv
from google import genai
from google.genai import types  # <- for GenerateContentConfig, etc.

# Load .env file FIRST
load_dotenv()

router = APIRouter()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY not found in environment!")
    client = None
else:
    # New SDK pattern: create a Client
    client = genai.Client(api_key=api_key)


class AISummaryRequest(BaseModel):
    mill_name: str
    scores: Dict[str, float]
    metadata: Dict[str, Any]


@router.post("/ai/summary")
async def generate_ai_summary(payload: AISummaryRequest):
    if client is None:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")

    # Sanitize metadata to prevent prompt injection
    safe_metadata = json.dumps(payload.metadata, indent=2)[:1000]

    prompt = f"""
The system has recommended this steel mill:

Company: {payload.mill_name}
Scores (0–1, higher is better):
- Cost: {payload.scores.get('cost', 'N/A')}
- CO2: {payload.scores.get('co2', 'N/A')}
- Risk: {payload.scores.get('risk', 'N/A')}
- Logistics: {payload.scores.get('logistics', 'N/A')}

Context (internal notes, may be messy):
{safe_metadata}

Return a SINGLE JSON object with this exact shape:

{{
  "summary": "2–3 short paragraphs of persuasive but neutral product copy, under 140 words, no greetings, no direct address, no markdown.",
  "sections": {{
    "location": {{
        "title": "short headline (max 3–4 words) about the mill's geographic or logistics strength",
        "description": "one short sentence (max 12 words)."
    }},
    "scale": {{
        "title": "short headline (max 3–4 words) about production scale or consistency",
        "description": "one short sentence (max 12 words)."
    }},
    "future": {{
        "title": "short headline (max 3–4 words) about modernization or decarbonization",
        "description": "one short sentence (max 12 words)."
    }}
  }},
  "tags": [
    "short tag 1",
    "short tag 2",
    "short tag 3"
  ]
}}

RULES:
- JSON ONLY. No markdown, no bullet symbols, no extra text.
- Do not include the raw numeric scores, only interpretations.
- No greetings. No second-person language (“you”, “your”).
- Keep everything concise and product-website style.
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=800,
                thinking_config=types.ThinkingConfig(thinking_budget=0),
            ),
        )

        raw = (getattr(response, "text", "") or "").strip()
        # Optional: print for debugging
        # print("RAW MODEL TEXT:", raw)

        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Gemini returned invalid JSON: {str(e)}",
            )

        # basic sanity defaults so frontend doesn't explode
        data.setdefault("summary", "")
        data.setdefault("sections", {})
        data.setdefault("tags", [])

        return data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")
