'use client'

import { ButtonImage } from '@/components/button'
import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
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
  inscriptionNumber,
  handleChangePrice,
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
        <div className="mx-auto flex items-center justify-center w-fit h-fit pt-[60px]">
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
          <div className="flex flex-col justify-center items-center lg:w-[460px]">
            <label className="inline-block w-full text-left text-sm font-normal leading-6 tracking-[-0.48px] text-bgAlt">
              Price
            </label>
            <div className="flex w-full items-center rounded border-solid border-[1px] border-bgAlt h-[44px] mt-3 px-4 font-ProtoMono">
              <input
                className="w-full truncate border-none font-semibold placeholder:text-black1 placeholder:font-light outline-none py-2"
                value={price}
                placeholder="0"
                onChange={(e) => handleChangePrice(e.target.value)}
              />
              <div className="h-full w-[1px] bg-bgAlt" />
              <span className="pl-2 text-base font-light leading-5 tracking-[-0.48px] text-black1 ">BTC</span>
            </div>
            <p className="text-left text-xs text-text-secondary mt-2">
              <span className="text-red-700">(*)</span> Price must be equal or greater than 0.00001
            </p>
          </div>
        </div>
        <ButtonImage
          className={`${Number(price) >= 0.00001 ? 'opacity-100' : 'cursor-not-allowed opacity-50 brightness-75'} 
          h-[57px] w-[280px]  bg-full transition-all lg:w-full mx-auto my-3`}
          onClick={Number(price) >= 0.00001 ? handleSubmit : undefined}
          varirant="primary-asset"
        >
          <span className="text-lg font-medium leading-3/2">Complete Listing</span>
        </ButtonImage>
      </div>
    </ModalContainer>
  )
}

