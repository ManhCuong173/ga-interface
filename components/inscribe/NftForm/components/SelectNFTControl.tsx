import { SquareCheckIcon } from '@/components/ui/icons'
import { useInscribeContext } from '@/context/InscribeContext'
import { cn } from '@/lib/utils'
import { NFT } from '@/types/nft'
import { memo } from 'react'

const SelectControl: React.FC<{ nfts: NFT[] }> = ({ nfts }) => {
  const { inscribeData, setInscribeData } = useInscribeContext()

  const handleSelectChange = () => {
    setInscribeData({
      type: 'PICK_ALL_NFT',
      nfts: nfts?.length === inscribeData.pickedNfts.length ? [] : nfts,
    })
  }

  const handleClearAllNFT = () => {
    setInscribeData({
      type: 'PICK_ALL_NFT',
      nfts: [],
    })
  }

  return (
    <section className="flex items-center justify-between font-Roboto">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="cursor-pointer" onClick={handleSelectChange}>
            <SquareCheckIcon checked={nfts?.length === inscribeData.pickedNfts.length} />
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
