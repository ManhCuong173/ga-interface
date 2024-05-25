import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string }> = ({ className }) => {
  return (
    <svg
      className={cn('stroke-bgAlt w-6 h-6', className)}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.376 13.624L13.624 30.376"
        stroke="#AE9955"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.624 13.624L30.376 30.376"
        stroke="#AE9955"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Icon
