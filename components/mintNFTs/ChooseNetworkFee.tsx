import { cn } from '@/lib/utils'
import { NetworkFeeType } from '@/types/fee'
import { toast } from 'react-toastify'
import { ButtonImage } from '../button'
import Customsize from './Customsize'

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
  min,
}: Props) {
  return (
    <>
      <div className="mx-auto flex w-full gap-2 max-sm:flex-col">
        {(['normal', 'high', 'custom'] as NetworkFeeType[]).map((network) => (
          <ButtonImage
            varirant="outline"
            key={network}
            className={cn(
              network === selected ? 'bg-[#ef232c1a] border-red-light' : 'border-bgAlt',
              `flex flex-col justify-start items-start w-full cursor-pointer py-2 pl-[14px] pr-8 text-xs`,
            )}
            onClick={() => {
              setSelected(network)
            }}
          >
            <div className="mb-1 capitalize font-bold">{network}</div>
            <div>
              {loading ? (
                'loading'
              ) : networkFee ? (
                <p className="flex flex-col font-ProtoMono  gap-1">
                  <span className="font-bold text-red-light">
                    {network !== 'custom' ? networkFee[network] : customNetworkFee}
                  </span>
                  <span className="text-black1">sats/vB</span>
                </p>
              ) : (
                'empty'
              )}
            </div>
          </ButtonImage>
        ))}
      </div>
      {selected === 'custom' && (
        <div className="flex items-center gap-8">
          {/* {isDisplayTime && <div className='p-3 max-sm:hidden'>
            <div className='relative h-[80px] w-[80px]'>
              <Image src={time_range} alt='' />
              <div className='absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center gap-[6px]'>
                <p className='text-lg font-medium uppercase leading-7 tracking-[-0.54px] text-[#FF6634]'>
                  10m
                </p>
                <p className='font-light uppercase leading-5 tracking-[-0.42px] text-[#383F4A]'>
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
          <div className="flex w-full flex-col gap-3">
            <Customsize
              min={min}
              max={500}
              showSlider
              onChange={(value) => {
                if (value < min || value > 500) {
                  toast.error(`Please enter a value between ${min} and 500`)
                  setCustomNetworkFee(min)
                } else {
                  setCustomNetworkFee(value)
                }
              }}
              value={customNetworkFee}
            >
              <p className="flex flex-1 items-end font-medium leading-5 h-full tracking-[-0.42px]">Custom fee</p>
            </Customsize>
          </div>
        </div>
      )}
    </>
  )
}

