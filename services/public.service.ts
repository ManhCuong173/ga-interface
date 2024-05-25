import { NetworkFee, NetworkFeeMint } from '@/types/fee'
import { NFT } from '@/types/nft'
import { BaseRequest, BaseResponse } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { APIEndpointEnum } from './core/endpoints'

class PublicService extends GoldenRequest {
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

const instance = new PublicService()
export default instance
