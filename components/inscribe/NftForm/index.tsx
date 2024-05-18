'use client'

import NFTSection from '@/components/mintNFTs/NFTList'
import InputInfoHelp from '@/components/ReceiveAddress/InputInfoHelp'
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

  const [debounceValue] = useDebounce(filter.number, 500)

  const { data: listNft, isLoading } = useQuery({
    queryKey: ['nfts', debounceValue, elements, filter.size],
    queryFn: async () => {
      const result = await nftService.filterNft({
        number: debounceValue,
        elements: elements.filter((e) => e > 0),
        size: filter.size,
      })

      if (result.data && result.data?.nfts?.length > 0) {
        setInscribeData({
          type: 'PICK_ALL_NFT',
          nfts: result.data?.nfts,
        })
      }
      return result?.data
    },
    enabled: !!elements.length,
    initialData: {
      current: 0,
      total: 0,
      nfts: [],
    },
  })
  const nfts = useMemo(() => listNft?.nfts || [], [listNft])

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
          <span>{`Enter the NFT ID here. Use "X" to represent unspecified digits.`}</span> <br />
          For example:
          <ul className="list-disc pl-10">
            <li>{`To find an NFT starting with "123", enter "123X".`}</li>
            <li>{`To find an NFT ending with "456", enter "X456".`}</li>
          </ul>
        </InputInfoHelp>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <SelectNFTControl nfts={nfts} />

        <SlideProgress amount={filter.size} onAmountChange={onChangePageSize} />

        <NFTSection
          nfts={nfts}
          isLoading={isLoading}
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
