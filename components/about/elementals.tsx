import decor from '@/images/about/decor.png'
import Image from 'next/image'
import fireIcon from '@/images/five-elements/fire.svg'
import earthIcon from '@/images/five-elements/earth.svg'
import metalIcon from '@/images/five-elements/mental.svg'
import woodIcon from '@/images/five-elements/wood.svg'
import waterIcon from '@/images/five-elements/water.svg'

export default function Elementals() {
  return (
    <div className='mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pb-10 pt-[60px] lg:gap-16 lg:px-0 lg:pb-[146.19px]'>
      <div className='flex flex-col items-center lg:gap-8'>
        <Image src={decor} alt='' className='mx-auto lg:h-[62.81px] lg:w-[784.28px]' />
        <h2 className='text-3xl font-semibold leading-[44px] text-black1 lg:text-5xl'>
          ELEMENTALS
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-3 lg:grid-cols-5 lg:px-[71px]'>
        <div className='relative aspect-[382/220] bg-[url(/images/about/elementals/cards/fire-mobile.png)] bg-full lg:aspect-[235/480] lg:bg-[url(/images/about/elementals/cards/fire.png)]'>
          {/* <Image
            src={fireIcon}
            alt=''
            className='absolute inset-x-0 bottom-8 left-1/2 size-20 -translate-x-1/2 lg:bottom-[-40.51px] lg:size-[120px]'
          /> */}
        </div>
        <div className='relative aspect-[382/220] bg-[url(/images/about/elementals/cards/earth-mobile.png)] bg-full lg:aspect-[235/480] lg:bg-[url(/images/about/elementals/cards/earth.png)]'>
          {/* <Image
            src={earthIcon}
            alt=''
            className='absolute inset-x-0 bottom-8 left-1/2 size-20 -translate-x-1/2 lg:bottom-[-40.51px] lg:size-[120px]'
          /> */}
        </div>
        <div className='relative aspect-[382/220] bg-[url(/images/about/elementals/cards/metal-mobile.png)] bg-full lg:aspect-[235/480] lg:bg-[url(/images/about/elementals/cards/metal.png)]'>
          {/* <Image
            src={metalIcon}
            alt=''
            className='absolute inset-x-0 bottom-8 left-1/2 size-20 -translate-x-1/2 lg:bottom-[-40.51px] lg:size-[120px]'
          /> */}
        </div>
        <div className='relative aspect-[382/220] bg-[url(/images/about/elementals/cards/wood-mobile.png)] bg-full lg:aspect-[235/480] lg:bg-[url(/images/about/elementals/cards/wood.png)]'>
          {/* <Image
            src={woodIcon}
            alt=''
            className='absolute inset-x-0 bottom-8 left-1/2 size-20 -translate-x-1/2 lg:bottom-[-40.51px] lg:size-[120px]'
          /> */}
        </div>
        <div className='relative aspect-[382/220] bg-[url(/images/about/elementals/cards/water-mobile.png)] bg-full lg:aspect-[235/480] lg:bg-[url(/images/about/elementals/cards/water.png)]'>
          {/* <Image
            src={waterIcon}
            alt=''
            className='absolute inset-x-0 bottom-8 left-1/2 size-20 -translate-x-1/2 lg:bottom-[-40.51px] lg:size-[120px]'
          /> */}
        </div>
      </div>
    </div>
  )
}
