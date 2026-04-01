// ============================================================
// MODULE: WorkDetail
// RESPONSIBILITY: Renders a single project detail page (/work/:slug) with data from API
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: WorkDetail
// ============================================================

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../api/client'
import type { Project } from '../api/types'

function WorkDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug === undefined) {
      setError('Inget slug angivet')
      return
    }
    apiFetch<Project>(`/api/projects/${slug}`)
      .then((p) => { setProject(p); document.title = `${p.title} – Johnny Jakobsson` })
      .catch((err: Error) => setError(err.message))
  }, [slug])

  if (error !== null) {
    return (
      <div className="page">
        <Link to="/work" className="back">← Projekt</Link>
        <p>Projektet hittades inte.</p>
      </div>
    )
  }

  if (project === null) {
    return <div className="page"><p className="meta">Laddar...</p></div>
  }

  return (
    <div className="page">
      <Link to="/work" className="back">← Projekt</Link>

      <h1 style={{ marginBottom: '12px' }}>{project.title}</h1>
      <div className="meta">
        <div>Type: {project.type}</div>
        <div>Status: {project.status}</div>
        <div>Scope: {project.scope}</div>
      </div>

      <div className="section">
        <div className="section__label">Kontext</div>
        <p>{project.context}</p>
      </div>

      <div className="section">
        <div className="section__label">Problem</div>
        <p>{project.problem}</p>
      </div>

      <div className="section">
        <div className="section__label">Angreppssätt</div>
        <p>{project.approach}</p>
      </div>

      <div className="section">
        <div className="section__label">Systemdesign</div>
        <div className="sys-block">
          <div><span className="sys-block__key">Input: </span><span className="sys-block__val">{project.systemDesign.input}</span></div>
          <div><span className="sys-block__key">Processing: </span><span className="sys-block__val">{project.systemDesign.processing}</span></div>
          <div><span className="sys-block__key">Output: </span><span className="sys-block__val">{project.systemDesign.output}</span></div>
          <div><span className="sys-block__key">Constraints: </span><span className="sys-block__val">{project.systemDesign.constraints}</span></div>
        </div>
      </div>

      <div className="section">
        <div className="section__label">Teknik</div>
        <p>{project.tech}</p>
      </div>

      <div className="section">
        <div className="section__label">Resultat</div>
        <p>{project.result}</p>
      </div>

      <div className="section">
        <div className="section__label">Noteringar</div>
        <p>{project.notes}</p>
      </div>

      <div className="section" style={{ marginTop: '48px' }}>
        <div className="section__label">Design Principle</div>
        <p>{project.designPrinciple}</p>
      </div>
    </div>
  )
}

export default WorkDetail
