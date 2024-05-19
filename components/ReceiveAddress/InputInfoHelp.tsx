import React, { DetailedHTMLProps, InputHTMLAttributes, LegacyRef, useRef, useState } from 'react'
import search from '@/images/marketplace/search.svg'
import ic_tooltip from '@/images/marketplace/tooltip.svg'
import InputField, { PropsInputField } from '../InputField'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import useClickOutside from '@/hooks/custom/useClickOutside'

const InputInfoHelp: React.FC<
  PropsInputField & { hideStartIcon?: boolean; hideEndIcon?: boolean } & DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ className, children, hideStartIcon, hideEndIcon, classNameInput, ...props }) => {
  const [show, setShow] = useState(false)
  const ref: LegacyRef<HTMLImageElement> = useRef(null)

  useClickOutside({ ref, show, setShow })

  return (
    <InputField
      className={cn('relative border border-text-sub text-text-sub', className)}
      hideIcon={hideStartIcon}
      classNameInput={cn('placeholder:font-medium placeholder:text-text-sub', classNameInput)}
      {...props}
    >
      <div
        className={cn(
          show ? 'opacity-1 border border-stroke bg-white px-4 py-2' : 'pointer-events-none opacity-0',
          'absolute right-0 top-[50px] z-10 translate-x-1/2 rounded-lg font-ProtoMono text-sm font-light lowercase text-black1 transition-all duration-150 ease-linear lg:translate-x-0',
        )}
      >
        {children}
      </div>
      {!hideEndIcon && (
        <Image
          onClick={() => setShow(!show)}
          ref={ref}
          src={ic_tooltip}
          alt="icon"
          className="h-6 w-6 min-w-6 cursor-pointer"
        />
      )}
    </InputField>
  )
}

export default InputInfoHelp
