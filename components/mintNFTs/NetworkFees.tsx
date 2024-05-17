import { useInscribeContext } from '@/context/InscribeContext'
import { cn } from '@/lib/utils'
import { publicService } from '@/services/public.service'
import { NetworkFeeType } from '@/types/fee'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import { ButtonImage } from '../button'
import { ChevronIcon, InfoCircleIcon } from '../ui/icons'
import ChooseNetworkFee from './ChooseNetworkFee'
import Customsize from './Customsize'
import FormatPrice from './FormatPrice'

const RowInfo: React.FC<{ title: string | ReactNode; amount: number; lineThrough?: boolean; className?: string }> = ({
  title,
  amount,
  lineThrough,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 my-1', className)}>
      <p className="text-sm font-light leading-5 text-line">{title}</p>
      <div className="font-ProtoMono">
        <FormatPrice
          satValue={amount}
          // dollarValue={((feeMintData?.fee_serivce?.network_fee || 0) / 100000000) * btcToUsdRate}
          lineThrough={lineThrough}
        />
      </div>
    </div>
  )
}

const NetworkFees = ({ setDataForm }: any) => {
  const [satsInscription, setSatsInscription] = useState(600)
  const [satsInscriptionDebounce] = useDebounce(satsInscription, 1000)

  const [customNetworkFee, setCustomNetworkFee] = useState(1)
  const [customNetworkFeeDebounce] = useDebounce(customNetworkFee, 1000)

  const [selectedNetworkFee, setSelectedNetworkFee] = useState<NetworkFeeType>('normal')

  const { inscribeData } = useInscribeContext()

  const { data: feeData, isLoading: loadingNetworkFee } = useQuery({
    queryKey: ['fee'],
    queryFn: publicService.getNetworkFee,
  })

  const { data: feeMintData } = useQuery({
    queryKey: ['fee-mint', satsInscriptionDebounce, customNetworkFeeDebounce],
    queryFn: () =>
      publicService.getNetworkFeeMint({
        sats_in_inscription: satsInscription,
        network_fee: selectedNetworkFee === 'custom' ? customNetworkFee : feeData?.fee[selectedNetworkFee],
        mint_list: inscribeData.pickedNfts.map((item) => ({
          nft_id: item.id_nft,
          number: item.number,
        })),
      }),
    enabled: !!feeData?.fee,
  })

  const [totalSection, total] = useMemo(() => {
    if (feeMintData && feeMintData.fee_serivce) {
      const { service_base_fee, platform_fees, fee_by_size, network_fee } = feeMintData?.fee_serivce

      const section = service_base_fee + platform_fees + fee_by_size
      const total = network_fee + service_base_fee + fee_by_size + platform_fees + satsInscription
      return [section, total]
    }
    return [0, 0]
  }, [feeMintData])

  // Set data form
  useEffect(() => {
    if (feeData && feeMintData)
      setDataForm({
        rateFee:
          selectedNetworkFee !== 'custom' && feeData?.fee ? feeData?.fee[selectedNetworkFee] || 0 : customNetworkFee,
        totalFee: feeMintData?.fee_serivce?.total,
        satsInscription: satsInscription,
        networkFee:
          selectedNetworkFee !== 'custom' && feeData?.fee ? feeData?.fee[selectedNetworkFee] : customNetworkFee,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeData, feeMintData])

  useEffect(() => {
    if (feeData) {
      feeData?.fee?.custom && setCustomNetworkFee(feeData.fee.custom)
    }
  }, [feeData])

  return (
    <div className="text-black1 flex flex-col gap-6">
      <ChooseNetworkFee
        loading={loadingNetworkFee}
        networkFee={feeData?.fee as any}
        customNetworkFee={customNetworkFee}
        setCustomNetworkFee={setCustomNetworkFee}
        selected={selectedNetworkFee}
        setSelected={setSelectedNetworkFee}
        isDisplayTime
        min={feeData?.fee.normal || 1}
      />
      <div className="relative flex flex-col gap-1 rounded-lg border border-bgAlt p-3">
        <RowInfo title="Sats inscription:" amount={satsInscription} />

        <Customsize
          min={600}
          max={10000}
          onChange={(value) => {
            if (value < 600 || value > 10000) {
              toast.error('Please enter a value between 600 and 10000')
              setSatsInscription(600)
            } else {
              setSatsInscription(value)
            }
          }}
          value={satsInscription}
        >
          {({ enabledCustom, onCallback }) => (
            <ButtonImage
              varirant="outline"
              className="text-left border-bgAlt transition-all rounded p-2  text-black1 text-sm hover:bg-gray-200 "
              onClick={onCallback}
            >
              Customize
              <span className={cn(enabledCustom ? 'rotate-180' : 'rotate-0', `ml-1 transition-all duration-500`)}>
                <ChevronIcon />
              </span>
            </ButtonImage>
          )}
        </Customsize>

        <div className="flex flex-col mt-1">
          <RowInfo title="Network Fee:" amount={feeMintData?.fee_serivce?.network_fee || 0} />

          <div className="w-full border-b border-[#d4c79c4c] border-opacity-65 my-2"></div>

          <RowInfo
            title={
              <span className="flex items-center">
                Service Base Fee:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.fee_serivce?.service_base_fee || 0}
          />
          <RowInfo
            title={
              <span className="flex items-center">
                Platform fee:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.fee_serivce?.platform_fees || 0}
          />
          <RowInfo
            title={
              <span className="flex items-center">
                Fee by size:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.fee_serivce?.fee_by_size || 0}
          />

          <RowInfo title="=" amount={totalSection || 0} />

          <div className="w-full border-b border-[#d4c79c4c] border-opacity-65 my-2"></div>

          <RowInfo title="Total:" amount={total || 0} lineThrough />
          <RowInfo title="" amount={feeMintData?.fee_serivce?.total || 0} />
        </div>
      </div>
    </div>
  )
}

export default NetworkFees
