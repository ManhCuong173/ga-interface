'use client'

import Counter from '@/components/counter'
import { appearAnimation, flyInAnimation } from '@/constants/animation.constant'
import twolantern from '@/icons/home/twolantern.svg'
import buttonLuckyDrawHover from '@/images/home/button-lucky-draw-hover.png'
import buttonLuckyDraw from '@/images/home/button-lucky-draw.png'
import fourthPrice from '@/images/home/consolation-prize.png'
import firstPrice from '@/images/home/first-prize.png'
import secondPrice from '@/images/home/second-prize.png'
import specialPrice from '@/images/home/special-prize.png'
import thirdPrice from '@/images/home/third-prize.png'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { nftService } from '@/services/nft.service'
import { roundService } from '@/services/round.service'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import History from './history'
import YouPrize from './your-prize'

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
      id='section-lucky-draw'
      className='snap-start bg-[url(/images/commons/background-home-full.png)]  bg-cover bg-no-repeat text-_white'
    >
      <div className='items-center justify-center px-4 pb-[47.5px] pt-[45.5px] lg:flex lg:h-screen lg:p-0'>
        <div className='border-[1.852px] border-[#FACE5D] bg-white/10 p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:p-8 lg:backdrop-blur-[5px]'>
          <div
            className='relative flex max-h-full w-[780px] max-w-full flex-col gap-4 bg-full py-4 lg:gap-6 lg:py-6'
            style={{
              background: 'linear-gradient(180deg, #FFF4DD 0%, rgba(255, 244, 221, 0.45) 100%)',
            }}
          >
            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.3, delay: 0.5 }}
              className='flex h-9 items-center justify-center gap-2 lg:h-[68px]'
            >
              <span className='flex h-6 w-6 items-center justify-center lg:h-12 lg:w-12'>
                <Image
                  src={twolantern}
                  alt=''
                  className='h-[22.222px] w-[17.12px] lg:h-[44.444px] lg:w-[34.253px]'
                />
              </span>
              <span className='text-[32px] font-medium tracking-[-0.96px] text-red-light lg:text-5xl'>
                Lucky draw
              </span>
            </motion.div>
            <div className='flex justify-center gap-2 text-[#9F232D]'>
              <motion.button
                {...flyInAnimation}
                transition={{ duration: 0.4, delay: 1 }}
                className='h-[34px] w-[61px] rounded-[54px] bg-yellow1 text-xs font-medium leading-[28px] tracking-[-0.54px] lg:h-11 lg:w-[88px] lg:text-lg'
              >
                Prize
              </motion.button>
              <motion.button
                {...flyInAnimation}
                transition={{ duration: 0.4, delay: 1.3 }}
                className='flex h-[34px] w-[68.51892px] cursor-pointer items-center justify-center text-xs opacity-50 lg:h-11 lg:w-[110px] lg:text-lg'
                onClick={() => setShowHistory(true)}
              >
                HISTORY
              </motion.button>
            </div>
            <motion.div
              {...appearAnimation}
              transition={{ duration: 0.3, delay: 2 }}
              className='flex flex-col items-center gap-2 px-10 lg:gap-3'
            >
              <div className='text-xs font-medium leading-[18px] tracking-[-0.54px] text-[#9F232D] lg:text-lg lg:leading-7'>
                TOTAL NFT SOLDS THIS rOUND
              </div>
              <div className='relative h-2.5 w-full rounded-[104px] bg-[#ECDEC7] lg:h-6'>
                <div
                  className='absolute left-0 h-full rounded-[70px]'
                  style={{
                    background: 'linear-gradient(270deg, #FF9534 23.31%, #E14E4D 100%)',
                    width: nftSoldData
                      ? `${(nftSoldData.mint_count / nftSoldData.total_sold) * 100}%`
                      : 10,
                  }}
                ></div>
              </div>
              <div className='text-xs font-medium tracking-[-0.54px] text-[#9F232D] lg:text-lg'>
                {isLoadingNftSold ? (
                  'is loading ...'
                ) : nftSoldData ? (
                  <>
                    <Counter value={nftSoldData.mint_count} />/{nftSoldData.total_sold}
                  </>
                ) : (
                  'no data'
                )}
              </div>
            </motion.div>
            <div className='flex px-4 lg:justify-between lg:px-10'>
              <motion.div
                {...flyInAnimation}
                transition={{ duration: 0.4, delay: 2.5 }}
                className='items-centers flex flex-col justify-center gap-1 lg:gap-2'
              >
                <div className='relative mx-auto h-[43px] w-[43px] rounded-full lg:h-20 lg:w-20'>
                  <Image src={specialPrice} alt='' fill />
                </div>
                <div className='flex flex-col items-center gap-[2px] lg:gap-1'>
                  <span className='text-sm font-semibold text-orange lg:text-2xl'>
                    {isLoadingRoundActivated
                      ? 'loading'
                      : roundActivatedData
                        ? roundActivatedData.reward.Special
                        : 'no data'}
                  </span>
                  <span className='text-center text-[10px] font-light tracking-[-0.3px] text-[#9F232D] lg:text-sm'>
                    Special Prize
                  </span>
                </div>
              </motion.div>
              <div className='flex gap-[16.52px] lg:gap-8'>
                <motion.div
                  {...flyInAnimation}
                  transition={{ duration: 0.4, delay: 2.7 }}
                  className='items-centers flex flex-col justify-center gap-1 lg:gap-2'
                >
                  <div className='relative mx-auto flex h-[43px] w-[43px] items-center justify-center rounded-full lg:h-20 lg:w-20'>
                    <Image src={firstPrice} alt='' fill />
                  </div>
                  <div className='flex flex-col items-center gap-[2px] lg:gap-1'>
                    <span className='text-sm font-semibold text-orange lg:text-2xl'>
                      {isLoadingNftSold
                        ? 'loading'
                        : roundActivatedData
                          ? roundActivatedData.reward.Top1
                          : 'no data'}
                    </span>
                    <span className='text-center text-[10px] font-light tracking-[-0.3px] text-[#9F232D] lg:text-sm'>
                      1ST Prize
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  {...flyInAnimation}
                  transition={{ duration: 0.4, delay: 2.9 }}
                  className='items-centers flex flex-col justify-center gap-1 lg:gap-2'
                >
                  <div className='relative mx-auto flex h-[43px] w-[43px] items-center justify-center rounded-full lg:h-20 lg:w-20'>
                    <Image src={secondPrice} alt='' fill />
                  </div>
                  <div className='flex flex-col items-center gap-[2px] lg:gap-1'>
                    <span className='text-sm font-semibold text-orange lg:text-2xl'>
                      {isLoadingNftSold
                        ? 'loading'
                        : roundActivatedData
                          ? roundActivatedData.reward.Top2
                          : 'no data'}
                    </span>
                    <span className='text-center text-[10px] font-light tracking-[-0.3px] text-[#9F232D] lg:text-sm'>
                      2ND Prize
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  {...flyInAnimation}
                  transition={{ duration: 0.4, delay: 3.1 }}
                  className='items-centers flex flex-col justify-center gap-1 lg:gap-2'
                >
                  <div className='relative mx-auto flex h-[43px] w-[43px] items-center justify-center rounded-full lg:h-20 lg:w-20'>
                    <Image src={thirdPrice} alt='' fill />
                  </div>
                  <div className='flex flex-col items-center gap-[2px] lg:gap-1'>
                    <span className='text-sm font-semibold text-orange lg:text-2xl'>
                      {isLoadingNftSold
                        ? 'loading'
                        : roundActivatedData
                          ? roundActivatedData.reward.Top3
                          : 'no data'}
                    </span>
                    <span className='text-center text-[10px] font-light tracking-[-0.3px] text-[#9F232D] lg:text-sm'>
                      3RD Prize
                    </span>
                  </div>
                </motion.div>
              </div>
              <motion.div
                {...flyInAnimation}
                transition={{ duration: 0.4, delay: 3.3 }}
                className='items-centers flex flex-col justify-center gap-1 lg:gap-2'
              >
                <div className='relative mx-auto h-[43px] w-[43px] rounded-full lg:h-20 lg:w-20'>
                  <Image src={fourthPrice} alt='' fill />
                </div>
                <div className='flex flex-col items-center gap-[2px] lg:gap-1'>
                  <span className='text-sm font-semibold text-orange lg:text-2xl'>
                    {isLoadingNftSold
                      ? 'loading'
                      : roundActivatedData
                        ? roundActivatedData.reward.Consolation
                        : 'no data'}
                  </span>
                  <span className='text-center text-[10px] font-light tracking-[-0.3px] text-[#9F232D] lg:text-sm'>
                    Consolation Prize
                  </span>
                </div>
              </motion.div>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <motion.div
                {...appearAnimation}
                transition={{ duration: 0.4, delay: 4 }}
                className='flex h-[26px] items-center rounded bg-[#FF6634] bg-opacity-20 px-4 text-center text-xs font-medium tracking-[-0.36px] text-orange lg:h-7 lg:rounded-lg lg:text-sm lg:tracking-[-0.54px]'
              >
                <Link href='/inscribe'>GET A CHANCE TO WIN the price now !!!!</Link>
              </motion.div>
              <motion.div {...appearAnimation} transition={{ duration: 0.4, delay: 4.5 }}>
                <button
                  className='group relative flex h-[63px] w-[341px] cursor-pointer items-center justify-center text-[#9F232D]'
                  onClick={async () => {
                    if (address) {
                      setShowYourPrize(true)
                    } else {
                      typeof window !== 'undefined' &&
                        (await (window as any).unisat.requestAccounts())
                    }
                  }}
                >
                  <Image
                    src={buttonLuckyDraw}
                    alt=''
                    height={55}
                    width={333}
                    className='absolute inset-1'
                  />
                  <Image
                    src={buttonLuckyDrawHover}
                    alt=''
                    width={341}
                    height={63}
                    className='absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100'
                  />
                  <span className='relative text-base font-medium leading-6 tracking-[-0.03em] text-text-white'>
                    {address ? 'CHECK YOUR PRIZE' : 'CONNECT WALLET'}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <History open={showHistory} onClose={() => setShowHistory(false)} />
      <YouPrize open={showYourPrize} onClose={() => setShowYourPrize(false)} />
    </div>
  )
}
