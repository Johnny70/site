// ============================================================
// MODULE: admin/AdminNow
// RESPONSIBILITY: Form for editing the Now page content
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminNow
// ============================================================

import { FormEvent, useEffect, useState } from 'react'
import { apiFetch } from '../../api/client'
import type { NowContent } from '../../api/types'

const FIELDS: { field: keyof NowContent; label: string }[] = [
  { field: 'focus', label: 'Fokus' },
  { field: 'direction', label: 'Riktning' },
  { field: 'availability', label: 'Tillgänglighet' },
]

function AdminNow(): JSX.Element {
  const [form, setForm] = useState<NowContent>({ focus: '', direction: '', availability: '' })
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    apiFetch<NowContent>('/api/now')
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
      await apiFetch<NowContent>('/api/admin/now', { method: 'PUT', body: form, auth: true })
      setStatus({ type: 'ok', msg: 'Sparat' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Okänt fel'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="meta">Laddar...</p>

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Now</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {FIELDS.map(({ field, label }) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={field}>{label}</label>
            <input
              id={field}
              className="input"
              value={form[field]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Sparar...' : 'Spara'}
        </button>
      </form>
    </div>
  )
}

export default AdminNow
