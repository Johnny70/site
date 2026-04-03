// ============================================================
// MODULE: Layout
// RESPONSIBILITY: Wraps all pages in the 720px centered column with header
// DEPENDS ON: Header
// EXPOSES: Layout
// ============================================================

import { type JSX, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="wrap">
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
