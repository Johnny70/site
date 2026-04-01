# ============================================================
# MODULE: server/auth
# RESPONSIBILITY: Verifies the admin Bearer token from the Authorization header
# DEPENDS ON: fastapi, os
# EXPOSES: verify_token
# ============================================================

import os
import logging
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

logger = logging.getLogger(__name__)

_security = HTTPBearer()


def verify_token(
    credentials: HTTPAuthorizationCredentials = Security(_security),
) -> str:
    admin_token = os.environ.get("ADMIN_TOKEN")
    if not admin_token:
        logger.error("ADMIN_TOKEN is not set in environment")
        raise HTTPException(status_code=500, detail="Server misconfigured: ADMIN_TOKEN not set")
    if credentials.credentials != admin_token:
        logger.warning("Invalid admin token attempt")
        raise HTTPException(status_code=401, detail="Invalid token")
    return credentials.credentials
