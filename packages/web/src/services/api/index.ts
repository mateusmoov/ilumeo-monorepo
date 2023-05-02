import axios from 'axios'

const api = axios.create({
  baseURL: 'http://pontoilumeo.sytes.net:3000',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

//'

export const getUser = async (code: string) => {
  try {
    const response = await api.get(`/users/${code}`)
    return response.status === 200
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getUserTimeRecords = async (code: string) => {
  try {
    const response = await api.get(`/users/${code}/time-records`)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const statusUserWork = async (code: string, action: string) => {
  try {
    const response = await api.post(`/users/${code}/work`, { action })
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}
