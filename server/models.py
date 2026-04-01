# ============================================================
# MODULE: server/models
# RESPONSIBILITY: Pydantic models for all content types
# DEPENDS ON: pydantic
# EXPOSES: Project, SystemDesign, NowContent, LabEntry, HomeContent
# ============================================================

from pydantic import BaseModel


class SystemDesign(BaseModel):
    input: str
    processing: str
    output: str
    constraints: str


class Project(BaseModel):
    slug: str
    title: str
    shortDescription: str
    type: str
    status: str
    scope: str
    context: str
    problem: str
    approach: str
    systemDesign: SystemDesign
    tech: str
    result: str
    notes: str
    designPrinciple: str


class NowContent(BaseModel):
    focus: str
    direction: str
    availability: str


class LabEntry(BaseModel):
    experiment: str
    result: str


class HomeContent(BaseModel):
    tagline: str
    description1: str
    description2: str
    nowBuilding: str
    nowExploring: str
    nowAvailability: str
    approachIntro: str
    approachPoints: list[str]
    approachSuffix: str


class ContactContent(BaseModel):
    email: str
    github: str
    linkedin: str


class AboutContent(BaseModel):
    paragraphs: list[str]
