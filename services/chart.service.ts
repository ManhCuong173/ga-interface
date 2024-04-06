import { Transaction } from '@/types/chart'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const chartService = {
  getPriceVolume: async (idnft: number) =>
    (await axiosClient.get<Transaction[]>(`${backend}/chart/data`, { params: { idnft } })).data,
}
