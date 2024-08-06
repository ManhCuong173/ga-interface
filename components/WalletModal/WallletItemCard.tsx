import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import Image from 'next/image'
import { WalletItemCardProps } from './types'

const WalletItemCard: React.FC<PropsWithClassName & WalletItemCardProps> = ({
  className,
  logo,
  name,
  isSelected,
  onSelect
}) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center px-[24px] py-[12px] boxrder-bgAlt border-solid border-[1px] max-h-[60xp] rounded-[12px]',
        'hover:scale-105 focus:scale-105 transition-all cursor-pointer',
        className,
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <div className="w-[32px] h-[32px] rounded-[8px] overflow-hidden">
          <Image src={logo} width={32} height={32} alt="logo-wallet" />
        </div>
        <div className="font-Roboto text-nowrap text-black1 font-medium text-base ml-[8px]">{name}</div>
      </div>

      {isSelected && (
        <div
          className="bg-[rgba(212,199,156,0.40)] p-[9px] text-[12px] rounded-[4px] 
        text-nowrap w-[70px] h-[24px] font-Roboto 
        flex items-center justify-center"
        >
          Last used
        </div>
      )}
    </div>
  )
}

export default WalletItemCard
