import { cn } from '@/lib/utils'
import React from 'react'

const HeadMark: React.FC<{ className?: string; color?: string }> = ({ className }) => {
  return (
    <svg
      className={cn('stroke-bgAlt', className)}
      width="361"
      height="30"
      viewBox="0 0 361 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 14.5408H158.293" strokeWidth="1.37787" />
      <path d="M201.916 14.5408H360.209" strokeWidth="1.37787" />
      <rect
        x="168.357"
        y="6.0429"
        width="12.465"
        height="12.465"
        transform="rotate(46.8248 168.357 6.0429)"
        strokeWidth="1.37787"
      />
      <rect
        x="193.283"
        y="5.73137"
        width="12.465"
        height="12.465"
        transform="rotate(46.8248 193.283 5.73137)"
        strokeWidth="1.37787"
      />
      <rect
        x="181.302"
        y="1.55071"
        width="19.0299"
        height="19.0299"
        transform="rotate(46.8248 181.302 1.55071)"
        strokeWidth="1.37787"
      />
    </svg>
  )
}

export default HeadMark

