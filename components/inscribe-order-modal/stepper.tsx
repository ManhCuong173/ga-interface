import { cn } from '@/lib/utils'
import { MarkCircleIcon } from '../ui/icons'

const steps = [
  {
    id: 1,
    label: 'Payment',
  },
  {
    id: 2,
    label: 'Payment Result',
  },
  {
    id: 3,
    label: 'Start Inscribing',
  },
]

type Props = {
  step: 1 | 2 | 3 | 4
}

const Box: React.FC<{ children?: any; isLast: boolean; isActive: boolean }> = ({ isLast, isActive, children }) => {
  return (
    <div
      className={cn(
        'relative h-8 w-8 rounded-full flex items-center justify-center text-sm',
        isActive ? 'bg-orange text-white' : isLast ? 'bg-bgAlt2' : 'border border-black1 text-black1',
      )}
    >
      {isLast ? <MarkCircleIcon checked={true} className="w-7 h-7 fill-transparent" markColor="#B2B0AD" /> : children}
    </div>
  )
}
const Stepper: React.FC<Props> = ({ step: _step }) => {
  return (
    <div className="mx-auto flex justify-between min-w-[300px]">
      {steps.map((step, index) => {
        const isActive = step.id === _step
        const isLast = step.id < _step
        return (
          <>
            <div key={`stepper-step-${step.id}`} className="relative">
              <div key={step.id} className={cn(`flex flex-col items-center gap-2 w-max`)}>
                <Box isActive={isActive} isLast={isLast}>
                  0{step.id}
                </Box>

                <span
                  className={cn(
                    isActive ? 'text-orange' : isLast ? 'text-black1/50' : '',
                    ' font-Roboto text-center text-sm',
                  )}
                >
                  {step?.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                key={`stepper-step-stroke-${step.id}`}
                className={`h-[2px] lg:w-[60px] scale-125 bg-stroke mt-4`}
              ></div>
            )}
          </>
        )
      })}
    </div>
  )
}
export default Stepper
