// ============================================================
// MODULE: api/types
// RESPONSIBILITY: TypeScript types for all API content models
// DEPENDS ON: nothing
// EXPOSES: Project, SystemDesign, NowContent, LabEntry, HomeContent
// ============================================================

export type SystemDesign = {
  input: string
  processing: string
  output: string
  constraints: string
}

export type Project = {
  slug: string
  title: string
  shortDescription: string
  type: string
  status: string
  scope: string
  context: string
  problem: string
  approach: string
  systemDesign: SystemDesign
  tech: string
  result: string
  notes: string
  designPrinciple: string
  githubUrl?: string
}

export type NowContent = {
  focus: string
  direction: string
  availability: string
}

export type LabEntry = {
  experiment: string
  result: string
}

export type ContactContent = {
  email: string
  github: string
  linkedin: string
}

export type AboutContent = {
  paragraphs: string[]
}

export type HomeContent = {
  tagline: string
  description1: string
  description2: string
  nowBuilding: string
  nowExploring: string
  nowAvailability: string
  approachIntro: string
  approachPoints: string[]
  approachSuffix: string
}
