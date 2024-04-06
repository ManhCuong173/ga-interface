export type UserAsset = {
  id_create: string
  wallet_address: string
  id_inscription: string
  inscription_number: number
  nft_id: string
  number: string
  round: number
  link_image: string
  is_listing: boolean
}

export type UserAssetsResponse = {
  user_asset: UserAsset[]
}
