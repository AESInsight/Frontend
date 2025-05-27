import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ContactPage from '../../../components/pages/contactpage'
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

describe('ContactPage', () => {
  beforeEach(() => {
    // Mock auth context
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
      token: null,
      logout: vi.fn()
    })
  })

  it('renders the contact page content', () => {
    // Mock desktop context to true
    vi.mocked(useIsDesktop).mockReturnValue(true)
    
    render(<ContactPage />, { wrapper: TestWrapper })
    
    // Check for main heading
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    
    // Check for all contact information
    const contacts = [
      { name: 'Christopher Dolan', email: 'cd@aes-insight.dk', phone: '+45 30 13 48 26' },
      { name: 'Simon Eifer', email: 'se@aes-insight.dk', phone: '+45 21 97 72 92' },
      { name: 'Jeppe Fristed', email: 'jf@aes-insight.dk', phone: '+45 60 56 82 60' },
      { name: 'Victoria Jacobsen', email: 'vj@aes-insight.dk', phone: '+45 23 90 88 19' },
      { name: 'Thea Brunebjerg Høgh', email: 'tbh@aes-insight.dk', phone: '+45 61 31 73 66' },
      { name: 'Marius Greve Philipsen', email: 'mgp@aes-insight.dk', phone: '+45 29 46 53 97' },
      { name: 'Christopher Faurholt Fast', email: 'cff@aes-insight.dk', phone: '+45 28 99 26 96' },
      { name: 'Michael Dao', email: 'md@aes-insight.dk', phone: '+45 60 59 52 52' },
      { name: 'Karam Alchamat', email: 'ka@aes-insight.dk', phone: '+45 89 89 56 45' }
    ]

    contacts.forEach(contact => {
      expect(screen.getByText(contact.name)).toBeInTheDocument()
      expect(screen.getByText(contact.email)).toBeInTheDocument()
      expect(screen.getByText(contact.phone)).toBeInTheDocument()
    })
    
    // Check for footer
    expect(screen.getByText('2025 AES-Insight. All rights reserved.')).toBeInTheDocument()
  })

  it('renders without sidebar on mobile', () => {
    // Mock desktop context to false
    vi.mocked(useIsDesktop).mockReturnValue(false)
    
    render(<ContactPage />, { wrapper: TestWrapper })
    
    // Check that the page still renders correctly
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    
    // Verify at least one contact is still visible
    expect(screen.getByText('Christopher Dolan')).toBeInTheDocument()
  })
}) 