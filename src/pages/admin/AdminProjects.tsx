// ============================================================
// MODULE: admin/AdminProjects
// RESPONSIBILITY: Lists all projects with links to edit and a create button
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: AdminProjects
// ============================================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../api/client'
import type { Project } from '../../api/types'

function AdminProjects(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    apiFetch<Project[]>('/api/admin/projects', { auth: true })
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="meta">Laddar...</p>
  }

  if (error !== null) {
    return <div className="status-msg status-msg--err">{error}</div>
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Projekt</h1>
        <Link to="/admin/projects/new" className="btn btn--primary">+ Nytt projekt</Link>
      </div>

      <ul className="admin-list">
        {projects.map((project) => (
          <li key={project.slug} className="admin-list-item">
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{project.title}</div>
              <div className="admin-list-item__meta">{project.slug} · {project.status}</div>
            </div>
            <Link to={`/admin/projects/${project.slug}`} className="btn btn--ghost">
              Redigera →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminProjects
