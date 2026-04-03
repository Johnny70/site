// ============================================================
// MODULE: Home
// RESPONSIBILITY: Renders the home page (/) with data from API
// DEPENDS ON: react-router-dom, api/client, api/types
// EXPOSES: Home
// ============================================================

import { type JSX, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/client'
import type { HomeContent, Project } from '../api/types'
import Seo from '../components/Seo'

function Home(): JSX.Element {
  const [home, setHome] = useState<HomeContent | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      apiFetch<HomeContent>('/api/home'),
      apiFetch<Project[]>('/api/projects'),
    ])
      .then(([homeData, projectsData]) => {
        setHome(homeData)
        setProjects(projectsData)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error !== null) {
    return <div className="page"><p style={{ color: 'var(--fg-muted)' }}>{error}</p></div>
  }

  if (home === null) {
    return <div className="page"><p className="meta">Loading...</p></div>
  }

  return (
    <div className="page">
      <Seo path="/" />

      <h1 style={{ marginBottom: '8px' }}>Johnny Jakobsson</h1>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '32px' }}>{home.tagline}</p>

      <p style={{ marginBottom: '8px' }}>{home.description1}</p>
      <p style={{ marginBottom: '48px' }}>{home.description2}</p>

      <hr />

      <div className="section">
        <h2 className="section__label">Now</h2>
        <div className="meta" style={{ marginBottom: '0' }}>
          <div>Building: {home.nowBuilding}</div>
          <div>Exploring: {home.nowExploring}</div>
          <div>Availability: {home.nowAvailability}</div>
        </div>
      </div>

      <hr />

      <div className="section">
        <h2 className="section__label">Selected work</h2>
        <ul className="proj-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link to={`/work/${project.slug}`} className="proj-item">
                <div>
                  <div className="proj-item__title">{project.title}</div>
                  <div className="proj-item__desc">{project.shortDescription}</div>
                </div>
                <span className="proj-item__arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <div className="section">
        <h2 className="section__label">Approach</h2>
        <p style={{ marginBottom: '12px' }}>{home.approachIntro}</p>
        <ul className="blist">
          {home.approachPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p style={{ marginTop: '16px' }}>{home.approachSuffix}</p>
      </div>
    </div>
  )
}

export default Home
