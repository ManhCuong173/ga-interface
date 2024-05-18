import axios from 'axios'

const defaultHeader = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const baseUrl: string = String(process.env.NEXT_PUBLIC_API_ENDPOINT)

const axiosClient = axios.create({
  baseURL: baseUrl,
})

axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    throw error
  },
)

export default axiosClient
