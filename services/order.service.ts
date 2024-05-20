import { NFTCollectionResponse, NFTFilterResponse } from '@/types/nft'
import { OrderDetail } from '@/types/orders'
import axiosClient from './axios-client'
import { BaseResponse, BaseRequest } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { APIEndpointEnum } from './core/endpoints'
import { backend } from './endpoint/endpoint'

export const orderService = {
  filterOrderInfo: (params?: any) => {
    return axiosClient.get(`${backend}/filter/list/order/info`, { params })
  },
  listOrderInfo: (params?: any) => {
    return axiosClient.post(`${backend}/list/order/info`, params)
  },
}

class OrderService extends GoldenRequest {
  public getOrderMintInfo(data: { id: string; publicKey: string }): BaseRequest<BaseResponse<OrderDetail>> {
    const result = this._post(APIEndpointEnum.orderMintInfo, {
      id_create: data.id,
      public_key: data.publicKey,
    })
    return result
  }
}

const instance = new OrderService()
export default instance
