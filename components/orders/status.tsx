
import React, { SetStateAction, useRef, useState } from 'react'

import ic_down from '@/icons/chervon-down.svg'
import Image from 'next/image'
import useClickOutside from '@/hooks/custom/useClickOutside';


type Status = {
  id: number;
  title: string
}

const status: Status[] = [
  {
    id: 1,
    title:'all'
  },
  {
    id: 2,
    title: 'pending'
  },
  {
    id: 3,
    title: 'inscribing'
  },
  {
    id: 4,
    title: 'minted'
  },
  {
    id: 5,
    title: 'closed'
  },
]


interface SelectStatusProps{
  setStatusValue: React.Dispatch<SetStateAction<string>>;
  statusValue: string
}

const SelectStatus = ({ setStatusValue, statusValue }: SelectStatusProps) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false)
  
  const handleSetStatus = (item: Status) => {
    setStatusValue(item.title)
  }

  useClickOutside({ref,show, setShow})

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div ref={ref} className='min-w-[125px] h-[44px] rounded border border-[#B2B0AD] py-2 px-4 relative flex items-center'>
      <div onClick={handleShow} className='cursor-pointer flex gap-1 items-center justify-between w-full'>
        <span className='text-sm font-light text-[#4E473F]'>{statusValue}</span>
        <Image className={`${show && 'rotate-180'} transition-all ease-linear duration-100`} src={ic_down} alt='icon'/>
      </div>
      <div className={`${show ? 'h-[220px]' : 'h-0 opacity-0 pointer-events-none'} transition-all linear duration-150 absolute w-full flex flex-col top-[120%] left-0 bg-[#fff] border border-[#E5E4E3] rounded-lg`}>
        {status.map((item, index) => {
          return (
            <span key={index}
              onClick={()=>{handleSetStatus(item)}}
              className='px-4 py-2 h-[44px] cursor-pointer hover:bg-[#FAF5F0] flex items-center box-border border-b-[1px] border-[#E5E4E3] last:border-b-0 text-sm font-light tracking-[-3%]'>{item.title}</span>
            )
          })}
      </div>
    </div>
  )
}

export default SelectStatus
