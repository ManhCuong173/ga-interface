import { RoundActivatedResponse } from '@/types/round'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const roundService = {
  getActivated: async () =>
    (await axiosClient.get<RoundActivatedResponse>(`${backend}/round/actived`)).data.round,
}
