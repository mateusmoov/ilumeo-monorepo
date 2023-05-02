import toast, { Toaster } from 'react-hot-toast'
import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../components/Button'
import { getUser } from '../../services/api'

import './home.css'

export const Home = () => {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  useEffect(() => {
    const savedCode = localStorage.getItem('userCode')
    if (savedCode) {
      navigate('time-record', { state: { code: savedCode } })
    }
  }, [])

  const { isFetching, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: () => getUser(code),
    enabled: false,
    onSuccess: (data) => {
      if (data && data === true) {
        localStorage.setItem('userCode', code)
        navigate('time-record', { state: { code } })
      } else {
        toast.error('Usuário não encontrado')
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error('Erro na solicitação')
      }
    }
  })

  const getUserData = async () => {
    await refetch()
  }

  return (
    <section>
      <Toaster />
      <div className="container-home">
        <p className="title-home">
          Ponto <span className="title-bold">Ilumeo</span>
        </p>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="4SXXFMF"
            onChange={getInputValue}
            maxLength={7}
          />
          <label className="form-label">Código do usuário</label>
        </div>
        <Button onClick={getUserData} disabled={isFetching}>
          Confirmar
        </Button>
      </div>
    </section>
  )
}
