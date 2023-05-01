import { useState, useEffect } from 'react'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { Button } from '../../components/Button'
import { PastDays } from '../../components/PastDays'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getUserTimeRecords, statusUserWork } from '../../services/api'
import './timeclock.css'

type TimeRecordType = {
  clockIn: string
  clockOut: string
  id: string
}

export const TimeClock = () => {
  const location = useLocation()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [postTimeRecordValue, setPostTimeRecordValue] = useState('start')

  useEffect(() => {
    if (!isActive) {
      getTimeRecords.refetch()
    }
  }, [isActive])

  const getTimeRecords = useQuery<TimeRecordType[]>({
    queryKey: ['time-records'],
    queryFn: () => getUserTimeRecords(location.state.code),
    refetchOnWindowFocus: false
  })

  const currentDate = moment().format('YYYY-MM-DD')

  const amountOfTimeInMilliseconds = getTimeRecords.data
    ?.filter((timeRecord) => {
      return moment(timeRecord.clockIn).isSame(currentDate, 'day')
    })
    .reduce((acc, timeRecord) => {
      const differenceInMilliseconds = moment(timeRecord.clockOut).diff(moment(timeRecord.clockIn))
      return acc + differenceInMilliseconds
    }, 0)

  const amountOfTimeFormatted = moment.utc(amountOfTimeInMilliseconds).format('HH[h] mm[m]')

  const postTimeRecord = useMutation({
    mutationFn: (newTimeRecord: string) => statusUserWork(location.state.code, newTimeRecord)
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
            <p className="time-clock-code">#{location.state.code}</p>
            <p className="time-clock-user">Usuário</p>
          </div>
        </div>

        <div className="time-clock-hours">
          <p className="time-clock-time">{amountOfTimeFormatted}</p>
          <p className="time-clock-label">Horas de hoje</p>
        </div>
        <Button
          onClick={() => {
            postTimeRecord.mutate(postTimeRecordValue, {
              onSuccess: () => {
                setPostTimeRecordValue(postTimeRecordValue === 'start' ? 'stop' : 'start')
                setIsActive(!isActive)
              }
            })
          }}
        >
          {isActive ? 'Hora de saida' : 'Hora de entrada'}
        </Button>
        <div className="past-days">
          <p className="past-days-label">Dias anteriores</p>
          <div className="past-days-content">
            <ul>
              {Array.isArray(getTimeRecords.data) &&
                getTimeRecords.data.map((item, index) => (
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
