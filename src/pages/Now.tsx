// ============================================================
// MODULE: Now
// RESPONSIBILITY: Renders the current status page (/now) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Now
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { NowContent } from '../api/types'
import Seo from '../components/Seo'

function Now(): JSX.Element {
  const [content, setContent] = useState<NowContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<NowContent>('/api/now')
      .then(setContent)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  if (content === null) {
    return <div className="page"><p className="meta">Loading...</p></div>
  }

  return (
    <div className="page">
      <Seo title="Now" path="/now" />
      <h1 style={{ marginBottom: '48px' }}>Now</h1>

      <div className="section">
        <h2 className="section__label">Focus</h2>
        <p>{content.focus}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Direction</h2>
        <p>{content.direction}</p>
      </div>

      <div className="section">
        <h2 className="section__label">Availability</h2>
        <p>{content.availability}</p>
      </div>
    </div>
  )
}

export default Now
