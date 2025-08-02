from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np

app = FastAPI()

COLS = ["q1", "q2", "q3", "q4", "q5"]
USERS_CSV = "user_data.csv"

class MatchRequest(BaseModel):
    answers: List[float]
    weights: List[float]

def load_users(csv_path: str) -> pd.DataFrame:
    try:
        df = pd.read_csv(csv_path)
        if set(["user_id", *COLS]).issubset(df.columns):
            return df[["user_id", *COLS]].copy()
        raise ValueError("CSV missing required columns")
    except Exception as e:
        raise RuntimeError(f"Failed to read {csv_path}: {e}")

def weighted_euclidean(a: np.ndarray, b: np.ndarray, w: np.ndarray) -> float:
    return np.sqrt(np.sum(w * (a - b) ** 2))

@app.post("/match")
def match_users(req: MatchRequest):
    if len(req.answers) != 5 or len(req.weights) != 5:
        raise HTTPException(status_code=400, detail="answers and weights must be length 5")

    if any(w <= 0 for w in req.weights):
        raise HTTPException(status_code=400, detail="weights must be positive numbers")

    new_user = np.array(req.answers, dtype=float)
    weights = np.array(req.weights, dtype=float)

    users_df = load_users(USERS_CSV)

    users_df["distance"] = users_df[COLS].apply(
        lambda row: weighted_euclidean(new_user, row.values.astype(float), weights), axis=1
    )

    ranked_users = users_df.sort_values("distance").head(5).to_dict(orient="records")
    return {"top_matches": ranked_users}
