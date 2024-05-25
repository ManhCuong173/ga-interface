import React from 'react'
import ModalContainer from '../ui/modal-container'
import Image from 'next/image'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import { ItemMarket } from '@/types/market'
import decor from '@/images/profile/modal/decor.png'

interface Props {
  item: ItemMarket
  open: boolean
  handleClose: () => void
  nftName: string | undefined
  handleSubmit: () => void
}

const ModalCancel = ({ item, open, handleClose, nftName, handleSubmit }: Props) => {
  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className='realtive my-8 flex w-[664px] flex-col items-center space-y-8 bg-white p-10 text-text-black'>
        <div className='flex w-full items-center justify-end'>
          <button onClick={handleClose} className='outline-none'>
            <Image src={closeModalButton} alt='' width={44} height={44} />
          </button>
        </div>
        <div className='flex w-full flex-col items-center gap-11'>
          <div className='space-y-6'>
            <Image src={decor} alt='' height={28.85} width={360.21} className='mx-auto' />
            <div className='relative mx-auto items-center justify-center text-[32px] leading-[39px]'>
              Are you sure to cancel <br /> listing{' '}
              <span className='text-red-light'>
                {nftName} #{item.number}?
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <button
              className='aspect-[241.54/44] w-[241.54px] max-w-full bg-[url(/images/profile/modal/button-cancel.png)] bg-full'
              onClick={handleSubmit}
            />
            <button
              className='aspect-[241.54/44] w-[241.54px] max-w-full bg-[url(/images/profile/modal/button-keep-listing.png)] bg-full'
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ModalCancel
