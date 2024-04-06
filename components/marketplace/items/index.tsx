import React, { useState } from 'react'
import FilterMarketPlace from '@/components/marketplace/Filter';
import Markets from '../Markets';

const ItemsFC = () => {


    const [nftIds, setNftIds] = useState<number[]>([1, 2, 3, 4, 5]);

    const [filter, setFilter] = useState({
        number: '',
        order_by: 'asc'
    })


  return (
    <div className='lg:max-w-[1440px] mx-auto'>
          <FilterMarketPlace nftIds={nftIds} setNftIds={setNftIds} filter={filter} setFilter={setFilter} />
          <Markets nftIds={nftIds} filter={filter} />
    </div>
  )
}

export default ItemsFC
