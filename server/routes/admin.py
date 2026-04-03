# ============================================================
# MODULE: server/routes/admin
# RESPONSIBILITY: Protected admin CRUD endpoints for all site content
# DEPENDS ON: server/storage, server/models, server/auth
# EXPOSES: router
# ============================================================

import logging
from fastapi import APIRouter, HTTPException, Depends
from storage import read_json, write_json
from models import Project, NowContent, LabEntry, HomeContent, ContactContent, AboutContent
from auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(dependencies=[Depends(verify_token)])


@router.get("/api/admin/ping")
def admin_ping() -> dict[str, str]:
    return {"status": "ok"}


# --- Projects ---

@router.get("/api/admin/projects")
def admin_get_projects() -> list[Project]:
    return read_json("projects.json")


@router.post("/api/admin/projects", status_code=201)
def admin_create_project(project: Project) -> Project:
    projects: list[dict] = read_json("projects.json")
    exists = any(p["slug"] == project.slug for p in projects)
    if exists:
        raise HTTPException(status_code=409, detail="Project with this slug already exists")
    projects.append(project.model_dump())
    write_json("projects.json", projects)
    logger.info("Created project: %s", project.slug)
    return project


@router.put("/api/admin/projects/{slug}")
def admin_update_project(slug: str, project: Project) -> Project:
    projects: list[dict] = read_json("projects.json")
    index = next((i for i, p in enumerate(projects) if p["slug"] == slug), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    projects[index] = project.model_dump()
    write_json("projects.json", projects)
    logger.info("Updated project: %s", slug)
    return project


@router.delete("/api/admin/projects/{slug}", status_code=204)
def admin_delete_project(slug: str) -> None:
    projects: list[dict] = read_json("projects.json")
    filtered = [p for p in projects if p["slug"] != slug]
    if len(filtered) == len(projects):
        raise HTTPException(status_code=404, detail="Project not found")
    write_json("projects.json", filtered)
    logger.info("Deleted project: %s", slug)


# --- Now ---

@router.put("/api/admin/now")
def admin_update_now(content: NowContent) -> NowContent:
    write_json("now.json", content.model_dump())
    logger.info("Updated now content")
    return content


# --- Lab ---

@router.put("/api/admin/lab")
def admin_update_lab(entries: list[LabEntry]) -> list[LabEntry]:
    write_json("lab.json", [e.model_dump() for e in entries])
    logger.info("Updated lab: %d entries", len(entries))
    return entries


# --- Home ---

@router.put("/api/admin/home")
def admin_update_home(content: HomeContent) -> HomeContent:
    write_json("home.json", content.model_dump())
    logger.info("Updated home content")
    return content


# --- Contact ---

@router.put("/api/admin/contact")
def admin_update_contact(content: ContactContent) -> ContactContent:
    write_json("contact.json", content.model_dump())
    logger.info("Updated contact content")
    return content


# --- About ---

@router.put("/api/admin/about")
def admin_update_about(content: AboutContent) -> AboutContent:
    write_json("about.json", content.model_dump())
    logger.info("Updated about content")
    return content
