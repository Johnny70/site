# ============================================================
# MODULE: server/storage
# RESPONSIBILITY: Reads and writes JSON data files from server/data/
# DEPENDS ON: nothing
# EXPOSES: read_json, write_json
# ============================================================

import json
import logging
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).parent / "data"


def read_json(filename: str) -> Any:
    path = DATA_DIR / filename
    if not path.exists():
        logger.error("Data file not found: %s", path)
        raise FileNotFoundError(f"Data file not found: {filename}")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    logger.info("Read data file: %s", filename)
    return data


def write_json(filename: str, data: Any) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    path = DATA_DIR / filename
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    logger.info("Wrote data file: %s", filename)
