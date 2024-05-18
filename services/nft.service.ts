import { NFTCollectionResponse, NFTFilterResponse, NFTSoldResponse } from '@/types/nft'
import axiosClient from './axios-client'
import { BaseRequest, BaseResponse } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { APIEndpointEnum } from './core/endpoints'
import { backend } from './endpoint/endpoint'

export const nftService = {
  getCollection: async () => (await axiosClient.get<NFTCollectionResponse>(`${backend}/nft/collection`)).data,
  getNFT: async (data: any) => (await axiosClient.post<NFTCollectionResponse>(`${backend}/order/info`, data)).data,
  filterNft: async <T>(params?: T) =>
    (await axiosClient.get<NFTCollectionResponse>(`${backend}/filter/nft`, { params })).data,
  getNFTDetail: async (data: any) =>
    (await axiosClient.post<NFTCollectionResponse>(`${backend}/inscription/info`, data)).data,
  getSold: async () => (await axiosClient.get<NFTSoldResponse>(`${backend}/nft/sold`)).data,
}

class NFTService extends GoldenRequest {
  public getCollection(): Promise<BaseResponse<NFTCollectionResponse>> {
    return this._get(APIEndpointEnum.nftCollection)
  }
  public getNFTDetail(): BaseRequest<BaseResponse<NFTCollectionResponse>> {
    const result = this._post(APIEndpointEnum.nftDetail)
    return result
  }
  public getOrderInfo(): BaseRequest<BaseResponse<NFTCollectionResponse>> {
    const result = this._post(APIEndpointEnum.orderInfo)
    return result
  }
  public filterNft(filter: {
    number: number | null
    elements?: number[]
    size: number
  }): Promise<BaseResponse<NFTFilterResponse>> {
    return this._get(APIEndpointEnum.filterNft, {
      number: filter.number,
      nft: JSON.stringify(filter.elements || []),
      page_size: filter.size,
    })
  }
  public getSold(): Promise<BaseResponse<NFTCollectionResponse>> {
    return this._get(APIEndpointEnum.nftDetail)
  }
}

const instance = new NFTService()
export default instance
