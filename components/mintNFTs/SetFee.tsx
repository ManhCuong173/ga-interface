import { useInscribeContext } from '@/context/InscribeContext'
import info from '@/images/mint/info.svg'
import { publicService } from '@/services/public.service'
import { NetworkFeeType } from '@/types/fee'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import ProgressBar from '../progress-bar'
import ChooseNetworkFee from './ChooseNetworkFee'
import FormatPrice from './FormatPrice'
import NetworkFee from './NetworkFee'

export const SetFee = ({ btcToUsdRate, setDataForm, numberOfNft }: any) => {
  const [satsInscription, setSatsInscription] = useState(600)
  const [satsInscriptionDebounce] = useDebounce(satsInscription, 1000)

  const [customNetworkFee, setCustomNetworkFee] = useState(1)
  const [customNetworkFeeDebounce] = useDebounce(customNetworkFee, 1000)

  const [showSatsInscription, setShowSatsInscription] = useState(false)
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
    <div className="text-[#4E473F ] flex flex-col gap-6">
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
      <div className="relative flex flex-col gap-1 space-y-2 rounded-[4px] border border-[#E5E4E3] p-4 lg:space-y-0">
        <div className="relative z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-4">
          <p className="min-w-fit text-sm font-light leading-5 text-[#66605B]">Sats inscription: </p>
          <div className="flex w-full items-center justify-between">
            <button
              className="flex h-8 items-center justify-center gap-[6px] rounded-lg border border-[#E5E4E3] pl-3 pr-[6px] text-sm font-light uppercase text-text-black transition-all hover:bg-gray-200 sm:h-10 sm:gap-1 sm:px-4 lg:h-9"
              onClick={() => {
                setShowSatsInscription((prev) => !prev)
              }}
            >
              Customize
              <span className={`${showSatsInscription ? 'rotate-0' : 'rotate-180'} transition-all duration-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12.6666 10L7.99992 6L3.33325 10"
                    stroke="#4E473F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="flex justify-end gap-2 text-sm font-medium leading-5">
              <span className="">{satsInscription} sats</span>
              <span className="text-[#12B76A]">
                ~{((satsInscription / 100000000) * btcToUsdRate).toFixed(4).replace(/\.?0+$/, '')}$
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${showSatsInscription ? 'block' : 'hidden'} flex origin-top items-center gap-[34px] transition-all`}
        >
          <div className="relative w-full">
            <div className="relative z-[1]">
              <ProgressBar value={satsInscription - 600} total={10000 - 600} bulletSize={20}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="white" stroke="#FF6634" stroke-width="2" />
                </svg>
              </ProgressBar>
            </div>
            <input
              type="range"
              className="absolute inset-0 z-[2] w-full cursor-pointer opacity-0"
              min={600}
              max={10000}
              step={1}
              value={satsInscription}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (value >= 600) {
                  setSatsInscription(value)
                }
              }}
            />
          </div>
          <div className="w-[86px] rounded-[4px] bg-[linear-gradient(180deg,#FF6634_-36.94%,#FFEF5F_136.07%)] p-[2px]">
            <div className="h-full w-full rounded bg-white px-2 py-[6px]">
              <input
                value={satsInscription}
                onChange={(e) => setSatsInscription(Number.parseInt(e.target.value))}
                onBlur={(e) => {
                  const value = Number.parseInt(e.target.value)

                  if (value < 600 || value > 10000) {
                    toast.error('Please enter a value between 600 and 10000')

                    setSatsInscription(600)
                  }
                }}
                className="w-full border-none text-end text-sm font-light leading-5 tracking-[-0.42px] text-[#383F4A] outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex h-10 items-center lg:h-9">
          <div className="flex flex-1 items-center gap-4">
            <span className="text-sm font-light leading-5 text-[#66605B]">Network Fee: </span>
          </div>
          <FormatPrice
            satValue={feeMintData?.fee_serivce?.network_fee || 0}
            // dollarValue={((feeMintData?.fee_serivce?.network_fee || 0) / 100000000) * btcToUsdRate}
            lineThrough={false}
          />
        </div>
        <div className="w-full border-b border-[#D1BFC9A3] border-opacity-65"></div>

        <NetworkFee
          btcToUsdRate={btcToUsdRate}
          feeBySize={feeMintData?.fee_serivce?.fee_by_size || 0}
          platformFees={feeMintData?.fee_serivce?.platform_fees || 0}
          serviceBaseFee={feeMintData?.fee_serivce?.service_base_fee || 0}
        />

        <div className="flex h-10 items-center lg:h-9">
          <div className="flex flex-1 items-center gap-4">
            <span className=" text-sm font-light text-[#66605B]">=</span>
          </div>
          <FormatPrice satValue={totalSection} lineThrough={false} />
        </div>
        <div className="w-full border-b border-[#D1BFC9A3] border-opacity-65"></div>
        <div className="flex h-10 items-center lg:h-9">
          <div className="flex flex-1 items-center gap-[6px]">
            <span className="text-sm font-medium text-[#383F4A]">Total: </span>
            <Image src={info} alt="info" width={16} height={16} />
          </div>
          <div className="flex flex-col items-end">
            {/* <FormatPrice
              satValue={total}
              lineThrough
            /> */}
            <div className="flex items-center gap-2 text-sm font-medium leading-5 tracking-[-0.42px]">
              <span className="text-base leading-6 line-through">{total} sats</span>
              <span className="text-[#12B76A]">
                ~
                {!isNaN((total / 100000000) * Number(btcToUsdRate))
                  ? ((total / 100000000) * Number(btcToUsdRate)).toFixed(4).replace(/\.?0+$/, '')
                  : ''}
                $
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium leading-5 tracking-[-0.42px]">
              <span className="text-base leading-6">{Number(feeMintData?.fee_serivce?.total)} sats</span>
              <span className="text-[#12B76A]">
                ~
                {!isNaN((Number(feeMintData?.fee_serivce?.total) / 100000000) * Number(btcToUsdRate))
                  ? ((Number(feeMintData?.fee_serivce?.total) / 100000000) * Number(btcToUsdRate))
                      .toFixed(4)
                      .replace(/\.?0+$/, '')
                  : ''}
                $
              </span>
            </div>
            {/* <FormatPrice
              satValue={Number(feeMintData?.fee_serivce?.total) || 0}
              lineThrough={false}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
