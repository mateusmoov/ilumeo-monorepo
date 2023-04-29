import { PastDaysProps } from './PastDays.types'
import './PastDays.css'

export const PastDays = ({ date, hour }: PastDaysProps) => {
  return (
    <div className="container">
      <div className="text-container">
        <span className="date-container">{date}</span>
        <span className="hour-container">{hour}</span>
      </div>
    </div>
  )
}
