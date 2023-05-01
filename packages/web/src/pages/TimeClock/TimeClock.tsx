import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { Button } from '../../components/Button'
import { PastDays } from '../../components/PastDays'
import { useQuery } from '@tanstack/react-query'
import { getUserTimeRecords } from '../../services/api'
import './timeclock.css'

type TimeRecordType = {
  clockIn: string
  clockOut: string
  id: string
}

export const TimeClock = () => {
  const location = useLocation()

  const { data } = useQuery<TimeRecordType[]>({
    queryKey: ['games'],
    queryFn: () => getUserTimeRecords(location.state.code)
  })

  const formatDate = (date: string) => {
    const formattedDate = moment.utc(date).local().format('DD/MM/YYYY')
    return formattedDate
  }

  const formatHour = (clockIn: string, clockOut: string) => {
    const differenceInMilliseconds = moment(clockOut).diff(moment(clockIn))
    const formattedDifference = moment.utc(differenceInMilliseconds).format('HH[h] mm[m]')
    return formattedDifference
  }

  return (
    <>
      <section>
        <div className="time-clock-header">
          <p className="time-clock-title">Relógio de ponto</p>
          <div className="time-clock-user-info">
            <p className="time-clock-code">{location.state.code}</p>
            <p className="time-clock-user">Usuário</p>
          </div>
        </div>

        <div className="time-clock-hours">
          <p className="time-clock-time">00h 00m</p>
          <p className="time-clock-label">Horas de hoje</p>
        </div>
        <Button>Hora de entrada</Button>

        <div className="past-days">
          <p className="past-days-label">Dias anteriores</p>
          <div className="past-days-content">
            <ul>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <PastDays
                    date={formatDate(item.clockIn)}
                    time={formatHour(item.clockIn, item.clockOut)}
                    key={index}
                  />
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
