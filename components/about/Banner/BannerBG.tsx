import React from 'react'
import frame_left from '@/images/aboutUs/frame-left.svg'
import frame_right from '@/images/aboutUs/frame-right.svg'
import bottom from '@/images/aboutUs/bottom.svg'
import apple from '@/images/aboutUs/apple.svg'
import Image from 'next/image'
import bg_img from '@/images/marketplace/background.png'
import bg_img_mb from '@/images/marketplace/background-mg.png'


type Props = {}

const Top = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="54" viewBox="0 0 56 54" fill="none">
      <path d="M1 54V37.986C1 37.4337 1.44772 36.986 2 36.986H18.6608C19.2131 36.986 19.6608 36.5383 19.6608 35.986V2C19.6608 1.44771 20.1086 1 20.6608 1H29.3416C29.8939 1 30.3416 1.44772 30.3416 2V11.3579C30.3416 11.92 29.8785 12.3716 29.3166 12.3576L1.97498 11.6732C1.43261 11.6596 1 11.2161 1 10.6735V2C1 1.44772 1.44772 1 2 1H11.4176C11.9698 1 12.4176 1.44772 12.4176 2V29.0091C12.4176 29.5614 11.9698 30.0091 11.4176 30.0091H2C1.44771 30.0091 1 29.5614 1 29.0091V20.7273C1 20.1751 1.44772 19.7273 2 19.7273H36.3393C36.8916 19.7273 37.3393 19.2796 37.3393 18.7273V2C37.3393 1.44771 37.7871 1 38.3393 1H56" stroke="#EF232C" stroke-width="2"/>
    </svg>
  )
}

const Bottom = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="46" viewBox="0 0 23 46" fill="none">
        <path d="M2.10204 13.0714L9.58348 20.6711C10.6852 21.7903 12.4923 21.7831 13.585 20.6551L20.9484 13.054C22.0634 11.9029 21.985 10.052 20.7765 8.99938L13.4146 2.58705C12.3681 1.67557 10.8115 1.66938 9.75785 2.5725L2.27502 8.98613C1.04475 10.0406 0.965308 11.9167 2.10204 13.0714Z" stroke="#EF232C" stroke-width="2"/>
        <path d="M2.10204 25.0313L9.58348 32.6311C10.6852 33.7503 12.4923 33.743 13.585 32.615L20.9484 25.0139C22.0634 23.8628 21.985 22.012 20.7765 20.9593L13.4146 14.547C12.3681 13.6355 10.8115 13.6293 9.75785 14.5325L2.27502 20.9461C1.04475 22.0006 0.965308 23.8766 2.10204 25.0313Z" stroke="#EF232C" stroke-width="2"/>
        <path d="M2.10204 35.8868L9.58348 43.4866C10.6852 44.6058 12.4923 44.5985 13.585 43.4705L20.9484 35.8694C22.0634 34.7183 21.985 32.8674 20.7765 31.8148L13.4146 25.4025C12.3681 24.491 10.8115 24.4848 9.75785 25.3879L2.27502 31.8016C1.04475 32.856 0.965308 34.7321 2.10204 35.8868Z" stroke="#EF232C" stroke-width="2"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="134" viewBox="0 0 13 134" fill="none">
        <path d="M6.5 0.527344L6.50001 127.527" stroke="#EF232C" stroke-width="2"/>
        <circle cx="6.5" cy="127.527" r="6" fill="#EF232C"/>
      </svg>
    </div>
  )
}

const BannerBG = (props: Props) => {
  return (
    <>
      <div className='relative h-[734px] w-full lg:block hidden'>
        <Image src={bg_img} alt='' className='w-full relative z-0'/>

        <div className='flex w-full justify-center lg:justify-between absolute inset-0 z-10  translate-y-[-50px] px-5'>
          <Image src={frame_left} alt='' className='max-lg:hidden' />
          <Image src={apple} alt='' />
          <Image src={frame_right} alt='' className='max-lg:hidden' />
        </div>
        {/* <Image src={bottom} alt='' className='absolute bottom-0 left-0 right-0 mx-auto' /> */}
      </div>
      <div className='lg:hidden block w-full relative h-[568px]'>
        <Image src={bg_img_mb} alt='' className='w-full relative z-0'/>
        <div className='w-full h-full justify-center items-center flex absolute inset-0 z-10'>
          <Image src={apple} width={258} alt='' className='' />
        </div>


        <div className='w-full h-[568px] flex flex-col justify-between absolute inset-0 z-20 p-5'>
          <div className='w-full flex justify-between'>
            <Top/>
            <div className='rotate-90'>
              <Top/>
            </div>
          </div>
          <div className='w-full flex justify-between'>
            <Bottom/>
            <Bottom/>
          </div>  

        </div>
      </div>
    </>
  )
}

export default BannerBG
