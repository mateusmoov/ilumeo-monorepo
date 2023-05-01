import { render } from '@testing-library/react'
import { PastDays } from '../PastDays'

describe('Componente PastDays', () => {
  it('renderiza com a data e hora corretas', () => {
    const { getByText } = render(<PastDays date="2022-05-01" time="12:30" />)
    expect(getByText('2022-05-01')).toBeInTheDocument()
    expect(getByText('12:30')).toBeInTheDocument()
  })
})
