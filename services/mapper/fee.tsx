import { BaseResponse } from '../core/BaseRequest'
import { NetworkFee, NetworkFeeMint } from '@/types/fee'

export const FeeMapper = (rawResponse: string): BaseResponse<NetworkFee> => {
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
      normal: response?.fee?.normal,
      high: response?.fee?.high,
      custom: response?.fee?.custom,
    },
  }
}

export const FeeMintMapper = (rawResponse: string): BaseResponse<NetworkFeeMint> => {
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
      networkFee: response?.fee_serivce?.network_fee,
      serviceBaseFee: response?.fee_serivce?.service_base_fee,
      feeBySize: response?.fee_serivce?.fee_by_size,
      total: response?.fee_serivce?.total,
      platFormFees: response?.fee_serivce?.platform_fees,
    },
  }
}
