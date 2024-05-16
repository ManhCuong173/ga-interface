'use client'

import { marketPlaceService } from '@/services/market.service'
import { NetworkAxiosResponse } from '@/types/market'
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from '../custom/useDebouce';


interface MarketProps {
  page: number;
  page_size: number;
  nftIds?: number[];
  nft?: string;
  number: string;
  order_by: string;
}


const getListMarkets = async (params: MarketProps) => {
  const data: NetworkAxiosResponse = await marketPlaceService.getMarket(params);
  return data;
}

const useMarket = ({ page, page_size, nftIds, number, order_by }: MarketProps) => {


  const debounceValue = useDebounce(number,200)

  return useQuery({
    queryKey: ['market', page, page_size, nftIds, debounceValue, order_by],
    queryFn: () => getListMarkets({
      page,
      page_size,
      nft: JSON.stringify(nftIds),
      number: number,
      order_by: order_by
    }),
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
  })
}

export default useMarket
