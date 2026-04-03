// ============================================================
// MODULE: Contact
// RESPONSIBILITY: Renders the contact page (/contact) with data from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Contact
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { ContactContent } from '../api/types'
import Seo from '../components/Seo'

function Contact(): JSX.Element {
  const [contact, setContact] = useState<ContactContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<ContactContent>('/api/contact')
      .then(setContact)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  if (contact === null) {
    return <div className="page"><p className="meta">Loading...</p></div>
  }

  const [mailUser, mailDomain] = contact.email.split('@')

  return (
    <div className="page">
      <Seo title="Contact" path="/contact" />
      <h1 style={{ marginBottom: '48px' }}>Contact</h1>

      <div className="section">
        <p style={{ marginBottom: '16px' }}>If it's relevant:</p>
        <a href={`mailto:${mailUser}@${mailDomain}`}>{mailUser}@{mailDomain}</a>
        <p style={{ marginTop: '16px', color: 'var(--fg-muted)' }}>
          Briefly describe what it's about.
        </p>
      </div>
    </div>
  )
}

export default Contact
