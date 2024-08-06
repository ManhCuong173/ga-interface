import { cn } from '@/lib/utils'
import React, { ChangeEventHandler, ReactElement, ReactNode, useState } from 'react'
import InputField from '../InputField'
import ProgressBar from '../progress-bar'

const Progress: React.FC<{
  amount: number
  max?: number
  min?: number
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}> = ({ amount, className, max = 0, min = 0, onChange }) => {
  return (
    <div className={cn('relative w-full', className)}>
      <ProgressBar value={amount - min} total={max - min} bulletSize={20}>
        <svg
          className="stroke-red-light"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle cx="10" cy="10" r="9" fill="white" strokeWidth="2" />
        </svg>
      </ProgressBar>
      <input
        type="range"
        className="absolute border-red-light inset-0 z-[2] w-full cursor-pointer opacity-0"
        min={min}
        max={max}
        step={1}
        value={amount}
        onChange={onChange}
      />
    </div>
  )
}

const Customsize: React.FC<{
  value: number
  onChange: (sats: number) => void
  showSlider?: boolean
  min?: number
  max?: number
  children?:
    | ((exposedProps: { enabledCustom: boolean; onCallback: () => void }) => ReactElement)
    | ReactNode
    | ReactElement
}> = ({ onChange, value, showSlider = false, min, max, children }) => {
  const [showSatsInscription, setShowSatsInscription] = useState(showSlider)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    onChange(value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between max-h-9">
        <div>
          {children ? (
            React.isValidElement(children) ? (
              React.cloneElement(children)
            ) : (
              typeof children === 'function' &&
              children({
                enabledCustom: showSatsInscription,
                onCallback: () => setShowSatsInscription(!showSatsInscription),
              })
            )
          ) : (
            <></>
          )}
        </div>

        {showSatsInscription && (
          <InputField
            hideIcon
            value={value}
            onChange={(e) => onChange(Number.parseInt(e.target.value))}
            onBlur={handleChange}
            className={cn(
              'relative border max-w-[140px] border-red-light rounded-lg text-sm max-h-9 font-ProtoMono text-black1',
            )}
            classNameInput="text-right"
          />
        )}
      </div>

      {showSatsInscription && (
        <Progress className="mt-3 py-2" min={min} max={max} amount={value} onChange={handleChange} />
      )}
    </div>
  )
}
export default Customsize

