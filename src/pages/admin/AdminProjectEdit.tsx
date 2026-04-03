// ============================================================
// MODULE: admin/AdminProjectEdit
// RESPONSIBILITY: Form for creating a new project or editing an existing one
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: AdminProjectEdit
// ============================================================

import { type JSX, type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../../api/client'
import type { Project } from '../../api/types'

const EMPTY_PROJECT: Project = {
  slug: '',
  title: '',
  shortDescription: '',
  type: '',
  status: '',
  scope: '',
  context: '',
  problem: '',
  approach: '',
  systemDesign: { input: '', processing: '', output: '', constraints: '' },
  tech: '',
  result: '',
  notes: '',
  designPrinciple: '',
}

function AdminProjectEdit(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const isNew = slug === undefined
  const navigate = useNavigate()

  const [form, setForm] = useState<Project>(EMPTY_PROJECT)
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(!isNew)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    if (isNew) return
    apiFetch<Project>(`/api/projects/${slug}`)
      .then((data) => {
        setForm(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        console.error('AdminProjectEdit: load failed', err)
        setStatus({ type: 'err', msg: err.message })
        setLoading(false)
      })
  }, [slug, isNew])

  function handleField(field: keyof Omit<Project, 'systemDesign'>, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSystemDesign(field: keyof Project['systemDesign'], value: string): void {
    setForm((prev) => ({ ...prev, systemDesign: { ...prev.systemDesign, [field]: value } }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus(null)
    setSaving(true)

    try {
      if (isNew) {
        await apiFetch<Project>('/api/admin/projects', { method: 'POST', body: form, auth: true })
      } else {
        await apiFetch<Project>(`/api/admin/projects/${slug}`, { method: 'PUT', body: form, auth: true })
      }
      setStatus({ type: 'ok', msg: isNew ? 'Project created' : 'Saved' })
      if (isNew) navigate(`/admin/projects/${form.slug}`)
    } catch (err: unknown) {
      console.error('AdminProjectEdit: save failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(): Promise<void> {
    if (!window.confirm(`Delete "${form.title}"?`)) return
    try {
      await apiFetch<void>(`/api/admin/projects/${slug}`, { method: 'DELETE', auth: true })
      navigate('/admin/projects')
    } catch (err: unknown) {
      console.error('AdminProjectEdit: delete failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus({ type: 'err', msg })
    }
  }

  if (loading) return <p className="meta">Loading...</p>

  return (
    <div className="page">
      <Link to="/admin/projects" className="back">← Projects</Link>
      <h1 style={{ marginBottom: '48px' }}>{isNew ? 'New project' : form.title}</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {(
          [
            ['slug', 'Slug'],
            ['title', 'Title'],
            ['shortDescription', 'Short description'],
            ['type', 'Type'],
            ['status', 'Status'],
            ['scope', 'Scope'],
          ] as [keyof Omit<Project, 'systemDesign'>, string][]
        ).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={field}>{label}</label>
            <input
              id={field}
              className="input"
              value={form[field] as string}
              onChange={(e) => handleField(field, e.target.value)}
              required
            />
          </div>
        ))}

        {(
          [
            ['context', 'Context'],
            ['problem', 'Problem'],
            ['approach', 'Approach'],
            ['tech', 'Tech'],
            ['result', 'Result'],
            ['notes', 'Notes'],
            ['designPrinciple', 'Design Principle'],
          ] as [keyof Omit<Project, 'systemDesign'>, string][]
        ).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={field}>{label}</label>
            <textarea
              id={field}
              className="textarea"
              value={form[field] as string}
              onChange={(e) => handleField(field, e.target.value)}
              required
            />
          </div>
        ))}

        <div className="section__label" style={{ marginBottom: '16px' }}>System Design</div>

        {(
          [
            ['input', 'Input'],
            ['processing', 'Processing'],
            ['output', 'Output'],
            ['constraints', 'Constraints'],
          ] as [keyof Project['systemDesign'], string][]
        ).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={`sd-${field}`}>{label}</label>
            <textarea
              id={`sd-${field}`}
              className="textarea"
              value={form.systemDesign[field]}
              onChange={(e) => handleSystemDesign(field, e.target.value)}
              required
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving...' : isNew ? 'Create project' : 'Save'}
          </button>
          {!isNew && (
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AdminProjectEdit
