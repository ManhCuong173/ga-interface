import iconSearch from '@/icons/ic_search.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { ReactNode } from 'react'

export type PropsInputField = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  className?: string
  classNameInput?: string
  placeholder?: string

  icon?: any
  type?: string
  children?: ReactNode
  hideIcon?: boolean
}

const Input: React.FC<PropsInputField & any> = ({ icon, className, ...props }) => {
  return (
    <input
      type="text"
      className={cn(
        `placeholder:text-text-sub w-full border-none bg-inherit text-sm outline-none  placeholder:text-xs placeholder:font-light`,
        className,
      )}
      {...props}
    />
  )
}
const InputField = ({ className, classNameInput, icon, type, children, hideIcon, ...props }: PropsInputField) => {
  const preventNegativeValues = (e: any) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

  return (
    <div className={cn('h-11 flex items-center space-x-[10px] rounded px-4 font-light text-black1', className)}>
      {!hideIcon && (
        <Image src={icon ? icon : iconSearch} alt="icon search" className="h-5 w-5 min-w-5" width={16} height={16} />
      )}
      {type && type === 'number' ? (
        <Input className={classNameInput} type="number" min={0} onKeyDown={preventNegativeValues} {...props} />
      ) : (
        <Input className={classNameInput} {...props} />
      )}
      {children}
    </div>
  )
}

export default InputField

