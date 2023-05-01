import { render } from '@testing-library/react'
import { PastDays } from '../PastDays'

describe('PastDays component', () => {
  it('renders with the correct date and time', () => {
    const { getByText } = render(<PastDays date="2022-05-01" time="12:30" />)
    expect(getByText('2022-05-01')).toBeInTheDocument()
    expect(getByText('12:30')).toBeInTheDocument()
  })
})
