import decor from '@/images/mint/popup/frame-popup.svg'
import Image from 'next/image'

export const MintModalLayout = ({ className, children }: any) => {
  return (
    <div className={`${className} relative rounded-[4px] bg-white px-4 py-6 sm:p-[40px] `}>
      <Image src={decor} alt='' className='absolute sm:left-4 sm:top-4 left-[10px] top-[10px] ' />
      <div className='absolute sm:right-4 sm:top-4 right-[10px] top-[10px] rotate-90'>
        <Image src={decor} alt='' />
      </div>
      <div className='absolute sm:bottom-4 sm:left-4 bottom-[10px] left-[10px] -rotate-90'>
        <Image src={decor} alt='' />
      </div>
      <div className='absolute sm:bottom-4 sm:right-4 bottom-[10px] right-[10px] rotate-180'>
        <Image src={decor} alt='' />
      </div>
      <div className='relative z-10'>
        {children}
      </div>
    </div>
  )
}
