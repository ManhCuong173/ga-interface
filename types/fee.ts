export type NetworkFee = {
  normal: number
  high: number
  custom: number
}

export type NetworkFeeMint = {
  networkFee: number
  serviceBaseFee: number
  feeBySize: number
  total: number
  platFormFees: number
}

export enum NetworkFeeEnum {
  High = 'high',
  Normal = 'normal',
  Custom = 'custom',
}

export type NetworkFeeType = NetworkFeeEnum
