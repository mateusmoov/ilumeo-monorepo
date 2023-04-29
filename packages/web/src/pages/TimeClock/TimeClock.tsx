import { Button } from '../../components/Button'
import { PastDays } from '../../components/PastDays'
import data from '../../mocks/pastdaydata.json'
import './timeclock.css'

export const TimeClock = () => {
  return (
    <>
      <section>
        <div className="time-clock-header">
          <p className="time-clock-title">Relógio de ponto</p>
          <div className="time-clock-user-info">
            <p className="time-clock-code">#4SXXFMF</p>
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
              {data.map((item, index) => (
                <PastDays date={item.date} time={item.time} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
