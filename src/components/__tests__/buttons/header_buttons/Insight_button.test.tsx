import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InsightButton from '../../../buttons/header_buttons/Insight_button'
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

describe('InsightButton', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <InsightButton />
      </BrowserRouter>
    )
    const button = screen.getByRole('button', { name: /insight/i })
    expect(button).toBeInTheDocument()
  })

  it('navigates when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <BrowserRouter>
        <InsightButton />
      </BrowserRouter>
    )
    const button = screen.getByRole('button', { name: /insight/i })
    
    await user.click(button)
    expect(mockNavigate).toHaveBeenCalledWith('/insight')
  })
}) 