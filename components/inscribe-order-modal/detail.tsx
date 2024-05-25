import Image from 'next/image'
import sampleAvatar from '@/images/profile/avatar.png'

type Props = {
  order: number
  image: any
  name: string
  owner: string
  size: string
}

export default function Detail({ order, image, name, owner, size }: Props) {
  return (
    <div className='flex h-[60px] items-center justify-between rounded-lg bg-[#FFF8E7] px-4'>
      <div className='flex items-center gap-2'>
        <span className='inline h-5 w-5 text-right font-medium'>{order}.</span>
        <div className='relative h-11 w-11 overflow-hidden rounded'>
          <Image src={image} fill alt={name} />
        </div>
        <div>
          <div className='font-DKLemonYellowSun'>{name}</div>
          <div className='flex gap-2'>
            <span className='font-DKLemonYellowSun text-[12px]'>CREATE</span>
            <div className='flex items-center gap-[2px]'>
              <span className='relative inline-block h-[14.6px] w-[14.6px] overflow-hidden rounded-full'>
                <Image src={sampleAvatar} alt='' fill className='object-cover' />
              </span>
              <span className='text-[12px] text-primary'>{owner}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='font-medium text-[#A38738]'>12 KB</div>
    </div>
  )
}
