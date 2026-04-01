// ============================================================
// MODULE: Now
// RESPONSIBILITY: Renders the current status page (/now) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Now
// ============================================================

import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { NowContent } from '../api/types'

function Now(): JSX.Element {
  const [content, setContent] = useState<NowContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { document.title = 'Nu – Johnny Jakobsson' }, [])

  useEffect(() => {
    apiFetch<NowContent>('/api/now')
      .then(setContent)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  if (content === null) {
    return <div className="page"><p className="meta">Laddar...</p></div>
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Nu</h1>

      <div className="section">
        <div className="section__label">Fokus</div>
        <p>{content.focus}</p>
      </div>

      <div className="section">
        <div className="section__label">Riktning</div>
        <p>{content.direction}</p>
      </div>

      <div className="section">
        <div className="section__label">Tillgänglighet</div>
        <p>{content.availability}</p>
      </div>
    </div>
  )
}

export default Now
