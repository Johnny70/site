// ============================================================
// MODULE: Header
// RESPONSIBILITY: Renders the site-wide header with name and navigation
// DEPENDS ON: react-router-dom
// EXPOSES: Header
// ============================================================

import type { JSX } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header(): JSX.Element {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <Link to="/" className="site-header__name" aria-label="Johnny Jakobsson – home">
          Johnny Jakobsson
        </Link>
        <nav className="site-header__nav" aria-label="Main">
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/now">Now</NavLink>
        </nav>
      </header>
    </>
  )
}

export default Header
