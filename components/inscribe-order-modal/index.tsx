'use client'

import { setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import mintService from '@/services/mint.service'
import orderService from '@/services/order.service'

import { FEE_DECIMALS } from '@/constants/fee'
import { getDecimalAmount } from '@/lib/formatNumber'
import { OrderDetail, OrderStatus } from '@/types/orders'
import { Dialog } from '@headlessui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ButtonImage } from '../button'
import NFTDetail from '../mintNFTs/NFTDetail'
import { CloseIcon } from '../ui/icons'
import FeeDetails from './FeeDetails'
import StepInscribing from './StepPay/Inscribing'
import PaymentReceived from './StepPay/PaymentReceived'
import OrderListNFT from './components/OrderListNFT'
import PayMethod from './components/PayMethod'
import Stepper from './stepper'
import { PayMethodEnum } from './types'
import { NFT } from '@/types/nft'
import { orderInfoDetail } from '@/constants/order'

const LIMIT_TIME = 360 // => 10s per request. that will request it within 1 hour.

const InscribeOrderModal: React.FC<{ onClose: () => void; orderId: string; isOpen: boolean }> = ({
  onClose,
  orderId,
  isOpen,
}: any) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const publicKey = useAppSelector(selectedPublicKey)

  const refLimitTime = useRef(LIMIT_TIME)

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedNFT, setSelectNFT] = useState<NFT | undefined>(undefined)

  const [isSigning, setIsSiging] = useState(false)
  const [txnID, setTxnID] = useState('')

  const [selectedPayMethod, setPayMethod] = useState<PayMethodEnum | null>(null)

  const handleUpdateStep = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Inscribing:
        return setStep(3)
      case OrderStatus.Minted:
        return setStep(4)
      default:
        return setStep(1)
    }
  }

  const {
    data: orderDetail,
    refetch: refetchOrderDetail,
    isLoading,
  } = useQuery<OrderDetail>({
    queryKey: ['order-detail'],
    queryFn: async () => {
      const result = await orderService
        .getOrderMintInfo({
          id: orderId,
          publicKey: publicKey,
        })
        .call()

      if (result.data?.status) {
        handleUpdateStep(result.data?.status)
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      }

      return result.data as OrderDetail
    },
    enabled: !!orderId,
    initialData: orderInfoDetail,
  })

  const confirmPayment = useCallback(
    async (id: string) => {
      const result = await mintService.checkOrder(id).call()

      if (result?.data !== OrderStatus.Pending) {
        refetchOrderDetail()
      }
    },
    [refetchOrderDetail],
  )

  useQuery({
    queryKey: ['interval-fetch-order-detail', orderDetail?.orderId],
    queryFn: () => refetchOrderDetail(),
    refetchInterval: 30_000,
    enabled: orderDetail?.status === OrderStatus.Inscribing,
  })

  useQuery({
    queryKey: ['interval-check-order', orderDetail?.orderId, txnID],
    queryFn: async () => {
      await confirmPayment(orderDetail?.orderId)
    },
    refetchInterval: selectedPayMethod === PayMethodEnum.QRCode || txnID ? 10_000 : 30_000,
    enabled: Boolean(isOpen && orderDetail?.status === OrderStatus.Pending),
  })

  const handlePayWithWallet = async () => {
    try {
      setIsSiging(true)

      const recipient = orderDetail.collectorFeeAddress || orderDetail.paymentWallet
      const amount = orderDetail.feeMint
      const txId = await (window as any).unisat.sendBitcoin(recipient, getDecimalAmount(amount, FEE_DECIMALS))

      if (txId) {
        setTxnID(txId)
      }

      setStep(2)
    } catch (e) {
    } finally {
      setIsSiging(false)
    }
  }

  useEffect(() => {
    return () => {
      refLimitTime.current = LIMIT_TIME
      setStep(1)
      setSelectNFT(undefined)
      setIsSiging(false)
      setTxnID('')
      setPayMethod(null)
    }
  }, [])

  const handleCloseModal = () => {
    onClose()
    dispatch(setProcessState(1))
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }

  const renderStep = useMemo(() => {
    if (orderDetail?.status.includes(OrderStatus.Closed)) return <></>

    switch (step) {
      case 1:
        return (
          // !orderDetail?.lockNFT &&
          <PayMethod
            selectedPayMethod={selectedPayMethod}
            onSelectPayMethod={(method) => {
              setPayMethod(selectedPayMethod === method ? null : method)
            }}
            isSiging={isSigning}
            orderDetail={orderDetail}
            onPayWallet={handlePayWithWallet}
          />
        )
      case 2:
        return <PaymentReceived />
      case 3:
        return <StepInscribing confirmed={1} unconfirmed={1} />
      default:
        return (
          <ButtonImage onClick={handleCloseModal} varirant="primary-asset" className="my-10 w-full px-12 py-4">
            Done
          </ButtonImage>
        )
    }
  }, [step, selectedPayMethod, isSigning, orderDetail, setPayMethod, handlePayWithWallet])

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      className={'fixed inset-0 z-20 flex w-full justify-center overflow-auto bg-black/70 pt-[120px]'}
    >
      <Dialog.Panel>
        <div className="relative rounded-xl bg-white mx-auto lg:max-w-[1080px] w-full md:w-[calc(100%-24px)] lg:w-full">
          <div
            className="cursor-pointer absolute right-[2%] top-[2%]  lg:hidden"
            onClick={() => {
              onClose()
            }}
          >
            <CloseIcon className="w-11 h-11" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="px-4 py-6 xl:p-[40px] border-r-2 border-solid border-bgAlt">
              <div className="flex justify-center lg:justify-between w-full mb-5">
                <p className="text-2xl text-red-light font-bold sm:text-[32px]">Inscribing Order!</p>
              </div>
              <OrderListNFT isLoading={isLoading} onSelectNFT={setSelectNFT} orderDetail={orderDetail} />
            </div>

            <div className="px-4 py-6 xl:p-[40px] ">
              <div className="flex justify-center items-center font-Roboto text-black2 text-xs text-center lg:justify-between">
                <span>
                  Order created{' '}
                  {new Date(orderDetail?.createdAt).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    timeZoneName: 'short',
                  })}
                </span>
                <div
                  className="cursor-pointer hidden lg:block"
                  onClick={() => {
                    onClose()
                  }}
                >
                  <CloseIcon className="w-11 h-11" />
                </div>
              </div>

              <div className="my-5 min-w-[380px]">
                <Stepper step={step} />
              </div>

              <FeeDetails orderDetail={orderDetail} />

              <div className="mt-5">{renderStep}</div>
            </div>
          </div>
        </div>

        <NFTDetail
          orderId={orderDetail?.orderId}
          nft={selectedNFT}
          isOpen={Boolean(selectedNFT)}
          onClose={() => {
            setSelectNFT(undefined)
          }}
        />
      </Dialog.Panel>
    </Dialog>
  )
}
export default InscribeOrderModal

// useQuery({
//   queryKey: ['interval-confirm-payment-countdown', orderDetail?.orderId, txnID],
//   queryFn: async () => {
//     console.log('fetch countdown')
//     await confirmPayment(orderDetail?.orderId)
//     refCountdown.current -= 1
//   },
//   refetchInterval: 10_000,
//   enabled: Boolean(
//     isOpen &&
//       refCountdown.current > 0 &&
//       // (
//       txnID &&
//       //  || orderDetail?.lockNFT
//       // )

//       orderDetail?.status === OrderStatus.Pending,
//   ),
// })

// useQuery({
//   queryKey: ['interval-confirm-payment-limit-time', orderDetail?.orderId, txnID],
//   queryFn: async () => {
//     console.log('fetch limit')

//     await confirmPayment(orderDetail?.orderId)
//     refLimitTime.current -= 1
//   },
//   refetchInterval: 10_000,
//   enabled: Boolean(
//     isOpen &&
//       refLimitTime.current > 0 &&
//       orderDetail?.status === OrderStatus.Pending
//        &&
//       selectedPayMethod === PayMethodEnum.QRCode,
//   ),
// })
