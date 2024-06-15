import InputField from '@/components/InputField'
import Trans from '@/components/i18n/Trans'
import { SquareCheckIcon } from '@/components/ui/icons'
import { useInscribeContext } from '@/context/InscribeContext'
import { cn } from '@/lib/utils'
import { NFT } from '@/types/nft'
import { memo } from 'react'

const SelectNFTControl: React.FC<{ nfts: NFT[]; amount: number; onAmountChange: (e: number) => void }> = ({
  nfts,
  amount,
  onAmountChange,
}) => {
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

  const handleChangePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(Number.parseInt(e.target.value))
  }

  return (
    <section className="flex items-center justify-between font-Roboto sm:text-sm text-base">
      <div className="flex flex-col gap-1 sm:gap-[2px]">
        <div className="flex items-center text-black1 font-medium">
          <Trans>Quantity</Trans>
        </div>
        <div>
          <InputField
            placeholder=""
            type="number"
            hideIcon
            value={amount}
            onChange={handleChangePageSize}
            className={cn(
              'relative border max-w-[140px] border-red-light rounded-lg text-sm max-h-9 font-ProtoMono text-black1',
            )}
          />
        </div>
      </div>

      <div className="flex items-end sm:items-center flex-col sm:flex-row sm:gap-5">
        <div className="flex items-center">
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleSelectChange}>
            <SquareCheckIcon checked={nfts?.length === inscribeData.pickedNfts.length} />
            <span className="text-black font-medium">
              <Trans>Select all</Trans>
            </span>
          </div>
          <div className="flex items-end justify-end text-mark font-medium text-right ml-2">
            {inscribeData.pickedNfts.length} <Trans>selected</Trans>
          </div>
        </div>

        <button
          onClick={handleClearAllNFT}
          disabled={inscribeData.pickedNfts.length === 0}
          className={cn(inscribeData.pickedNfts.length === 0 ? 'opacity-50' : '', 'text-red-light font-medium')}
        >
          <Trans>Clear all</Trans>
        </button>
      </div>
    </section>
  )
}

export default memo(SelectNFTControl)

