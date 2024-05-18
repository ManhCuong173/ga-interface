import ProgressBar from '@/components/progress-bar'
import React from 'react'

const Progress: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <ProgressBar value={amount} number={amount} className="h-[10px]" bulletSize={40} total={100}>
      <div className="tooltip">
        <svg
          className="stroke-red-light"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle cx="10" cy="10" r="9" fill="white" strokeWidth="2" />
        </svg>
        <span className="tooltiptext">{amount}</span>
      </div>
    </ProgressBar>
  )
}

export default Progress
