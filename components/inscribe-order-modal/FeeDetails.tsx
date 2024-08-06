import { FEE_DECIMALS } from '@/constants/fee'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { getDecimalAmount } from '@/lib/formatNumber'
import { OrderDetail } from '@/types/orders'

import { useSelector } from 'react-redux'
import Trans from '../i18n/Trans'

type Props = {
  orderDetail: OrderDetail
}

const FeeDetails: React.FC<Props> = ({ orderDetail }) => {
  const btnToUsdRateData = useSelector(selectBtnToUsdRateData)
  const { feeMint = 0, feeRate = 0 } = orderDetail || {}

  const serviceFee = getDecimalAmount(feeMint, FEE_DECIMALS)
  const totalAmount = feeMint
  const totalAmountUSD = (feeMint * Number(btnToUsdRateData)).toFixed(4).replace(/\.?0+$/, '')
  return (
    <div className="py-3 px-5 border font-semibold  text-sm border-bgAlt rounded-lg flex flex-col gap-2">
      <div className="flex justify-between leading-5 tracking-[-0.42px]">
        <span className="text-black1 font-Roboto font-normal">
          <Trans>Fee Rate:</Trans>
        </span>
        <span className=" text-orange2">
          {feeRate} <span className=" text-black1">sats/vB</span>
        </span>
      </div>
      <div className="flex justify-between leading-5 tracking-[-0.42px]">
        <span className="text-black1 font-Roboto font-normal">
          <Trans>Service Fee</Trans>
        </span>
        <span className=" text-orange2">
          {serviceFee} <span className=" text-black1">sats</span>
        </span>
      </div>

      <div className="w-full h-[1px] bg-stroke my-2"></div>
      <div className="flex items-start justify-between">
        <span className="text-black1 font-Roboto  font-normal">
          <Trans>Total:</Trans>
        </span>
        {btnToUsdRateData ? (
          <div className="flex gap-2 text-sm">
            <span className={`text-orange2`}>
              {totalAmount}
              <span className="text-black1 ml-2 mr-1">BTC</span>
            </span>
            <span className="text-mark2">~{totalAmountUSD}$</span>
          </div>
        ) : (
          '-'
        )}
      </div>
    </div>
  )
}
export default FeeDetails

