import { NFT } from './nft'

export type OrderDetail = {
  id_create: string
  createAt: number
  mint_list: NFT[]
  status: any
  fee_rate: number
  fee_mint: number
  gas_fee: number
  link_qr_code_image?: string
  address_transfer_fee?: string
}
export type FeeMintOrder = {
  rateFee: number
  totalFee: number
  satsInscription: number
  networkFee: number
}
