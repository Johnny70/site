# ============================================================
# MODULE: server/app
# RESPONSIBILITY: FastAPI application instance with all routes registered
# DEPENDS ON: server/routes/public, server/routes/admin
# EXPOSES: app
# ============================================================

import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.public import router as public_router
from routes.admin import router as admin_router

logger = logging.getLogger(__name__)

CORS_ORIGIN: str = os.environ.get("CORS_ORIGIN", "http://localhost:5173")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(public_router)
app.include_router(admin_router)


@app.get("/api/health")
def health() -> dict[str, str]:
    logger.info("Health check called")
    return {"status": "ok"}
