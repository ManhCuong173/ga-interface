export type GetPsbtRequest = {
  id_inscription: string
  list_txid_inscrtiption: string[]
  wallet_address: string
}

export type GetPsbtResponse = {
  data: {
    list_unspent_lock: {
      txid: string
      vout: number
    }[]
    psbt: string
  }
}

export type SellNftRequest = {
  address: string
  id_inscription: string
  list_unspent_lock: {
    txid: string
    vout: number
  }[]
  price: number
  psbt: string
  pubkey: string
}

export type CancelListingRequest = {
  id_inscription: string
  pubkey: string
}
