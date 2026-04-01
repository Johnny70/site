// ============================================================
// MODULE: Contact
// RESPONSIBILITY: Renders the contact page (/contact) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Contact
// ============================================================

import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { ContactContent } from '../api/types'

function Contact(): JSX.Element {
  const [contact, setContact] = useState<ContactContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { document.title = 'Kontakt – Johnny Jakobsson' }, [])

  useEffect(() => {
    apiFetch<ContactContent>('/api/contact')
      .then(setContact)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  if (contact === null) {
    return <div className="page"><p className="meta">Laddar...</p></div>
  }

  const [mailUser, mailDomain] = contact.email.split('@')

  return (
    <div className="page">
      <h1 style={{ marginBottom: '48px' }}>Kontakt</h1>

      <div className="section">
        <p style={{ marginBottom: '16px' }}>Om något är relevant:</p>
        <a href={`mailto:${mailUser}@${mailDomain}`}>{mailUser}@{mailDomain}</a>
        <p style={{ marginTop: '16px', color: 'var(--fg-muted)' }}>
          Beskriv kort vad det gäller.
        </p>
      </div>
    </div>
  )
}

export default Contact
