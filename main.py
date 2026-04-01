# ============================================================
# MODULE: main
# RESPONSIBILITY: Entry point — loads env and starts the Python API server
# DEPENDS ON: server/app.py
# EXPOSES: nothing (executable)
# ============================================================

import logging
from dotenv import load_dotenv
import uvicorn

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)

logging.getLogger('watchfiles').setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

HOST = "0.0.0.0"
PORT = 8000

if __name__ == "__main__":
    logger.info("Starting server on %s:%d", HOST, PORT)
    uvicorn.run("server.app:app", host=HOST, port=PORT, reload=True, reload_dirs=["server"])
