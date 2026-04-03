// ============================================================
// MODULE: Lab
// RESPONSIBILITY: Renders the lab/experiments page (/lab) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Lab
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { LabEntry } from '../api/types'
import Seo from '../components/Seo'

function Lab(): JSX.Element {
  const [entries, setEntries] = useState<LabEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<LabEntry[]>('/api/lab')
      .then(setEntries)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  return (
    <div className="page">
      <Seo title="Lab" path="/lab" description="Testing deterministic AI flows and experimental software." />
      <h1 style={{ marginBottom: '8px' }}>Lab</h1>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '48px' }}>
        Testing deterministic AI flows
      </p>

      {entries.map((entry, index) => (
        <div key={index}>
          <div className="section">
            <h2 className="section__label">Experiment</h2>
            <p>{entry.experiment}</p>
            <h3 className="section__label" style={{ marginTop: '16px' }}>Result</h3>
            <p>{entry.result}</p>
          </div>
          {index < entries.length - 1 && <hr />}
        </div>
      ))}
    </div>
  )
}

export default Lab
