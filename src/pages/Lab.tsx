// ============================================================
// MODULE: Lab
// RESPONSIBILITY: Renders the lab/experiments page (/lab) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Lab
// ============================================================

import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { LabEntry } from '../api/types'

function Lab(): JSX.Element {
  const [entries, setEntries] = useState<LabEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { document.title = 'Lab – Johnny Jakobsson' }, [])

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
      <h1 style={{ marginBottom: '8px' }}>Lab</h1>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '48px' }}>
        Testar deterministiska AI-flöden
      </p>

      {entries.map((entry, index) => (
        <div key={index}>
          <div className="section">
            <div className="section__label">Experiment</div>
            <p>{entry.experiment}</p>
            <div className="section__label" style={{ marginTop: '16px' }}>Resultat</div>
            <p>{entry.result}</p>
          </div>
          {index < entries.length - 1 && <hr />}
        </div>
      ))}
    </div>
  )
}

export default Lab
