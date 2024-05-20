import { NFT } from '@/types/nft'

export const parseNFT = (data: any): NFT => ({
  id: data.nft_id || data.id_nft,
  natural: data.natural_number,
  url: data.nft_link,
  round: data.round,
  number: data.number,
  price: data.price,
})
