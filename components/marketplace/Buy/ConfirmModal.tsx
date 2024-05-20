import CustomButton from '@/components/CustomButton'
import ChooseNetworkFee from '@/components/mintNFTs/ChooseNetworkFee'
import FormatPrice from '@/components/mintNFTs/FormatPrice'
import ModalContainer from '@/components/ui/modal-container'
import frameNFT from '@/images/mint/popup/frame_nft.svg'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { marketPlaceService } from '@/services/market.service'
import publicService from '@/services/public.service'

import { NetworkFee, NetworkFeeEnum, NetworkFeeType } from '@/types/fee'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { MutableRefObject, memo, useEffect, useRef, useState, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { ModalLayout } from './ModalLayout'
import { setItemBought } from '@/lib/features/marketplace/marketplace-slice'
import Loading from '@/components/Loading'
import { toast } from 'react-toastify'
import { handleReturnIconType } from '../Item'

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
  const address = useAppSelector(selectAddress)
  const [customNetworkFee, setCustomNetworkFee] = useState(1)
  const [customNetworkFeeDebounce] = useDebounce(customNetworkFee, 300)
  const [selectedNetworkFee, setSelectedNetworkFee] = useState<NetworkFeeType>(NetworkFeeEnum.Normal)
  const btcToUsdRate: string = useSelector(selectBtnToUsdRateData)
  const ref: MutableRefObject<any> = useRef()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const [isBuying, setBuying] = useState(false)

  const { data: feeData, isLoading: loadingNetworkFee } = useQuery<NetworkFee>({
    queryKey: ['fee'],
    queryFn: async () => {
      const result = await publicService.getNetworkFee()
      return result.data as NetworkFee
    },
    enabled: !!open,
    initialData: {
      custom: 0,
      high: 0,
      normal: 0,
    },
  })

  const feeRate = selectedNetworkFee !== 'custom' ? feeData[selectedNetworkFee] || 0 : customNetworkFee

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
            <div ref={ref} className="flex flex-col items-center gap-2">
              <p className="text-[32px] font-semibold leading-[50px] tracking-[-0.96px]">Confirmation</p>
              <p className="text-sm font-light leading-5 tracking-[-0.42px]">Please confirm the transaction below:</p>
            </div>

            <div className="relative h-[350px] w-[350px] p-4">
              <Image src={frameNFT} alt="" fill priority />
              <div className="flex items-center justify-center lg:h-[320px] lg:w-[320px]">
                <Image
                  src={nft_image}
                  sizes="100vw"
                  className="h-full w-full"
                  width={0}
                  height={0}
                  loader={() => nft_image}
                  alt=""
                />
              </div>
              <div className="absolute left-[27px] top-[27px] flex h-8 min-w-[124px] items-center justify-center gap-2 rounded bg-[#fff4dd80] px-2 py-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-_white">
                  {/* <Image src={''} alt=''/> */}
                  <Image src={handleReturnIconType(item.nft_id)} alt="" width={20} height={20} />
                </div>
                <span className="left-6 text-xs font-medium tracking-[-0.48px]">#{item.inscription_number}</span>
              </div>
            </div>

            <div className="flex w-full flex-col space-y-3">
              <p className="text-left text-[14px] font-medium">Select the network fee you want to pay</p>
              <ChooseNetworkFee
                isLoading={loadingNetworkFee}
                networkFee={feeData}
                customNetworkFee={customNetworkFee}
                onCustomFee={setCustomNetworkFee}
                selectedNetworkFeeType={selectedNetworkFee}
                onSelectFeeType={setSelectedNetworkFee}
                min={feeData.normal || 1}
              />
            </div>

            <div className="w-full rounded border border-stroke p-4 text-line">
              <div className="flex h-[60px] items-center justify-between border-b border-stroke">
                <span className="text-sm font-light leading-5 tracking-[-0.42px]">Price:</span>
                <FormatPrice satValue={data?.value} />
              </div>
              <div className="flex h-[60px] items-center justify-between border-b border-stroke">
                <span className="text-sm font-light leading-5 tracking-[-0.42px]">Platform Fee</span>
                <FormatPrice satValue={data?.platform_fees} />
              </div>
              <div className="border-b border-stroke py-2">
                <div className="flex h-9 items-center justify-between">
                  <span className="text-sm font-light leading-5 tracking-[-0.42px]">transaction fee rate:</span>
                  <span>
                    <span className="text-orange2">{feeRate}</span> SATS/VB
                  </span>
                </div>
                <div className="flex h-9 items-center justify-between">
                  <span className="text-sm font-light leading-5 tracking-[-0.42px]">
                    {data?.sats_in_inscription} VB * <span className="text-orange2">{feeRate}</span> SATS/VB
                  </span>
                  <FormatPrice
                    satValue={Number(data?.sats_in_inscription) ? data?.sats_in_inscription * feeRate : ''}
                  />
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-base font-medium leading-6">
                    <span className="text-orange2">~{data?.total}</span>
                    <span>sats</span>
                    <span className="text-mark2">
                      ~${' '}
                      {Number(data?.total) ? ((data?.total / Math.pow(10, 8)) * Number(btcToUsdRate)).toFixed(4) : ''}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-end">{Number(data?.total) ? (data?.total / Math.pow(10, 8)).toFixed(8) : 0}BTC</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="flex h-[60px] w-[167px] items-center justify-center border-[2px] border-[#D4C79C] lg:w-[280px] lg:py-[26px]"
                onClick={() => closeModal()}
              >
                <span className="text-base font-medium leading-6 tracking-[-0.48px] text-[#AE9955]">Cancel</span>
              </button>
              <CustomButton className="h-[60px] w-[167px] lg:w-[280px]" text={'confirm'} handleClick={handleConfirm} />
            </div>
            {isBuying && <Loading />}
          </>
        </ModalLayout>
      </ModalContainer>
    </div>
  )
}

export default memo(ConfirmModal)
