import { nftTypes } from '@/constants/nft.constant'
import decor from '@/images/about/decor.png'
import elementalBlackIcon from '@/images/five-elements/elemental-black.svg'
import elementalIcon from '@/images/five-elements/elemental.svg'
import { NFTType } from '@/types/nft'
import Image from 'next/image'
import { useState } from 'react'
import { FireIcon } from '../ui/icons'
import { cn } from '@/lib/utils'
import { ButtonImage } from '../button'

const Title = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 px-4 lg:flex-row lg:items-center lg:gap-0 lg:px-0">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FireIcon />
          <h2 className="text-2xl tracking-[-0.48px] text-red-light font-bold">Limited auction</h2>
        </div>
        <p className="text-base font-normal font-Roboto tracking-[-0.42px] text-black1">
          Check out top ranking NFT artists on the NFT Marketplace.
        </p>
      </div>
    </div>
  )
}
export default function ComingSoon() {
  const [selectedNft, setSelectedNft] = useState<NFTType>(nftTypes[0])

  return (
    <div className="mx-auto max-w-container pt-4 lg:px-[60px] lg:pt-10  relative z-10">
      <div className="space-y-4">
        <Title />

        <div className="lg:overflow-x-[unset] no-scrollbar w-full overflow-x-auto px-4 lg:px-0">
          <div className="flex items-center flex-wrap gap-1">
            {nftTypes.map((nft) => (
              <ButtonImage
                varirant="outline"
                key={nft.id}
                className={cn(
                  nft.id === selectedNft.id ? ['border-red-light !border-2 bg-[#ef232c1a]'] : ['border-bgAlt'],
                  `min-w-[70px] w-min-w-[70px] h-10`,
                )}
                onClick={() => setSelectedNft(nft)}
              >
                {nft.id === 0 ? (
                  <span className={`text-black1 font-Roboto text-sm font-semibold leading-5 tracking-[-0.42px]`}>
                    {nft.label}
                  </span>
                ) : (
                  <Image src={nft.icon} alt="" width={24} height={24} />
                )}
              </ButtonImage>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-[218px] flex-col items-center justify-end pb-[33px] lg:h-[360px] lg:justify-center lg:pb-0">
        <div className="mt-[3.15px] leading-tight text-[47.1px] font-semibold text-red-light lg:text-[50px] ">
          COMING SOON
        </div>
      </div>
    </div>
  )
}
