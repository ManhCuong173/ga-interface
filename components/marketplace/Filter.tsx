'use client'
import useClickOutside from '@/hooks/custom/useClickOutside'
import ic_down from '@/icons/chervon-down.svg'
import search from '@/images/marketplace/search.svg'
import ic_tooltip from '@/images/marketplace/tooltip.svg'
import Image from 'next/image'
import { SetStateAction, memo, useRef, useState } from 'react'
import InputField from '../inscribe/InputField'
import SelectField from '../inscribe/Select'

interface PropFilterMarketPlace {
  nftIds: number[]
setFilter: React.Dispatch<
    SetStateAction<{
      number: string
      order_by: string
    }>
  >
  filter: {
    number: string
    order_by: string
  }
  setNftIds: React.Dispatch<SetStateAction<number[]>>
}

const FilterMarketPlace = ({ nftIds, setFilter, filter, setNftIds }: PropFilterMarketPlace) => {
  const [show, setShow] = useState(false)
  const ref:any = useRef();
  const handleChangeNumberFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNumberFilter(e.currentTarget.value)
    setFilter({ ...filter, number: e.currentTarget.value })
  }

  useClickOutside({ref,show,setShow})

  const SortFilter = () => {
    const types = [
      { index: 0, name: 'price', value: 'asc', sub: '(low to high)' },
      { index: 1, name: 'price', value: 'desc', sub: '(high to low)' },
      { index: 2, name: 'new', value: 'new', sub: '' },
      { index: 3, name: 'offer', value: '', sub: '' },
    ]

    const ref = useRef(null)
    const [show, setShow] = useState(false)

    const handleSetStatus = (item: any) => {
      setFilter((value) => ({
        ...value,
        order_by: item.value,
      }))
      setShow(false)
    }

    useClickOutside({ ref, show, setShow })

    const handleShow = () => {
      setShow(!show)
    }

    return (
      <div ref={ref} className='relative z-10 w-full md:w-[295px]'>
        <div
          onClick={handleShow}
          className='flex h-11 cursor-pointer items-center justify-between gap-4 rounded border border-[#AE9955] px-4 py-2'
        >
          <span className='whitespace-nowrap text-sm font-medium tracking-[-0.48px] text-[#4E473F]'>
            sort by{' '}
            <span className='text-[#FF6634]'>
              {types.find((item) => item.value === filter.order_by)?.name}{' '}
              {types.find((item) => item.value === filter.order_by)?.sub}
            </span>
          </span>
          <Image
            className={`${show && 'rotate-180'} transition-all duration-100 ease-linear`}
            src={ic_down}
            alt='icon'
          />
        </div>
        <div
          className={`${show ? 'h-fit' : 'pointer-events-none h-0 opacity-0'} linear absolute left-0 top-[120%] z-[50] flex w-full flex-col rounded-lg border border-[#E5E4E3] bg-[#fff] transition-all duration-150`}
        >
          {types.map((item, index) => {
            return (
              <div
                key={index}
                className='box-border flex cursor-pointer items-center justify-between border-b-[1px] border-[#E5E4E3] px-4 py-2 text-sm font-light tracking-[-3%] last:border-b-0 hover:bg-[#FAF5F0]'
                onClick={() => {
                  handleSetStatus(item)
                }}
              >
                <span>
                  {item.name}
                  <br />
                  {item.sub}
                </span>
                {item.value === filter.order_by && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M20 6L9 17L4 12'
                      stroke='#AE9955'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='relative z-10 sm:mt-8'>
      <div className='sticky top-0 flex w-full items-center justify-between gap-y-4 max-sm:flex-col'>
        <div className='relative flex flex-wrap items-center justify-between gap-4'>
          <InputField
            onChange={handleChangeNumberFilter}
            className='relative w-[200px] border border-[#AE9955] text-[#AE9955] placeholder:text-xs placeholder:text-[#AE9955] lg:w-[304px]'
            placeholder='SEARCH NUMBER'
            icon={search}
            type='text'
          >
            <div
              className={`${show ? 'opacity-1 h-[156px] border border-[#E5E4E3] bg-[#fff] px-4 py-2' : 'pointer-events-none opacity-0'} absolute right-0 top-[50px] z-[11] w-[341px] translate-x-1/2 rounded-lg font-ProtoMono text-sm font-light lowercase text-[#4E473F] transition-all duration-150 ease-linear lg:translate-x-0`}
            >
              <span>{`Enter the NFT ID here. Use "X" to represent unspecified digits.`}</span>{' '}
              <br />
              For example:
              <ul className='list-disc pl-10'>
                <li>{`To find an NFT starting with "123", enter "123X".`}</li>
                <li>{`To find an NFT ending with "456", enter "X456".`}</li>
              </ul>
            </div>
            <Image
              onClick={() => {
                setShow(!show)
              }}
              ref={ref}
              src={ic_tooltip}
              alt='icon'
              className='h-6 w-6 min-w-6 cursor-pointer'
            />
          </InputField>
          <SelectField
            nftIds={nftIds}
            setNftIds={setNftIds}
            className='relative flex h-[44px] cursor-pointer items-center rounded border border-[#AE9955] py-2'
          />
          <SortFilter />
        </div>
      </div>
    </div>
  )
}

export default memo(FilterMarketPlace)
