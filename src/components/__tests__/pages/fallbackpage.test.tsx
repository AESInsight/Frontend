import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FallbackPage from '../../../components/pages/fallbackpage'

describe('FallbackPage', () => {
  it('renders the fallback page content', () => {
    render(<FallbackPage />)
    
    // Check for main headings
    expect(screen.getByText('Welcome to AESInsight')).toBeInTheDocument()
    expect(screen.getByText('AESInsight')).toBeInTheDocument()
    
    // Check for construction message
    expect(screen.getByText('The Webside is under construction')).toBeInTheDocument()
    
    // Check for feature descriptions
    expect(screen.getByText('Clear visualization of your pay difference')).toBeInTheDocument()
    expect(screen.getByText('For more information about us, visit our Github')).toBeInTheDocument()
  })

  it('renders all icons', () => {
    render(<FallbackPage />)
    
    // Check for helmet icon
    expect(screen.getByTestId('helmet-icon')).toBeInTheDocument()
    
    // Check for eye icon
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument()
    
    // Check for people group icon
    expect(screen.getByTestId('people-group-icon')).toBeInTheDocument()
  })
}) 