// ============================================================
// MODULE: admin/AdminHome
// RESPONSIBILITY: Form for editing the home page content
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminHome
// ============================================================

import { FormEvent, useEffect, useState } from 'react'
import { apiFetch } from '../../api/client'
import type { HomeContent } from '../../api/types'

const EMPTY: HomeContent = {
  tagline: '', description1: '', description2: '',
  nowBuilding: '', nowExploring: '', nowAvailability: '',
  approachIntro: '', approachPoints: [], approachSuffix: '',
}

function AdminHome(): JSX.Element {
  const [form, setForm] = useState<HomeContent>(EMPTY)
  const [approachText, setApproachText] = useState<string>('')
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    apiFetch<HomeContent>('/api/home')
      .then((data) => {
        setForm(data)
        setApproachText(data.approachPoints.join('\n'))
        setLoading(false)
      })
      .catch((err: Error) => {
        setStatus({ type: 'err', msg: err.message })
        setLoading(false)
      })
  }, [])

  function handleField(field: keyof Omit<HomeContent, 'approachPoints'>, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus(null)
    setSaving(true)

    const approachPoints = approachText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const payload: HomeContent = { ...form, approachPoints }

    try {
      await apiFetch<HomeContent>('/api/admin/home', { method: 'PUT', body: payload, auth: true })
      setForm(payload)
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
      <h1 style={{ marginBottom: '48px' }}>Home</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>
        {(
          [
            ['tagline', 'Tagline'],
            ['description1', 'Beskrivning 1'],
            ['description2', 'Beskrivning 2'],
          ] as [keyof Omit<HomeContent, 'approachPoints'>, string][]
        ).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={field}>{label}</label>
            <input id={field} className="input" value={form[field]} onChange={(e) => handleField(field, e.target.value)} required />
          </div>
        ))}

        <div className="section__label" style={{ marginBottom: '16px' }}>Nu-block</div>

        {(
          [
            ['nowBuilding', 'Bygger'],
            ['nowExploring', 'Utforskar'],
            ['nowAvailability', 'Tillgänglighet'],
          ] as [keyof Omit<HomeContent, 'approachPoints'>, string][]
        ).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label className="form-label" htmlFor={field}>{label}</label>
            <input id={field} className="input" value={form[field]} onChange={(e) => handleField(field, e.target.value)} required />
          </div>
        ))}

        <div className="section__label" style={{ marginBottom: '16px' }}>Arbetssätt</div>

        <div className="form-group">
          <label className="form-label" htmlFor="approachIntro">Intro</label>
          <input id="approachIntro" className="input" value={form.approachIntro} onChange={(e) => handleField('approachIntro', e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="approachPoints">Punkter (en per rad)</label>
          <textarea
            id="approachPoints"
            className="textarea"
            value={approachText}
            onChange={(e) => setApproachText(e.target.value)}
            style={{ minHeight: '88px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="approachSuffix">Avslutning</label>
          <input id="approachSuffix" className="input" value={form.approachSuffix} onChange={(e) => handleField('approachSuffix', e.target.value)} required />
        </div>

        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Sparar...' : 'Spara'}
        </button>
      </form>
    </div>
  )
}

export default AdminHome
