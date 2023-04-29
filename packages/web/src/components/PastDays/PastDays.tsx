import { PastDaysProps } from './PastDays.types'
import './PastDays.css'

export const PastDays = ({ date, time }: PastDaysProps) => {
  return (
    <div className="container">
      <div className="text-container">
        <span className="date-info">{date}</span>
        <span className="time-info">{time}</span>
      </div>
    </div>
  )
}
