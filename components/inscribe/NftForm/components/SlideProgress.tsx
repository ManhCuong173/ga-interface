import React from 'react'
import Progress from './Progress'
import { MAX_PAGE_SIZE_NFT } from '@/constants/nft.constant'

const SlideProgress: React.FC<{ amount: number; onAmountChange: (e: number) => void }> = ({
  amount,
  onAmountChange,
}) => {
  const handleChangePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(Number.parseInt(e.target.value))
  }
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-full">
        <div className="relative z-[1]">
          <Progress amount={amount} />
        </div>
        <input
          type="range"
          className="absolute inset-0 z-[2] w-full cursor-pointer opacity-0"
          min={1}
          max={100}
          step={1}
          value={amount}
          onChange={handleChangePageSize}
        />
      </div>
      <span className="text-[20px] font-medium leading-[32px] tracking-[-2%] text-black1">{MAX_PAGE_SIZE_NFT}</span>
    </div>
  )
}

export default SlideProgress
