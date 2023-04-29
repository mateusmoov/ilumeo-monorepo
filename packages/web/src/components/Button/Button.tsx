import { ButtonProps } from './Button.types'
import './Button.css'

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="button-confirm" {...props}>
      {children}
    </button>
  )
}
