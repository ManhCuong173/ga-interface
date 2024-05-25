export type CreateQrCodeParamas = {
  amount_nft: number
  gas_fee: number
  nft_id: number
  sats_in_inscription: number
  wallet_address: string
}

export type CreateQrCodeResponse = {
  id_create: string
  qr_code_transfer: string
}
