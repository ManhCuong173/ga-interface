import axiosClient from './axios-client'
import { BaseRequest, BaseResponse } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { backend } from './endpoint/endpoint'
import { APIEndpointEnum } from './core/endpoints'
import { NFT } from '@/types/nft'
import { OrderCreateResponse, OrderStatus } from '@/types/orders'

export const mintService = {
  createMintOrder: (data: any) => {
    return axiosClient.post(`${backend}/create/mint/order`, data)
  },
  mint: (data: any) => {
    return axiosClient.post(`${backend}/pay/mint`, data)
  },
  payWallet: (data: any) => {
    return axiosClient.post(`${backend}/wallet/mint/nft`, data)
  },
  confirm: (data: any) => {
    return axiosClient.post(`${backend}/mint/check`, data)
  },
}

class MintService extends GoldenRequest {
  public createMintOrder(data: {
    feeRate: number
    walletAddress: string
    gasFee: number
    nfts: NFT[]
    publickey: string
    satsInInscription: number
  }): BaseRequest<BaseResponse<OrderCreateResponse>> {
    const result = this._post(APIEndpointEnum.createMintOrder, {
      fee_rate: data?.feeRate,
      wallet_address: data.walletAddress,
      gas_fee: data.gasFee,
      mint_list: data.nfts.map((item) => ({
        nft_id: item.id,
        number: item.number,
      })),
      public_key: data.publickey,
      sats_in_inscription: data?.satsInInscription,
    })
    return result
  }
  public checkOrder(id: string): BaseRequest<BaseResponse<OrderStatus>> {
    const result = this._post(APIEndpointEnum.checkOrder, {
      id_create: id,
    })
    return result
  }
}

const instance = new MintService()
export default instance
