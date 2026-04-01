// ============================================================
// MODULE: admin/AdminLab
// RESPONSIBILITY: Form for editing the Lab experiments list
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminLab
// ============================================================

import { FormEvent, useEffect, useState } from 'react'
import { apiFetch } from '../../api/client'
import type { LabEntry } from '../../api/types'

function AdminLab(): JSX.Element {
  const [entries, setEntries] = useState<LabEntry[]>([])
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    apiFetch<LabEntry[]>('/api/lab')
      .then((data) => {
        setEntries(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setStatus({ type: 'err', msg: err.message })
        setLoading(false)
      })
  }, [])

  function updateEntry(index: number, field: keyof LabEntry, value: string): void {
    setEntries((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function addEntry(): void {
    setEntries((prev) => [...prev, { experiment: '', result: '' }])
  }

  function removeEntry(index: number): void {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus(null)
    setSaving(true)
    try {
      await apiFetch<LabEntry[]>('/api/admin/lab', { method: 'PUT', body: entries, auth: true })
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
      <h1 style={{ marginBottom: '48px' }}>Lab</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <div key={index} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="section__label">Experiment {index + 1}</span>
              <button type="button" className="btn btn--danger" onClick={() => removeEntry(index)}>
                Ta bort
              </button>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`exp-${index}`}>Experiment</label>
              <textarea
                id={`exp-${index}`}
                className="textarea"
                value={entry.experiment}
                onChange={(e) => updateEntry(index, 'experiment', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`res-${index}`}>Resultat</label>
              <textarea
                id={`res-${index}`}
                className="textarea"
                value={entry.result}
                onChange={(e) => updateEntry(index, 'result', e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Sparar...' : 'Spara'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={addEntry}>
            + Lägg till experiment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminLab
