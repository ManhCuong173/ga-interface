const steps = [
  {
    index: 1,
    label: 'payment',
  },
  {
    index: 2,
    label: 'Payment Result',
  },
  {
    index: 3,
    label: 'Start Inscribing',
  },
]

type Props = {
  step: 1 | 2 | 3 | 4
}

export default function Stepper({ step: _step }: Props) {
  const returnColor = (index: number) => {
    if (index === _step) {
      return 'rgba(255,102,52,1)'
    }
    if (index < _step) {
      return '#12B76A'
    } else {
      return 'rgba(102,96,91,1)'
    }
  }
  return (
    <>
      <div className='mx-auto flex h-[60px] max-w-[720px] max-sm:justify-center'>
        {steps.map((step, index) => (
          <>
            {index !== 0 && (
              <div
                className={`my-[15px] h-[2px] lg:w-[168px] w-12 ${step.index <= _step ? 'bg-[#12B76A]' : 'bg-[#E5E4E3]'}`}
              ></div>
            )}
            <div
              key={step.index}
              className={`flex lg:w-[168px] w-[86px] max-lg:h-20 flex-col items-center gap-2 ${index !== 0 ? 'lg:translate-x-[-30px]' : ''}`}
            >
              {step.index < _step ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='33'
                  height='33'
                  viewBox='0 0 33 33'
                  fill='none'
                >
                  <circle cx='16.0303' cy='16.7009' r='16' fill='#12B76A' />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M20.3886 12.1323L13.8171 18.4743L12.0733 16.6111C11.7521 16.3083 11.2473 16.2899 10.8802 16.5469C10.5222 16.813 10.4213 17.2811 10.6415 17.6574L12.7066 21.0166C12.9085 21.3286 13.2573 21.5214 13.6519 21.5214C14.0282 21.5214 14.3862 21.3286 14.5881 21.0166C14.9185 20.5852 21.2238 13.0684 21.2238 13.0684C22.0498 12.224 21.0494 11.4806 20.3886 12.1231V12.1323Z'
                    fill='#F0F0F0'
                  />
                </svg>
              ) : (
                <div
                  className={`relative h-8 w-8 rounded-full ${step.index === _step ? 'bg-[rgba(255,102,52,1)] text-white' : 'border border-[rgba(102,96,91,1)] text-[rgba(102,96,91,1)]'} flex items-center justify-center `}
                >
                  <span>{step.index}</span>
                </div>
              )}
              <span
                className={`text-[${returnColor(step.index)}] text-center text-sm font-light`}
                style={{ color: returnColor(step.index) }}
              >
                {step?.label}
              </span>
            </div>
          </>
        ))}
      </div>
    </>
  )
}
