// ============================================================
// MODULE: App
// RESPONSIBILITY: Sets up client-side routing for all public and admin pages
// DEPENDS ON: react-router-dom, Layout, AdminLayout, all page components
// EXPOSES: App
// ============================================================

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './pages/admin/AdminLayout'
import Home from './pages/Home'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import Lab from './pages/Lab'
import Now from './pages/Now'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/admin/Login'
import AdminProjects from './pages/admin/AdminProjects'
import AdminProjectEdit from './pages/admin/AdminProjectEdit'
import AdminNow from './pages/admin/AdminNow'
import AdminLab from './pages/admin/AdminLab'
import AdminHome from './pages/admin/AdminHome'
import AdminContact from './pages/admin/AdminContact'
import AdminAbout from './pages/admin/AdminAbout'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/work"
          element={<Layout><Work /></Layout>}
        />
        <Route
          path="/work/:slug"
          element={<Layout><WorkDetail /></Layout>}
        />
        <Route
          path="/lab"
          element={<Layout><Lab /></Layout>}
        />
        <Route
          path="/now"
          element={<Layout><Now /></Layout>}
        />
        <Route
          path="/about"
          element={<Layout><About /></Layout>}
        />
        <Route
          path="/contact"
          element={<Layout><Contact /></Layout>}
        />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectEdit />} />
          <Route path="projects/:slug" element={<AdminProjectEdit />} />
          <Route path="now" element={<AdminNow />} />
          <Route path="lab" element={<AdminLab />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
