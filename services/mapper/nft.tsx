import { NFTFilterResponse } from '@/types/nft'
import { BaseResponse } from '../core/BaseRequest'
import { parseNFT } from './utils'

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
