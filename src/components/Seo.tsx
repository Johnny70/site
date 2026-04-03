// ============================================================
// MODULE: Seo
// RESPONSIBILITY: Injects per-page <head> meta tags via react-helmet-async
// DEPENDS ON: react-helmet-async
// EXPOSES: Seo
// ============================================================

import { type JSX } from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Johnny Jakobsson'
const BASE_URL = 'https://johnnyjakobsson.com'
const DEFAULT_DESCRIPTION =
  'Freelance developer working with deterministic AI flows, system design, and thoughtful software.'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}

function Seo({ title, description = DEFAULT_DESCRIPTION, path = '', noindex = false }: SeoProps): JSX.Element {
  const fullTitle = title != null ? `${title} – ${SITE_NAME}` : SITE_NAME
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default Seo
