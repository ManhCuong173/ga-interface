import { NetworkFeeResponse } from './fee.d'
export type NetworkFeeResponse = {
  fee: {
    normal: number
    high: number
    custom: number
  }
}

export type NetworkFeeMintResponse = {
  fee_serivce: {
    network_fee: number
    service_base_fee: number
    fee_by_size: number
    total: number
    platform_fees: number
  }
}

export type NetworkFeeType = 'high' | 'normal' | 'custom'
