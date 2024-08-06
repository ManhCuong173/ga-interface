import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

type ParamsRemove = {
  publickey?: string
  public_key?: string
  wallet_address: string
  solana_wallet?: string
  signature?: string
}

export const profileService = {
  removeDiscord: async (params: ParamsRemove) => {
    return await axiosClient.put(
      `${backend}/profile/remove/discord?publickey=${params.publickey}&wallet_address=${params.wallet_address}`,
    )
  },
  removeTwitter: async (params: ParamsRemove) => {
    return await axiosClient.put(
      `${backend}/profile/remove/twitter?publickey=${params.publickey}&wallet_address=${params.wallet_address}`,
    )
  },
  getPoints: async <T>(params: T) => {
    return axiosClient.get(`${backend}/profile/point`, { params })
  },
  getProfileAssets: async <T>(userAddress: string) => {
    return axiosClient.get(`${backend}/user/asset/${userAddress}`)
  },
  bindTwitter: async <T>(params: T) => {
    return await axiosClient.get(`${backend}/profile/bind/twitter`, { params })
  },
  bindDiscord: async <T>(params: T) => {
    return await axiosClient.get(`${backend}/profile/bind/discord`, { params })
  },
  getProfileInfo: async <T>(params: T) => {
    return await axiosClient.get(`${backend}/profile`, { params })
  },
  uploadImage: async <T>(params: T) => {
    return await axiosClient.post(`${backend}/profile/get/image/link`, params)
  },
  editProfile: async <T>(params: T) => {
    return await axiosClient.put(`${backend}/profile/setting`, params)
  },
  bindSolana: async <T>(params: ParamsRemove) => {
    return await axiosClient.put(`${backend}/profile/bind/solana`, params)
  },
  removeSolana: async <T>(params: ParamsRemove) => {
    return axiosClient.put(`${backend}/profile/remove/solana`, params)
  },
}
