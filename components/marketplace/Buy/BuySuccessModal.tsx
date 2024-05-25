import ModalContainer from '@/components/ui/modal-container'
import { nftTypes } from '@/constants/nft.constant'
import button_frame from '@/images/marketplace/buy/button-frame.png'
import { selectItemBought } from '@/lib/features/marketplace/marketplace-slice'
import { useAppSelector } from '@/lib/hook'
import { ItemMarket } from '@/types/market'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { handleReturnIconType } from '../Item'

const BuySuccessModal = ({ open, nftName, setOpen }: any) => {
  const router = useRouter()
  const item = useAppSelector(selectItemBought)
  const matchedType = nftTypes.find((type) => type.id.toString() === (item as unknown as ItemMarket).nft_id)

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
      <div className="relative my-8 min-h-[488px] w-full lg:w-[378px] bg-white px-10 pb-[82.15px] pt-[75px] text-text-black font-Roboto">
        <div className="relative z-[1] flex w-full flex-col items-center gap-6 lg:gap-8">
          <div className="mx-auto lg:space-y-6">
            <p className="flex items-center gap-2 text-[24px] lg:text-[21px] font-medium leading-8 tracking-[-0.8px] text-red-light">
              <span>Congratulations! </span>
            </p>
          </div>

          <p className="text-lg font-medium leading-6 tracking-[-0.6px]">Your NFT Purchase is Complete!</p>

          <div className="relative h-[160px] w-[160px] p-4">
            <div className="flex items-center justify-center lg:h-[160px] lg:w-[160px]">
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
            <div className="flex items-center gap-2 rounded px-2 py-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full ">
                <Image src={handleReturnIconType(item?.nft_id || '')} alt="" width={20} height={20} />
              </div>
              <span className="left-6 text-xs font-light tracking-[-0.48px]">#{item?.inscription_number}</span>
            </div>
          </div>
          <div className="text-center text-[20px] font-medium leading-8 text-text-black">
            {nftTypes.find((nft) => nft.id.toString() === item?.nft_id)?.label} APPLE #{item?.number}
          </div>

          <button className="relative" onClick={() => handleRouterAsset()}>
            <Image src={button_frame} alt="" />
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2">
              <span className="text-xl font-medium leading-6 tracking-[-0.6px] text-[#FFDFAC]">view my assets</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M5.2041 12.0889H19.2041"
                  stroke="#FFDFAC"
                  stroke-width="2.88462"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.2041 5.08887L19.2041 12.0889L12.2041 19.0889"
                  stroke="#FFDFAC"
                  stroke-width="2.88462"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default BuySuccessModal
