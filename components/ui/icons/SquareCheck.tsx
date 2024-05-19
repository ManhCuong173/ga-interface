import { cn } from '@/lib/utils'
import React from 'react'

const Icon: React.FC<{ className?: string; color?: string; checked?: boolean }> = ({ className, checked }) => {
  return (
    <svg
      className={cn('stroke-text-sub w-5 h-5', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {checked ? (
        <>
          <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#2D8B6F" stroke="#2D8B6F" />
          <path d="M5 9.5L9 13.5L15.5 7" stroke="#FAF5F0" stroke-width="2" />
        </>
      ) : (
        <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#2D8B6F" />
      )}
    </svg>
  )
}

export default Icon

