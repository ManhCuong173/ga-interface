import { NFT } from '@/types/nft'
import { OrderStatus } from '@/types/orders'

export const parseNFT = (data: any): NFT => ({
  id: data.nft_id || data.id_nft,
  natural: data.natural_number,
  url: data.nft_link,
  round: data.round,
  number: data.number,
  price: data.price,
})

export const parseOrderInfoDetail = (data: any) => ({
  orderId: data.id_create,
  status: data.status as OrderStatus,
  collectorFeeAddress: data.address_transfer_fee,
  paymentWallet: data.payment_wallet,
  feeRate: data.fee_rate,
  feeMint: data.fee_mint,
  gasFee: data.gas_fee,
  round: data.round,
  satsInInscription: data.sats_in_inscription,

  lockNFT: data.lock_nft,
  nfts: data.mint_list.map((item: any) => parseNFT(item)),
  qrCodeUrl: data.link_qr_code_image,
  createdAt: Number(data.time_create) * 1000,
})
