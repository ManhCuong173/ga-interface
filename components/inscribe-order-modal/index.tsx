'use client'

import { setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { mintService } from '@/services/mint.service'
import { nftService } from '@/services/nft.service'
import { Dialog } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import QRBox from '../QRBox'
import { MintModalLayout } from '../mintNFTs/MintModalLayout'
import NFTDetail from '../mintNFTs/NFTDetail'
import { NFTSection } from '../mintNFTs/NFTSection'
import FeeDetail from './fee-detail'
import Stepper from './stepper'
import StepInscribing from './steps/step-inscribing'

export default function InscribeOrderModal({ setOpen, order, open }: any) {
  const [payBTC, setPayBTC] = useState(true)
  const [limitTime, setLimitTime] = useState(180)
  const publicKey = useAppSelector(selectedPublicKey)
  const [orderDetail, setOrderDetail] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [unisat, setUnisat] = useState<any>()
  const [NFT, setNFT] = useState('')
  const [isOpenWallet, setIsOpenWallet] = useState(false)
  const queryClient = useQueryClient()

  const getOrderDetail = useCallback(async () => {
    setIsLoading(true)
    const res = await nftService.getNFT({
      id_create: order?.id_create,
      public_key: publicKey,
    })
    if (res) setIsLoading(false)
    setOrderDetail(res)
  }, [order?.id_create, publicKey])

  const confirmPayment = useCallback(async (id_create: string) => {
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
  }, [getOrderDetail])

  const handlePayWithWallet = async () => {
    try {
      setIsOpenWallet(true)
      setStep(2)
      const txid = await unisat.sendBitcoin(
        order?.address_transfer_fee || order?.payment_wallet,
        Math.ceil(order?.fee_mint * Math.pow(10, 8)),
      )
      if (txid) {
        setIsOpenWallet(false)
        setTimeout(() => {
          confirmPayment(order?.id_create)
        }, 5000)
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
    if (!payBTC) setLimitTime(180)
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
  }, [limitTime, order, payBTC, open, setOpen, confirmPayment, orderDetail])

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      ref={modalRef}
      className={
        'fixed inset-0 z-20 flex w-full justify-center overflow-auto bg-black/70 pt-[120px]'
      }
    >
      <Dialog.Panel className='h-fit pb-[120px] max-sm:w-full max-sm:px-4'>
        <MintModalLayout className={'py-8'}>
          <div className='flex flex-col gap-8 text-[#4E473F] sm:gap-10'>
            <div className='flex flex-col items-start max-sm:gap-2'>
              <div className='flex w-full justify-between'>
                <p className='text-2xl font-normal leading-10 tracking-[-0.48px] sm:text-[32px] sm:font-medium sm:tracking-[-0.64px]'>
                  Inscribing Order
                </p>
                <div className='cursor-pointer' onClick={closeModal}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='45'
                    viewBox='0 0 45 45'
                    fill='none'
                  >
                    <rect
                      x='0.515625'
                      y='1.20093'
                      width='43'
                      height='43'
                      rx='7.5'
                      stroke='#D4C79C'
                    />
                    <path
                      d='M30.3916 14.325L13.6396 31.0769'
                      stroke='#AE9955'
                      stroke-width='3'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M13.6396 14.325L30.3916 31.0769'
                      stroke='#AE9955'
                      stroke-width='3'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <p className='text-sm font-medium leading-5 tracking-[-0.42px]'>
                {' '}
                <span className='font-light text-[#B2B0AD]'>Order ID:</span>{' '}
                {orderDetail?.id_create}
              </p>
              <div className='flex gap-8'>
                <p className='text-sm font-light leading-5 tracking-[-0.42px] text-[#383F4A]'>
                  {' '}
                  <span className=' text-[#B2B0AD]'>Quantity:</span>{' '}
                  {orderDetail?.mint_list?.length}
                </p>
                <p className='text-sm font-medium leading-5 tracking-[-0.42px] text-[#FF6634]'>
                  {' '}
                  <span className='font-light text-[#B2B0AD]'>Status:</span>
                  {orderDetail?.status}
                </p>
              </div>
            </div>
            <NFTSection
              listNft={orderDetail?.mint_list}
              isLoading={isLoading}
              ableView={orderDetail?.status === 'minted'}
              setNFT={setNFT}
            />
            <Stepper step={step} />
            {step === 3 && <StepInscribing />}
            <FeeDetail
              step={step}
              feeRate={orderDetail?.fee_rate}
              feeMint={orderDetail?.fee_mint}
              gasFee={orderDetail?.gas_fee}
              status={orderDetail?.status}
            />
            {step === 1 && !orderDetail?.status.includes('closed') && (
              <QRBox
                payBTC={payBTC}
                setPayBTC={setPayBTC}
                orderDetail={orderDetail}
                step={step}
                handlePayWithWallet={handlePayWithWallet}
                isOpenWallet={isOpenWallet}
              />
            )}
          </div>
        </MintModalLayout>
        <NFTDetail id_create={order?.id_create} item={NFT} setNFT={setNFT} openModal={NFT != ''} />
      </Dialog.Panel>
    </Dialog>
  )
}
