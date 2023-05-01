import { render, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Componente de botão', () => {
  it('renderiza com o texto correto', () => {
    const { getByText } = render(<Button>Clique em mim!</Button>)
    expect(getByText('Clique em mim!')).toBeInTheDocument()
  })

  it('chama a função onClick quando clicado', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Clique em mim!</Button>)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('desabilita o botão quando a propriedade disabled é verdadeira', () => {
    const { getByRole } = render(<Button disabled>Clique em mim!</Button>)
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })
})
