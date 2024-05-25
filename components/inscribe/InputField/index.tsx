import React, { ChangeEventHandler } from 'react'
import iconSearch from '@/icons/ic_search.svg'
import Image from 'next/image'
import { ReactNode } from 'react';

type PropsInputField = {
  className?: string
  placeholder: string
  onChange?: ChangeEventHandler
  icon?: any
  type?: string,
  children?: ReactNode,
}
const InputField = ({ 
  className, 
  icon,
  type,
  children,
  ...props }: PropsInputField) => {

  const preventNegativeValues = (e:any) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()

  return (
    <div
      className={`${className} h-11 flex items-center space-x-[10px] rounded px-4 font-light text-[#4E473F]`}
    >
      <Image src={icon ? icon : iconSearch} alt='icon search' className='h-5 w-5 min-w-5' width={16} height={16} />
      {type && type === 'number' ?      
        <input
          type='number'
          min = {0}
          onKeyDown={preventNegativeValues}
          className={`${icon ? 'placeholder:text-[#AE9955]' : 'placeholder:text-[#B8ABB3]'} w-full border-none bg-inherit text-sm outline-none  placeholder:text-xs placeholder:font-light`}
          {...props}
        />
        :<input
          type='text'
          className={`${icon ? 'placeholder:text-[#AE9955]' : 'placeholder:text-[#B8ABB3]'} w-full border-none bg-inherit text-sm outline-none  placeholder:text-xs placeholder:font-light`}
          {...props}
        />
      }
      {children}
    </div>
  )
}

export default InputField
