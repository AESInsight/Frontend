import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminButton from '../../../buttons/header_buttons/admin_button'
import { BrowserRouter } from 'react-router-dom'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('AdminButton', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <AdminButton />
      </BrowserRouter>
    )
    const button = screen.getByRole('button', { name: /admin/i })
    expect(button).toBeInTheDocument()
  })

  it('navigates when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <BrowserRouter>
        <AdminButton />
      </BrowserRouter>
    )
    const button = screen.getByRole('button', { name: /admin/i })
    
    await user.click(button)
    expect(mockNavigate).toHaveBeenCalledWith('/admin')
  })
}) 