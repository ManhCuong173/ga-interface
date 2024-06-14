'use client'
import useMarket from '@/hooks/api/useMarket'
import { memo, useState } from 'react'
import Trans from '../i18n/Trans'
import Pagination from '../pagination'
import Item from './Item'

interface PropsMarket {
  nftIds: number[]
  filter: {
    number: string
    order_by: string
  }
}

const Markets = ({ nftIds, filter }: PropsMarket) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useMarket({
    page: page,
    page_size: 10,
    nftIds,
    number: filter.number,
    order_by: filter.order_by,
  })

  return (
    <div className="z-0 min-h-[800px]">
      <div className="relative z-0 grid w-full grid-cols-2 gap-4 pt-6 md:grid-cols-3 lg:grid-cols-5">
        {isLoading ? (
          <p className="col-span-2 min-h-[500px] w-full text-center md:col-span-3 lg:col-span-5">
            Loading marketplace ...
          </p>
        ) : (
          <>
            {data && data.data.length > 0 ? (
              data.data.map((item, index) => {
                return (
                  <Item
                    page={page}
                    page_size={10}
                    nftIds={nftIds}
                    number={filter.number}
                    order_by={filter.order_by}
                    item={item}
                    key={index}
                    inscription_number={item.inscription_number}
                  />
                )
              })
            ) : (
              <p className="col-span-2 mt-3 min-h-[500px] w-full text-center md:col-span-3 lg:col-span-5">
                <Trans>No NFTs</Trans>
              </p>
            )}
          </>
        )}
      </div>
      {data && <Pagination itemsPerPage={10} pageCount={Number(data?.totalPages)} setPage={setPage} />}
    </div>
  )
}

export default memo(Markets)

