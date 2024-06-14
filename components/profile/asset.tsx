import { nftTypes } from '@/constants/nft.constant'
import ButtonListNFT from '@/icons/button/button-list-nft.svg'
import { UserAsset } from '@/types/asset'
import Image from 'next/image'
import Trans from '../i18n/Trans'
import { handleReturnIconType } from '../marketplace/Item'

type Props = UserAsset & {
  onShowInfo: (asset: UserAsset) => void
  onList: (asset: UserAsset) => void
  onCancel: (asset: UserAsset) => void
}

export default function Asset({ onShowInfo, onList, onCancel, ...props }: Props) {
  const matchedType = nftTypes.find((type) => type.id.toString() === props.nft_id)
  const handleShowNFtInfo = () => {
    onShowInfo(props)
  }

  const handleListNft = () => {
    onList(props)
  }

  const handleCancel = () => {
    onCancel(props)
  }

  return (
    <div
      className="relative flex cursor-pointer flex-col  items-center
     rounded border-bgAlt border-[1px] mx-auto md:mx-0  w-fit p-3 pb-3 md:min-w-[180px] lg:w-[237px] lg:min-h-[246px] font-Roboto"
      onClick={handleShowNFtInfo}
    >
      <span
        className="absolute left-2 top-2 z-10 flex h-7 
      items-center rounded  px-2 bg-[#faf5f0]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full ">
          <Image src={handleReturnIconType(props.nft_id)} alt="" width={20} height={20} />
        </span>
        <span className="text-xs font-light tracking-[-0.36px] text-black1 ml-1"># {props.number}</span>
      </span>
      <div
        className="relative w-[160px] h-[160px] lg:w-[213px] lg:h-[213px] bg-cover rounded-lg"
        style={{
          backgroundImage: `url(${props.link_image})`,
        }}
      />
      <div className="relative w-full">
        <div className="flex w-full mt-[16px] mb-[18px] justify-center md:justify-start">
          <span className="text-sm font-medium text-[#4E473F] lg:text-base">{matchedType?.label} Apple</span>
        </div>
        <button
          className={`group mt-4 flex h-11 w-full  bg-full px-[13.82px] transition-all relative`}
          onClick={(e) => {
            e.stopPropagation()
            ;(!props.is_listing ? handleListNft : handleCancel)()
          }}
        >
          <Image
            src={ButtonListNFT}
            className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[46px] md:max-h-[57px]"
            alt=""
          />
          <span
            className={`h-[30.13px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-white2`}
          >
            <Trans>{props.is_listing ? 'Cancel listing' : 'List'}</Trans>
          </span>
        </button>
      </div>
    </div>
  )
}

