import check from '@/images/inscribe/check.svg'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { IconCopy } from './button'

const QRBox = ({
  payBTC,
  setPayBTC,
  orderDetail,
  step,
  handlePayWithWallet,
  isOpenWallet,
}: any) => {
  const date = new Date(orderDetail?.time_create * 1000)
  return (
    <>
      <div className='flex flex-col sm:items-end items-center gap-4'>
        <div className='flex w-full flex-col gap-4 rounded-lg border border-[#E5E4E3] p-4'>
          <div className='flex w-full items-center justify-start gap-2'>
            <div
              className={`${payBTC ? 'bg-[rgba(255,102,52,1)]' : 'border-[0.83px] border-[#383F4A]'} flex h-5 w-5 cursor-pointer items-center justify-center rounded-full`}
              onClick={() => {
                if (setPayBTC) setPayBTC(true)
              }}
            >
              <Image src={check} alt='' />
            </div>
            <span className='left-6 text-base font-medium tracking-[-0.48px]'>Pay with BTC</span>
          </div>
          <div className='flex gap-6 max-sm:flex-col'>
            <div className='flex flex-col items-center gap-6 px-6'>
              <div className='relative w-[224px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='228'
                  height='228'
                  viewBox='0 0 228 228'
                  fill='none'
                >
                  <path
                    d='M2.01562 36.1647V3.70093C2.01562 2.59636 2.91106 1.70093 4.01562 1.70093H36.5531'
                    stroke='#383F4A'
                    stroke-width='3'
                    stroke-linecap='round'
                  />
                  <path
                    d='M226.016 36.1647V3.70093C226.016 2.59636 225.12 1.70093 224.016 1.70093H191.478'
                    stroke='#383F4A'
                    stroke-width='3'
                    stroke-linecap='round'
                  />
                  <path
                    d='M2.01562 191.237V223.701C2.01562 224.805 2.91106 225.701 4.01562 225.701H36.5531'
                    stroke='#383F4A'
                    stroke-width='3'
                    stroke-linecap='round'
                  />
                  <path
                    d='M226.016 191.237V223.701C226.016 224.805 225.12 225.701 224.016 225.701H191.478'
                    stroke='#383F4A'
                    stroke-width='3'
                    stroke-linecap='round'
                  />
                </svg>
                <div className='absolute inset-0 flex h-full w-full items-center justify-center'>
                  {orderDetail?.link_qr_code_image && (
                    <Image src={orderDetail?.link_qr_code_image} width={220} height={220} alt='' />
                  )}
                </div>
              </div>
              <span className='text-sm font-light leading-5 tracking-[-0.42px] text-[#B2B0AD]'>
                Scan the QR code to pay
              </span>
            </div>
            <div className='flex flex-1 flex-col gap-[92px]'>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium leading-5 tracking-[-0.42px] text-[#66605B]'>
                  Or pay to the address below:
                </span>
                <div className='flex flex-row-reverse w-full'>
                  <div className='flex h-10 w-10 min-w-10 items-center justify-center rounded-r-[4px] border border-[rgba(229,227,223,1)]'>
                    <IconCopy text={orderDetail?.address_transfer_fee} />
                  </div>
                  <div className='flex-1 flex h-10 w-full items-center rounded-l-[4px] border border-[rgba(229,227,223,1)] px-2 truncate'>
                    <span className='text-xs font-light leading-[18px] tracking-[-0.36px]'>
                      {orderDetail?.address_transfer_fee}
                    </span>
                  </div>
                </div>
                <p className='text-xs font-light leading-[18px] tracking-[-0.36px] text-[#F04438]'>
                  Do not carry inscription in the payment, <br /> otherwise it will fail.
                </p>
              </div>
              <div className='px-4 py-3 text-sm font-light leading-5 tracking-[-0.42px]'>
                <p className='max-w-[315px]'>
                  Need BTC?{' '}
                  <span className='cursor-pointer text-[#EF232C] underline'>Click here</span> to buy
                  some BTC with MoonPay!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-4 rounded-lg border border-[#E5E4E3] p-4'>
          <div className='flex w-full items-center justify-start gap-2'>
            <div
              className={`${!payBTC ? 'bg-[rgba(255,102,52,1)]' : 'border-[0.83px] border-[#383F4A]'} flex h-5 w-5 cursor-pointer items-center justify-center rounded-full`}
              onClick={() => {
                setPayBTC(false)
              }}
            >
              <Image src={check} alt='' />
            </div>
            <span className='left-6 text-base font-medium tracking-[-0.48px]'>Pay with Wallet</span>
          </div>
          {!payBTC && step <= 2 && !orderDetail?.status.includes('closed') && (
            <div className={`flex w-full justify-center ${isOpenWallet ? 'opacity-50' : ''}`}>
              <CustomButton
                className='w-[200px] lg:w-[280px] h-[75px]'
                text={'Pay with wallet'}
                handleClick={handlePayWithWallet}
                disabled={isOpenWallet}
              />
            </div>
          )}
        </div>
        <p className='max-sm:max-w-[206px] text-center text-xs font-light leading-[18px] tracking-[-0.36px] text-[#B2B0AD]'>
          Order created {` `}
          {`${date.toLocaleString('en-US', {
            // timeZone: 'America/New_York',
            dateStyle: 'medium',
            timeStyle: 'medium',
          })}`}
          {` (UTC+7:00)`}
          {/* Nov 09, 2023, 01:24:52 (UTC+7:00) */}
        </p>
      </div>
    </>
  )
}

export default QRBox
