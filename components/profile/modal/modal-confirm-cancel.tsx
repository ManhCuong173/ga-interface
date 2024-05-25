'use client'

import { ButtonImage } from '@/components/button'
import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
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
    <ModalContainer open={open} handleClose={handleClose}>
      <div className="w-screen  bg-full lg:p-[30px] text-text-black lg:w-[540px] h-[600px] bg-white font-Roboto relative p-[10px]">
        <div className="flex items-center justify-end absolute top-[10px] right-[10px] lg:right-[30px] lg:top-[30px]">
          <button onClick={handleClose} className="outline-none">
            <Image src={closeModalButton} alt="" width={44} height={44} />
          </button>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <div className="space-y-6 font-ProtoMono">
            <div className="relative mx-auto items-center justify-center text-[24px] font-medium leading-[39px] tracking-tighter">
              Are you sure to cancel <br /> listing
              <span className="text-red-light ml-1">
                {nftName} APPLE #{number}?
              </span>
            </div>
          </div>
          <p className="w-full text-center text-sm font-light leading-6 text-black1 lg-w-[523px]">
            Cancelling this NFT listing will remove it from the marketplace and any associated transactions or bids will
            be lost. If you proceed, you'll need to relist the NFT.
          </p>
        </div>

        <div className="mx-auto flex items-center justify-center w-fit h-fit pt-[20px]">
          <div className="relative p-3 border-bgAlt border-[1px] rounded-lg">
            <figure className="size-[204px] ">
              <Image loader={() => nftImage} src={nftImage} alt="" width={204} height={204} />
            </figure>
          </div>
        </div>
        <div className="w-full mt-5">
          <h2 className="mx-auto whitespace-nowrap text-[18px] font-medium leading-8 tracking-[-0.64px] text-text-black">
            {nftName} Apple
          </h2>
          <div className="flex justify-center items-center gap-1 px-2 bg-white">
            <span className="flex h-5 w-5 items-center justify-center">
              <Image src={handleReturnIconType(nftId)} alt="" width={20} height={20} />
            </span>
            <span className="text-xs font-light tracking-[-0.36px] text-black1">#{inscriptionNumber}</span>
          </div>
        </div>
        <div className="flex items-center w-full justify-center gap-2">
          <ButtonImage
            className="h-[57px] w-[280px]  bg-full transition-all lg:w-full mx-auto my-3"
            onClick={handleClose}
            varirant="light-double-asset"
          >
            <span className="text-lg font-medium leading-3/2">Keep Listing</span>
          </ButtonImage>
          <ButtonImage
            className="h-[57px] w-[280px]  bg-full transition-all lg:w-full mx-auto my-3"
            onClick={handleSubmit}
            varirant="primary-asset"
          >
            <span className="text-lg font-medium leading-3/2">Yes</span>
          </ButtonImage>
        </div>
      </div>
    </ModalContainer>
  )
}

