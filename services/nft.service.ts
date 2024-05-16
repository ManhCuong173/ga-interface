import { NFTCollectionResponse, NFTSoldResponse } from '@/types/nft'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const nftService = {
  getCollection: async () => (await axiosClient.get<NFTCollectionResponse>(`${backend}/nft/collection`)).data,
  getNFT: async (data: any) =>
    (await axiosClient.post<NFTCollectionResponse>(`${backend}/order/info`, data)).data,
  filterNft: async <T>(params?: T) =>
    (await axiosClient.get<NFTCollectionResponse>(`${backend}/filter/nft`, { params })).data,
  getNFTDetail: async (data: any) =>
    (await axiosClient.post<NFTCollectionResponse>(`${backend}/inscription/info`, data)).data,
  getSold: async () => (await axiosClient.get<NFTSoldResponse>(`${backend}/nft/sold`)).data,
}
