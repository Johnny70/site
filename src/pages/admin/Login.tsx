// ============================================================
// MODULE: admin/Login
// RESPONSIBILITY: Admin login page — verifies token against /api/admin/ping
// DEPENDS ON: react-router-dom, api/client
// EXPOSES: Login
// ============================================================

import { type JSX, type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, saveToken, clearToken } from '../../api/client'

function Login(): JSX.Element {
  const [tokenInput, setTokenInput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setError(null)
    setLoading(true)

    saveToken(tokenInput)

    try {
      await apiFetch<{ status: string }>('/api/admin/ping', { auth: true })
      navigate('/admin/projects')
    } catch (err: unknown) {
      console.error('Login: token verification failed', err)
      clearToken()
      setError('Invalid token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wrap">
      <div className="page">
        <h1 style={{ marginBottom: '48px' }}>Admin</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: '360px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="token">Token</label>
            <input
              id="token"
              type="password"
              className="input"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              required
            />
          </div>

          {error !== null && (
            <div className="status-msg status-msg--err" style={{ marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
