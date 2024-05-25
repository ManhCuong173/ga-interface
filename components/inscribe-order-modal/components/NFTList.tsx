import { cn } from '@/lib/utils'
import { NFT } from '@/types/nft'
import Image from 'next/image'

interface INfts {
  nfts: NFT[]
  isLoading: boolean
  onSelectNFT: (nft: NFT) => void
}

const NFTCard: React.FC<{ nft: NFT; onSelect: () => void }> = ({ nft, onSelect }) => {
  return (
    <div
      // onClick={onSelect}
      className={cn('nft-card relative w-full h-full overflow-hidden rounded-lg')}
    >
      <Image
        src={nft.url || ''}
        loader={() => nft.url || ''}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  )
}

const NFTList: React.FC<INfts> = ({ nfts, isLoading, onSelectNFT }) => {
  if (isLoading) {
    return (
      <p className="relative flex flex-col items-center justify-center gap-4 rounded h-[500px] text-center">
        Loading collection ...
      </p>
    )
  }

  return (
    <div className="relative flex flex-col items-center gap-4 rounded h-[500px] text-center">
      {nfts && nfts.length > 0 ? (
        <div className="nft_list relative grid  w-full grid-cols-2 justify-between gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {nfts?.map((nft: NFT, index: number) => (
            <div className="relative" key={`list-nft-inscribe-modal-${index}`}>
              <NFTCard
                nft={nft}
                onSelect={() => {
                  onSelectNFT(nft)
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="flex flex-1 items-center justify-center text-center">No NFTs</p>
      )}
    </div>
  )
}
export default NFTList
