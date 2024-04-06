import { nftTypes } from '@/constants/nft.constant'
import corner from '@/icons/profile/corner.svg'
import { UserAsset } from '@/types/asset'
import Image from 'next/image'
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
      className='relative flex cursor-pointer flex-col gap-2.5 rounded border border-[#D4C79C] bg-_white p-2 pb-3'
      onClick={handleShowNFtInfo}
    >
      <span className='absolute left-2 top-2 z-10 flex h-7 items-center gap-1 rounded bg-[#FFF4DD] bg-opacity-50 px-2'>
        <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#fff4dd]'>
          <Image src={handleReturnIconType(props.nft_id)} alt='' width={20} height={20} />
        </span>
        <span className='text-xs font-light tracking-[-0.36px] text-black1'>
          #{props.inscription_number}
        </span>
      </span>
      <div
        className='relative aspect-[234.16/250] w-full rounded-sm bg-cover'
        style={{
          backgroundImage: `url(${props.link_image})`,
        }}
      />
      <div className='relative w-full'>
        <Image
          src={corner}
          alt=''
          width={47.12}
          height={26.45}
          className='absolute left-0 top-0 max-h-[26.45px] min-h-[26.45px] min-w-[47.12px] max-w-[47.12px]'
        />
        <Image
          src={corner}
          alt=''
          width={47.12}
          height={26.45}
          className='absolute right-0 top-0 max-h-[26.45px] min-h-[26.45px] min-w-[47.12px] max-w-[47.12px] -scale-x-100'
        />
        <div className='flex w-full justify-center gap-2'>
          <span className='text-sm font-medium text-[#4E473F] lg:text-base'>
            {matchedType?.label} APPLE
          </span>
        </div>
        <button
          className={`${props.is_listing ? 'bg-[url(/images/profile/button-cancel-1.png)]' : 'bg-[url(/images/profile/button-list-1.png)]'} group mt-4 flex h-11 w-full items-center justify-center bg-full px-[13.82px] transition-all`}
          onClick={(e) => {
            e.stopPropagation()
            ;(!props.is_listing ? handleListNft : handleCancel)()
          }}
        >
          <span
            className={`${props.is_listing ? 'bg-[url(/images/profile/button-cancel-2.png)] text-[#B26802] group-hover:bg-[url(/images/profile/button-cancel-2-hover.png)]' : 'bg-[url(/images/profile/button-list-2.png)] text-yellow1 group-hover:bg-[url(/images/profile/button-list-2-hover.png)]'} flex h-[30.13px] w-full items-center justify-center bg-full text-[12px] text-base font-medium leading-[18px] tracking-[-0.36px] group-hover:shadow-btn-list-hover`}
          >
            {props.is_listing ? 'Cancel listing' : 'List'}
          </span>
        </button>
      </div>
    </div>
  )
}
