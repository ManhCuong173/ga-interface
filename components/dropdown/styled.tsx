import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import { PropsWithChildren } from 'react'

export const DropdownContainer: React.FC<PropsWithChildren & PropsWithClassName> = ({ children, className }) => {
  return <div className={cn('relative', className)}>{children}</div>
}

export const DropdownAnchor: React.FC<PropsWithChildren & PropsWithClassName & { show: boolean }> = ({
  children,
  className,
  show,
}) => {
  return (
    <div className={cn('absolute', show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-50', className)}>
      {children}
    </div>
  )
}

