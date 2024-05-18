import { NetworkFeeMint, NetworkFee } from '@/types/fee'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'
import { GoldenRequest } from './core/GoldenRequest'
import { BaseRequest, BaseResponse } from './core/BaseRequest'
import { APIEndpointEnum } from './core/endpoints'
import { NFT } from '@/types/nft'

export const publicService = {
  getNetworkFee: async () => (await axiosClient.get<NetworkFee>(`${backend}/public/network/fee`)).data,
  // getNetworkFeeMint: async (data: {
  //   // id_nft: number
  //   network_fee: number
  //   sats_in_inscription: number
  // }) => (await axiosClient.post<NetworkFeeMint>('public/network/fee/mint', data)).data,
  getNetworkFeeMint: async (data: any) =>
    (await axiosClient.post<NetworkFeeMint>(`${backend}/public/network/fee/mint`, data)).data,
}

class FeeService extends GoldenRequest {
  public getNetworkFee(): Promise<BaseResponse<NetworkFee>> {
    return this._get(APIEndpointEnum.fee)
  }
  public getNetworkFeeMint(data: {
    satsInInscription: number
    fee: number
    mintList: NFT[]
  }): BaseRequest<BaseResponse<NetworkFeeMint>> {
    const result = this._post(APIEndpointEnum.feeMint, {
      sats_in_inscription: data.satsInInscription,
      network_fee: data.fee,
      mint_list: data.mintList.map((item) => ({
        nft_id: item.id,
        number: item.number,
      })),
    })
    return result
  }
}

const instance = new FeeService()
export default instance
