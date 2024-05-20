import { OrderDetail } from '@/types/orders'
import { BaseResponse, Paging } from '../core/BaseRequest'
import { parseOrderInfoDetail } from './utils'

export const OrderMintInfoMapper = (rawResponse: string): BaseResponse<OrderDetail> => {
  const response = JSON.parse(rawResponse)

  if (!response) {
    return {
      code: 'error',
      data: null,
    }
  }

  return {
    code: response.code,
    message: response.message,
    data: parseOrderInfoDetail(response),
  }
}

export const OrdersInfoMapper = (rawResponse: string): BaseResponse<Paging<OrderDetail>> => {
  const response = JSON.parse(rawResponse)
  if (!response) {
    return {
      code: 'error',
      data: null,
    }
  }

  return {
    code: response.code,
    message: response.message,
    data: {
      paging: {
        total: response.totalPages,
        page: response.currentPage,
      },
      items: response.data.map((item: any) => parseOrderInfoDetail(item)),
    },
  }
}
