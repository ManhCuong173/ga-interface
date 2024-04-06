import Image from 'next/image'
import React, { SetStateAction, memo, useCallback, useEffect, useRef, useState } from 'react'
import tickChecked from '@/icons/profile/tick-checked.svg'
import tickUncheck from '@/icons/profile/tick-uncheck.svg'
import useClickOutside from '@/hooks/custom/useClickOutside'
import { fiveElements } from '@/utils/const'
import { FiveElements } from '@/types/fiveElements'

interface PropsSelect {
  className?: string
  setNftIds: React.Dispatch<SetStateAction<number[]>>
  nftIds: number[]
}

const SelectField = ({ className, nftIds, setNftIds, ...props }: PropsSelect) => {
  const ref = useRef(null)
  const [show, setShow] = useState(false);
  // const [selecteds, setSelecteds] = useState(fiveElements);


  const handleShow = () => {
    setShow(!show)
  }

  useClickOutside({ ref, show, setShow })

  const handleCheckAll = () => {
    if (nftIds.length === fiveElements.length) {
      setNftIds([])
    } else {
      setNftIds(fiveElements.map((item)=>item.id));
    }
  }

  const handleSetSelecteds = (type: FiveElements) => {
    setNftIds((prev) => {
      if (prev.find((item) => item === type.id)) {
        return prev.filter((item) => item !== type.id);
      }
      return [type.id, ...prev];
    });
  }

  return (
    <div ref={ref} className={className}>
      <div
        onClick={handleShow}
        className='flex w-[120px] cursor-pointer items-center justify-center gap-1 '
      >
        <div className='flex w-[76px] translate-x-[15px] justify-center'>
          {fiveElements
            .map((element, index) => {
              return (
                <Image
                  // transform: 'translateY(-50%)'
                  key={element.id}
                  src={element.icon}
                  alt={element.title}
                  title={element.title}
                  width={20}
                  style={{
                    transform: `translateX(-${index * 6}px)`,
                  }}
                />
              )
            })}
        </div>
        <div className={`${show ? 'rotate-180' : ''} transition-all duration-150 ease-linear`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M3.69247 7.09327C3.91711 6.83119 4.31167 6.80084 4.57375 7.02548L10.0003 11.6768L15.4269 7.02548C15.689 6.80084 16.0836 6.83119 16.3082 7.09327C16.5328 7.35535 16.5025 7.74991 16.2404 7.97455L10.4071 12.9745C10.173 13.1752 9.82765 13.1752 9.59359 12.9745L3.76026 7.97455C3.49818 7.74991 3.46783 7.35535 3.69247 7.09327Z'
              fill='#4E473F'
            />
          </svg>
        </div>
      </div>

      {/* sub menu */}
      <ul
        className={`${show ? 'h-[480px]' : 'h-0 opacity-0'} absolute left-0 top-[115%] z-[50] w-[120px] space-y-1 overflow-hidden rounded-lg border border-stroke bg-stroke shadow-[3px_6px_30px_0_rgba(0,0,0,0.12)] transition-all duration-300 ease-linear`}
      >
        <li className='box-border flex h-[76px] w-full items-center space-x-4 bg-[#fff] px-[18px] py-2'>
          <Image
            onClick={handleCheckAll}
            src={nftIds.length === fiveElements.length ? tickChecked : tickUncheck}
            alt=''
            width={20}
            height={20}
          />
          <span>ALL</span>
        </li>
        {fiveElements.map((element) => {
          return (
            <li
              key={element.id}
              className='box-border flex h-[76px] w-full items-center space-x-4 bg-[#fff] px-[18px] py-2'
            >
              <Image
                onClick={() => { handleSetSelecteds(element) }}
                src={nftIds.find((item) => item === element.id) ? tickChecked : tickUncheck}
                alt=''
                width={20}
                height={20}
              />
              <Image
                src={element.icon}
                alt={element.title}
                title={element.title}
                width={48}
                height={48}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(SelectField)
