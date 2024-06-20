'use client'

import { ButtonImage } from '@/components/button'
import Trans from '@/components/i18n/Trans'
import { urlRoute } from '@/constants/routes'
import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import fourthPrice from '@/icons/home/consoliadation-prize.svg'
import firstPrice from '@/icons/home/first-prize.svg'
import secondPrice from '@/icons/home/second-prize.svg'
import specialPrice from '@/icons/home/special-prize.svg'
import thirdPrice from '@/icons/home/third-prize.svg'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { nftService } from '@/services/nft.service'
import { roundService } from '@/services/round.service'
import { useQuery } from '@tanstack/react-query'
import { useInView } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import WrapperHero from '../WrapperHero'
import History from './history'
import YouPrize from './your-prize'
import { useAuthBitcoin } from '@/hooks/WalletProvider/useAuthBitcoin'
import { useLatestWallet } from '@/hooks/WalletProvider/useLatestWallet'

const CardPrize: React.FC<{
  prizeAsset: StaticImageData
  isLoading?: boolean
  data?: string | number
  title: string
}> = ({ prizeAsset, data, isLoading, title }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 lg:gap-1.5">
      <div className="relative mx-auto w-10 h-10 rounded-full lg:h-[78px] lg:w-[78px] mb-[2px]">
        <Image src={prizeAsset} alt="Prize Asset" fill />
      </div>
      <span className="text-center text-[3.2vw] sm:text-base font-medium  text-red-light lg:text-lg">
        {isLoading ? 'loading' : data ? data : 'No Data'}
      </span>
      <span className="text-center text-[16px] sm:text-xs leading-tight font-normal tracking-[-0.3px] text-black1 font-Roboto">
        {title}
      </span>
    </div>
  )
}

const Progress: React.FC<{ progress: number; className?: string }> = ({ progress = 10, className }) => {
  return (
    <div className={cn('relative h-2.5 w-full rounded-[104px] bg-[#D9D9D9] lg:h-3', className)}>
      <div
        className="absolute left-0 h-[12px] rounded-[8px] bg-red-light"
        style={{
          width: `${progress > 0 ? progress : 0}%`,
        }}
      ></div>
    </div>
  )
}

const CoupleButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-row justify-center gap-2 text-red-light', className)}>
      <div className="flex items-center justify-center h-[32px] w-[62px] rounded-[8px]  font-normal leading-[150%] tracking-[-0.54px] font-Roboto border-red-light border-[1px] py-[1px] px-[14px] cursor-pointer">
        <Trans>{'Prize'}</Trans>
      </div>
      <div
        className="flex items-center justify-center h-[32px] w-[73px] 
      rounded-[8px]  font-normal leading-[150%] tracking-[-0.54px] 
      font-Roboto  text-text-secondary py-[1px] px-[14px]
      cursor-pointer
      text-nowrap
      "
      >
        <Trans>{'History'}</Trans>
      </div>
    </div>
  )
}
export default function LuckyDraw() {
  const address = useAppSelector(selectAddress)

  const [showHistory, setShowHistory] = useState(false)
  const [showYourPrize, setShowYourPrize] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [ratioDimension, setRatioDimension] = useState(0)
  const isTablet = useMediaQuery('(min-width: 768px)')
  const ratio = !isTablet
    ? `calc(0px + ${(ratioDimension / 100) * 10}px)`
    : `calc(0px + ${(ratioDimension / 100) * 50}px)`

  const { login } = useAuthBitcoin()
  const wallet = useLatestWallet()

  useEffect(() => {
    const scroll = (event: any) => {
      const rootDiv = document.getElementById('root-div')
      const nftGallery = document.getElementById('section-nft-gallery')
      const nftGalleryOffsetHeight = Number(nftGallery?.offsetTop)
      const rootScrollTop = Number(rootDiv?.scrollTop)

      if (rootScrollTop - nftGalleryOffsetHeight >= 0) {
        setRatioDimension(rootScrollTop - nftGalleryOffsetHeight)
      }
    }
    if (isInView) {
      window.addEventListener('scroll', scroll, true)
    }
    ;() => window.removeEventListener('scroll', scroll, true)
  }, [isInView, ref])

  const { data: nftSoldData, isLoading: isLoadingNftSold } = useQuery({
    queryKey: ['nft-sold'],
    queryFn: nftService.getSold,
  })

  const { data: roundActivatedData, isLoading: isLoadingRoundActivated } = useQuery({
    queryKey: ['round-activated'],
    queryFn: async () => roundService.getActivated(),
  })

  return (
    <div
      id="section-lucky-draw"
      className="snap-center text-_white"
      onClick={(e) => {
        setShowHistory(true)
      }}
      ref={ref}
    >
      <WrapperHero src="/images/home/bg-lucky-draw.svg">
        <div className="flex justify-end h-14 md:h-16 md:w-full absolute top-[-1px] right-0">
          <div className={cn('bg-secondary opacity-[0.3] will-change-auto')} style={{ width: ratio }} />
          <div className="bg-secondary  will-change-auto " style={{ width: ratio }} />
        </div>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="bg-secondary border-[1.852px] rounded-lg lg:backdrop-blur-[5px] lg:max-w-[765px] w-full px-4 py-8 lg:px-10">
            <div className="relative flex max-h-full  flex-col gap-4 bg-full">
              <div className="flex flex-col">
                <div className="flex h-9 items-center justify-center gap-2 lg:h-fit">
                  <span className="text-2xl lg:text-[40px] font-semibold tracking-[-0.96px] text-red-light lg:text-5xl">
                    <Trans>{'LuckyDraw'}</Trans>
                  </span>
                </div>
                <CoupleButton className="flex lg:hidden mt-2" />
              </div>
              <div className="flex flex-col lg:flex-row w-full lg:justify-between mt-5 lg:mt-10">
                <div className="flex flex-col items-center lg:items-start ">
                  <div className="text-lg mb-[2px]  font-medium leading-[100%] tracking-[-0.54px] text-black1 lg:text-md lg:leading-7 font-Roboto">
                    <Trans>{'TotalNFTSoldRound'}</Trans>
                  </div>
                  <div className="text-[21px] font-medium text-red-light tracking-tighter">
                    <span>{nftSoldData?.mint_count || 0}</span>/
                    <span className="text-subtle">{nftSoldData?.total_sold || 0}</span>
                  </div>
                </div>

                <CoupleButton className="hidden lg:flex" />
              </div>

              <div>
                <Progress
                  progress={nftSoldData ? (nftSoldData.mint_count / nftSoldData.total_sold) * 100 : 10}
                  className="mb-4 lg:mb-8"
                />
              </div>

              <div className="grid grid-cols-5 gap-4  -mx-2 items-start lg:mx-0 lg:px-10">
                <CardPrize
                  prizeAsset={specialPrice}
                  isLoading={isLoadingRoundActivated}
                  data={roundActivatedData?.reward?.Special}
                  title={'Special Prize'}
                />

                <CardPrize
                  prizeAsset={firstPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Top1}
                  title={'1st Prize'}
                />

                <CardPrize
                  prizeAsset={secondPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Top2}
                  title={'2nd Prize'}
                />

                <CardPrize
                  prizeAsset={thirdPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Top3}
                  title={'3rd Prize'}
                />

                <CardPrize
                  prizeAsset={fourthPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Consolation}
                  title={'Consolation Prize'}
                />
              </div>

              <div className="flex gap-2 justify-center items-center lg:gap-4 relative mt-4 lg:mt-10 mx-auto  w-full h-auto max-w-[450px] sm:h-12">
                <div className="w-full h-full">
                  <ButtonImage
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (address) {
                        setShowYourPrize(true)
                      } else {
                        login(wallet)
                      }
                    }}
                    varirant="light-double-asset"
                    className="text-[3vw] sm:text-base whitespace-nowrap lg:text-lg  font-medium text-red-light w-full h-full font-Roboto capitalize"
                  >
                    <Trans>{address ? 'Check your prize' : 'Connect Wallet'}</Trans>
                  </ButtonImage>
                </div>
                <div className="w-full h-full">
                  <Link href={urlRoute.inscribe}>
                    <ButtonImage
                      varirant="primary-asset"
                      className="text-[3vw] sm:text-base whitespace-nowrap 
                      lg:text-lg  font-medium text-secondary w-full h-full 
                      font-Roboto capitalize"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <Trans>{'TryNow'}</Trans>
                    </ButtonImage>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperHero>

      <History open={showHistory} onClose={() => setShowHistory(false)} />
      <YouPrize open={showYourPrize} onClose={() => setShowYourPrize(false)} />
    </div>
  )
}
