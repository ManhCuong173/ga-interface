import { CancelListingRequest, GetPsbtRequest, GetPsbtResponse, SellNftRequest } from '@/types/list'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const listService = {
  getPsbt: async (data: GetPsbtRequest) =>
    (await axiosClient.post<GetPsbtResponse>(`${backend}/get/psbt/sell/nft`, data)).data,
  sellNft: async (data: SellNftRequest) => (await axiosClient.post(`${backend}/sell/nft`, data)).data,
  cancel: async (data: CancelListingRequest) =>
    (await axiosClient.delete(`${backend}/market/nft/remove`, { data: data })),
}
