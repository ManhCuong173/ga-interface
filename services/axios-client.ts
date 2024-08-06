import store from '@/lib/store'
import axios from 'axios'

export const baseUrl: string = String(process.env.NEXT_PUBLIC_API_URL)

const axiosClient = axios.create({
  baseURL: baseUrl,
})

axiosClient.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.token

    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = token
    }

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

