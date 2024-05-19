import { NetworkFeeMintResponse, NetworkFeeResponse } from '@/types/fee'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const publicService = {
  getNetworkFee: async () =>
    (await axiosClient.get<NetworkFeeResponse>(`${backend}/public/network/fee`)).data,
  // getNetworkFeeMint: async (data: {
  //   // id_nft: number
  //   network_fee: number
  //   sats_in_inscription: number
  // }) => (await axiosClient.post<NetworkFeeMintResponse>('public/network/fee/mint', data)).data,
  getNetworkFeeMint: async (data:any) => 
    (await axiosClient.post<NetworkFeeMintResponse>(`${backend}/public/network/fee/mint`, data)).data,

}
