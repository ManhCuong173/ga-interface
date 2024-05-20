import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string }> = ({ className }) => {
  return (
    <svg
      className={cn(' stroke-black1 w-4 h-4', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
      </g>
    </svg>
  )
}

export default Icon
