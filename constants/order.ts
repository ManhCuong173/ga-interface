import { OrderStatus } from '@/types/orders'

export const orderInfoDetail = {
  orderId: '',
  collectorFeeAddress: '',
  paymentWallet: '',
  feeMint: 0,
  feeRate: 0,
  gasFee: 0,
  round: 0,
  satsInInscription: 0,
  lockNFT: false,

  nfts: [],
  qrCodeUrl: '',
  status: OrderStatus.Ready,
  createdAt: Date.now(),
}
