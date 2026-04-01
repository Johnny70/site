// ============================================================
// MODULE: api/client.test
// RESPONSIBILITY: Tests for apiFetch and token management in client.ts
// DEPENDS ON: vitest, api/client
// EXPOSES: nothing
// ============================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch, saveToken, getToken, clearToken } from './client'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// --- Token management ---

describe('getToken', () => {
  it('returns null when no token is stored', () => {
    expect(getToken()).toBe(null)
  })
})

describe('saveToken / getToken', () => {
  it('stores a token and retrieves it', () => {
    saveToken('abc123')
    expect(getToken()).toBe('abc123')
  })
})

describe('clearToken', () => {
  it('removes the stored token', () => {
    saveToken('abc123')
    clearToken()
    expect(getToken()).toBe(null)
  })
})

// --- apiFetch ---

describe('apiFetch', () => {
  it('returns parsed JSON on a 200 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: (): Promise<{ status: string }> => Promise.resolve({ status: 'ok' }),
    }))

    const result = await apiFetch<{ status: string }>('/api/health')

    expect(result).toEqual({ status: 'ok' })
  })

  it('throws with status and body on a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: (): Promise<string> => Promise.resolve('Not Found'),
    }))

    await expect(apiFetch('/api/missing')).rejects.toThrow('API 404: Not Found')
  })

  it('returns undefined for a 204 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: (): Promise<undefined> => Promise.resolve(undefined),
    }))

    const result = await apiFetch('/api/admin/projects/x', { method: 'DELETE' })

    expect(result).toBeUndefined()
  })

  it('throws immediately when auth=true and no token is stored', async () => {
    await expect(
      apiFetch('/api/admin/ping', { auth: true })
    ).rejects.toThrow('No auth token stored')
  })

  it('sends Authorization header when auth=true and a token is stored', async () => {
    saveToken('secret-token')
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: (): Promise<object> => Promise.resolve({}),
    })
    vi.stubGlobal('fetch', mockFetch)

    await apiFetch('/api/admin/ping', { auth: true })

    const [, callOptions] = mockFetch.mock.calls[0] as [string, RequestInit & { headers: Record<string, string> }]
    expect((callOptions.headers as Record<string, string>)['Authorization']).toBe('Bearer secret-token')
  })

  it('sends a JSON-serialised body when body is provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: (): Promise<object> => Promise.resolve({}),
    })
    vi.stubGlobal('fetch', mockFetch)

    const body = { email: 'test@example.com', github: '', linkedin: '' }
    await apiFetch('/api/admin/contact', { method: 'PUT', body })

    const [, callOptions] = mockFetch.mock.calls[0] as [string, RequestInit]
    expect(callOptions.body).toBe(JSON.stringify(body))
  })

  it('does not include a body when no body is provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: (): Promise<object> => Promise.resolve({}),
    })
    vi.stubGlobal('fetch', mockFetch)

    await apiFetch('/api/health')

    const [, callOptions] = mockFetch.mock.calls[0] as [string, RequestInit]
    expect(callOptions.body).toBeUndefined()
  })
})
