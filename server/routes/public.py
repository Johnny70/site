# ============================================================
# MODULE: server/routes/public
# RESPONSIBILITY: Public GET endpoints for all site content
# DEPENDS ON: server/storage, server/models
# EXPOSES: router
# ============================================================

import logging
from fastapi import APIRouter, HTTPException
from server.storage import read_json
from server.models import Project, NowContent, LabEntry, HomeContent, ContactContent, AboutContent

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/api/projects")
def get_projects() -> list[Project]:
    return read_json("projects.json")


@router.get("/api/projects/{slug}")
def get_project(slug: str) -> Project:
    projects: list[dict] = read_json("projects.json")
    project = next((p for p in projects if p["slug"] == slug), None)
    if project is None:
        logger.warning("Project not found: %s", slug)
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/api/now")
def get_now() -> NowContent:
    return read_json("now.json")


@router.get("/api/lab")
def get_lab() -> list[LabEntry]:
    return read_json("lab.json")


@router.get("/api/home")
def get_home() -> HomeContent:
    return read_json("home.json")


@router.get("/api/contact")
def get_contact() -> ContactContent:
    return read_json("contact.json")


@router.get("/api/about")
def get_about() -> AboutContent:
    return read_json("about.json")
