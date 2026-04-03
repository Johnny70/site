// ============================================================
// MODULE: admin/AdminLayout
// RESPONSIBILITY: Shared layout for all admin pages with auth guard and nav
// DEPENDS ON: react-router-dom, api/client
// EXPOSES: AdminLayout
// ============================================================

import type { JSX } from 'react'
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getToken, clearToken } from '../../api/client'
import Footer from '../../components/Footer'

function AdminLayout(): JSX.Element {
  const token = getToken()
  const navigate = useNavigate()

  if (token === null) {
    return <Navigate to="/admin/login" replace />
  }

  function handleLogout(): void {
    clearToken()
    navigate('/admin/login')
  }

  return (
    <div className="wrap">
      <header className="admin-header">
        <div className="admin-header__top">
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--fg-muted)' }}>
            admin
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>
              ← site
            </Link>
            <button onClick={handleLogout} className="btn btn--ghost">
              logout
            </button>
          </div>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/home">Home</NavLink>
          <NavLink to="/admin/projects">Work</NavLink>
          <NavLink to="/admin/now">Now</NavLink>
          <NavLink to="/admin/lab">Lab</NavLink>
          <NavLink to="/admin/about">About</NavLink>
          <NavLink to="/admin/contact">Contact</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout
