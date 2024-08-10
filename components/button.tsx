import Image from 'next/image'
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import cornerbl from '@/icons/button/corner-bl.svg'
import cornerbr from '@/icons/button/corner-br.svg'
import cornertl from '@/icons/button/corner-tl.svg'
import cornertr from '@/icons/button/corner-tr.svg'
import { cn } from '@/lib/utils'
import { CopyIcon } from './ui/icons'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export default function Button({ children, className, ...atributes }: Props) {
  return (
    <button
      className={
        className +
        ' relative flex h-10 items-center justify-center gap-2 rounded-[5.71px] bg-[url(/images/header/red-btn-bg.png)] bg-cover bg-center bg-no-repeat px-6 text-center text-sm uppercase text-text-white shadow-btn lg:h-14 lg:rounded-lg lg:px-8 lg:shadow-btn-lg'
      }
      {...atributes}
    >
      <Image
        src={cornertl}
        alt=""
        className="absolute left-[6px] top-[6px] h-[11.43] w-[25.71] lg:left-2 lg:top-2 lg:h-4 lg:w-9"
      />
      <Image
        src={cornerbl}
        alt=""
        className="absolute bottom-[6px] left-[6px] h-[11.43] w-[25.71] lg:bottom-2 lg:left-2 lg:h-4 lg:w-9"
      />
      <Image
        src={cornertr}
        alt=""
        className="absolute right-[6px] top-[6px] h-[11.43] w-[25.71] lg:right-2 lg:top-2 lg:h-4 lg:w-9"
      />
      <Image
        src={cornerbr}
        alt=""
        className="absolute bottom-[6px] right-[6px] h-[11.43] w-[25.71] lg:bottom-2 lg:right-2 lg:h-4 lg:w-9"
      />
      {children}
    </button>
  )
}

export const IconCopy = ({
  text,
  customIcon,
  className,
  disabled = false,
}: {
  text?: string | number
  customIcon?: any
  className?: string
  disabled?: boolean
}) => {
  const [statusCopy, setStatusCopy] = useState('')

  const handleCopy = () => {
    if (!text) return

    navigator.clipboard.writeText(text?.toString())
    setStatusCopy('Copied')
    setTimeout(() => {
      setStatusCopy('')
    }, 1000)
  }

  return (
    <button onClick={() => handleCopy()}>
      <span
        data-tooltip-id="icon-copy"
        className={cn('flex size-4 cursor-pointer items-center justify-center', className)}
        onClick={!disabled ? handleCopy : undefined}
      >
        {customIcon ? customIcon : <CopyIcon className="min-w-5 min-h-5" />}
      </span>
      <ReactTooltip id="icon-copy" place="top" content={statusCopy} />
    </button>
  )
}

const variants = {
  LIGHT_ASSET: 'light-asset',
  LIGHT_DOUBLE_ASSET: 'light-double-asset',
  PRIMARY_ASSET: 'primary-asset',
  OUTLINE: 'outline',
} as const
type Variant = (typeof variants)[keyof typeof variants]

const buttonTheme: {
  [key in Variant]: HTMLAttributes<HTMLDivElement>['className']
} = {
  [variants.LIGHT_ASSET]: cn('bg-[url(/icons/button/button-light.svg)]'),
  [variants.LIGHT_DOUBLE_ASSET]: cn('bg-[url(/icons/button/button-light-2.svg)]'),
  [variants.PRIMARY_ASSET]: cn(
    'bg-[url(/icons/button/button-primary.svg)] hover:bg-[url(/icons/button/button-primary-hover.svg)]',
    'text-secondary',
  ),
  [variants.OUTLINE]: cn('border border-secondary'),
}

export type ButtonImageProps = React.PropsWithChildren<
  {
    varirant: (typeof variants)[keyof typeof variants]
  } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export const ButtonImage: React.FC<ButtonImageProps> = ({
  children,
  className,
  varirant,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative cursor-pointer bg-contain bg-center bg-no-repeat rounded-lg flex items-center justify-center py-2 px-4 transition-all duration-100',
        buttonTheme[varirant || variants.LIGHT_ASSET],
        disabled ? ['cursor-not-allowed brightness-75'] : [],
        className,
      )}
      {...props}
      onClick={(e) => {
        if (!disabled && onClick) onClick(e)
      }}
    >
      {children}
    </div>
  )
}
