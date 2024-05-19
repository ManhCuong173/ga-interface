import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { useSelector } from 'react-redux'

const FormatPrice: React.FC<{ satValue: number | string; lineThrough?: boolean }> = ({ satValue, lineThrough }) => {
  const btcToUsdRate: string = useSelector(selectBtnToUsdRateData)

  return (
    <div className="flex gap-2 text-sm font-medium leading-5 tracking-[-0.42px]">
      <span className={`${lineThrough ? 'line-through' : ''} leading-5 text-black1`}>{satValue} sats</span>
      <span className="text-mark2">
        ~
        {!isNaN((Number(satValue) / 100000000) * Number(btcToUsdRate))
          ? ((Number(satValue) / 100000000) * Number(btcToUsdRate)).toFixed(4).replace(/\.?0+$/, '')
          : ''}
        $
      </span>
    </div>
  )
}
export default FormatPrice

