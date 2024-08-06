import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string; checked?: boolean }> = ({ className, checked }) => {
  return (
    <svg
      className={cn('stroke-bgAlt w-11 h-11', className)}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.515625" y="1.20093" width="43" height="43" rx="7.5" />
      <path d="M30.3916 14.325L13.6396 31.0769" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6396 14.325L30.3916 31.0769" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Icon
