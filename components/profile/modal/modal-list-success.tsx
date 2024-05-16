import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import decor from '@/images/profile/profile-info/decor.png'
import { NFTDetail } from '@/types/nft'
import Image from 'next/image'

type Props = {
  open: boolean
  nftId: string
  nftImage: string
  nftName: string
  inscriptionNumber: number
  nftDetail?: NFTDetail
  price: string
  number: number
  loadingDetail: boolean
  handleClose: () => void
  handleSubmit: () => void
}

export default function ModalListSuccess({
  open,
  nftName,
  price,
  nftId,
  nftImage,
  inscriptionNumber,
  number,
  handleClose,
  handleSubmit,
}: Props) {
  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className='relative my-8 min-h-full w-[733px] bg-white bg-[url(/images/profile/modal/background-success.png)] bg-full px-10 py-[75px] text-text-black lg:min-h-[unset]'>
        <div className='relative z-[1] w-full space-y-8'>
          <div className='mx-auto space-y-6'>
            <Image src={decor} alt='' className='mx-auto w-[360.21px] max-w-full' />
            <div className='flex w-full items-center justify-center gap-2 text-[40px] font-medium leading-8 tracking-[-2%] text-text-black'>
              <span className='-scale-x-100'>🎉</span>
              <span>Success!</span>
              <span>🎉</span>
            </div>
          </div>
          <p className='mx-auto max-w-full text-center text-[20px] font-medium leading-6 tracking-[-3%]'>
            Your NFT has been officially listed after <br /> you set the selling price.
          </p>
          <div className='space-y-6'>
            <div className='relative mx-auto flex size-[350px] items-center justify-center bg-[url(/images/profile/modal/nft-frame.png)] bg-full'>
              <span className='absolute left-[31px] top-[31px] z-10 flex h-7 items-center gap-1 rounded bg-[#FFF4DD]/50 px-2'>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#fff4dd]'>
                  <Image src={handleReturnIconType(nftId)} alt='' width={20} height={20} />
                </span>
                <span className='text-xs font-light tracking-[-0.36px] text-black1'>
                  #{inscriptionNumber}
                </span>
              </span>
              <figure className='relative size-[320px]'>
                <Image
                  loader={() => nftImage}
                  src={nftImage}
                  alt=''
                  width={320}
                  height={320}
                  className='size-[320px] min-w-[320px]'
                />
              </figure>
            </div>
            <div className='flex flex-col items-center gap-4 '>
              <div className='text-[20px] font-medium leading-8 tracking-[-2%]'>
                {nftName} APPLE #{number}
              </div>
              <div className='flex items-center gap-2 text-2xl font-semibold leading-5 tracking-[-3%]'>
                <span className='text-line'>Price:</span>
                <span className='text-text-black'>{price} BTC</span>
              </div>
            </div>
          </div>
          <button
            className='h-[58px] w-[300px] bg-[url(/images/profile/modal/button-close.png)] bg-full'
            onClick={handleSubmit}
          ></button>
        </div>
      </div>
    </ModalContainer>
  )
}
