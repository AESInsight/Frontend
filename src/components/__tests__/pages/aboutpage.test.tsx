import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AboutPage from '../../../components/pages/aboutpage'
import { useIsDesktop } from '../../../lib/context/desktop_context'
import { useAuth, AuthProvider } from '../../../lib/context/auth_context'

// Mock the desktop context
vi.mock('../../../lib/context/desktop_context', () => ({
  useIsDesktop: vi.fn()
}))

// Mock the auth context
vi.mock('../../../lib/context/auth_context', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

// Create a wrapper component that provides the auth context and router
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
)

describe('AboutPage', () => {
  beforeEach(() => {
    // Mock auth context
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
      token: null,
      logout: vi.fn()
    })
  })

  it('renders the about page content', () => {
    // Mock desktop context to true
    vi.mocked(useIsDesktop).mockReturnValue(true)
    
    render(<AboutPage />, { wrapper: TestWrapper })
    
    // Check for main heading
    expect(screen.getByText('About Us')).toBeInTheDocument()
    
    // Check for main content paragraphs
    expect(screen.getByText(/Welcome to our website!/)).toBeInTheDocument()
    expect(screen.getByText(/Our mission is to deliver/)).toBeInTheDocument()
    expect(screen.getByText(/Thank you for visiting/)).toBeInTheDocument()
    
    // Check for footer
    expect(screen.getByText('2025 AES-Insight. All rights reserved.')).toBeInTheDocument()
    
    // Check for Github link
    const githubLink = screen.getByText('Github')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AESInsight/')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders without sidebar on mobile', () => {
    // Mock desktop context to false
    vi.mocked(useIsDesktop).mockReturnValue(false)
    
    render(<AboutPage />, { wrapper: TestWrapper })
    
    // Check that the page still renders correctly
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText(/Welcome to our website!/)).toBeInTheDocument()
  })
}) 