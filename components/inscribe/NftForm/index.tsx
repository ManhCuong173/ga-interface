'use client'

import InputInfoHelp from '@/components/ReceiveAddress/InputInfoHelp'
import NFTSection from '@/components/mintNFTs/NFTList'
import { useInscribeContext } from '@/context/InscribeContext'
import search from '@/images/marketplace/search.svg'
import { setAddressReceiver } from '@/lib/features/wallet/mintProcess'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import nftService from '@/services/nft.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import SelectElement from '../../SelectElement'
import SelectNFTControl from './components/SelectNFTControl'
import SlideProgress from './components/SlideProgress'
import SearchInfoHelper from './components/SearchInfo'

const NFTForm: React.FC = () => {
  const [elements, setElements] = useState<number[]>([-1, 1, 2, 3, 4, 5])
  const [filter, setFilter] = useState<{
    number: number | null
    size: number
  }>({
    number: null,
    size: 50,
  })

  const { inscribeData, setInscribeData } = useInscribeContext()
  const dispatch = useAppDispatch()
  const address = useAppSelector(selectAddress)

  const [debounceId] = useDebounce(filter.number, 500)
  const [debouncePageSize] = useDebounce(filter.size, 1000)

  const { data: nfts, isFetching } = useQuery({
    queryKey: ['nfts', elements, debounceId, debouncePageSize],
    queryFn: async () => {
      const result = await nftService.filterNft({
        number: debounceId,
        elements: elements.filter((e) => e > 0),
        size: debouncePageSize,
      })

      if (result.data && result.data?.nfts?.length > 0) {
        setInscribeData({
          type: 'PICK_ALL_NFT',
          nfts: result.data?.nfts,
        })

        return result.data.nfts
      }

      return []
    },
    initialData: [],
  })

  useEffect(() => {
    if (address) dispatch(setAddressReceiver(address))
  }, [address, dispatch])

  const onChangePageSize = (size: number) => {
    setFilter((preState) => ({
      ...preState,
      size: size,
    }))
  }

  const onSearchNumner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((preState) => ({
      ...preState,
      number: Number(e.target.value),
    }))
  }

  return (
    <div>
      <div className="flex w-full flex-row-reverse items-center gap-4">
        <SelectElement
          elements={elements}
          onSelectElements={setElements}
          className="relative flex h-[44px] w-[120px] cursor-pointer items-center rounded border border-stroke"
        />

        <InputInfoHelp
          icon={search}
          className="w-full"
          classNameInput="placeholder:text-base font-bold"
          placeholder="SEARCH NUMBER"
          onChange={onSearchNumner}
        >
          <SearchInfoHelper />
        </InputInfoHelp>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <SelectNFTControl nfts={nfts} />

        <SlideProgress amount={filter.size} onAmountChange={onChangePageSize} />

        <NFTSection
          nfts={nfts}
          isLoading={isFetching}
          selectedNFTs={inscribeData.pickedNfts}
          onSelectNFT={(nft) => {
            setInscribeData({
              type: 'PICK_NFT',
              nft: nft,
            })
          }}
        />
      </div>
    </div>
  )
}
export default NFTForm
