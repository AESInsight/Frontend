import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StyledHeaderButton from '../../../buttons/header_buttons/styled_header_button'
import { faUser } from '@fortawesome/free-solid-svg-icons'

describe('StyledHeaderButton', () => {
  it('renders correctly with required props', () => {
    render(
      <StyledHeaderButton 
        icon={faUser}
        text="Test Button"
        onClick={() => {}}
      />
    )
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    
    render(
      <StyledHeaderButton 
        icon={faUser}
        text="Test Button"
        onClick={onClick}
      />
    )
    const button = screen.getByRole('button', { name: /test button/i })
    
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(
      <StyledHeaderButton 
        icon={faUser}
        text="Test Button"
        onClick={() => {}}
        className="custom-class"
      />
    )
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toHaveClass('custom-class')
  })
}) 