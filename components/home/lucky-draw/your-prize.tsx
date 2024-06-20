import Trans from '@/components/i18n/Trans'
import { useGATranslation } from '@/components/i18n/hooks'
import BtnClaim from '@/components/ui/button/btnClaim'
import ModalContainer from '@/components/ui/modal-container'
import fourthPrice from '@/icons/home/consoliadation-prize.svg'
import specialPrize from '@/icons/home/special-prize.svg'
import thirdPrize from '@/icons/home/third-prize.svg'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import ic_1st from '@/images/home/1st.svg'
import ic_2nd from '@/images/home/2nd.svg'
import { luckyDraw } from '@/services/luckydraw.service'
import { HistoryLuckyDraw } from '@/types/history'
import { QueryObserverResult, RefetchOptions, keepPreviousData, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Dropdown from './dropdown'
import { useWalletBitcoinProviderByWallet } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { useBitcoinAddress } from '@/context/BitcoinProviderContext/hook'

type Props = {
  open: boolean
  onClose: () => void
}

type Option = {
  label: string
  value: string
}

const prizeOptions: Option[] = [
  {
    label: 'ALL',
    value: '0',
  },
  {
    label: 'Special',
    value: '1',
  },
  {
    label: '1st',
    value: '2',
  },
  {
    label: '2nd',
    value: '3',
  },
  {
    label: '3rd',
    value: '4',
  },
  {
    label: 'Consolation',
    value: '5',
  },
]

const PAGE_SIZE = 10000

export default function YouPrize({ open, onClose }: Props) {
  const [rounds, setRounds] = useState<Option[]>([{ label: 'No Data', value: '' }])
  const [userInscriptionIds, setUserInscriptionIds] = useState<string[]>([])
  const [selectedRound, setSelectedRound] = useState('')
  const [selectedPrize, setSelectedPrize] = useState(prizeOptions[0].value)
  const t = useGATranslation()
  const provider = useWalletBitcoinProviderByWallet()
  const address = useBitcoinAddress()

  const prizeParams = prizeOptions.find((item) => item.value === selectedPrize)?.label

  const getHistoryLuckyDraw = async () => {
    const data: any = await luckyDraw.getHistory({
      page_size: PAGE_SIZE,
      prize: prizeParams?.toLocaleLowerCase() === 'all' ? '' : prizeParams?.toLocaleLowerCase(),
      round: selectedRound.toLowerCase(),
    })

    return data.data
  }
  const { data: roundsData } = useQuery({
    queryKey: ['list-rounded'],
    queryFn: luckyDraw.getRounds,
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['historyLucky', prizeParams, selectedRound],
    queryFn: getHistoryLuckyDraw,
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
    enabled: !!open && !!selectedRound,
  })

  const getListTxidInscription = async () => {
    try {
      if (!provider) return []

      let res = await provider.getInscriptions(address, 0, 10000)
      if (res?.list?.length > 0) {
        setUserInscriptionIds(res.list.map((inscription) => inscription.inscriptionId))
      }
    } catch (e) {
      console.log('error getting list tx id inscription: ', e)
      return []
    }
  }

  useEffect(() => {
    if (open && provider && address) getListTxidInscription()
  }, [open, provider])

  useEffect(() => {
    if (roundsData && roundsData.length) {
      const _rounds = [
        ...roundsData.map((round) => {
          return {
            label: `${round.round} (${new Date(round.timecreate * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })})`,
            value: round.round.toString(),
          }
        }),
      ]

      setRounds(_rounds)
      setSelectedRound(_rounds[0].value)
    }
  }, [roundsData])

  return (
    <ModalContainer
      open={open}
      handleClose={(e) => {
        onClose()
      }}
    >
      <div
        className="lg:overflow-x-[unset] relative mx-auto my-8 lg:h-[800px] 
        w-screen  overflow-x-auto rounded 
        bg-white p-5 md:w-[536px] md:px-[22px] 
        md:py-10 h-[85vh] lg:w-[872px]"
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          className="absolute right-3 top-3 z-10 outline-none md:right-10 md:top-10 hover:bg-[rgba(212,199,156,0.30)] hover:rounded-md"
        >
          <Image
            src={closeModalButton}
            alt=""
            width={44}
            height={44}
            className="w-[38px] h-[38px] lg:w-[44px] lg:h-[44px]"
          />
        </button>

        <div className="size-full space-y-2 lg:space-y-10">
          <div className="lg:px-[18px]">
            <h2 className="text-[21px] lg:text-[32px] font-medium leading-10 text-red-light">
              <Trans>Your prize</Trans>
            </h2>
          </div>
          <div className="my-2 space-y-4 lg:space-y-8 pb-4">
            <div className="flex flex-col justify-end gap-4 lg:flex-row">
              <Dropdown
                options={rounds}
                value={selectedRound}
                setValue={setSelectedRound}
                className="lg:min-w-[285px] font-Roboto"
                label={t('Rounded')}
              />
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[500px] space-y-4">
                <div className="flex h-11 rounded border border-[#EEE0E0] text-center text-xs lg:text-sm font-normal leading-5 text-red-darker lg:mx-[18px] font-Roboto space-x-3 text-nowrap">
                  <div className="flex h-full w-10 items-center pl-3">No</div>
                  <div className="flex h-full w-[200px] items-center pl-3 lg:w-[250px]">
                    <Trans>Prize</Trans>
                  </div>
                  <div className="flex h-full w-[192px] items-center whitespace-nowrap pl-3">
                    <Trans>Index number</Trans>
                  </div>
                  <div className="flex h-full w-[200px] items-center justify-end whitespace-nowrap pr-10 lg:flex-1">
                    <Trans>Apple ID</Trans>
                  </div>
                  <div className="flex h-full w-[200px] items-center justify-end pr-4">
                    <Trans>Claim</Trans>
                  </div>
                </div>
                <div className="h-[552px] max-h-[552px] space-y-2 overflow-y-auto">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {(data || data?.data.prize?.length > 0) &&
                        data.data.prizes
                          ?.filter((item: any) => {
                            return userInscriptionIds.includes(item.id_inscription)
                          })
                          .map((item: HistoryLuckyDraw, index: number) => {
                            return (
                              <Row
                                item={item}
                                key={index}
                                round={Number(selectedRound)}
                                index={index + 1}
                                refetch={refetch}
                              />
                            )
                          })}
                      {data && !data?.data?.prizes && <p>No data</p>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

interface PropsRow {
  index: number
  item: any
  round: number
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}

function Row({ item, index, round, refetch }: PropsRow) {
  return (
    <div className="flex h-12 rounded bg-[#FAF6F6] text-center text-xs lg:text-sm font-light leading-5 text-[#9F232D]">
      <div className="flex h-full w-10 items-center pl-3">{index}</div>
      <div className="flex h-full w-[200px] items-center gap-2.5 pl-3 lg:w-[250px]">
        {item?.top === 'special' && <Image src={specialPrize} alt="" className="size-4 min-w-4" />}
        {item?.top === '1st' && <Image src={ic_1st} alt="" className="size-4 min-w-4" />}
        {item?.top === '2nd' && <Image src={ic_2nd} alt="" className="size-4 min-w-4" />}
        {item?.top === '3rd' && <Image src={thirdPrize} alt="" className="size-4 min-w-4" />}
        {item?.top === 'consolation' && <Image src={fourthPrice} alt="" className="size-4 min-w-4" />}
        <div>{item?.top}</div>
      </div>
      <div className="flex h-full w-[192px] items-center gap-2.5 pl-3">
        <Link href={item.txshash_index || ''} target="_blank">
          {item.index_number}
        </Link>
      </div>
      <div className="flex h-full w-[200px] items-center justify-end pr-10 font-medium leading-6 lg:flex-1">
        {item.lucky_number}
      </div>
      <div className="flex h-full w-[200px] items-center justify-end pr-4 text-base font-medium leading-6">
        <BtnClaim
          round={round}
          walletAddress={item?.wallet_address}
          refetch={refetch}
          isCompleted={item.award_information.complete}
          lucky_number={item.lucky_number}
          inscriptionId={item.id_inscription}
        />
      </div>
    </div>
  )
}
