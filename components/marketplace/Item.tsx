import { nftTypes } from '@/constants/nft.constant'
import ic_coins from '@/icons/coin.svg'
import corner from '@/icons/profile/corner.svg'
import loading from '@/images/inscribe/loading.svg'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { compareAddress } from '@/lib/item'
import { marketPlaceService } from '@/services/market.service'
import { ItemMarket } from '@/types/market'
import { fiveElements } from '@/utils/const'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ModalConfirmCancel from '../profile/modal/modal-confirm-cancel'
import BuySuccessModal from './Buy/BuySuccessModal'
import ConfirmModal from './Buy/ConfirmModal'

export const handleReturnIconType = (nft_id: string) => {
  if (!nft_id) return ''
  return fiveElements.find((item) => item.id === Number(nft_id))?.icon || ''
}

const Item = ({
  item,
  page,
  page_size,
  nftIds,
  number,
  order_by,
  inscription_number,
}: {
  item: ItemMarket
  page: number
  page_size: number
  nftIds: number[]
  number: string
  order_by: string
  inscription_number: number
}) => {
  const btcPrice = useSelector(selectBtnToUsdRateData)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [listing, setListing] = useState(false)
  const matchedType = nftTypes.find((type) => type.id.toString() === item.nft_id)

  const address = useSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)
  const [isCancelled, setIsCancelled] = useState(false)

  const queryClient = useQueryClient()

  const handleBuy = () => {
    setShowConfirmModal(true)
  }

  const handleCancelListing = async () => {
    try {
      setIsCancelled(true)
      const payload = {
        id_inscription: item.id_inscription,
        pubkey: publicKey,
      }

      const res = await marketPlaceService.removeMarketNft(payload)
      if (res.status === 200) {
        setListing(false)
        setIsCancelled(false)
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ['market', page, page_size, nftIds, number, order_by],
          })
          toast.success('Cancel listing successfully')
        }, 500)
      }
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickedAction = (isOwner: boolean) => {
    if (!isOwner) {
      handleBuy()
      return
    }
    setListing(true)
  }

  return (
    <>
      <div className='relative flex flex-col gap-3 rounded border border-[#D4C79C] bg-_white p-2 pb-3'>
        <span className='absolute left-2 top-2 z-10 flex h-7 items-center gap-1 rounded bg-[rgba(255,244,221,0.5)] px-2'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#fff4dd]'>
            <Image src={handleReturnIconType(item.nft_id)} alt='' width={20} height={20} />
          </span>
          <span className='text-xs font-light tracking-[-0.36px] text-black1'>
            #{item.inscription_number}
          </span>
        </span>
        {/* <span className='absolute right-5 top-5 z-10 flex h-7 items-center gap-1 rounded bg-red-light px-2'>
          <Image src={firework} alt='' width={18} height={20} />
          <span className='text-xs font-medium tracking-[-0.36px] text-yellow1'>NEW</span>
        </span> */}
        <div
          className='relative aspect-square w-full rounded-sm bg-cover'
          style={{
            backgroundImage: `url(${item.nft_link})`,
          }}
        ></div>
        <div className='relative w-full'>
          <Image
            src={corner}
            alt=''
            width={25.45}
            height={47.12}
            className='absolute left-0 top-0'
          />
          <Image
            src={corner}
            alt=''
            width={25.45}
            height={47.12}
            className='absolute right-0 top-0 -scale-x-100'
          />
          <div className='flex flex-col'>
            <h2 className=' text-center text-base font-medium text-[#4E473F]'>
              {matchedType?.label} APPLE
            </h2>
            <div className='mt-2 flex items-center justify-center space-x-2'>
              <Image src={ic_coins} alt='icon' />
              <span className='text-xs font-light text-[#4E473F]'>
                {item.price}(${(item.price * Number(btcPrice)).toFixed(4)})
              </span>
            </div>

            <button
              // disabled={compareAddress(item.address,address)}
              className={`relative mt-4 h-12 w-full bg-[url(/images/mint/bg-button-item.png)] bg-full hover:bg-[url(/images/mint/bg-button-hover.png)]`}
              onClick={() => {
                handleClickedAction(compareAddress(item.address, address))
              }}
            >
              <div className='inset-0 flex h-full w-full items-center justify-center'>
                <p className='flex items-center justify-center text-base font-medium uppercase text-[#FFDFAC]'>
                  {isCancelled ? (
                    <Image src={loading} width={40} height={40} alt='loading' />
                  ) : (
                    <>{compareAddress(item.address, address) ? 'Cancel Listing' : 'Buy'}</>
                  )}
                </p>
              </div>
            </button>
          </div>
        </div>

        {showConfirmModal && (
          <ConfirmModal
            open={showConfirmModal}
            setOpen={setShowConfirmModal}
            setShowSuccessModal={setShowSuccessModal}
            id_sell={item.id_create}
            feeRate={1}
            nft_image={item.nft_link}
            item={item}
            page={page}
            page_size={page_size}
            number={number}
            nftIds={nftIds}
            order_by={order_by}
          />
        )}
        {showSuccessModal && (
          <BuySuccessModal
            open={showSuccessModal}
            setOpen={setShowSuccessModal}
            name={matchedType?.label}
          />
        )}
      </div>
      <ModalConfirmCancel
        inscriptionNumber={inscription_number}
        backdropClassname='bg-black/10'
        nftId={item.nft_id}
        nftImage={item.nft_link}
        nftName={matchedType?.label || ''}
        number={Number(item.number)}
        open={listing}
        handleClose={() => {
          setListing(false)
        }}
        handleSubmit={handleCancelListing}
      />
      {/* {isCancelled && <Loading />} */}
    </>
  )
}

export default Item
