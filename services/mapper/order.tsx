import { OrderDetail, OrderStatus } from '@/types/orders'
import { BaseResponse } from '../core/BaseRequest'
import { parseNFT } from './utils'

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
    data: {
      orderId: response.id_create,
      status: response.status as OrderStatus,
      collectorFeeAddress: response.address_transfer_fee,
      paymentWallet: response.payment_wallet,
      feeRate: response.fee_rate,
      feeMint: response.fee_mint,
      gasFee: response.gas_fee,
      round: response.round,
      satsInInscription: response.sats_in_inscription,

      lockNFT: response.lock_nft,
      nfts: response.mint_list.map((item: any) => parseNFT(item)),
      qrCodeUrl: response.link_qr_code_image,
      createdAt: Number(response.time_create) * 1000,
    },
  }
}
