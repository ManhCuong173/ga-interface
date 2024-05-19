import { ButtonImage } from '@/components/button'
import ModalContainer from '@/components/ui/modal-container'
import { nftTypes } from '@/constants/nft.constant'
import { selectItemBought } from '@/lib/features/marketplace/marketplace-slice'
import { useAppSelector } from '@/lib/hook'
import { fiveElements } from '@/utils/const'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { handleReturnIconType } from '../Item'

const BuyResultModal = ({ open, setOpen }: any) => {
  const router = useRouter()
  const item = useAppSelector(selectItemBought)
  const NFTDetail = item && nftTypes.find((type) => type.id.toString() === item.nft_id)

  const handleRouterAsset = () => {
    router.push('/profile')
  }

  return (
    <ModalContainer
      open={open}
      handleClose={() => {
        setOpen(false)
      }}
      backdropClassname="bg-black/10"
    >
      <div className="relative my-8 min-h-[600px] w-full lg:w-[540px] bg-white px-10 py-10 lg:pb-[40px] lg:pt-[40px] text-text-black font-Roboto">
        <div className="relative z-[1] flex w-full flex-col items-center">
          <div className="mx-auto lg:space-y-6">
            <p className="flex items-center gap-2 text-[32px] font-medium leading-8 tracking-[-0.8px] text-red-light font-ProtoMono">
              Congratulations!
            </p>
          </div>

          <p className="text-sm font-light leading-6 tracking-[-0.6px] text-black1 mt-[25px]">
            Your NFT Purchase is Complete!
          </p>

          <div className="relative mt-[50px] border-red-light border-[1px] rounded-lg p-2">
            <div className="flex items-center justify-center w-[160px] h-[160px] lg:h-[204px] lg:w-[204px]">
              <Image
                src={item?.nft_link || ''}
                sizes="100vw"
                className="h-full w-full"
                width={0}
                height={0}
                loader={() => String(item?.nft_link)}
                alt=""
              />
            </div>
          </div>
          <div
            className="text-center text-[18px] font-medium leading-3/2
           text-text-black mt-5"
          >
            {NFTDetail?.label || ''} Apple
          </div>
          <div className="flex items-center rounded gap-1 py-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-full ">
              <Image
                src={handleReturnIconType(item?.nft_id || '') || fiveElements[0].icon}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <span className="text-sm font-light font-ProtoMono tracking-tighter">#{item?.inscription_number}</span>
          </div>

          <ButtonImage
            varirant="primary-asset"
            onClick={() => handleRouterAsset()}
            className="w-[221px] h-[48px] mt-[53px] cursor-pointer"
          >
            <div className="left-0 top-0 flex h-full w-full items-center justify-center gap-2">
              <span className="text-md font-medium leading-3/2 tracking-[-0.6px] text-white">View My Assets</span>
            </div>
          </ButtonImage>
        </div>
      </div>
    </ModalContainer>
  )
}

export default BuyResultModal

