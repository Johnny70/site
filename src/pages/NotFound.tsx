// ============================================================
// MODULE: NotFound
// RESPONSIBILITY: Renders the 404 not found page
// DEPENDS ON: react-router-dom
// EXPOSES: NotFound
// ============================================================

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFound(): JSX.Element {
  useEffect(() => { document.title = '404 – Johnny Jakobsson' }, [])

  return (
    <div className="page">
      <div className="meta" style={{ marginBottom: '16px' }}>404</div>
      <p style={{ marginBottom: '32px' }}>Sidan hittades inte.</p>
      <Link to="/" className="back">← Tillbaka</Link>
    </div>
  )
}

export default NotFound
