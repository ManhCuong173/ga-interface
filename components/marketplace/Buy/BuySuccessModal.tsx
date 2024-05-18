import ModalContainer from '@/components/ui/modal-container'
import button_frame from '@/images/marketplace/buy/button-frame.png'
import frameNFT from '@/images/mint/popup/frame_nft.svg'
import corner from '@/images/profile/modal/corner.png'
import decor from '@/images/profile/profile-info/decor.png'
import { selectItemBought } from '@/lib/features/marketplace/marketplace-slice'
import { useAppSelector } from '@/lib/hook'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { handleReturnIconType } from '../Item'
import { nftTypes } from '@/constants/nft.constant'

const BuySuccessModal = ({ open, nftName, setOpen }: any) => {
  const router = useRouter()
  const item = useAppSelector(selectItemBought)

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
      <div className="relative my-8 min-h-[500px] w-full lg:w-[733px] bg-white px-10 pb-[82.15px] pt-[75px] text-text-black">
        <div className="relative z-[1] flex w-full flex-col items-center gap-6 lg:gap-8">
          <div className="mx-auto lg:space-y-6">
            <Image src={decor} alt="" className="mx-auto w-[150px] lg:w-[360.21px] max-w-full" />
            <p className="flex items-center gap-2 text-[24px] lg:text-[40px] font-medium leading-8 tracking-[-0.8px]">
              <span className="-scale-x-100">🎉</span>
              <span>Congratulations! </span>
              <span>🎉</span>
            </p>
          </div>

          <p className="text-lg font-medium leading-6 tracking-[-0.6px]">Your NFT Purchase is Complete!</p>

          <div className="relative h-[350px] w-[350px] p-4">
            <Image src={frameNFT} alt="" fill priority />
            <div className="flex items-center justify-center lg:h-[320px] lg:w-[320px]">
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
            <div className="absolute left-[27px] top-[27px] flex items-center gap-2 rounded bg-[#fff4dd80] px-2 py-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-_white">
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
              <span className="text-xl font-medium leading-6 tracking-[-0.6px] text-yellow1">view my assets</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M5.2041 12.0889H19.2041"
                  stroke="#FFDFAC"
                  strokeWidth="2.88462"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2041 5.08887L19.2041 12.0889L12.2041 19.0889"
                  stroke="#FFDFAC"
                  strokeWidth="2.88462"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        <Image src={corner} alt="" width={456} height={182} className="absolute bottom-[23.72px] left-[22.47px]" />
        <Image
          src={corner}
          alt=""
          width={456}
          height={182}
          className="absolute left-[22.47px] top-[23.72px] -scale-y-100"
        />
        <Image
          src={corner}
          alt=""
          width={456}
          height={182}
          className="absolute bottom-[23.72px] right-[22.47px] -scale-x-100"
        />
        <Image
          src={corner}
          alt=""
          width={456}
          height={182}
          className="absolute right-[22.47px] top-[23.72px] -scale-100"
        />
      </div>
    </ModalContainer>
  )
}

export default BuySuccessModal
