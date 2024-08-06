import { UserAssetsResponse } from '@/types/asset'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'
import {
  ImportUserAuthRequest,
  ImportUserAuthResponse,
  UserRefCodeIdResponse,
  UserTotalRefResponse,
} from '@/types/user'

export const userService = {
  getUserAssets: async (address: string) =>
    (await axiosClient.get<UserAssetsResponse>(`${backend}/user/asset/${address}`)).data,
  importUserPubkey: async (data: { public_key: string; wallet_address: string }) =>
    (await axiosClient.post(`${backend}/user/import/pubkey`, data)).data,
  login: async (data: ImportUserAuthRequest) =>
    (await axiosClient.post<ImportUserAuthResponse>(`${backend}/user/auth`, data)).data,
  getRefCodeId: async () => (await axiosClient.get<UserRefCodeIdResponse>(`${backend}/user/get/ref_id`)).data,
  getTotalRef: async () => (await axiosClient.get<UserTotalRefResponse>(`${backend}/user/get/total_ref`)).data,
}

