// ============================================================
// MODULE: main
// RESPONSIBILITY: Entry point — mounts the React app into #root
// DEPENDS ON: react, react-dom, react-helmet-async, App
// EXPOSES: nothing (side-effect only)
// ============================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)
