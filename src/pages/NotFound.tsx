// ============================================================
// MODULE: NotFound
// RESPONSIBILITY: Renders the 404 not found page
// DEPENDS ON: react-router-dom
// EXPOSES: NotFound
// ============================================================

import { type JSX } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

function NotFound(): JSX.Element {
  return (
    <div className="page">
      <Seo title="404" noindex />
      <h1 className="meta" style={{ marginBottom: '16px' }}>404</h1>
      <p style={{ marginBottom: '32px' }}>Page not found.</p>
      <Link to="/" className="back">← Back</Link>
    </div>
  )
}

export default NotFound
