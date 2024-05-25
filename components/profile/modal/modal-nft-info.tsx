import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import decor from '@/images/profile/profile-info/decor.png'
import { NFTDetail } from '@/types/nft'
import Image from 'next/image'

type Props = {
  nftId: string
  canList: boolean
  loadingDetail: boolean
  open: boolean
  number: number
  nftDetail?: NFTDetail
  nftImage: string
  nftName: string
  inscriptionNumber: number
  handleClose: () => void
  handleSubmit: () => void
}

export default function ModalNftInfo({
  loadingDetail,
  open,
  nftId,
  nftDetail,
  nftImage,
  nftName,
  canList,
  number,
  inscriptionNumber,
  handleClose,
  handleSubmit,
}: Props) {
  const rows = nftDetail
    ? [
        {
          title: 'Inscription Number',
          value: nftDetail.inscription_number || 'Unconfirmed',
        },
        {
          title: 'Inscription ID',
          value: nftDetail.inscription_id || 'Unconfirmed',
        },
        {
          title: 'Address',
          value: nftDetail.address || 'Unconfirmed',
        },
        {
          title: 'Output ID',
          value: nftDetail.output_value || 'Unconfirmed',
        },
        {
          title: 'Content',
          value: nftDetail.content || 'Unconfirmed',
        },
        {
          title: 'Content Length',
          value: nftDetail.content_length || 'Unconfirmed',
        },
        {
          title: 'Content Type',
          value: nftDetail.content_type || 'Unconfirmed',
        },
        {
          title: 'Timestamp',
          value: nftDetail.timestamp || 'Unconfirmed',
        },
        {
          title: 'Genesis Height',
          value: nftDetail.genesis_height || 'Unconfirmed',
        },
        {
          title: 'View',
          value: nftDetail.view || 'goldenapple.com',
        },
      ]
    : []

  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className='my-8 w-screen space-y-6 bg-white p-4 text-_black lg:w-[664px] lg:space-y-12 lg:px-10 lg:py-8'>
        <div className='flex items-center justify-end'>
          <button onClick={handleClose} className='outline-none'>
            <Image src={closeModalButton} alt='' width={44} height={44} />
          </button>
        </div>
        <div className='relative mx-auto flex size-[350px] items-center justify-center bg-[url(/images/profile/modal/nft-frame.png)] bg-full'>
          <span className='absolute left-[31px] top-[31px] z-10 flex h-7 items-center gap-1 rounded bg-[#FFF4DD]/50 px-2'>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#fff4dd]'>
              <Image src={handleReturnIconType(nftId)} alt='' width={20} height={20} />
            </span>
            <span className='text-xs font-light tracking-[-0.36px] text-black1'>
              #{inscriptionNumber}
            </span>
          </span>
          <figure className='size-[320px]'>
            <Image loader={() => nftImage} src={nftImage} alt='' width={320} height={320} />
          </figure>
        </div>
        <div className='space-y-11 lg:space-y-12'>
          <div className='mx-auto w-[350px] space-y-6'>
            <Image src={decor} alt='' className='w-full' />
            <h2 className='mx-auto whitespace-nowrap text-2xl font-semibold leading-8 tracking-[-0.64px] text-text-black lg:text-[32px]'>
              {nftName} APPLE #{number}
            </h2>
          </div>
          <div className='space-y-4'>
            {loadingDetail && (
              <div className='flex h-[400px] items-center justify-center'>loading...</div>
            )}
            {!rows.length && (
              <div className='flex h-[400px] items-center justify-center'>empty!</div>
            )}
            {rows.map((row, index) => (
              <div key={index} className='space-y-2'>
                <label className='tracking-[-0.36px inline-block w-full text-left text-xs font-light leading-[18px] text-text-black'>
                  {row.title}
                </label>
                <div className='flex h-11 items-center rounded border border-text-black_3 px-4'>
                  <input
                    type='text'
                    readOnly
                    className='w-full truncate border-none text-sm font-light text-text-black outline-none'
                    value={row.value}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {canList && (
          <button
            className='h-[60px] w-[280px] bg-[url(/images/profile/modal/button-list-mobile.png)] bg-full lg:h-[75px] lg:w-full lg:bg-[url(/images/profile/modal/button-list.png)]'
            onClick={handleSubmit}
          />
        )}
      </div>
    </ModalContainer>
  )
}
