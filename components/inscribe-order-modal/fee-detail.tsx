import { selectBtnToUsdRateData } from "@/lib/features/wallet/fee-slice";
import { useSelector } from "react-redux";
import { IconCopy } from "../button";

type Props = {
  feeRate: number;
  feeMint: number;
  gasFee: number;
  step: number;
  status: string;
  // btcUSD: number;
}

export default function FeeDetail({ feeRate, feeMint, gasFee, step, status }: Props) {
 
  const btnToUsdRateData = useSelector(selectBtnToUsdRateData)

  const serviceFee = Math.ceil(feeMint * Math.pow(10,8))
  const totalAmount = feeMint;
  const totalAmountUSD = ((feeMint * Number(btnToUsdRateData)).toFixed(4).replace(/\.?0+$/, ''));

  return (
    <div className='p-4 border border-[#E5E4E3] rounded-lg flex flex-col gap-4'>
      <div className='flex justify-between text-sm font-light leading-5 tracking-[-0.42px]'>
        <span className="text-[rgba(178,176,173,1)]">Fee Rate</span>
        <span className='font-medium text-[#66605B]'>{feeRate} sats/vB</span>
      </div>
      <div className='flex justify-between text-sm font-light leading-5 tracking-[-0.42px]'>
        <span className="text-[rgba(178,176,173,1)]">Service Fee</span>
        <span className='font-medium text-[#66605B]'>{serviceFee} sats</span>
      </div>
      <div className='w-full h-[1px] bg-[#E5E4E3]'></div>
      <div className='text-text-black flex items-start justify-between text-sm font-medium leading-5 tracking-[-0.42px]'>
        <span className="">Total Amount</span>
        <div className='flex flex-col items-end'>
          <div className="flex gap-1 items-center">
            <p>{totalAmount}</p>
            <span>BTC</span>
            <IconCopy text={totalAmount}/>  
          </div>
          <span className='text-[#B2B0AD] font-light'>
            ({totalAmountUSD}$)
          </span>
        </div>

      </div>
      {step === 2 && 
        <div className={`w-full py-2 ${!status.includes('closed') ? 'bg-[#ECFDF3]' : 'bg-[#fff]'} rounded-[4px]`}>
          {/* <p className="text-[#039855] text-sm font-light leading-5 tracking-[-0.42px] text-center">
            {!status.includes('closed') ? 'Payment has been received and inscription is now in queue' : 'Payment timeout, order closed.'}
          </p> */}
          {
            !status.includes('closed') ? <p className="text-[#039855] text-sm font-light leading-5 tracking-[-0.42px] text-center">Payment has been received and inscription is now in queue</p> : <p className="text-[rgba(255,102,52,1)] text-center">
              Payment timeout, order closed.
            </p>
          }
        </div>
      }
    </div>
  )
}
