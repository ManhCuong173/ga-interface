import { cn } from '@/lib/utils'
import { NetworkFee, NetworkFeeEnum, NetworkFeeType } from '@/types/fee'
import { toast } from 'react-toastify'
import { ButtonImage } from '../button'
import Trans from '../i18n/Trans'
import Customsize from './Customsize'

type Props = {
  networkFee: NetworkFee

  customNetworkFee: number
  onCustomFee: (fee: number) => void
  selectedNetworkFeeType: NetworkFeeType
  onSelectFeeType: (fee: NetworkFeeType) => void
  isLoading: boolean
  isDisplayTime?: boolean
  min: number
}

export default function ChooseNetworkFee({
  networkFee,
  selectedNetworkFeeType,
  onSelectFeeType,
  isLoading,
  customNetworkFee,
  onCustomFee,
  min,
}: Props) {
  return (
    <>
      <div className="mx-auto flex w-full gap-2 max-sm:flex-col">
        {(['normal', 'high', 'custom'] as NetworkFeeType[]).map((network) => (
          <ButtonImage
            varirant="outline"
            key={network}
            className={cn(
              network === selectedNetworkFeeType ? 'bg-[#ef232c1a] border-red-light' : 'border-bgAlt',
              `flex flex-col justify-start items-start w-full cursor-pointer py-2 pl-[14px] pr-8 text-xs`,
            )}
            onClick={() => {
              onSelectFeeType(network)
            }}
          >
            <div className="mb-1 capitalize font-bold">
              <Trans>{network}</Trans>
            </div>
            <div>
              {isLoading ? (
                'loading'
              ) : networkFee ? (
                <p className="flex flex-col font-ProtoMono  gap-1">
                  <span className="font-bold text-red-light">
                    {network !== 'custom' ? networkFee[network] : customNetworkFee}
                  </span>
                  <span className="text-black1">sats/vB</span>
                </p>
              ) : (
                'empty'
              )}
            </div>
          </ButtonImage>
        ))}
      </div>
      {selectedNetworkFeeType === NetworkFeeEnum.Custom && (
        <div className="flex items-center gap-8">
          <div className="flex w-full flex-col gap-3">
            <Customsize
              min={min}
              max={500}
              showSlider
              onChange={(value) => {
                if (value < min || value > 500) {
                  toast.error(`Please enter a value between ${min} and 500`)
                  onCustomFee(min)
                } else {
                  onCustomFee(value)
                }
              }}
              value={customNetworkFee}
            >
              <p className="flex flex-1 items-end font-medium leading-5 h-full tracking-[-0.42px]">
                <Trans>Custom fee</Trans>
              </p>
            </Customsize>
          </div>
        </div>
      )}
    </>
  )
}

