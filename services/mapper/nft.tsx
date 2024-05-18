import { NFT, NFTFilterResponse } from '@/types/nft'
import { BaseResponse } from '../core/BaseRequest'

const parseNFT = (data: any): NFT => ({
  id: data.id_nft,
  isMint: data.is_mint,
  natural: data.natural_number,
  url: data.nft_link,
  round: data.round,
})

export const NFTFilterMapper = (rawResponse: string): BaseResponse<NFTFilterResponse> => {
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
      current: response.currentPage,
      total: response.totalPages,
      nfts: response.data.map((item: any) => parseNFT(item)),
    },
  }
}
