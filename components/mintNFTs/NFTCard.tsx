import { cn } from '@/lib/utils'
import { NFT } from '@/types/nft'
import Image from 'next/image'

type Props = {
  nft: NFT
  onSelectNFT?: (nft: NFT) => void
  className?: string
}

const NFTCard: React.FC<Props> = ({ nft, className, onSelectNFT }) => {
  return (
    <div
      onClick={() => {
        if (onSelectNFT) {
          onSelectNFT(nft)
        }
      }}
      className={cn(
        'nft-card relative cursor-pointer hover:border-[#12B76A]  w-full h-full overflow-hidden rounded-lg',
        className,
      )}
    >
      <Image
        src={nft.nft_link}
        loader={() => nft.nft_link}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default NFTCard
