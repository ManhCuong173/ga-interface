export type ItemMarket = {
  id_create: string
  address: string
  pubkey: string
  psbt: string
  price: number
  id_inscription: string
  status: boolean
  list_unspent_lock?: null
  time_created: number
  nft_link: string
  number: string
  nft_id: string
  inscription_number: number
}

export type FeeBuy = {
  platform_fees: number
  sats_in_inscription: number
  total: number
  value: number
}

export type NetworkAxiosResponse = {
  data: ItemMarket[]
  totalPages: number
}

export type ResResponsePsbtMarket = {
  psbt: string
}

/**
 * 
 * 
 * 
 *  {
          id_create: '766a0436-6f4b-46b4-abcb-55462031dfe6',
          address: 'tb1qhrn3se3gs3sx0s908gm4gxza3vagcgv8fwqvv4',
          pubkey: '',
          psbt: '',
          price: 0.00001,
          id_inscription: 
            '8d08091d2c4ed0b11ad4c608377996329e8a05853bbbe653dd6960ca0826e75ei0',
          status: false,
          list_unspent_lock: null,
          time_create: 0
        },
 */
