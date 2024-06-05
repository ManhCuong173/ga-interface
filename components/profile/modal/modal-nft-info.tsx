import { ButtonImage } from '@/components/button'
import { handleReturnIconType } from '@/components/marketplace/Item'
import ModalContainer from '@/components/ui/modal-container'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
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
      <div className="w-screen  bg-full lg:p-[30px] text-text-black lg:w-[540px] h-[90vh] overflow-auto bg-white font-Roboto relative p-[10px]">
        <div className="flex items-center justify-end absolute top-[10px] right-[10px] lg:right-[30px] lg:top-[30px]">
          <button onClick={handleClose} className="outline-none">
            <Image src={closeModalButton} alt="" width={44} height={44} />
          </button>
        </div>

        <div className="mx-auto flex items-center justify-center w-fit h-fit pt-[20px]">
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
        </div>

        <div className="space-y-11 lg:space-y-12">
          <div className="space-y-4">
            {loadingDetail && <div className="flex h-[400px] items-center justify-center">loading...</div>}
            {!rows.length && <div className="flex h-[400px] items-center justify-center">empty!</div>}

            <div className="mt-6">
              {rows.map((row, index) => (
                <div key={index} className="space-y-2">
                  <label className="tracking-[-0.36px inline-block w-full text-left text-xs font-light leading-[18px] text-text-secondary">
                    {row.title}
                  </label>
                  <div className="flex h-11 items-center rounded border border-text-secondary px-4">
                    <input
                      type="text"
                      readOnly
                      className="w-full truncate border-none text-sm font-light text-text-black outline-none font-ProtoMono"
                      value={row.value}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {canList && (
          <ButtonImage varirant="primary-asset" onClick={handleSubmit} className="w-[58%] h-fit mx-auto mt-4">
            List
          </ButtonImage>
        )}
      </div>
    </ModalContainer>
  )
}

