'use client'

import { setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { mintService } from '@/services/mint.service'
import { nftService } from '@/services/nft.service'
import { Dialog } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import NFTDetail from '../mintNFTs/NFTDetail'
import { CloseIcon } from '../ui/icons'
import StepInscribing from './StepPay/Inscribing'
import OrderListNFT from './components/OrderListNFT'
import QRBox from './components/PayMethod'
import FeeDetails from './FeeDetails'
import Stepper from './stepper'
import { PayMethodEnum } from './types'
import PaymentReceived from './StepPay/PaymentReceived'
import { ButtonImage } from '../button'
import { OrderDetail } from '@/types/orders'

const nfts = [
  {
    id_nft: 1,
    number: '68709',
    natural_number: 68709,
    nft_link: 'https://s3-stag.esollabs.com/brc-20/golden-apple/nft/1_68709.png',
    is_mint: false,
    base_64: '12313',
    format: 'asdada',
    size: 123,
    price: 1231,
  },
]

const InscribeOrderModal = ({ setOpen, order, open }: any) => {
  const [payBTC, setPayBTC] = useState(true)
  const [limitTime, setLimitTime] = useState(180)
  const [countdown, setCountdown] = useState(15)
  const publicKey = useAppSelector(selectedPublicKey)
  const [orderDetail, setOrderDetail] = useState<OrderDetail>({
    id_create: 'ea51e56cff8b04s56vd54d5634760346',
    createAt: Date.now(),
    status: 'Pending',
    address_transfer_fee: 'bc1qxtpwmq6mcpsc3t9zk70esfavtvfdz30ls5llda',
    fee_rate: 154,
    fee_mint: 40,
    gas_fee: 0.0008,
    mint_list: [...nfts, ...nfts, ...nfts, ...nfts, ...nfts, ...nfts, ...nfts],
    link_qr_code_image: '/images/christian_qrcode.png',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [unisat, setUnisat] = useState<any>()
  const [NFT, setNFT] = useState<number | string>('')
  const [isOpenWallet, setIsOpenWallet] = useState(false)
  const queryClient = useQueryClient()
  const [txidd, setTxidd] = useState('')
  const [selectedPayMethod, setPayMethod] = useState<PayMethodEnum | null>(null)

  const getOrderDetail = useCallback(async () => {
    setIsLoading(true)
    const res = await nftService.getNFT({
      id_create: order?.id_create,
      public_key: publicKey,
    })
    if (res) setIsLoading(false)
    setOrderDetail(res as any)
  }, [order?.id_create, publicKey])

  const confirmPayment = useCallback(
    async (id_create: string) => {
      try {
        const res: any = await mintService.confirm({
          id_create: id_create,
        })
        if (res && res.data && res.data.status === 'inscribing') {
          getOrderDetail()
        }
      } catch (error) {
        console.log('err: ', error)
      }
    },
    [getOrderDetail],
  )

  const handlePayWithWallet = async () => {
    try {
      setIsOpenWallet(true)
      setStep(2)
      const txid = await unisat.sendBitcoin(
        order?.address_transfer_fee || order?.payment_wallet,
        Math.ceil(order?.fee_mint * Math.pow(10, 8)),
      )
      if (txid) {
        setTxidd(txid)
        setIsOpenWallet(false)
      }
    } catch (e) {
      setIsOpenWallet(false)
    }
  }

  const modalRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (step === 3 && order?.id_create) {
      getOrderDetail()
    }
  }, [step, getOrderDetail, order?.id_create])

  useEffect(() => {
    setStep(1)
    if (orderDetail) {
      if (orderDetail?.status === 'inscribing') {
        setStep(3)
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      } else if (orderDetail?.status === 'minted') {
        setStep(4)
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    }
  }, [orderDetail, queryClient])

  useEffect(() => {
    if (order?.id_create) {
      getOrderDetail()
    }
    if (!open) setLimitTime(180)
    setPayBTC(true)
  }, [open, order, getOrderDetail])

  const closeModal = () => {
    setOpen(false)
    dispatch(setProcessState(1))
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }

  useEffect(() => {
    modalRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [open])

  useEffect(() => {
    if (window !== undefined) {
      setUnisat((window as any).unisat)
    }
  }, [])

  useEffect(() => {
    if (step === 3) {
      if (order?.status !== 'minted') {
        const time = setInterval(() => {
          getOrderDetail()
        }, 30000)
        return () => {
          clearInterval(time)
        }
      } else {
        console.log('minted')
      }
    }
  }, [step, getOrderDetail, order?.status])

  useEffect(() => {
    if (countdown > 0 && txidd && orderDetail?.status === 'pending') {
      const time = setInterval(() => {
        confirmPayment(order?.id_create)
        setCountdown(countdown - 1)
      }, 1000)
      return () => {
        clearInterval(time)
      }
    }
  }, [countdown, txidd])

  useEffect(() => {
    if (!payBTC && !txidd) setLimitTime(180)
    else if (limitTime > 0 && open) {
      if (!orderDetail || orderDetail?.status === 'pending') {
        const time = setInterval(() => {
          confirmPayment(order?.id_create)
          setLimitTime(limitTime - 2)
        }, 2000)
        return () => {
          clearInterval(time)
        }
      }
    } else {
      setOpen(false)
    }
  }, [limitTime, order, payBTC, open, setOpen, confirmPayment, orderDetail, txidd])

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return (
          !orderDetail?.status.includes('closed') && (
            <QRBox
              selectedPayMethod={selectedPayMethod}
              onSelectPayMethod={(method) => {
                setPayMethod(selectedPayMethod === method ? null : method)
              }}
              isSiging={isOpenWallet}
              orderDetail={orderDetail}
              onPayWallet={handlePayWithWallet}
            />
          )
        )
      case 2:
        return <PaymentReceived />
      case 3:
        return <StepInscribing />
      default:
        return (
          <ButtonImage varirant="primary-asset" className="my-10 w-full px-12 py-4">
            Done
          </ButtonImage>
        )
    }
  }, [step, selectedPayMethod, isOpenWallet, orderDetail, setPayMethod, handlePayWithWallet])

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      ref={modalRef}
      className={'fixed inset-0 z-20 flex w-full justify-center overflow-auto bg-black/70 pt-[120px]'}
    >
      <Dialog.Panel className="h-fit w-full">
        <div className="relative rounded-xl bg-white mx-auto lg:max-w-[1080px] w-full md:w-[calc(100%-24px)] lg:w-full">
          <div
            className="cursor-pointer absolute right-[2%] top-[2%]  lg:hidden"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon className="w-11 h-11" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="px-4 py-6 xl:p-[40px] border-r-2 border-solid border-bgAlt">
              <div className="flex justify-center lg:justify-between w-full mb-5">
                <p className="text-2xl text-red-light font-bold sm:text-[32px]">Inscribing Order!</p>
              </div>
              <OrderListNFT isLoading={isLoading} onSelectNFT={() => {}} orderDetail={orderDetail} />
            </div>

            <div className="px-4 py-6 xl:p-[40px] ">
              <div className="flex justify-center items-center font-Roboto text-black2 text-xs text-center lg:justify-between">
                <span>
                  Order created{' '}
                  {new Date(orderDetail.createAt).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    timeZoneName: 'short',
                  })}
                </span>
                <div
                  className="cursor-pointer hidden lg:block"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <CloseIcon className="w-11 h-11" />
                </div>
              </div>

              <div className="my-5">
                <Stepper step={step} />
              </div>

              <FeeDetails
                step={step}
                feeRate={orderDetail?.fee_rate}
                feeMint={orderDetail?.fee_mint}
                gasFee={orderDetail?.gas_fee}
                status={orderDetail?.status}
              />

              <div className="mt-5">{renderStep}</div>
            </div>
          </div>
        </div>
        <NFTDetail id_create={order?.id_create} item={NFT} setNFT={setNFT} openModal={NFT != ''} />
      </Dialog.Panel>
    </Dialog>
  )
}
export default InscribeOrderModal
