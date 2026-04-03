// ============================================================
// MODULE: api/client
// RESPONSIBILITY: HTTP fetch wrapper with auth token management
// DEPENDS ON: nothing
// EXPOSES: apiFetch, saveToken, getToken, clearToken
// ============================================================

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'
const TOKEN_KEY = 'admin_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  auth?: boolean
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const token = getToken()
    if (token === null) {
      throw new Error('No auth token stored')
    }
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API ${response.status}: ${text}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
