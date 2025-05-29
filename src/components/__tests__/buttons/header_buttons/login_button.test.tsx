import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginButton from '../../../buttons/header_buttons/login_button'
import { AuthProvider, useAuth } from '@/lib/context/auth_context'

// Mock the auth context
vi.mock('@/lib/context/auth_context', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: null,
    login: vi.fn(),
    logout: vi.fn()
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('LoginButton', () => {
  it('renders login button when not authenticated', () => {
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    )
    const button = screen.getByRole('button', { name: /login/i })
    expect(button).toBeInTheDocument()
  })

  it('opens login modal when clicked', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    )
    
    const button = screen.getByRole('button', { name: /login/i })
    await user.click(button)
    
    // Check if modal is opened by looking for its elements
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders logout button when authenticated', () => {
    // Override the mock for this test
    const mockUseAuth = useAuth as ReturnType<typeof vi.fn>
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      token: 'mock-token',
      login: vi.fn(),
      logout: vi.fn()
    })

    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    )
    const button = screen.getByRole('button', { name: /logout/i })
    expect(button).toBeInTheDocument()
  })
}) 