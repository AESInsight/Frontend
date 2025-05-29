import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Example Test', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })

  it('should render a button', async () => {
    render(<button>Click me</button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })
}) 