import { OrderDetail, OrderStatus } from '@/types/orders'
import { BaseRequest, BaseResponse, Paging } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { APIEndpointEnum } from './core/endpoints'

class OrderService extends GoldenRequest {
  public getOrders(data: {
    orderId?: string
    publicKey?: string
    status?: OrderStatus
    size?: number
    page?: number
  }): Promise<BaseResponse<Paging<OrderDetail>>> {
    const result = this._get(APIEndpointEnum.orders, {
      public_key: data.publicKey,
      order_id: data.orderId,
      status: data.status === OrderStatus.All ? '' : data.status,
      page_size: data.size,
      page: data.page,
    })
    return result
  }
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
