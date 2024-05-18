export type NFT = {
  id_nft?: number
  nft_link?: string
  price?: number
  base_64?: string
  format?: string
  size?: number
  number?: string
  is_min?: boolean

  id?: number
  url?: string
  natural?: string
  isMint?: boolean
  round?: number
}

export type NFTCollectionResponse = {
  nft_collection: NFT[]
  data: NFT[]
}

export type NFTFilterResponse = {
  current: number
  total: number
  nfts: NFT[]
}

export type NFTType = {
  id: number
  label: string
  color: string
  icon: any
  blackIcon?: any
}

export type NFTDetail = {
  address: string
  charms: any[]
  children: any[]
  content_length: number
  content_type: string
  genesis_fee: number
  genesis_height: number
  inscription_id: string
  inscription_number: number
  next: string
  output_value: number
  parent: any
  previous: string
  rune: any
  sat: any
  satpoint: string
  content: string
  view: string
  timestamp: number
}

export type NFTSoldResponse = {
  mint_count: number
  total_sold: number
}
