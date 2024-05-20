import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string }> = ({ className }) => {
  return (
    <svg className={cn('w-4 h-4', className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_36_1031)">
        <path
          d="M3.2 0H9.6V1.6H3.2V0ZM1.6 3.2V1.6H3.2V3.2H1.6ZM1.6 9.6H0V3.2H1.6V9.6ZM3.2 11.2H1.6V9.6H3.2V11.2ZM9.6 11.2V12.8H3.2V11.2H9.6ZM11.2 9.6H9.6V11.2H11.2V12.8H12.8V14.4H14.4V16H16V14.4H14.4V12.8H12.8V11.2H11.2V9.6ZM11.2 3.2H12.8V9.6H11.2V3.2ZM11.2 3.2V1.6H9.6V3.2H11.2Z"
          fill="#AE9955"
        />
      </g>
      <defs>
        <clipPath id="clip0_36_1031">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Icon
