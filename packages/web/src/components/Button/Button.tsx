import { ButtonProps } from './Button.types'
import './Button.css'
import { ClipLoader } from 'react-spinners'

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className="button-confirm" onClick={onClick} disabled={disabled}>
      {disabled ? <ClipLoader size={15} color={'#fff'} loading={true} /> : children}
    </button>
  )
}
