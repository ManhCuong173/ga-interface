import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; checkedColor?: string; markColor?: string; checked?: boolean }> = ({
  className,
  checked,
  markColor = '#FFF',
  checkedColor = 'fill-red-light',
}) => {
  return (
    <svg
      className={cn('w-6 h-6 fill-white', checked ? checkedColor || 'fill-red-light' : 'stroke-black1', className)}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.3" cy="10.3" r="10" />
      <path d="M5 9.5L9 13.5L15.5 7" stroke={markColor} strokeWidth="2" />
    </svg>
  )
}

export default Icon
