import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import StatusModal from '../../modals/status_modal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  status: 'loading' as const,
  message: 'Processing...'
}

describe('StatusModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state', () => {
    render(<StatusModal {...defaultProps} />)
    expect(screen.getByTestId('spinner-icon')).toBeInTheDocument()
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('renders success state', () => {
    render(<StatusModal {...defaultProps} status="success" message="Success!" />)
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(<StatusModal {...defaultProps} status="error" message="Error!" />)
    expect(screen.getByTestId('xmark-icon')).toBeInTheDocument()
    expect(screen.getByText('Error!')).toBeInTheDocument()
  })

  it('closes when clicking the close button', () => {
    render(<StatusModal {...defaultProps} />)
    
    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)
    
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('auto-closes after 2 seconds for success state', async () => {
    vi.useFakeTimers()
    render(<StatusModal {...defaultProps} status="success" />)
    
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    
    expect(defaultProps.onClose).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('auto-closes after 2 seconds for error state', async () => {
    vi.useFakeTimers()
    render(<StatusModal {...defaultProps} status="error" />)
    
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    
    expect(defaultProps.onClose).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('does not auto-close for loading state', async () => {
    vi.useFakeTimers()
    render(<StatusModal {...defaultProps} status="loading" />)
    
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    
    expect(defaultProps.onClose).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('does not render when isOpen is false', () => {
    render(<StatusModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByTestId('spinner-icon')).not.toBeInTheDocument()
  })
}) 