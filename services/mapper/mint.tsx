import { OrderCreateResponse, OrderStatus } from '@/types/orders'
import { BaseResponse } from '../core/BaseRequest'

export const CheckOrderMapper = (rawResponse: string): BaseResponse<OrderStatus> => {
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
    data: response.status as OrderStatus,
  }
}

export const CreateMintOrderMapper = (rawResponse: string): BaseResponse<OrderCreateResponse> => {
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
      orderId: response.id_create,
      paymentWallet: response.payment_wallet,
      feeMint: response.fee_mint,
      qrCodeUrl: response.qr_code,
    },
  }
}
