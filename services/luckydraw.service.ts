import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint';

export const luckyDraw = {
  getHistory: <T>(params: T) => {
    return axiosClient.get(`${backend}/reward/history`, { params })
  },
  getRounds: async () =>
    (await axiosClient.get<{ round: number; timecreate: number }[]>(`${backend}/reward/list`)).data,
}
