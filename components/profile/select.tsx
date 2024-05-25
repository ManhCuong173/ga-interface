import ic_down from '@/icons/chervon-down.svg'
import tickChecked from '@/icons/profile/tick-checked.svg'
import tickUncheck from '@/icons/profile/tick-uncheck.svg'
import { NFTType } from '@/types/nft'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
  selecteds: NFTType[]
  setSelecteds: Dispatch<SetStateAction<NFTType[]>>
  types: NFTType[]
}

export default function Select({ types, selecteds, setSelecteds }: Props) {
  const [show, setShow] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSelectedAll = () => {
    if (selecteds.length === types.length) {
      setSelecteds([])
    } else {
      setSelecteds([...types])
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative z-20 h-11 w-[120px] cursor-pointer items-center rounded border border-[#E5E4E3]'>
      <div
        className='relative flex h-full w-full'
        ref={selectRef}
        onClick={() => {
          setShow((prev) => !prev)
        }}
      >
        <div className='absolute inset-y-0 left-2.5 my-auto flex items-center'>
          <div className='relative flex items-center'>
            {selecteds.map((type, index) => {
              return (
                <Image
                  key={type.id}
                  src={type.icon}
                  alt={type.label}
                  title={type.label}
                  width={20}
                  height={20}
                  className='relative rounded-full border border-white'
                  style={{
                    left: -index * 6,
                  }}
                />
              )
            })}
          </div>
        </div>
        <span className='absolute inset-y-0 right-3 my-auto flex h-full items-center'>
          <Image
            src={ic_down}
            alt='down'
            width={13}
            height={6.25}
            className={`${show ? 'rotate-180' : ''}  transition-all duration-150 ease-linear`}
          />
        </span>
      </div>
      <div
        ref={dropdownRef}
        className={`${show ? 'scale-y-100' : 'scale-y-0'} absolute left-0 right-0 top-full mt-[6.5px] origin-top space-y-[3px] overflow-hidden rounded-lg border border-text-black_3 bg-[#e5e4e3] transition-all`}
        style={{
          boxShadow: '3px 6px 30px 0px rgba(0, 0, 0, 0.12',
        }}
      >
        <div
          className='flex h-[76px] w-full items-center justify-center gap-4 bg-[#FAF5F0]'
          onClick={handleSelectedAll}
        >
          <Image
            src={selecteds.length === types.length ? tickChecked : tickUncheck}
            alt=''
            width={20}
            height={20}
          />
          <span className='font-medium leading-6 tracking-[-0.48px] text-text-black'>ALL</span>
        </div>
        {types.map((type) => (
          <div
            key={type.id}
            className='flex h-[76px] w-full items-center justify-center gap-4 bg-white'
            onClick={() => {
              setSelecteds((prev) => {
                if (selecteds.find((item) => item.id === type.id)) {
                  return prev.filter((item) => item.id !== type.id)
                }
                return [type, ...prev]
              })
            }}
          >
            <Image
              src={selecteds.find((item) => item.id === type.id) ? tickChecked : tickUncheck}
              alt=''
              width={20}
              height={20}
            />
            <Image src={type.icon} alt='' width={48} height={48} className='rounded-full' />
          </div>
        ))}
      </div>
    </div>
  )
}
