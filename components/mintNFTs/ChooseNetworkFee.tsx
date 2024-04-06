import checkedIcon from '@/icons/mint/checked.svg'
import uncheckIcon from '@/icons/mint/uncheck.svg'
import { NetworkFeeType } from '@/types/fee'
import Image from 'next/image'
import { toast } from 'react-toastify'
import ProgressBar from '../progress-bar'

type Props = {
  networkFee: {
    normal: number
    high: number
    customer: number
  }
  customNetworkFee: number
  setCustomNetworkFee: any
  selected: NetworkFeeType
  setSelected: any
  loading: boolean
  isDisplayTime?: boolean
  min: number
}

export default function ChooseNetworkFee({
  networkFee,
  selected,
  setSelected,
  loading,
  customNetworkFee,
  setCustomNetworkFee,
  isDisplayTime,
  min,
}: Props) {
  return (
    <>
      <div className='mx-auto flex w-full gap-4 max-sm:flex-col'>
        {(['normal', 'high', 'custom'] as NetworkFeeType[]).map((network) => (
          <div
            key={network}
            className={`${network === selected ? 'bg-[linear-gradient(180deg,#FF6B00_-36.94%,#FFB800_136.07%)] p-[2px] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.10)]' : 'bg-[rgba(246,238,227,0.50)]'} w-full cursor-pointer rounded`}
            onClick={() => {
              setSelected(network)
            }}
          >
            <div
              className={`${network === selected ? 'bg-[#FFDFAC]' : 'bg-[rgba(246,238,227,0.50)]'} flex flex-col gap-3 rounded p-3`}
            >
              <div className='flex items-center justify-between'>
                <div className='text-xs font-medium uppercase leading-[18px] tracking-[-0.36px] first-letter:uppercase'>
                  {network}
                </div>
                {network === selected ? (
                  <Image src={checkedIcon} alt='' width={20} height={20} />
                ) : (
                  <Image src={uncheckIcon} alt='' width={20} height={20} />
                )}
              </div>
              <div>
                {loading ? (
                  'loading'
                ) : networkFee ? (
                  <p className='flex items-center gap-1'>
                    <span className='mr-1 text-lg font-medium leading-7 tracking-[-0.54px] text-[rgba(247,144,9,1)]'>
                      {network !== 'custom' ? networkFee[network] : customNetworkFee}
                    </span>
                    <span className='text-sm font-light uppercase leading-5 tracking-[-0.42px] text-[#66605B]'>
                      sats/vB
                    </span>
                  </p>
                ) : (
                  'empty'
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected === 'custom' && (
        <div className='flex items-center gap-8'>
          {/* {isDisplayTime && <div className='p-3 max-sm:hidden'>
            <div className='relative h-[80px] w-[80px]'>
              <Image src={time_range} alt='' />
              <div className='absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center gap-[6px]'>
                <p className='text-lg font-medium uppercase leading-7 tracking-[-0.54px] text-[#FF6634]'>
                  10m
                </p>
                <p className='text-sm font-light uppercase leading-5 tracking-[-0.42px] text-[#383F4A]'>
                  Time
                </p>
              </div>
              <div className='absolute left-0 right-0 top-[-4px] mx-auto w-fit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='13'
                  height='13'
                  viewBox='0 0 13 13'
                  fill='none'
                >
                  <circle cx='6.50781' cy='6.29883' r='6' fill='#4E473F' />
                  <circle cx='6.50781' cy='6.29883' r='4' fill='white' />
                </svg>
              </div>
            </div>
          </div>} */}
          <div className='flex w-full flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium uppercase leading-5 tracking-[-0.42px]'>
                Custom fee
              </p>
              <div className='w-[86px] rounded-[4px] bg-[linear-gradient(180deg,#FF6634_-36.94%,#FFEF5F_136.07%)] p-[2px]'>
                <div className='h-full w-full rounded bg-white px-2 py-[6px]'>
                  <input
                    className='w-full border-none text-end text-sm font-light leading-5 tracking-[-0.42px] text-[#383F4A] outline-none'
                    value={customNetworkFee}
                    type='number'
                    onChange={(e) => setCustomNetworkFee(Number.parseInt(e.target.value))}
                    onBlur={(e) => {
                      const value = Number.parseInt(e.target.value)

                      if (value < min || value > 500) {
                        toast.error(`Please enter a value between ${min} and 500`)
                        setCustomNetworkFee(min)
                      } else {
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={` flex h-4 origin-top items-center transition-all`}>
              <div className='relative w-full'>
                <div className='relative z-[1]'>
                  <ProgressBar value={customNetworkFee - min} total={500 - min} bulletSize={20}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <circle
                        cx='10'
                        cy='10'
                        r='9'
                        fill='white'
                        stroke='#FF6634'
                        stroke-width='2'
                      />
                    </svg>
                  </ProgressBar>
                </div>
                <input
                  type='range'
                  className='absolute inset-0 z-[2] w-full cursor-pointer opacity-0'
                  min={min}
                  max={500}
                  step={1}
                  value={customNetworkFee}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value)
                    if (value >= 1) {
                      setCustomNetworkFee(value)
                    }
                  }}
                />
              </div>
            </div>
            <p
              className={`text-xs font-light leading-[18px] tracking-[-0.36px] text-[#66605B] ${!isDisplayTime && 'text-left'}`}
            >
              Time show are not guaranteed. USD values are estimates only.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
