import decor from '@/images/about/decor.png'
import Image from 'next/image'
import fireIcon from '@/images/five-elements/fire.svg'
import earthIcon from '@/images/five-elements/earth.svg'
import metalIcon from '@/images/five-elements/mental.svg'
import woodIcon from '@/images/five-elements/wood.svg'
import waterIcon from '@/images/five-elements/water.svg'
import { cards } from '@/constants/gallery-card.constant'
import Card from '../home/nft-gallery/card'

export default function Elementals() {
  return (
    <div className='mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pb-10 pt-[60px] lg:gap-16 lg:px-0 lg:pb-[146.19px]'>
      <div className='flex flex-col items-center lg:gap-8'>
        <Image src={decor} alt='' className='mx-auto lg:h-[62.81px] lg:w-[784.28px]' />
        <h2 className='text-3xl font-semibold leading-[44px] text-black1 lg:text-5xl'>
          ELEMENTALS
        </h2>
      </div>
      <div className='grid h-fit gap-4 lg:grid-cols-5'>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  )
}
