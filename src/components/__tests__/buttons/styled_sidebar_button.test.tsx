import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StyledSidebarButton from '../../buttons/styled_sidebar_button'
import { faUser } from '@fortawesome/free-solid-svg-icons'

describe('StyledSidebarButton', () => {
  it('renders correctly with required props', () => {
    render(
      <StyledSidebarButton 
        icon={faUser}
        label="Test Button"
        isCollapsed={false}
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
      <StyledSidebarButton 
        icon={faUser}
        label="Test Button"
        isCollapsed={false}
        onClick={onClick}
      />
    )
    const button = screen.getByRole('button', { name: /test button/i })
    
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders differently when collapsed', () => {
    const { rerender } = render(
      <StyledSidebarButton 
        icon={faUser}
        label="Test Button"
        isCollapsed={false}
        onClick={() => {}}
      />
    )
    expect(screen.getByRole('button')).toHaveClass('justify-start')

    rerender(
      <StyledSidebarButton 
        icon={faUser}
        label="Test Button"
        isCollapsed={true}
        onClick={() => {}}
      />
    )
    expect(screen.getByRole('button')).toHaveClass('justify-center')
  })
}) 