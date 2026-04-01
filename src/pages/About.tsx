// ============================================================
// MODULE: About
// RESPONSIBILITY: Renders the about page (/about) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: About
// ============================================================

import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { AboutContent } from '../api/types'

function About(): JSX.Element {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { document.title = 'Om – Johnny Jakobsson' }, [])

  useEffect(() => {
    apiFetch<AboutContent>('/api/about')
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
      <h1 style={{ marginBottom: '48px' }}>Om</h1>

      <div className="section">
        {content.paragraphs.map((p, i) => (
          <p key={i} style={{ marginBottom: i < content.paragraphs.length - 1 ? '16px' : '0' }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

export default About
