import os
import asyncio
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Dict, List
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import httpx  # Async HTTP client

# ===== Load Environment Variables =====
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("Missing GROQ_API_KEY in environment variables")

# ===== Configuration =====
COLS = ["q1", "q2", "q3", "q4", "q5"]
HABIT_NAMES = ["Sleep Schedule", "Cleanliness", "Social Habits", "Work/Study", "Personal Space"]
USERS_CSV = "users.csv"
GROQ_TIMEOUT = 10.0  # Timeout in seconds

# ===== Lifespan Manager =====
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load user data
    try:
        df = pd.read_csv(USERS_CSV)
        if not set(["user_id", *COLS]).issubset(df.columns):
            raise ValueError("CSV missing required columns")
        app.state.users_df = df[["user_id", *COLS]].copy()
        app.state.X = app.state.users_df[COLS].to_numpy(dtype=float)
        print("✅ User data loaded successfully")
    except Exception as e:
        app.state.users_df = None
        print(f"❌ Failed to load user data: {e}")

    # Initialize Groq client
    app.state.groq_client = httpx.AsyncClient(
        base_url="https://api.groq.com/openai/v1",
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        timeout=GROQ_TIMEOUT
    )
    print("✅ Groq client initialized")

    yield

    # Cleanup
    app.state.users_df = None
    app.state.X = None
    await app.state.groq_client.aclose()
    print("♻️ Resources cleaned up")

app = FastAPI(lifespan=lifespan)

# ===== Data Models =====
class CompatibilityRequest(BaseModel):
    answers: List[float] = Field(..., min_items=5, max_items=5)
    weights: List[float] = Field(default=[5, 3, 4, 2, 1], min_items=5, max_items=5)
    k: int = Field(default=3, gt=0, le=20)

class MatchResult(BaseModel):
    user_id: int
    overall_compatibility: float
    habit_compatibilities: List[float]
    match_reason: str

class CompatibilityResponse(BaseModel):
    matches: Dict[str, MatchResult]

# ===== Helper Functions =====
def weighted_euclidean(a: np.ndarray, b: np.ndarray, w: np.ndarray) -> float:
    d2 = np.sum(w * (a - b) ** 2)
    return float(np.sqrt(d2))

def compat_from_distance(d: float, w: np.ndarray) -> float:
    dmax = 9.0 * np.sqrt(np.sum(w))
    return 100.0 * (1.0 - d / dmax) if dmax > 0 else 0.0

def per_habit_similarity(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    diffs = np.abs(a - b)
    return (1.0 - diffs / 9.0) * 100.0

async def generate_match_reason(
    new_user_answers: List[float],
    match_user_answers: List[float],
    groq_client: httpx.AsyncClient
) -> str:
    comparisons = "\n".join(
        f"- {HABIT_NAMES[i]}: You {new_user_answers[i]} vs Them {match_user_answers[i]}"
        for i in range(5)
    )

    prompt = f"""
    Create a 2-sentence compatibility summary for potential roommates based on these scores:
    {comparisons}
    
    Focus on:
    - Top matching habits
    - Complementary differences
    - Overall living compatibility
    Use friendly, casual language.
    """

    try:
        response = await groq_client.post(
            "/chat/completions",
            json={
                "model": "llama3-70b-8192",
                "messages": [
                    {"role": "system", "content": "Generate concise roommate compatibility summaries"},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 100
            }
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"Groq API error: {str(e)}")
        return "Match reason unavailable"

# ===== API Endpoint =====
@app.post("/compatibility", response_model=CompatibilityResponse)
async def get_compatibility(
    request: CompatibilityRequest,
    app_request: Request
):
    if not hasattr(app_request.app.state, 'users_df') or app_request.app.state.users_df is None:
        raise HTTPException(500, "User data not loaded")

    users_df = app_request.app.state.users_df
    X = app_request.app.state.X
    groq_client = app_request.app.state.groq_client

    new_user = np.array(request.answers)
    weights = np.array(request.weights)

    dists = [weighted_euclidean(new_user, row, weights) for row in X]
    overall_compats = [compat_from_distance(d, weights) for d in dists]
    habit_compats = [per_habit_similarity(new_user, row) for row in X]

    all_matches = []
    for i in range(len(users_df)):
        all_matches.append({
            "user_id": int(users_df.iloc[i]["user_id"]),
            "overall": overall_compats[i],
            "habits": habit_compats[i].tolist(),
            "match_answers": users_df.iloc[i][COLS].tolist()
        })

    all_matches.sort(key=lambda x: x["overall"], reverse=True)
    top_matches = all_matches[:request.k]

    reason_tasks = []
    for match in top_matches:
        reason_tasks.append(
            generate_match_reason(
                request.answers,
                match["match_answers"],
                groq_client
            )
        )

    reasons = await asyncio.gather(*reason_tasks)

    response = {}
    for i, match in enumerate(top_matches):
        key = f"user_{match['user_id']}"
        response[key] = MatchResult(
            user_id=match["user_id"],
            overall_compatibility=round(match["overall"], 2),
            habit_compatibilities=[round(p, 2) for p in match["habits"]],
            match_reason=reasons[i]
        )

    return CompatibilityResponse(matches=response)
