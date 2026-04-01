// ============================================================
// MODULE: Work
// RESPONSIBILITY: Renders the project list page (/work) with data from API
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: Work
// ============================================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/client'
import type { Project } from '../api/types'

function Work(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { document.title = 'Projekt – Johnny Jakobsson' }, [])

  useEffect(() => {
    apiFetch<Project[]>('/api/projects')
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Projekt</h1>
      <ul className="proj-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/work/${project.slug}`} className="proj-item">
              <div>
                <div className="proj-item__title">{project.title}</div>
                <div className="proj-item__desc">{project.shortDescription}</div>
              </div>
              <span className="proj-item__arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Work
