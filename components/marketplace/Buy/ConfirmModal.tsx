import Loading from '@/components/Loading'
import { ButtonImage } from '@/components/button'
import FormatPrice from '@/components/mintNFTs/FormatPrice'
import { ChevronIcon } from '@/components/ui/icons'
import ModalContainer from '@/components/ui/modal-container'
import { nftTypes } from '@/constants/nft.constant'
import { setItemBought } from '@/lib/features/marketplace/marketplace-slice'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { cn } from '@/lib/utils'
import { marketPlaceService } from '@/services/market.service'
import { publicService } from '@/services/public.service'
import { NetworkFeeType } from '@/types/fee'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { MutableRefObject, memo, useEffect, useRef, useState, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import { handleReturnIconType } from '../Item'
import ChooseNetworkFee from './ChooseNetworkFee'
import { ModalLayout } from './ModalLayout'

type Params = {
  fee_rate: number
  id_sell: string
}

const ConfirmModal = ({
  open,
  setOpen,
  id_sell,
  nft_image,
  setShowSuccessModal,
  item,
  page,
  page_size,
  nftIds,
  number,
  order_by,
}: any) => {
  const [isListing, startListingTransition] = useTransition()
  const address = useAppSelector(selectAddress)
  const [customNetworkFee, setCustomNetworkFee] = useState(1)
  const [customNetworkFeeDebounce] = useDebounce(customNetworkFee, 300)
  const [selectedNetworkFee, setSelectedNetworkFee] = useState<NetworkFeeType>('normal')
  const btcToUsdRate: string = useSelector(selectBtnToUsdRateData)
  const ref: MutableRefObject<any> = useRef()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const [isBuying, setBuying] = useState(false)
  const matchedType = nftTypes.find((type) => type.id.toString() === item.nft_id)
  const [enabledCustom, setEnableCustom] = useState(false)

  const { data: feeData, isLoading: loadingNetworkFee } = useQuery({
    queryKey: ['fee'],
    queryFn: publicService.getNetworkFee,
    enabled: !!open,
  })

  const feeRate = selectedNetworkFee !== 'custom' ? feeData?.fee[selectedNetworkFee] || 0 : customNetworkFee

  const { data } = useQuery({
    queryKey: ['fee_buy_nft', feeRate, id_sell, customNetworkFeeDebounce],
    queryFn: () => {
      return getFeeBuyNft({
        fee_rate: feeRate,
        id_sell: id_sell,
      })
    },
    enabled: !!open,
  })

  const closeModal = () => {
    setOpen(false)
  }

  const getFeeBuyNft = async (params: Params) => {
    const data: any = await marketPlaceService.getFeeBuyNFT(params)
    return data
  }

  const getListTxidInscription = async () => {
    try {
      let res = await (window as any).unisat.getInscriptions(0, 10000)
      return res.list.map((item: { location: string }) => item.location.split(':')[0])
    } catch (e) {
      console.log('error getting list tx id inscription: ', e)
      return []
    }
  }

  const getBalance = async () => {
    try {
      let res = await (window as any).unisat.getBalance()
      return res.confirmed
    } catch (e) {
      console.log(e)
    }
  }

  const handleConfirm = async () => {
    try {
      const balance = await getBalance()
      if (balance < data?.total) {
        toast.error('Insufficient balance')
        return
      }

      setShowSuccessModal(true)

      setBuying(true)
      const listTxIdInscription = await getListTxidInscription()
      const res = await marketPlaceService.getPsBTNft({
        fee_rate: feeRate,
        list_txid_inscrtiption: listTxIdInscription,
        id_sell: id_sell,
        wallet_address: address,
      })

      const signedPsbt: string = await (window as any).unisat.signPsbt(res.psbt)
      const psbtBase64 = Buffer.from(signedPsbt, 'hex').toString('base64')
      const resExchange: any = await marketPlaceService.exChangeNft({
        address_buyer: address,
        id_sell: id_sell,
        psbt_buyer: psbtBase64,
      })

      if (resExchange.status === 200) {
        setOpen(false)
        setShowSuccessModal(true)
        dispatch(setItemBought(item))
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ['market', page, page_size, nftIds, number, order_by],
          })
        }, 500)
        setBuying(false)
      } else {
        toast.error(resExchange.data.message)
      }
    } catch (err: any) {
      setBuying(false)
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <div>
      <ModalContainer open={open} handleClose={closeModal}>
        <ModalLayout>
          <>
            <div ref={ref} className="flex flex-col items-center mb-[25px]">
              <p className="text-[32px] font-semibold leading-[50px] tracking-[-0.96px] text-red-light font-ProtoMono ">
                Confirmation
              </p>
            </div>
            <div className="flex lg:self-start gap-[18px]">
              <div className="p-9px rounded-[6px] border-bgAlt border-[1px] w-[100px] h-[100px] flex justify-center items-center">
                <div className="flex items-center justify-center w-[90px] h-[90px] ">
                  <Image
                    src={nft_image}
                    sizes="100vw"
                    className="h-full w-full rounded-[4px]"
                    width={0}
                    height={0}
                    loader={() => nft_image}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-[18px] text-black1 font-medium leading-[150%]">{matchedType?.label || ''}</h2>
                <div className="flex h-8 items-center justify-center rounded text-black1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full ">
                    <Image src={handleReturnIconType(item.nft_id)} alt="" width={20} height={20} />
                  </div>
                  <h3 className="left-6 text-xs font-light tracking-[-0.48px] ml-[4px]">#{item.number}</h3>
                </div>
                <h3 className="text-text-secondary text-xs font-normal leading-3/2 font-Roboto">Price</h3>
                <p className="text-black1 text-sm font-semibold leading-3/2">{item.price} BTC</p>
              </div>
            </div>
            <div
              className="flex items-center justify-center cursor-pointer my-3 mx-auto"
              onClick={() => {
                setEnableCustom(!enabledCustom)
              }}
            >
              <span className="text-base text-text-secondary font-medium mr-1 font-Roboto">Advanced Settings</span>
              <span className={cn(enabledCustom ? 'rotate-180' : 'rotate-0', `ml-1 transition-all duration-500`)}>
                <ChevronIcon className="text-text-secondary" />
              </span>
            </div>
            <div className={cn('flex w-full flex-col space-y-3', enabledCustom ? 'max-h-0 overflow-hidden' : '')}>
              <p className="text-left text-[14px] font-medium text-[#383F4A]">Select the network fee you want to pay</p>
              <ChooseNetworkFee
                loading={loadingNetworkFee}
                networkFee={feeData?.fee as any}
                customNetworkFee={customNetworkFee}
                setCustomNetworkFee={setCustomNetworkFee}
                selected={selectedNetworkFee}
                setSelected={setSelectedNetworkFee}
                min={feeData?.fee.normal || 1}
              />
            </div>
            <div className="w-full   border-bgAlt border-[1px] rounded-[8px] p-4 text-[#66605B] mt-[20px]">
              <div className="flex py-[9px] items-center justify-between border-b border-[#E5E4E3]">
                <span className="text-sm font-light leading-5 tracking-[-0.42px]">Price:</span>
                <div className="font-ProtoMono">
                  <FormatPrice satValue={data?.value} />
                </div>
              </div>
              <div className="flex py-[9px] items-center justify-between border-b border-[#E5E4E3]">
                <span className="text-sm font-light leading-5 tracking-[-0.42px]">Platform Fee</span>
                <div className="font-ProtoMono">
                  <FormatPrice satValue={data?.platform_fees} />
                </div>
              </div>
              <div className="border-b border-[#E5E4E3] py-2">
                <div className="flex  items-center justify-between">
                  <span className="text-sm font-light leading-5 tracking-[-0.42px]">Transaction Fee Rate:</span>
                  <div>
                    <span className="text-[#FF6634] font-ProtoMono">{feeRate}</span> SATS/VB
                  </div>
                </div>
                <div className="flex mt-3  items-center justify-between">
                  <span className="text-sm font-light leading-5 tracking-[-0.42px]">
                    {data?.sats_in_inscription} VB * <span className="text-[#FF6634]">{feeRate}</span> SATS/VB
                  </span>
                  <div className="font-ProtoMono">
                    <FormatPrice
                      satValue={Number(data?.sats_in_inscription) ? data?.sats_in_inscription * feeRate : ''}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-light leading-5 tracking-[-0.42px]">Total:</span>
                  <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path
                        d="M8.49967 11.1666V8.49992M8.49967 5.83325H8.50634M15.1663 8.49992C15.1663 12.1818 12.1816 15.1666 8.49967 15.1666C4.81778 15.1666 1.83301 12.1818 1.83301 8.49992C1.83301 4.81802 4.81778 1.83325 8.49967 1.83325C12.1816 1.83325 15.1663 4.81802 15.1663 8.49992Z"
                        stroke="#B3B0AD"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 font-ProtoMono">
                  <div className="flex items-center gap-2 text-base font-medium leading-6">
                    <span className="text-[#FF6634]">~{data?.total}</span>
                    <span>sats</span>
                    <span className="text-[#12B76A]">
                      ~${' '}
                      {Number(data?.total) ? ((data?.total / Math.pow(10, 8)) * Number(btcToUsdRate)).toFixed(4) : ''}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-end font-ProtoMono">
                {Number(data?.total) ? (data?.total / Math.pow(10, 8)).toFixed(8) : 0}BTC
              </p>
            </div>
            <div className="flex justify-center gap-0 mt-8">
              <ButtonImage
                varirant="primary-asset"
                className="py-[9px] w-[167px] lg:w-[200px] p-0"
                onClick={handleConfirm}
              >
                Confirm
              </ButtonImage>
              <button
                className="flex py-[9px] w-[167px] items-center justify-center  lg:w-[200px] border-0 outline-none"
                onClick={() => closeModal()}
              >
                <span className="text-base font-medium leading-6 tracking-[-0.48px] text-[#AE9955]">Cancel</span>
              </button>
            </div>
            {isBuying && <Loading />}
          </>
        </ModalLayout>
      </ModalContainer>
    </div>
  )
}

export default memo(ConfirmModal)

