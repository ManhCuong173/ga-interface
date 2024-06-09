'use client'
import Asset from '@/components/profile/asset'
import { nftTypes } from '@/constants/nft.constant'
import clearSearchIcon from '@/icons/profile/clear-search.svg'
import iconSearch from '@/icons/profile/search-icon.png'
import { UserAsset } from '@/types/asset'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SelectElement from '../SelectElement'

type Props = {
  isLoading?: boolean
  assets: UserAsset[]
  onShowInfo: (asset: UserAsset) => void
  onList: (asset: UserAsset) => void
  onCancel: (asset: UserAsset) => void
}

export default function Assets({ isLoading, assets, onShowInfo, onList: onListing, onCancel }: Props) {
  const [filteredAssets, setFilteredAssets] = useState(assets)

  const [nftIds, setNftIds] = useState<number[]>([-1, 1, 2, 3, 4, 5])

  const [search, setSearch] = useState('')

  useEffect(() => {
    setFilteredAssets(() => {
      let _filteredAssets = [...assets]
      if (nftIds.length !== nftTypes.length) {
        _filteredAssets = _filteredAssets.filter(
          (asset) => !!nftIds.find((selected) => selected === Number.parseInt(asset.nft_id)),
        )
      }
      if (search) {
        _filteredAssets = _filteredAssets.filter((asset) => {
          return asset.number.toString().includes(search)
        })
      }

      return [..._filteredAssets]
    })
  }, [assets, search, nftIds])

  const handleClearSearch = () => {
    setSearch('')
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex h-11 flex-1 items-center justify-center gap-2.5 rounded border border-[#D4C79C]  px-4">
          <Image src={iconSearch} alt="icon search" className="h-5 w-5 min-w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full flex-1 border-none bg-transparent text-sm font-semibold outline-none placeholder:text-[#AE9955]"
            placeholder="Search number"
          />
          {search && (
            <button className="flex size-6 items-center justify-center" onClick={handleClearSearch}>
              <Image src={clearSearchIcon} alt="" width={20} height={20} />
            </button>
          )}
        </div>
        <SelectElement
          elements={nftIds}
          onSelectElements={setNftIds}
          className="relative flex h-[44px] cursor-pointer items-center rounded border border-[#AE9955] py-2"
        />
      </div>
      {isLoading ? (
        <div className="flex min-h-[420px] items-center justify-center">loading...</div>
      ) : filteredAssets?.length ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded md:grid-cols-2 lg:grid-cols-3 xl:flex xl:gap-4">
          {filteredAssets.map((asset) => (
            <Asset
              key={asset.id_inscription}
              {...asset}
              onCancel={onCancel}
              onShowInfo={onShowInfo}
              onList={onListing}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[420px] items-center justify-center font-light">No NFTs</div>
      )}
    </>
  )
}

