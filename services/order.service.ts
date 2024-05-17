import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const orderService = {
  filterOrderInfo: (params?: any) => {
    return axiosClient.get(`${backend}/filter/list/order/info`, { params })
  },
  listOrderInfo: (params?: any) => {
    return axiosClient.post(`${backend}/list/order/info`, params)
  },
}
