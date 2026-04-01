// ============================================================
// MODULE: components/Footer.test
// RESPONSIBILITY: Tests for Footer rendering with mocked API data
// DEPENDS ON: vitest, @testing-library/react, components/Footer
// EXPOSES: nothing
// ============================================================

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

vi.mock('../api/client', () => ({
  apiFetch: vi.fn(),
}))

import { apiFetch } from '../api/client'

beforeEach(() => {
  vi.mocked(apiFetch).mockReset()
})

describe('Footer', () => {
  it('renders an empty footer while the API call is pending', () => {
    vi.mocked(apiFetch).mockReturnValue(new Promise(() => { /* never resolves */ }))

    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')

    expect(footer).toBeInTheDocument()
    expect(footer?.textContent).toBe('')
  })

  it('renders email and both links when all fields are populated', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
    })

    render(<Footer />)

    await screen.findByText('test@example.com')
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('builds the mailto href from the email parts', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      email: 'test@example.com',
      github: '',
      linkedin: '',
    })

    render(<Footer />)

    const emailLink = await screen.findByRole('link', { name: 'test@example.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('hides GitHub link when github is empty', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      email: 'test@example.com',
      github: '',
      linkedin: 'https://linkedin.com/in/test',
    })

    render(<Footer />)

    await screen.findByText('test@example.com')
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('hides LinkedIn link when linkedin is empty', async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: '',
    })

    render(<Footer />)

    await screen.findByText('test@example.com')
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.queryByText('LinkedIn')).not.toBeInTheDocument()
  })

  it('logs an error when the API call fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* suppress in test output */ })
    vi.mocked(apiFetch).mockRejectedValue(new Error('Network error'))

    render(<Footer />)

    // Wait for the rejection to propagate
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Footer: failed to load contact data',
        'Network error'
      )
    })

    consoleErrorSpy.mockRestore()
  })
})
