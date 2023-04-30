import { useQuery } from '@tanstack/react-query'
import { Button } from '../../components/Button'
import { getUser } from '../../services/api'

import './home.css'

export const Home = () => {
  const { data } = useQuery({
    queryKey: ['games'],
    queryFn: () => getUser('4SXXFMF')
  })

  console.log(data)

  return (
    <section>
      <div className="container">
        <p className="title-home">
          Ponto <span className="title-bold">Ilumeo</span>
        </p>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="#4SXXFMF" />
          <label className="form-label">Código do usuário</label>
        </div>
        <Button>Confirmar</Button>
      </div>
    </section>
  )
}
