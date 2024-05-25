import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string }> = ({ className }) => {
  return (
    <svg className={cn('w-6 h-6', className)} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_169_2156)">
        <path d="M9 14.8462L14.7143 21L24 11" stroke="#4E473F" strokeOpacity="0.5" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_169_2156">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Icon
