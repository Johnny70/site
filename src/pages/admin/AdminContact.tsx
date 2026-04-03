// ============================================================
// MODULE: admin/AdminContact
// RESPONSIBILITY: Form for editing contact info (email, github, linkedin)
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminContact
// ============================================================

import { type JSX, type FormEvent, useEffect, useState } from 'react'
import { apiFetch } from '../../api/client'
import type { ContactContent } from '../../api/types'

function AdminContact(): JSX.Element {
  const [form, setForm] = useState<ContactContent>({ email: '', github: '', linkedin: '' })
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    apiFetch<ContactContent>('/api/contact')
      .then((data) => {
        setForm(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setStatus({ type: 'err', msg: err.message })
        setLoading(false)
      })
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus(null)
    setSaving(true)
    try {
      await apiFetch<ContactContent>('/api/admin/contact', { method: 'PUT', body: form, auth: true })
      setStatus({ type: 'ok', msg: 'Saved' })
    } catch (err: unknown) {
      console.error('AdminContact: save failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="meta">Loading...</p>

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Contact</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="github">GitHub (URL)</label>
          <input
            id="github"
            className="input"
            value={form.github}
            onChange={(e) => setForm((prev) => ({ ...prev, github: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">LinkedIn (URL)</label>
          <input
            id="linkedin"
            className="input"
            value={form.linkedin}
            onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))}
          />
        </div>

        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default AdminContact
