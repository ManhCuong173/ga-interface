import { motion } from 'framer-motion'
import Image from 'next/image'

export type Props = {
  background: string
  backgroundMobile: string
  icon: string
  symbol: string
  title: string
  body: string
  motionProps: any
}

export default function Card({ ...props }: Props) {
  return (
    <motion.div
      {...props.motionProps}
      className='flip-card group relative aspect-[382/220.47] lg:aspect-[235/480]'
    >
      <div className='flip-card-inner size-full'>
        {/* Front */}
        <div
          className='absolute inset-0'
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={props.background}
            alt=''
            fill
            className='hidden object-cover lg:inline-block'
          />
          <Image src={props.backgroundMobile} alt='' fill className='object-cover lg:hidden' />
        </div>

        {/* Back */}
        <div
          className='rotate absolute inset-0 flex flex-col items-center justify-between bg-[url(/images/home/nft-gallery/cards/background-mobile.png)] bg-full px-[22px] lg:bg-[url(/images/home/nft-gallery/cards/background.png)]'
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className='flex h-full flex-col items-center justify-center lg:justify-between'>
            <p className='relative z-[2] max-w-[314px] text-sm font-semibold leading-[22px] tracking-[-0.2px] text-black1 lg:mt-[72px] lg:max-w-[192px]'>
              {props.body}
            </p>
            <Image
              src={props.symbol}
              alt=''
              width={88}
              height={122}
              className='absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 opacity-10 lg:hidden'
            />
            <Image
              src={props.symbol}
              alt=''
              width={88}
              height={122}
              className='mb-[41px] hidden lg:inline'
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
