import info from '@/images/mint/info.svg'
import Image from 'next/image'
import FormatPrice from './FormatPrice'

type Props = {
  serviceBaseFee: number
  platformFees: number
  feeBySize: number
  btcToUsdRate: number
}

export default function NetworkFee({ ...props }: Props) {
  return (
    <>
      <div className='flex h-10 items-center lg:h-9'>
        <div className='flex flex-1 items-center gap-[6px]'>
          <span  className='uppercase text-sm font-light leading-5 text-[#66605B]'>Service Base Fee: </span>
          <Image src={info} alt='info' width={16} height={16} />
        </div>
        <FormatPrice
          satValue={props.serviceBaseFee}
          // dollarValue={(props.serviceBaseFee / 100000000) * props.btcToUsdRate}
          lineThrough={false}
        />
      </div>
      <div className='flex h-10 items-center lg:h-9'>
        <div className='flex flex-1 items-center gap-[6px]'>
          <span  className='uppercase text-sm font-light leading-5 text-[#66605B]'>Platform fee</span>
          <Image src={info} alt='info' width={16} height={16} />
        </div>
        <FormatPrice
          satValue={props.platformFees}
          // dollarValue={(props.platformFees / 100000000) * props.btcToUsdRate}
          lineThrough={false}
        />
      </div>
      <div className='flex h-10 items-center lg:h-9'>
        <div className='flex flex-1 items-center gap-[6px]'>
          <span  className='uppercase text-sm font-light leading-5 text-[#66605B]'>Fee by size</span>
          <Image src={info} alt='info' width={16} height={16} />
        </div>
        <FormatPrice
          satValue={props.feeBySize}
          // dollarValue={(props.feeBySize / 100000000) * props.btcToUsdRate}
          lineThrough={false}
        />
      </div>
    </>
  )
}
