import { ButtonProps } from './Button.types'
import './Button.css'

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className="button-confirm" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
