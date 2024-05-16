import React from 'react'

type Props = {
  value: number
  total?: number
  children: React.ReactNode
  number?: number
  className?: string
  bulletSize?: number
}

export default function ProgressBar({
  value,
  total = 100,
  children,
  number,
  className,
  bulletSize = 0,
}: Props) {
  return (
    <div
      className={`${className} relative h-1 flex-1 rounded-[40px] bg-[rgba(212,199,156,0.30)] bg-opacity-[27]`}
    >
      {/* Progress */}
      <div
        className='absolute left-0 z-[1] h-full rounded-l-[40px] bg-[#FF6634]'
        style={{
          width: `${(value / total) * 100}%`,
        }}
      ></div>
      <div
        className='absolute inset-0 z-[2] rounded bg-cover opacity-30 bg-blend-overlay'
        style={{
          backgroundSize: '100px 50px',
        }}
      />
      <div
        className='absolute inset-y-0 left-0'
        style={{
          right: `${bulletSize}px`,
        }}
      >
        <div className='relative size-full'>
          <div
            className={`absolute z-[3] flex ${number ? 'h-[17px] w-[40px]' : ' h-full w-[32.21px]'} items-center`}
            style={{
              left: `calc(${(value / total) * 100}%`,
            }}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
