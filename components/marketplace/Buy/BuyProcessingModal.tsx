import { ButtonImage } from '@/components/button'
import Trans from '@/components/i18n/Trans'
import { useGATranslation } from '@/components/i18n/hooks'
import ModalContainer from '@/components/ui/modal-container'
import { nftTypes } from '@/constants/nft.constant'
import { ItemMarket } from '@/types/market'
import { ElementType } from '@/utils/const'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { handleReturnIconType } from '../Item'

const BuyProcessingModal = ({
  open,
  setOpen,
  item,
}: {
  open: boolean
  setOpen: (isOpened: boolean) => void
  item: ItemMarket
}) => {
  const router = useRouter()
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
              <Trans>Processing</Trans>
              <span className="animate-bounce [animation-delay:-0.3s] tracking-[-14px]">.</span>
              <span className="animate-bounce [animation-delay:-0.15s] tracking-[-14px]">.</span>
              <span className="animate-bounce [animation-delay:-0.05s] tracking-[-14px]">.</span>
            </p>
          </div>

          <p className="text-sm font-light leading-6 tracking-[-0.6px] text-black1 mt-[25px]">
            <Trans>Your purchase is being processed!</Trans>
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
          <div className="text-sm text-black1 leading-3/2 font-light my-3">
            {useGATranslation()(
              'It should be confirmed on the blockchain shortly_Please do not exit while the transaction is processing',
            )}
          </div>
          <div
            className="text-center text-[18px] font-medium leading-3/2
           text-text-black mt-2"
          >
            {NFTDetail?.label || ''} Apple
          </div>
          <div className="flex items-center rounded gap-1 py-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-full ">
              <Image
                src={handleReturnIconType(item?.nft_id || '') || ElementType[0].icon}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <span className="text-sm font-light font-ProtoMono tracking-tighter">#{item?.number}</span>
          </div>

          <ButtonImage
            varirant="primary-asset"
            className="w-[221px] h-[48px] mt-[53px] cursor-pointer grayscale-[.5]"
            disabled
          >
            <div className="left-0 top-0 flex h-full w-full items-center justify-center gap-2">
              <span className="text-md font-medium leading-3/2 tracking-[-0.6px] text-white capitalize">
                <Trans>View my assets</Trans>
              </span>
            </div>
          </ButtonImage>
        </div>
      </div>
    </ModalContainer>
  )
}

export default BuyProcessingModal

