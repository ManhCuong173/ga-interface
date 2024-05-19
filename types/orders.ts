import { NFT } from './nft'

export type Order = {
  id_create: string
  time_create: number
}

export enum OrderStatus {
  All = 'all',
  Ready = 'ready',
  Pending = 'pending',
  Inscribing = 'inscribing',
  Minted = 'minted',
  Closed = 'closed',
}

export type OrderDetail = {
  orderId: string
  status: OrderStatus

  collectorFeeAddress: string
  paymentWallet: string

  feeRate: number
  feeMint: number
  gasFee: number
  round: number

  satsInInscription: number

  nfts: NFT[]
  qrCodeUrl: string
  lockNFT: boolean

  createdAt: number
}

export type OrderCreateResponse = {
  orderId: string
  paymentWallet: string
  feeMint: number
  qrCodeUrl: string
}

export type FeeMintOrder = {
  rateFee: number
  totalFee: number
  satsInscription: number
  networkFee: number
}
