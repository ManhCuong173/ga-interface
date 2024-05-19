'use client'

import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import decor from '@/images/profile/modal/decor.png'
import Image from 'next/image'

type Props = {
  open: boolean
  nftId: string
  nftName: string
  nftImage: string
  number: number
  inscriptionNumber: number
  backdropClassname?: string
  handleClose: () => void
  handleSubmit: () => void
}

export default function ModalConfirmCancel({
  open,
  number,
  nftId,
  nftImage,
  nftName,
  inscriptionNumber,
  backdropClassname,
  handleClose,
  handleSubmit,
}: Props) {
  return (
    <ModalContainer open={open} handleClose={handleClose} backdropClassname={backdropClassname}>
      <div className='realtive my-8 flex w-[664px] flex-col items-center space-y-8 bg-white bg-[url(/images/profile/modal/background-cancel.png)] bg-full p-10 text-text-black'>
        <div className='flex w-full items-center justify-end'>
          <button onClick={handleClose} className='outline-none'>
            <Image src={closeModalButton} alt='' width={44} height={44} />
          </button>
        </div>
        <div className='flex w-full flex-col items-center gap-11'>
          <div className='space-y-6'>
            <div className='space-y-6'>
              <Image src={decor} alt='' height={28.85} width={360.21} className='mx-auto' />
              <div className='relative mx-auto items-center justify-center text-[32px] font-medium leading-[39px]'>
                Are you sure to cancel <br /> listing{' '}
                <span className='text-red-light'>
                  {nftName} APPLE #{number}?
                </span>
              </div>
            </div>
            <p className='w-full text-center text-sm font-medium leading-6 text-black1'>
              Cancelling this NFT listing will remove it from the marketplace and any associated
              transactions or bids will be lost. If you proceed, you{"'"}ll need to relist the NFT.
            </p>
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
          <div className='flex items-center justify-center gap-4'>
            <button
              className='aspect-[280/60] w-[280px] max-w-full bg-[url(/images/profile/modal/button-keep-listing.png)] bg-full'
              onClick={handleClose}
            />
            <button
              className='aspect-[280/60] w-[280px] max-w-full bg-[url(/images/profile/modal/button-yes.png)] bg-full'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}
