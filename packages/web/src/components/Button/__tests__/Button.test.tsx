import { render, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button component', () => {
  it('renders with the correct text', () => {
    const { getByText } = render(<Button>Click me!</Button>)
    expect(getByText('Click me!')).toBeInTheDocument()
  })

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Click me!</Button>)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables the button when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Click me!</Button>)
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })
})
