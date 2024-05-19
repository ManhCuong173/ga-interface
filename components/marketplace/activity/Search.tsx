import React, { SetStateAction } from 'react'
import Image from 'next/image'
import ic_search from '@/icons/activity/ic-search.svg'


interface PropSearch {
    value: string;
    onChange: (e :React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}


const Search = ({ value, onChange, className}: PropSearch) => {
  return (
      <div className={`px-4 py-3 rounded border border-[#AE9955] flex items-center space-x-[10px] ${className}`}>
        <Image src={ic_search} alt='icon search' className='w-4 h-4 min-w-4' />
        <input value={value} onChange={onChange} placeholder='Search address' type='text' className='uppercase bg-transparent outline-none placeholder:text-[#AE9955] text-xs font-light leading-[18px]'/>  
    </div>
  )
}

export default Search