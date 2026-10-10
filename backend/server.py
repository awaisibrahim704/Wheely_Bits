"""
server.py — Wheely Bits AI Rim Scan API
========================================
FastAPI backend that wraps the FAISS rim-matching model and exposes it
as a REST endpoint the React frontend can call.

Start with:
    python ai_rim_scan/server.py

Endpoints:
    POST /scan              — upload a rim photo, get top-3 matches as JSON
    GET  /images/{path}     — serve dataset display images to the browser
    GET  /health            — simple liveness check
"""

import os
import io
import sys
import json
import uvicorn
import numpy as np
import faiss

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image

# ── Bootstrap path so we can import from app_efficientnet.py ──────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)
from app_efficientnet import FeatureExtractor, INDEX_PATH, METADATA_PATH, DATASET_DIR

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(title="Wheely Bits — AI Rim Scan API", version="1.0.0")

# Allow requests from the Vite dev server and any local port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000",
                   "http://127.0.0.1:5173", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pre-load model + index once at startup ────────────────────────────────────
print("Loading AI model and FAISS index...")

if not os.path.exists(INDEX_PATH) or not os.path.exists(METADATA_PATH):
    print("ERROR: FAISS index not found. Run:  python ai_rim_scan/app_efficientnet.py --rebuild")
    sys.exit(1)

extractor = FeatureExtractor()
index     = faiss.read_index(INDEX_PATH)
with open(METADATA_PATH) as f:
    metadata = json.load(f)

print(f"Ready — {len(metadata)} rim images indexed.\n")


# ── Paths ─────────────────────────────────────────────────────────────────────
DISPLAY_DIR = os.path.join(BASE_DIR, "display_images")

# ── Helper: extract embedding from an in-memory PIL image ────────────────────
def embed_pil(pil_img: Image.Image):
    """Run the preprocessing pipeline and return a normalised embedding."""
    import torch
    tensor = extractor.transform(pil_img).unsqueeze(0).to(
        next(extractor.model.parameters()).device
    )
    with torch.no_grad():
        vec = torch.squeeze(extractor.model(tensor)).cpu().numpy()
    norm = np.linalg.norm(vec)
    return vec / norm if norm > 0 else vec


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "indexed": len(metadata)}


@app.post("/scan")
async def scan(file: UploadFile = File(...)):
    """
    Accept a rim photo upload, return top-3 matching rim models.

    Response:
    {
      "matches": [
        { "rank": 1, "label": "Volk Te37", "score": 0.942,
          "cosine_similarity": 0.942, "image_url": "/images/volk te37.jpg" },
        ...
      ]
    }
    """
    # Validate content type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    # Read and decode upload
    raw = await file.read()
    try:
        pil_img = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not decode image.")

    # Extract embedding
    try:
        query_emb = embed_pil(pil_img)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Feature extraction failed: {e}")

    # Search FAISS index
    top_k   = 3
    search_k = len(metadata)
    distances, indices = index.search(
        np.array([query_emb]).astype("float32"), search_k
    )

    results, seen = [], set()
    for score, idx in zip(distances[0], indices[0]):
        if idx < 0 or idx >= len(metadata):
            continue
        item  = metadata[idx]
        label = item["label"]
        if label in seen:
            continue
        seen.add(label)

        # Check if dedicated display image exists in display_images/
        clean_label = label.lower().strip()
        display_fname = None
        if os.path.exists(DISPLAY_DIR):
            for ext in [".jpg", ".png", ".webp", ".jpeg"]:
                c1 = f"{clean_label}{ext}"
                c2 = f"{clean_label.replace(' ', '_')}{ext}"
                if os.path.isfile(os.path.join(DISPLAY_DIR, c1)):
                    display_fname = c1
                    break
                elif os.path.isfile(os.path.join(DISPLAY_DIR, c2)):
                    display_fname = c2
                    break

        if display_fname:
            image_url = f"/images/{display_fname}"
        else:
            disp_rel  = item.get("display_image") or item["training_image"]
            image_url = f"/images/{disp_rel.replace(os.sep, '/')}"

        cos_sim = round(max(0.0, min(1.0, float(score))), 3)

        results.append({
            "rank":              len(results) + 1,
            "label":             label,
            "score":             cos_sim,
            "cosine_similarity": cos_sim,
            "image_url":         image_url,
        })
        if len(results) >= top_k:
            break

    return JSONResponse({"matches": results})


@app.get("/images/{img_path:path}")
def serve_image(img_path: str):
    """Serve a display image from display_images/ or fallback to dataset/."""
    safe_parts = [os.path.basename(p) for p in img_path.replace("\\", "/").split("/") if p]
    safe_rel   = os.path.join(*safe_parts) if safe_parts else ""

    # 1. Search display_images directory
    if os.path.exists(DISPLAY_DIR):
        p_disp = os.path.join(DISPLAY_DIR, safe_rel)
        if os.path.isfile(p_disp):
            return FileResponse(p_disp)
        if len(safe_parts) == 1:
            p_flat = os.path.join(DISPLAY_DIR, safe_parts[0])
            if os.path.isfile(p_flat):
                return FileResponse(p_flat)

    # 2. Fallback to dataset directory
    if os.path.exists(DATASET_DIR):
        p_data = os.path.join(DATASET_DIR, safe_rel)
        if os.path.isfile(p_data):
            return FileResponse(p_data)

    raise HTTPException(status_code=404, detail=f"Image '{img_path}' not found.")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Starting Wheely Bits AI Rim Scan server...")
    print("  API:    http://localhost:8000")
    print("  Docs:   http://localhost:8000/docs")
    print("  Health: http://localhost:8000/health\n")
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=False)
