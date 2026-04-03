// ============================================================
// MODULE: admin/AdminAbout
// RESPONSIBILITY: Form for editing the about page paragraphs
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminAbout
// ============================================================

import { type JSX, type FormEvent, useEffect, useState } from 'react'
import { apiFetch } from '../../api/client'
import type { AboutContent } from '../../api/types'

function AdminAbout(): JSX.Element {
  const [paragraphs, setParagraphs] = useState<string[]>([])
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    apiFetch<AboutContent>('/api/about')
      .then((data) => {
        setParagraphs(data.paragraphs)
        setLoading(false)
      })
      .catch((err: Error) => {
        setStatus({ type: 'err', msg: err.message })
        setLoading(false)
      })
  }, [])

  function updateParagraph(index: number, value: string): void {
    setParagraphs((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function addParagraph(): void {
    setParagraphs((prev) => [...prev, ''])
  }

  function removeParagraph(index: number): void {
    setParagraphs((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus(null)
    setSaving(true)
    try {
      await apiFetch<AboutContent>('/api/admin/about', { method: 'PUT', body: { paragraphs }, auth: true })
      setStatus({ type: 'ok', msg: 'Saved' })
    } catch (err: unknown) {
      console.error('AdminAbout: save failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="meta">Loading...</p>

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>About</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {paragraphs.map((p, index) => (
          <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <textarea
              className="textarea"
              style={{ flex: 1 }}
              value={p}
              onChange={(e) => updateParagraph(index, e.target.value)}
              required
            />
            <button type="button" className="btn btn--danger" onClick={() => removeParagraph(index)}>
              Remove
            </button>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn btn--ghost" onClick={addParagraph}>
            + Add paragraph
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminAbout
