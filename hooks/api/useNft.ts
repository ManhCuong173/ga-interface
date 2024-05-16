import { nftService } from '@/services/nft.service'
import { useQuery } from '@tanstack/react-query'

const getNft = async () => {
  const data = await nftService.filterNft()
  return data.data
}

const useNft = () => {
  return useQuery({
    queryKey: ['nft'],
    queryFn: () => getNft(),
  })
}

export default useNft
