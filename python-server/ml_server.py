from fastapi import FastAPI, HTTPException
import pandas as pd
import numpy as np
from pathlib import Path
from typing import List, Dict

app = FastAPI()

# Configuration (matches your notebook)
COLS = ["q1", "q2", "q3", "q4", "q5"]
HABIT_NAMES = ["Habit 1", "Habit 2", "Habit 3", "Habit 4", "Habit 5"]
USERS_CSV = "users.csv"

# Load user data at startup
try:
    users_df = pd.read_csv(USERS_CSV)
    if not set(["user_id"] + COLS).issubset(users_df.columns):
        raise ValueError("CSV missing required columns")
    users_df = users_df[["user_id"] + COLS].copy()
except Exception as e:
    raise RuntimeError(f"Failed to load user data: {str(e)}")

# Utility functions (from notebook)
def weighted_euclidean(a: np.ndarray, b: np.ndarray, w: np.ndarray) -> float:
    d2 = np.sum(w * (a - b) ** 2)
    return float(np.sqrt(d2))

def compat_from_distance(d: float, w: np.ndarray) -> float:
    dmax = 9.0 * np.sqrt(np.sum(w))
    if dmax == 0:
        return 0.0
    c = 100.0 * (1.0 - d / dmax)
    return float(np.clip(c, 0.0, 100.0))

def per_habit_similarity(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    diffs = np.abs(a - b)
    return (1.0 - diffs / 9.0) * 100.0

# API Endpoint
@app.post("/compatibility")
async def calculate_compatibility(
    answers: List[int],
    weights: List[float],
    top_k: int = 10
) -> Dict[str, List[Dict]]:
    # Validate inputs
    if len(answers) != 5 or len(weights) != 5:
        raise HTTPException(
            status_code=400,
            detail="Input arrays must have exactly 5 elements"
        )
    
    if not all(1 <= a <= 10 for a in answers):
        raise HTTPException(
            status_code=400,
            detail="Answers must be between 1 and 10"
        )
    
    if not all(w > 0 for w in weights):
        raise HTTPException(
            status_code=400,
            detail="Weights must be positive numbers"
        )

    # Convert to numpy arrays
    new_user = np.array(answers, dtype=float)
    weights_arr = np.array(weights, dtype=float)
    
    # Prepare user data
    X = users_df[COLS].to_numpy(dtype=float)
    user_ids = users_df["user_id"].tolist()
    
    # Calculate compatibility
    results = []
    for i, row in enumerate(X):
        dist = weighted_euclidean(new_user, row, weights_arr)
        compat = compat_from_distance(dist, weights_arr)
        habits_sim = per_habit_similarity(new_user, row)
        
        results.append({
            "user_id": user_ids[i],
            "compatibility_percentage": round(compat, 2),
            "habits_similarity": {
                name: round(habits_sim[j], 2)
                for j, name in enumerate(HABIT_NAMES)
            }
        })
    
    # Sort and select top K
    sorted_results = sorted(
        results,
        key=lambda x: x["compatibility_percentage"],
        reverse=True
    )[:top_k]
    
    return {"top_matches": sorted_results}