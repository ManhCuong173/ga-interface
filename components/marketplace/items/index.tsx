import FilterMarketPlace from '@/components/marketplace/Filter'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Markets from '../Markets'

const ItemsFC = () => {
  const [nftIds, setNftIds] = useState<number[]>([-1, 1, 2, 3, 4, 5])
  const defaultSelectedElementId = useSearchParams().get('elementId')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultSelectedElementId && containerRef.current) {
      containerRef.current.style.scrollMarginTop = '100px'
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const [filter, setFilter] = useState({
    number: '',
    order_by: 'asc',
  })

  return (
    <div className="lg:max-w-[1440px] mx-auto" ref={containerRef}>
      <FilterMarketPlace nftIds={nftIds} setNftIds={setNftIds} filter={filter} setFilter={setFilter} />
      <Markets nftIds={nftIds} filter={filter} />
    </div>
  )
}

export default ItemsFC

