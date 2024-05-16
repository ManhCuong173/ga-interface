import { NFT } from '@/types/nft'
import { SquareCheckIcon } from '../ui/icons'
import NFTCard from './NFTCard'

interface INfts {
  nfts: NFT[]
  isLoading?: boolean
  selectedNFTs?: NFT[]
  canPick?: boolean
  onSelectNFT?: (nft: NFT) => void
}

const NFTSection: React.FC<INfts> = ({ nfts, isLoading, canPick, selectedNFTs, onSelectNFT }) => {
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
          {nfts?.map((nft, index) => (
            <div className="relative">
              <NFTCard className="" key={index} nft={nft} onSelectNFT={onSelectNFT} />
              {canPick && (
                <div
                  className="absolute cursor-pointer right-2 top-2"
                  onClick={() => {
                    onSelectNFT && onSelectNFT(nft)
                  }}
                >
                  <SquareCheckIcon checked={selectedNFTs?.includes(nft)} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="flex flex-1 items-center justify-center text-center">No NFTs</p>
      )}
    </div>
  )
}
export default NFTSection
