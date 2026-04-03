// ============================================================
// MODULE: WorkDetail
// RESPONSIBILITY: Renders a single project detail page (/work/:slug) with data from API
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: WorkDetail
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../api/client'
import type { Project } from '../api/types'
import Seo from '../components/Seo'

function WorkDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug === undefined) {
      setError('No slug provided')
      return
    }
    apiFetch<Project>(`/api/projects/${slug}`)
      .then((p) => { setProject(p) })
      .catch((err: Error) => setError(err.message))
  }, [slug])

  if (error !== null) {
    return (
      <div className="page">
        <Link to="/work" className="back">← Work</Link>
        <p>Project not found.</p>
      </div>
    )
  }

  if (project === null) {
    return <div className="page"><p className="meta">Loading...</p></div>
  }

  return (
    <div className="page">
      <Seo
        title={project.title}
        description={project.shortDescription}
        path={`/work/${project.slug}`}
      />
      <Link to="/work" className="back">← Work</Link>

      <h1 style={{ marginBottom: '12px' }}>{project.title}</h1>
      <div className="meta">
        <div>Type: {project.type}</div>
        <div>Status: {project.status}</div>
        <div>Scope: {project.scope}</div>
      </div>

      <div className="section">
        <h2 className="section__label">Context</h2>
        <p>{project.context}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Problem</h2>
        <p>{project.problem}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Approach</h2>
        <p>{project.approach}</p>
      </div>

      <div className="section">
        <h2 className="section__label">System Design</h2>
        <div className="sys-block">
          <div><span className="sys-block__key">Input: </span><span className="sys-block__val">{project.systemDesign.input}</span></div>
          <div><span className="sys-block__key">Processing: </span><span className="sys-block__val">{project.systemDesign.processing}</span></div>
          <div><span className="sys-block__key">Output: </span><span className="sys-block__val">{project.systemDesign.output}</span></div>
          <div><span className="sys-block__key">Constraints: </span><span className="sys-block__val">{project.systemDesign.constraints}</span></div>
        </div>
      </div>

      <div className="section">
        <h2 className="section__label">Tech</h2>
        <p>{project.tech}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Result</h2>
        <p>{project.result}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Notes</h2>
        <p>{project.notes}</p>
      </div>

      <div className="section" style={{ marginTop: '48px' }}>
        <h2 className="section__label">Design Principle</h2>
        <p>{project.designPrinciple}</p>
      </div>

      {project.githubUrl !== undefined && project.githubUrl !== '' && (
        <div className="section">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            View on GitHub →
          </a>
        </div>
      )}
    </div>
  )
}

export default WorkDetail
