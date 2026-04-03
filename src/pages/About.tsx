// ============================================================
// MODULE: About
// RESPONSIBILITY: Renders the about page (/about) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: About
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { AboutContent } from '../api/types'
import Seo from '../components/Seo'

function About(): JSX.Element {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<AboutContent>('/api/about')
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
      <Seo title="About" path="/about" />
      <h1 style={{ marginBottom: '48px' }}>About</h1>

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
