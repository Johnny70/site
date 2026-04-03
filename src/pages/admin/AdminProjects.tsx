// ============================================================
// MODULE: admin/AdminProjects
// RESPONSIBILITY: Lists all projects with links to edit, a create button, and manual reorder
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: AdminProjects
// ============================================================

import { type JSX, type ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../api/client'
import type { Project } from '../../api/types'

type ProjectWithOrder = Project & { order: number }

function AdminProjects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectWithOrder[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveStatus, setSaveStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)

  useEffect(() => {
    apiFetch<Project[]>('/api/admin/projects', { auth: true })
      .then((data) => {
        setProjects(data.map((p, i) => ({ ...p, order: i + 1 })))
        setLoading(false)
      })
      .catch((err: Error) => {
        console.error('AdminProjects: load failed', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function handleOrderChange(slug: string, value: string): void {
    const parsed = parseInt(value, 10)
    const order = isNaN(parsed) ? 0 : parsed
    setProjects((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, order } : p))
    )
  }

  async function handleSaveOrder(): Promise<void> {
    setSaveStatus(null)
    setSaving(true)

    const sorted = [...projects].sort((a, b) => a.order - b.order)
    const slugs = sorted.map((p) => p.slug)

    try {
      await apiFetch<Project[]>('/api/admin/projects-order', { method: 'PUT', body: slugs, auth: true })
      setProjects(sorted.map((p, i) => ({ ...p, order: i + 1 })))
      setSaveStatus({ type: 'ok', msg: 'Order saved' })
    } catch (err: unknown) {
      console.error('AdminProjects: reorder save failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setSaveStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="meta">Loading...</p>
  }

  if (error !== null) {
    return <div className="status-msg status-msg--err">{error}</div>
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>Work</h1>
        <Link to="/admin/projects/new" className="btn btn--primary">+ New project</Link>
      </div>

      {saveStatus !== null && (
        <div className={`status-msg status-msg--${saveStatus.type}`} style={{ marginBottom: '16px' }}>
          {saveStatus.msg}
        </div>
      )}

      <ul className="admin-list">
        {projects.map((project) => (
          <li key={project.slug} className="admin-list-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="number"
                className="input"
                style={{ width: '56px', textAlign: 'center' }}
                value={project.order}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOrderChange(project.slug, e.target.value)}
                min={1}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500 }}>{project.title}</div>
                <div className="admin-list-item__meta">{project.slug} · {project.status}</div>
              </div>
            </div>
            <Link to={`/admin/projects/${project.slug}`} className="btn btn--ghost">
              Edit →
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '24px' }}>
        <button className="btn btn--primary" onClick={handleSaveOrder} disabled={saving}>
          {saving ? 'Saving...' : 'Save order'}
        </button>
      </div>
    </div>
  )
}

export default AdminProjects
