'use client'

import { appearAnimation, flyInAnimation } from '@/constants/animation.constant'

import { ButtonImage } from '@/components/button'
import { urlRoute } from '@/constants/routes'
import fourthPrice from '@/images/home/consolation-prize.png'
import firstPrice from '@/images/home/first-prize.png'
import secondPrice from '@/images/home/second-prize.png'
import specialPrice from '@/images/home/special-prize.png'
import thirdPrice from '@/images/home/third-prize.png'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { nftService } from '@/services/nft.service'
import { roundService } from '@/services/round.service'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import WrapperHero from '../WrapperHero'
import History from './history'
import YouPrize from './your-prize'

const CardPrize: React.FC<{
  prizeAsset: StaticImageData
  isLoading?: boolean
  data?: string | number
  title: string
}> = ({ prizeAsset, data, isLoading, title }) => {
  return (
    <motion.div
      {...flyInAnimation}
      transition={{ duration: 0.4, delay: 1.7 }}
      className="flex flex-col items-center justify-center gap-1 lg:gap-2"
    >
      <div className="relative mx-auto w-10 h-10 rounded-full lg:h-[78px] lg:w-[78px] mb-[2px]">
        <Image src={prizeAsset} alt="Prize Asset" fill />
      </div>
      <span className="text-center text-[3.2vw] sm:text-base font-medium  text-red-light lg:text-lg">
        {isLoading ? 'loading' : data ? data : 'No Data'}
      </span>
      <span className="text-center text-[2.8vw] sm:text-xs leading-tight font-normal tracking-[-0.3px] text-black1 font-Roboto">
        {title}
      </span>
    </motion.div>
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
      <motion.button
        {...flyInAnimation}
        transition={{ duration: 0.4, delay: 1 }}
        className="flex items-center justify-center h-[32px] w-[62px] rounded-[8px]  font-normal leading-[150%] tracking-[-0.54px] font-Roboto border-red-light border-[1px] py-[1px] px-[14px]"
      >
        Prize
      </motion.button>
      <motion.button
        {...flyInAnimation}
        transition={{ duration: 0.4, delay: 1 }}
        className="flex items-center justify-center h-[32px] w-[73px] rounded-[8px]  font-normal leading-[150%] tracking-[-0.54px] font-Roboto bg-[rgba(212,199,156,0.3)] text-text-secondary py-[1px] px-[14px]"
      >
        History
      </motion.button>
    </div>
  )
}
export default function LuckyDraw() {
  const address = useAppSelector(selectAddress)

  const [showHistory, setShowHistory] = useState(false)
  const [showYourPrize, setShowYourPrize] = useState(false)

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
      className="snap-start text-_white"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowYourPrize(true)
      }}
    >
      <WrapperHero src="/images/home/bg-lucky-draw.svg">
        <div className="flex h-14 w-[65vw] md:h-16 md:w-[58vw] absolute top-[-1px] right-0">
          <div className="w-[40%] md:w-[30%] bg-secondary opacity-[0.3]" />
          <div className="w-[60%] md:w-[70%] bg-secondary" />
        </div>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="bg-secondary border-[1.852px] rounded-lg lg:backdrop-blur-[5px] lg:max-w-[765px] w-full px-4 py-8 lg:px-10">
            <div className="relative flex max-h-full  flex-col gap-4 bg-full">
              <div className="flex flex-col">
                <motion.div
                  {...appearAnimation}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex h-9 items-center justify-center gap-2 lg:h-fit"
                >
                  <span className="text-2xl lg:text-[40px] font-semibold tracking-[-0.96px] text-red-light lg:text-5xl">
                    Lucky draw
                  </span>
                </motion.div>
                <CoupleButton className="flex lg:hidden mt-2" />
              </div>
              <div className="flex flex-col lg:flex-row w-full lg:justify-between mt-5 lg:mt-10">
                <motion.div
                  {...appearAnimation}
                  transition={{ duration: 0.3, delay: 1.25 }}
                  className="flex flex-col items-center lg:items-start "
                >
                  <div className="text-lg mb-[2px]  font-semibold leading-[100%] tracking-[-0.54px] text-black1 lg:text-lg lg:leading-7 font-Roboto">
                    Total NFT sold this round:
                  </div>
                  <div className="text-[21px] font-medium text-red-light tracking-tighter">
                    <span>50</span>/<span className="text-subtle">100</span>
                  </div>

                  {/* <div className='text-xs font-medium tracking-[-0.54px] text-[#9F232D] lg:text-lg'>
                    {isLoadingNftSold ? (
                      'is loading ...'
                    ) : nftSoldData ? (
                      <>
                        <Counter value={nftSoldData.mint_count} />/{nftSoldData.total_sold}
                      </>
                    ) : (
                      ''
                    )}
                  </div> */}
                </motion.div>

                <CoupleButton className="hidden lg:flex" />
              </div>

              <motion.div {...appearAnimation} transition={{ duration: 0.3, delay: 0.5 }}>
                <Progress
                  progress={nftSoldData ? (nftSoldData.mint_count / nftSoldData.total_sold) * 100 : 10}
                  className="mb-4 lg:mb-8"
                />
              </motion.div>

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
                  title={'1ST Prize'}
                />

                <CardPrize
                  prizeAsset={secondPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Top2}
                  title={'2ND Prize'}
                />

                <CardPrize
                  prizeAsset={thirdPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Top3}
                  title={'3RD Prize'}
                />

                <CardPrize
                  prizeAsset={fourthPrice}
                  isLoading={isLoadingNftSold}
                  data={roundActivatedData?.reward?.Consolation}
                  title={'Consolation Prize'}
                />
              </div>

              <div className="flex gap-2 justify-center items-center lg:gap-4 relative mt-4 lg:mt-10 mx-auto  w-full h-auto max-w-[450px] sm:h-12">
                <motion.div {...appearAnimation} transition={{ duration: 0.4, delay: 3 }} className="w-full h-full">
                  <ButtonImage
                    onClick={() => {
                      if (address) {
                        setShowYourPrize(true)
                      } else {
                        typeof window !== 'undefined' && (window as any).unisat.requestAccounts()
                      }
                    }}
                    varirant="light-double-asset"
                    className="text-[3vw] sm:text-base whitespace-nowrap lg:text-lg  font-medium text-red-light w-full h-full"
                  >
                    {address ? 'Check Your Prize' : 'Connect Wallet'}
                  </ButtonImage>
                </motion.div>
                <motion.div {...appearAnimation} transition={{ duration: 0.4, delay: 4 }} className="w-full h-full">
                  <Link href={urlRoute.inscribe}>
                    <ButtonImage
                      onClick={() => {
                        if (address) {
                          setShowYourPrize(true)
                        } else {
                          typeof window !== 'undefined' && (window as any).unisat.requestAccounts()
                        }
                      }}
                      varirant="primary-asset"
                      className="text-[3vw] sm:text-base whitespace-nowrap lg:text-lg  font-medium text-secondary w-full h-full"
                    >
                      Try Now
                    </ButtonImage>
                  </Link>
                </motion.div>
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
