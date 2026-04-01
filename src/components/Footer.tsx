// ============================================================
// MODULE: Footer
// RESPONSIBILITY: Persistent site footer with contact links fetched from API
// DEPENDS ON: api/client, api/types
// EXPOSES: Footer
// ============================================================

import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import type { ContactContent } from '../api/types'

function Footer(): JSX.Element {
  const [contact, setContact] = useState<ContactContent | null>(null)

  useEffect(() => {
    apiFetch<ContactContent>('/api/contact')
      .then(setContact)
      .catch((err: Error) => { console.error('Footer: failed to load contact data', err.message) })
  }, [])

  if (contact === null) return <footer className="site-footer" />

  const [mailUser, mailDomain] = contact.email.split('@')

  return (
    <footer className="site-footer">
      <a href={`mailto:${mailUser}@${mailDomain}`}>{mailUser}@{mailDomain}</a>
      {contact.github !== '' && (
        <>
          <span className="site-footer__sep">·</span>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
        </>
      )}
      {contact.linkedin !== '' && (
        <>
          <span className="site-footer__sep">·</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </>
      )}
    </footer>
  )
}

export default Footer
