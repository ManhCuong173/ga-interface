import { nftTypes } from '@/constants/nft.constant'

import Trans from '@/components/i18n/Trans'
import Image from 'next/image'
import { useState } from 'react'
import OwnerDistribution from './owner-distribution'
import PriceAndVolumn from './price-and-volume'
import TopOwners from './top-owners'

const Analytic = () => {
  const [selectedElemental, setSelectedElemental] = useState(nftTypes[0])

  return (
    <div className="mx-auto flex flex-col gap-4 py-4 lg:max-w-[1440px] lg:gap-8 lg:py-8">
      <div className="max-w-full overflow-x-auto">
        <div className="flex h-12 items-center gap-4">
          {nftTypes.map((type) => (
            <button
              key={type.id}
              className={`${type.id === selectedElemental.id ? 'border border-line' : ''} flex h-full w-[88px] min-w-[88px] items-center justify-center rounded-[8px]`}
              style={{
                backgroundColor: type.id === selectedElemental.id ? 'rgba(239, 35, 44, 0.10)' : 'transparent',
                border: type.id === selectedElemental.id ? '2px solid #EF232C' : '2px solid #D4C79C',
              }}
              onClick={() => {
                setSelectedElemental(type)
              }}
            >
              <Image src={type.icon} alt="" width={24} height={24} />
              {type.id === 0 && (
                <div className="ml-2 font-Roboto">
                  <Trans>{type.label}</Trans>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <PriceAndVolumn idnft={selectedElemental.id} backgroundColor={selectedElemental.color} />
      <OwnerDistribution nftId={selectedElemental.id} backgroundColor={selectedElemental.color} />
      <TopOwners idnft={selectedElemental.id.toString()} />
    </div>
  )
}
export default Analytic

