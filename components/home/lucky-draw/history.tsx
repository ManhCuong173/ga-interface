import { IconCopy } from '@/components/button'
import ModalContainer from '@/components/ui/modal-container'
import fourthPrice from '@/icons/home/consoliadation-prize.svg'
import iconCopy from '@/icons/home/lucky-draw/copy.svg'
import specialPrize from '@/icons/home/special-prize.svg'
import thirdPrize from '@/icons/home/third-prize.svg'
import closeModalButton from '@/icons/profile/modal/close-button.svg'
import ic_1st from '@/images/home/1st.svg'
import ic_2nd from '@/images/home/2nd.svg'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { truncate } from '@/lib/truncate'
import { luckyDraw } from '@/services/luckydraw.service'
import { HistoryLuckyDraw } from '@/types/history'
import { QueryObserverResult, RefetchOptions, keepPreviousData, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Dropdown from './dropdown'

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
    label: 'All',
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

const PAGE_SIZE = 5000

export default function History({ open, onClose }: Props) {
  const [rounds, setRounds] = useState<Option[]>([{ label: 'No Data', value: '' }])
  const addressOwner = useAppSelector(selectAddress)
  const [selectedRound, setSelectedRound] = useState('')
  const [selectedPrize, setSelectedPrize] = useState(prizeOptions[0].value)
  const [page, setPage] = useState(1)

  const prizeParams = prizeOptions.find((item) => item.value === selectedPrize)?.label

  const getHistoryLuckyDraw = async () => {
    const data: any = await luckyDraw.getHistory({
      page,
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
    queryKey: ['historyLucky', prizeParams, selectedRound, page],
    queryFn: getHistoryLuckyDraw,
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
    enabled: !!open && !!selectedRound,
  })

  useEffect(() => {
    if (roundsData && roundsData.length) {
      const _rounds = [
        ...roundsData.map((round) => {
          return {
            label: `Rounded ${round.round} (${new Date(round.timecreate * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })})`,
            value: round.round.toString(),
          }
        }),
      ]

      setRounds(_rounds)
      setSelectedRound(_rounds[0].value)
    }
  }, [roundsData])

  useEffect(() => {
    setPage(1)
  }, [selectedPrize])

  return (
    <ModalContainer open={open} handleClose={onClose}>
      <div
        className="
          lg:overflow-x-[unset] relative mx-auto my-8 lg:h-[800px] 
          w-screen  overflow-x-auto rounded 
          bg-white p-5 md:w-[536px] md:px-[22px] 
          md:py-10 h-[85vh] lg:w-[872px]"
      >
        <button
          onClick={onClose}
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
            <h2 className="text-[21px] lg:text-[32px] font-medium leading-10 text-red-light">Lucky draw history</h2>
          </div>
          <div className="my-2 space-y-4 lg:space-y-8 pb-4">
            <div className="flex flex-col items-center  lg:flex-row lg:justify-between  gap-4">
              <div className="lg:px-[18px] flex flex-col justify-center">
                <h2 className="text-sm text-left font-medium text-red-light font-Roboto">Reward wallet:</h2>
                {data?.data.reward_wallet && (
                  <div className="flex items-center mt-1">
                    <p className="relative text-[12px] lg:text-sm text-left font-light text-[#4E473F] mr-2">
                      {truncate(data.data.reward_wallet, 11, '...')}
                    </p>
                    <IconCopy text={data?.data.reward_wallet} />
                  </div>
                )}
              </div>

              <div className="flex  justify-end gap-4 lg:flex-row lg:px-[18px]">
                <Dropdown
                  options={rounds}
                  value={selectedRound}
                  setValue={setSelectedRound}
                  className="w-fit lg:min-w-[240px] h-[32px] lg:h-[37px] font-Roboto border-secondary"
                />
                <Dropdown
                  label="Prize:"
                  options={prizeOptions}
                  value={selectedPrize}
                  setValue={setSelectedPrize}
                  className="w-fit lg:min-w-[154px] font-Roboto h-[32px] lg:h-[37px]"
                />
              </div>
            </div>

            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[500px] space-y-4 ">
                <div className="flex h-11 rounded border border-[#EEE0E0] text-center text-xs lg:text-sm font-normal leading-5 text-red-darker lg:mx-[18px] font-Roboto space-x-3 text-nowrap">
                  <div className="flex h-full w-10 items-center ">No</div>
                  <div className="flex h-full w-[150px] items-center  lg:w-[200px]">Prize</div>
                  <div className="flex h-full flex-1 items-center ">Wallet Address</div>
                  <div className="flex h-full w-[192px] items-center ">Index number</div>
                  <div className="flex h-full w-[100px] items-center justify-center lg:w-[167px]">Apple ID</div>
                </div>
                <div className="history h-full  space-y-2 overflow-y-auto lg:ml-[18px] lg:pr-2">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {(data || data?.data.prize?.length > 0) &&
                        data?.data?.prizes?.map((item: HistoryLuckyDraw, index: number) => {
                          return (
                            <Row
                              item={item}
                              key={index}
                              round={Number(selectedRound)}
                              index={index + 1 + (page - 1) * PAGE_SIZE}
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
      <div className="flex h-full w-[150px] items-center gap-2.5 pl-3 lg:w-[200px]">
        {item?.top === 'special' && <Image src={specialPrize} alt="" className="size-4 min-w-4" />}
        {item?.top === '1st' && <Image src={ic_1st} alt="" className="size-4 min-w-4" />}
        {item?.top === '2nd' && <Image src={ic_2nd} alt="" className="size-4 min-w-4" />}
        {item?.top === '3rd' && <Image src={thirdPrize} alt="" className="size-4 min-w-4" />}
        {item?.top === 'consolation' && <Image src={fourthPrice} alt="" className="size-4 min-w-4" />}
        <div>{item?.top}</div>
      </div>
      <div className="flex h-full flex-1 items-center gap-2.5 pl-3 text-[#B26802]">
        {truncate(item?.wallet_address, 11, '...')}
        <IconCopy text={item?.wallet_address} customIcon={<Image src={iconCopy} alt="" width={16} height={16} />} />
      </div>
      <div className="flex h-full w-[192px] items-center gap-2.5 pl-3">
        <Link href={item.txshash_index || ''} target="_blank">
          {item.index_number}
        </Link>
      </div>
      <div className="flex h-full w-[100px] items-center justify-center  font-medium leading-6 lg:w-[167px]">
        {item.lucky_number}
      </div>
    </div>
  )
}

