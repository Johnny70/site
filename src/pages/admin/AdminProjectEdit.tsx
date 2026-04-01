// ============================================================
// MODULE: admin/AdminProjectEdit
// RESPONSIBILITY: Form for creating a new project or editing an existing one
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: AdminProjectEdit
// ============================================================

import { FormEvent, useEffect, useState } from 'react'
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
    apiFetch<Project>(`/api/admin/projects`, { auth: true })
      .then(() => apiFetch<Project>(`/api/projects/${slug}`))
      .then((data) => {
        setForm(data)
        setLoading(false)
      })
      .catch((err: Error) => {
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
      setStatus({ type: 'ok', msg: isNew ? 'Projekt skapat' : 'Sparat' })
      if (isNew) navigate(`/admin/projects/${form.slug}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Okänt fel'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(): Promise<void> {
    if (!window.confirm(`Ta bort "${form.title}"?`)) return
    try {
      await apiFetch<void>(`/api/admin/projects/${slug}`, { method: 'DELETE', auth: true })
      navigate('/admin/projects')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Okänt fel'
      setStatus({ type: 'err', msg })
    }
  }

  if (loading) return <p className="meta">Laddar...</p>

  return (
    <div className="page">
      <Link to="/admin/projects" className="back">← Projekt</Link>
      <h1 style={{ marginBottom: '48px' }}>{isNew ? 'Nytt projekt' : form.title}</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {(
          [
            ['slug', 'Slug'],
            ['title', 'Titel'],
            ['shortDescription', 'Kort beskrivning'],
            ['type', 'Typ'],
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
            ['context', 'Kontext'],
            ['problem', 'Problem'],
            ['approach', 'Angreppssätt'],
            ['tech', 'Teknik'],
            ['result', 'Resultat'],
            ['notes', 'Noteringar'],
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

        <div className="section__label" style={{ marginBottom: '16px' }}>Systemdesign</div>

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
            {saving ? 'Sparar...' : isNew ? 'Skapa projekt' : 'Spara'}
          </button>
          {!isNew && (
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Ta bort
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AdminProjectEdit
