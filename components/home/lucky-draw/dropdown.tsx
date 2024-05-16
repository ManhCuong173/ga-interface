import checkIcon from '@/icons/home/lucky-draw/check.svg'
import chevronDownIcon from '@/icons/home/lucky-draw/chevron-down.svg'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
  label?: string
  options: {
    label: string
    value: string
  }[]
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function Dropdown({ label, options, className, value, setValue }: Props) {
  const [show, setShow] = useState(false)

  const selfRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selfRef.current &&
        !selfRef.current.contains(event.target as Node) &&
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

  const handleSelect = (value: string) => {
    setShow(false)
    setValue(value)
  }

  return (
    <div
      className={`${className} relative flex h-11 items-center rounded border border-text-sub px-4 text-[#4E473F] transition-all`}
    >
      <div
        className="flex size-full cursor-pointer justify-between items-center gap-4 text-sm font-medium"
        ref={selfRef}
        onClick={() => {
          setShow((prev) => !prev)
        }}
      >
        <div className="flex item-centers justify-center">
          {label || ' ' + ''}
          {!label && (
            <span className={`${label && 'text-red-light'}`}>
              {String(options.find((item) => item.value === value)?.label) || 'all'}
            </span>
          )}
          <div className={`w-full} flex items-center space-x-3 ml-1`}>
            {label && (
              <span className={`${label && 'text-red-light'}`}>
                {String(options.find((item) => item.value === value)?.label) || 'all'}
              </span>
            )}
          </div>
        </div>
        <Image src={chevronDownIcon} alt="" className="size-5" />
      </div>
      <div
        className={`${show ? 'scale-y-100' : 'scale-y-0'} absolute inset-x-0 top-full z-10 flex max-h-[196px] origin-top flex-col gap-[1px] overflow-hidden overflow-y-auto rounded-lg border border-[#E5E4E3] bg-[#e5e4e3] shadow-[3px_6px_30px_0px_#0000001F] transition-all`}
        ref={dropdownRef}
      >
        {options.map((item) => (
          <div
            key={item.value}
            className="flex h-10 cursor-pointer items-center justify-between whitespace-nowrap bg-white px-4 pr-4 text-sm font-light tracking-[-0.2px] transition-all hover:bg-[#FAF5F0]"
            onClick={() => handleSelect(item.value)}
          >
            <span>{item.label}</span>
            <span>{item.value === value && <Image src={checkIcon} alt="" width={16} height={11} />}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

