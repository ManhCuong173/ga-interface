import { nftTypes } from '@/constants/nft.constant'
import decor from '@/images/about/decor.png'
import elementalBlackIcon from '@/images/five-elements/elemental-black.svg'
import elementalIcon from '@/images/five-elements/elemental.svg'
import { NFTType } from '@/types/nft'
import Image from 'next/image'
import { useState } from 'react'

const allNftElement: NFTType = {
  id: 0,
  label: 'All',
  color: '#4E473F',
  icon: elementalIcon,
  blackIcon: elementalBlackIcon,
}

export default function ComingSoon() {
  const [selectedNft, setSelectedNft] = useState(allNftElement)

  return (
    <div className='mx-auto max-w-container pt-4 lg:px-[60px] lg:pt-10  relative z-10'>
      <div className='space-y-8'>
        <div className='flex flex-col items-start justify-start gap-4 px-4 lg:flex-row lg:items-center lg:gap-0 lg:px-0'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-full bg-red-light'></span>
              <h2 className='text-2xl font-medium leading-8 tracking-[-0.48px] text-black1'>
                Limited auction
              </h2>
            </div>
            <p className='text-sm font-light leading-5 tracking-[-0.42px] text-text-secondary'>
              Check out top ranking NFT artists on the NFT Marketplace.
            </p>
          </div>
        </div>
        <div className='lg:overflow-x-[unset] no-scrollbar w-full overflow-x-auto px-4 lg:px-0'>
          <div className='flex items-center gap-4'>
            {[allNftElement, ...nftTypes].map((nft) => (
              <button
                key={nft.id}
                className={`${nft.id === 0 ? 'w-[105px] min-w-[105px]' : 'w-[88px] min-w-[88px]'} flex h-12 items-center justify-center gap-2.5 rounded-full transition-all duration-500`}
                style={{
                  backgroundColor: nft.id === selectedNft.id ? nft.color : '#ffffff',
                }}
                onClick={() => setSelectedNft(nft)}
              >
                <Image
                  src={selectedNft.id !== 0 && nft.id === 0 ? nft.blackIcon! : nft.icon}
                  alt=''
                  width={nft.id === 0 ? 20 : 24}
                  height={nft.id === 0 ? 20 : 24}
                />
                {nft.id === 0 && (
                  <span
                    className={`${selectedNft.id === 0 ? 'text-white' : 'text-black1'} text-sm font-light leading-5 tracking-[-0.42px]`}
                  >
                    {nft.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='flex h-[218px] flex-col items-center justify-end pb-[33px] lg:h-[360px] lg:justify-center lg:pb-0'>
        {/* <Image
          src={header}
          alt=''
          width={95.08}
          height={85.48}
          className='h-[62.91px] w-[69.98px] lg:h-[85.48px] lg:w-[95.08px]'
        /> */}
        <Image
          src={decor}
          alt=''
          width={541}
          height={43.3}
          className='mx-auto h-[21.23px] w-[264.95px] lg:h-[28.85px] lg:w-[360px]'
        />
        <div
          className='mt-[3.15px] bg-gradient-to-b from-[#FFA234] to-[#F51D00] bg-clip-text text-[47.1px] font-semibold leading-[47.1px] text-transparent lg:text-[64px] lg:leading-[64px]'
          style={{
            textShadow: '2px 4px 0px 0px rgba(255, 0, 0, 0.21)',
          }}
        >
          COMING SOON
        </div>
      </div>
    </div>
  )
}
