import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import { NFTDetail } from '@/types/nft'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

const ListNFTSuccessModal: React.FC<Props> = ({
  open,
  nftName,
  price,
  nftId,
  nftImage,
  inscriptionNumber,
  number,
  handleClose,
  handleSubmit,
}) => {
  const router = useRouter()

  const handleRouterAsset = () => {
    router.push('/profile')
  }

  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className="w-screen  bg-full lg:p-[30px] lg:pt-[40px] text-text-black lg:w-[540px] h-[600px] bg-white font-Roboto relative p-[10px]">
        <div className="mx-auto lg:space-y-6">
          <p className="gap-2 text-[32px] font-medium leading-8 tracking-[-0.8px] text-red-light font-ProtoMono text-center w-full">
            Success!
          </p>
        </div>

        <p className="text-sm font-light leading-6 tracking-[-0.6px] text-black1 mt-[25px] w-[263px] mx-auto">
          Your NFT has been officially listed after you set the selling price.
        </p>

        <div className="flex items-center justify-end absolute top-[10px] right-[10px] lg:right-[30px] lg:top-[30px]">
          <button onClick={handleClose} className="outline-none">
            <Image src={closeModalButton} alt="" width={44} height={44} />
          </button>
        </div>
        <div className="mx-auto flex items-center justify-center w-fit h-fit pt-[35px]">
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

          <div className="flex justify-center items-center mx-auto border-solid border-[1px] border-red-light rounded-lg lg:w-[226px] py-4 px-6 lg:h-[52px] mt-5">
            <span className="inline-block w-full text-left text-base font-normal leading-6 tracking-[-0.48px] text-black1">
              Price
            </span>
            <p className="text-red-light font-base text-[21px] font-ProtoMono font-medium">{price} BTC</p>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ListNFTSuccessModal

