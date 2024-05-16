import { Distribution } from '@/types/owner'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const ownerService = {
  getDistribution: async (nftId: 1 | 2 | 3 | 4 | 5) =>
    (
      await axiosClient.get<Distribution>(`${backend}/owner/distribution`, {
        params: {
          idnft: nftId,
        },
      })
    ).data,
}
