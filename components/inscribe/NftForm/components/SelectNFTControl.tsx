import { SquareCheckIcon } from '@/components/ui/icons'
import { useInscribeContext } from '@/context/InscribeContext'
import { cn } from '@/lib/utils'
import { NFT } from '@/types/nft'
import { memo, useEffect, useState } from 'react'

const SelectControl: React.FC<{ nfts: NFT[] }> = ({ nfts }) => {
  const [isChecked, setChecked] = useState(true)
  const { inscribeData, setInscribeData } = useInscribeContext()

  const handleSelectChange = () => {
    const newCheckedState = !isChecked
    setChecked(newCheckedState)
    setInscribeData({
      type: 'PICK_ALL_NFT',
      nfts: newCheckedState ? nfts : [],
    })
  }

  useEffect(() => {
    if (nfts?.length !== inscribeData.pickedNfts.length) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }, [inscribeData.pickedNfts.length, nfts?.length])

  const handleClearAllNFT = () => {
    setInscribeData({
      type: 'PICK_ALL_NFT',
      nfts: [],
    })
    setChecked(false)
  }

  return (
    <section className="flex items-center justify-between font-Roboto">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="cursor-pointer" onClick={handleSelectChange}>
            <SquareCheckIcon checked={isChecked} />
          </div>

          <span className="text-black text-base leading-5 tracking-[-3%] font-medium">Select all</span>
        </div>
        <div className="flex items-center text-mark sm:text-base text-sm leading-5 tracking-[-3%] font-medium">
          {inscribeData.pickedNfts.length} selected
        </div>
      </div>

      <button
        onClick={handleClearAllNFT}
        disabled={inscribeData.pickedNfts.length === 0}
        className={cn(inscribeData.pickedNfts.length === 0 ? 'opacity-50' : '', 'text-red-light text-base font-medium')}
      >
        Clear all
      </button>
    </section>
  )
}

export default memo(SelectControl)
