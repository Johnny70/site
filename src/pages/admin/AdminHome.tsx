// ============================================================
// MODULE: admin/AdminHome
// RESPONSIBILITY: Form for editing the home page content
// DEPENDS ON: api/client, api/types
// EXPOSES: AdminHome
// ============================================================

import { type JSX, type FormEvent, useEffect, useState } from 'react'
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
      setStatus({ type: 'ok', msg: 'Saved' })
    } catch (err: unknown) {
      console.error('AdminHome: save failed', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setStatus({ type: 'err', msg })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="meta">Loading...</p>

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Home</h1>

      {status !== null && (
        <div className={`status-msg status-msg--${status.type}`}>{status.msg}</div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="form-label" htmlFor="tagline">Tagline</label>
          <input id="tagline" className="input" value={form.tagline} onChange={(e) => handleField('tagline', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description1">Description (paragraph 1)</label>
          <textarea id="description1" className="textarea" value={form.description1} onChange={(e) => handleField('description1', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description2">Description (paragraph 2)</label>
          <textarea id="description2" className="textarea" value={form.description2} onChange={(e) => handleField('description2', e.target.value)} required />
        </div>

        <hr />

        <div className="section__label" style={{ marginBottom: '16px' }}>Now</div>
        <p className="meta" style={{ marginBottom: '16px' }}>Shown in the "Now" block on the home page.</p>

        <div className="form-group">
          <label className="form-label" htmlFor="nowBuilding">Building</label>
          <input id="nowBuilding" className="input" value={form.nowBuilding} onChange={(e) => handleField('nowBuilding', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="nowExploring">Exploring</label>
          <input id="nowExploring" className="input" value={form.nowExploring} onChange={(e) => handleField('nowExploring', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="nowAvailability">Availability</label>
          <input id="nowAvailability" className="input" value={form.nowAvailability} onChange={(e) => handleField('nowAvailability', e.target.value)} required />
        </div>

        <hr />

        <div className="section__label" style={{ marginBottom: '16px' }}>Approach</div>

        <div className="form-group">
          <label className="form-label" htmlFor="approachIntro">Intro</label>
          <input id="approachIntro" className="input" value={form.approachIntro} onChange={(e) => handleField('approachIntro', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="approachPoints">Points (one per line)</label>
          <textarea
            id="approachPoints"
            className="textarea"
            value={approachText}
            onChange={(e) => setApproachText(e.target.value)}
            style={{ minHeight: '88px' }}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="approachSuffix">Closing line</label>
          <input id="approachSuffix" className="input" value={form.approachSuffix} onChange={(e) => handleField('approachSuffix', e.target.value)} required />
        </div>

        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default AdminHome
