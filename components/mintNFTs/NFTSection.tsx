import { NFT } from '@/types/nft'
import { NFTCard } from './NFTCard'


interface INfts {
  listNft: NFT[] | undefined
  isLoading?: boolean
  isPick?: boolean
  ableView?: boolean
  setNFT?: any
}

export const NFTSection = ({ listNft, isLoading, isPick, ableView, setNFT }: INfts) => {
  if (isLoading) {
    return <p className='h-[384px] text-center'>Loading collection ...</p>
  }

  if (isLoading) {
    return <p className='h-[384px] text-center'>Loading collection ...</p>
  }

  return (
    <div className='relative flex flex-col items-center gap-4 rounded border border-[#E5E4E3] p-4 max-sm:px-6'>
      {listNft && listNft.length > 0 ? (
        <div className='nft_list relative z-[1] grid h-[384px] w-full grid-cols-2 justify-between gap-x-[10px] gap-y-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4'>
          {listNft?.map((item, index) => (
            <NFTCard key={index} item={item} isPick={isPick} ableView={ableView} setNFT={setNFT} />
          ))}
        </div>
      ) : (
        <p className='h-[384px] text-center'>No NFTs</p>
      )}
    </div>
  )
}
