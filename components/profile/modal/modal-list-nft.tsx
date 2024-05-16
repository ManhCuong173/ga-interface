'use client'

import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import decor from '@/images/profile/profile-info/decor.png'
import { NFTDetail } from '@/types/nft'
import Image from 'next/image'

type Props = {
  loadingDetail: boolean
  nftDetail?: NFTDetail
  nftImage: string
  nftId: string
  nftName: string
  inscriptionNumber: number
  number: number
  open: boolean
  price: string
  handleChangePrice: (value: string) => void
  handleClose: () => void
  handleBack: () => void
  handleSubmit: () => void
}

export default function ModalListNft({
  open,
  nftImage,
  nftId,
  nftName,
  number,
  price,
  nftDetail,
  inscriptionNumber,
  handleChangePrice,
  handleClose,
  handleBack,
  handleSubmit,
}: Props) {
  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className='my-8 w-screen space-y-12 bg-white bg-[url(/images/profile/modal/background-list-mobile.png)] bg-full px-4 py-8 text-text-black lg:w-[664px] lg:bg-[url(/images/profile/modal/background-list.png)] lg:px-10'>
        <div className='flex items-center justify-end'>
          <button onClick={handleClose} className='outline-none'>
            <Image src={closeModalButton} alt='' width={44} height={44} />
          </button>
        </div>
        <div className='relative mx-auto flex size-[350px] items-center justify-center bg-[url(/images/profile/modal/nft-frame.png)] bg-full'>
          <span className='absolute left-[31px] top-[31px] z-10 flex h-7 items-center gap-1 rounded bg-[#FFF4DD]/50 px-2'>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#fff4dd]'>
              <Image src={handleReturnIconType(nftId)} alt='' width={20} height={20} />
            </span>
            <span className='text-xs font-light tracking-[-0.36px] text-black1'>
              #{inscriptionNumber}
            </span>
          </span>
          <figure className='size-[320px]'>
            <Image loader={() => nftImage} src={nftImage} alt='' width={320} height={320} />
          </figure>
        </div>
        <div className='space-y-8'>
          <div className='mx-auto w-[350px] space-y-6'>
            <Image src={decor} alt='' className='w-full' />
            <h2 className='mx-auto whitespace-nowrap text-[32px] font-medium leading-8 tracking-[-0.64px] text-text-black'>
              {nftName} APPLE #{number}
            </h2>
          </div>
          <div className='w-full space-y-4'>
            <div className='space-y-2'>
              <label className='inline-block w-full text-left text-xs font-light leading-6 tracking-[-0.48px] text-text-black'>
                Price
              </label>
              <div className='flex h-11 items-center rounded border border-text-black_3 px-4'>
                <input
                  className='w-full truncate border-none font-semibold text-text-black outline-none'
                  value={price}
                  placeholder='0'
                  onChange={(e) => handleChangePrice(e.target.value)}
                />
                <span className='h-5 border-l border-line pl-2 text-base font-light leading-5 tracking-[-0.48px] text-text-sub'>
                  BTC
                </span>
              </div>
              <p className='text-left text-sm text-black1'>
                <span className='text-red-700'>(*)</span> Price must be equal or greater than
                0.00001
              </p>
            </div>
          </div>
        </div>
        <button
          className={`${Number(price) >= 0.00001 ? 'opacity-100' : 'cursor-not-allowed opacity-50 brightness-75'} h-[57px] w-[280px] bg-[url(/images/profile/modal/button-list-mobile.png)] bg-full transition-all lg:w-full lg:bg-[url(/images/profile/modal/button-list.png)]`}
          onClick={Number(price) >= 0.00001 ? handleSubmit : undefined}
        />
      </div>
    </ModalContainer>
  )
}
