import { Activity } from '@/types/activity'
import { BaseResponse, Paging } from '../core/BaseRequest'
import { parsePaging } from './utils'

export const ActivityInfoMapper = (rawResponse: string): BaseResponse<Paging<Activity>> => {
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
      paging: parsePaging(response),
      items: response.data.map((i: any) => ({
        title: i.title,
        buyer: i.address_buyer,
        seller: i.address_seller,
        price: i.price_nft,
        inscriptionId: i.inscription_id,
        inscriptionNumber: i.inscription_number,
        nftId: i.nft_id,
        number: i.number,
        nftUrl: i.nft_link,
        createdAt: i.time_exchange,
      })),
    },
  }
}
