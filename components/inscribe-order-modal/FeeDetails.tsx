import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { useSelector } from 'react-redux'

type Props = {
  feeRate: number
  feeMint: number
  gasFee: number
  step: number
  status: string
}

const FeeDetails: React.FC<Props> = ({ feeRate, feeMint, gasFee, step, status }) => {
  const btnToUsdRateData = useSelector(selectBtnToUsdRateData)

  const serviceFee = feeMint
  const totalAmount = feeMint
  const totalAmountUSD = ((feeMint * Number(btnToUsdRateData)) / 10 ** 8).toFixed(4).replace(/\.?0+$/, '')

  return (
    <div className="py-3 px-5 border font-semibold  text-sm border-bgAlt rounded-lg flex flex-col gap-2">
      <div className="flex justify-between leading-5 tracking-[-0.42px]">
        <span className="text-black1 font-Roboto font-normal">Fee Rate</span>
        <span className=" text-orange2">
          {feeRate} <span className=" text-black1">sats/vB</span>
        </span>
      </div>
      <div className="flex justify-between leading-5 tracking-[-0.42px]">
        <div>
          <span className=" text-line">{serviceFee} sats</span> * <span className="text-orange2">14</span> sats/vb
        </div>
        <span className=" text-line">
          <span className="text-orange2">14</span> SATS
        </span>
      </div>
      <div className="w-full h-[1px] bg-stroke my-2"></div>
      <div className="flex items-start justify-between">
        <span className="text-black1 font-Roboto  font-normal">Total</span>
        <div className="flex gap-2 text-sm">
          <span className={`text-orange2`}>
            {totalAmount}
            <span className="text-black1 ml-2 mr-1">BTC</span>
          </span>
          <span className="text-mark2">~{totalAmountUSD}$</span>
        </div>
      </div>
    </div>
  )
}
export default FeeDetails
