import { UserAssetsResponse } from '@/types/asset'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const userService = {
  getUserAssets: async (address: string) =>
    (await axiosClient.get<UserAssetsResponse>(`${backend}/user/asset/${address}`)).data,
  importUserPubkey: async (data: {
    public_key: string
    wallet_address: string
  }) => (await axiosClient.post(`${backend}/user/import/pubkey`, data)).data,
}
