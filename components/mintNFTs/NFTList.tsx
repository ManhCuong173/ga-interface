import { NFT } from '@/types/nft'
import { SquareCheckIcon } from '../ui/icons'
import Image from 'next/image'

interface INfts {
  nfts: NFT[]
  isLoading: boolean
  selectedNFTs: NFT[]
  onSelectNFT: (nft: NFT) => void
}

const NFTCard: React.FC<{ onSelectNFT: () => void; nft: NFT; selected: boolean }> = ({
  nft,
  onSelectNFT,
  selected,
}) => {
  return (
    <div onClick={onSelectNFT} className="nft-card relative cursor-pointer w-full h-full overflow-hidden rounded-lg">
      <Image
        src={nft.url || ''}
        loader={() => nft.url || ''}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className="h-full w-full object-cover"
      />

      <div className="absolute cursor-pointer right-2 top-2">
        <SquareCheckIcon checked={selected} />
      </div>
    </div>
  )
}

const NFTList: React.FC<INfts> = ({ nfts, isLoading, selectedNFTs, onSelectNFT }) => {
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
            <div className="relative" key={`list-nft-mint-nft-${index}`}>
              <NFTCard
                key={`mint-nft-${nft.id}`}
                nft={nft}
                selected={Boolean(selectedNFTs?.includes(nft))}
                onSelectNFT={() => {
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
