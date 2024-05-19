import { feeDefault, feeMintDefault, satsInInscriptionDefault } from '@/constants/fee'
import { useInscribeContext } from '@/context/InscribeContext'
import { cn } from '@/lib/utils'
import publicService from '@/services/public.service'
import { NetworkFee, NetworkFeeEnum, NetworkFeeMint, NetworkFeeType } from '@/types/fee'
import { FeeMintOrder } from '@/types/orders'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { ButtonImage } from '../button'
import { ChevronIcon, InfoCircleIcon } from '../ui/icons'
import ChooseNetworkFee from './ChooseNetworkFee'
import Customsize from './Customsize'
import FormatPrice from './FormatPrice'

const RowInfo: React.FC<{
  title: string | ReactNode
  isLoading?: boolean
  amount: number
  lineThrough?: boolean
  className?: string
}> = ({ title, amount, lineThrough, className, isLoading }) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 my-1', className)}>
      <p className="text-sm font-light leading-5 text-line">{title}</p>
      <div className="font-ProtoMono">
        {
          // isLoading ? <Skeleton width="80px" /> :
          <FormatPrice satValue={amount} lineThrough={lineThrough} />
        }
      </div>
    </div>
  )
}

const getFee = (selectedFee: NetworkFeeEnum, fees: NetworkFee, customFee: number) => {
  return selectedFee === NetworkFeeEnum.Custom ? customFee : fees?.[selectedFee] || 0
}

const NetworkFees: React.FC<{
  onChangeDataForm: (fee: FeeMintOrder) => void
}> = ({ onChangeDataForm }) => {
  const [satsInscription, setSatsInscription] = useState(satsInInscriptionDefault)
  const [satsInscriptionDebounce] = useDebounce(satsInscription, 1000)

  const [customNetworkFee, setCustomNetworkFee] = useState<number>(0)
  const [customNetworkFeeDebounce] = useDebounce(customNetworkFee, 1000)

  const [selectedNetworkFee, setSelectedNetworkFee] = useState<NetworkFeeType>(NetworkFeeEnum.Normal)

  const { inscribeData } = useInscribeContext()

  const { data: feeData, isFetching: loadingNetworkFee } = useQuery<NetworkFee>({
    queryKey: ['fee'],
    queryFn: async () => {
      const result = await publicService.getNetworkFee()
      if (result.data) {
        setCustomNetworkFee(result.data.custom)
        return result.data
      }
      return feeDefault
    },
    initialData: feeDefault,
  })

  const { data: feeMintData, isFetching: loadingNetworkFeeMint } = useQuery<NetworkFeeMint>({
    queryKey: ['fee-mint', satsInscriptionDebounce, customNetworkFeeDebounce],
    queryFn: async () => {
      const result = await publicService
        .getNetworkFeeMint({
          satsInInscription: satsInscription,
          fee: getFee(selectedNetworkFee, feeData, customNetworkFee),
          mintList: inscribeData.pickedNfts,
        })
        .call()
      if (result.data) return result.data
      return feeMintDefault
    },
    enabled: feeData !== feeDefault && inscribeData.pickedNfts.length > 0,
    initialData: feeMintDefault,
  })

  const [totalSection, total] = useMemo(() => {
    if (feeMintData && feeMintData) {
      const { serviceBaseFee, platFormFees, feeBySize, networkFee } = feeMintData
      const section = serviceBaseFee + platFormFees + feeBySize
      const total = networkFee + serviceBaseFee + feeBySize + platFormFees + satsInscription
      return [section, total]
    }
    return [0, 0]
  }, [feeMintData])

  const debounceOnChangeData = useDebouncedCallback(() => {
    onChangeDataForm({
      totalFee: feeMintData?.total,
      satsInscription: satsInscription,
      rateFee: getFee(selectedNetworkFee, feeData, customNetworkFee),
      networkFee: getFee(selectedNetworkFee, feeData, customNetworkFee),
    })
  }, 1000)

  useEffect(() => {
    if (feeData && feeMintData) debounceOnChangeData()
  }, [feeData, feeMintData])

  return (
    <div className="text-black1 flex flex-col gap-6">
      <ChooseNetworkFee
        isLoading={loadingNetworkFee}
        networkFee={feeData}
        customNetworkFee={customNetworkFee}
        onCustomFee={setCustomNetworkFee}
        selectedFee={selectedNetworkFee}
        onSelectFee={setSelectedNetworkFee}
        isDisplayTime
        min={feeData.normal || 1}
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
          <RowInfo isLoading={loadingNetworkFeeMint} title="Network Fee:" amount={feeMintData?.networkFee} />

          <div className="w-full border-b border-[#d4c79c4c] border-opacity-65 my-2"></div>

          <RowInfo
            isLoading={loadingNetworkFeeMint}
            title={
              <span className="flex items-center">
                Service Base Fee:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.serviceBaseFee}
          />
          <RowInfo
            isLoading={loadingNetworkFeeMint}
            title={
              <span className="flex items-center">
                Platform fee:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.platFormFees}
          />
          <RowInfo
            isLoading={loadingNetworkFeeMint}
            title={
              <span className="flex items-center">
                Fee by size:
                <InfoCircleIcon className="ml-1" />
              </span>
            }
            amount={feeMintData?.feeBySize}
          />

          <RowInfo isLoading={loadingNetworkFeeMint} title="=" amount={totalSection} />

          <div className="w-full border-b border-[#d4c79c4c] border-opacity-65 my-2"></div>

          <RowInfo isLoading={loadingNetworkFeeMint} title="Total:" amount={total} lineThrough />
          <RowInfo isLoading={loadingNetworkFeeMint} title="" amount={feeMintData.total} />
        </div>
      </div>
    </div>
  )
}

export default NetworkFees
