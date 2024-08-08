import { useVariableLoaded } from '@/hooks/useVariableLoaded'
import { PropsWithClassName } from '@/types'
import { useEffect, useRef, useState } from 'react'

const Captcha: React.FC<PropsWithClassName & { onFinished: () => void; max: number }> = ({ onFinished, max }) => {
  const refCounter = useRef(0)
  const refInit = useRef(false)
  const [count, setCount] = useState(0)

  const sliderCaptcha = useVariableLoaded(() => typeof window !== undefined && window && window.sliderCaptcha, [])

  useEffect(() => {
    if (refInit.current || !sliderCaptcha) return

    const captcha = sliderCaptcha({
      id: 'captcha',
      loadingText: 'Loading...',
      failedText: 'Try again',
      barText: 'Slide right to fill',
      repeatIcon: 'fa fa-redo',
      onSuccess: function () {
        setTimeout(function () {
          captcha.reset()
          refCounter.current += 1
          setCount(refCounter.current)

          if (refCounter.current >= max) {
            onFinished()
          }
        }, 1000)
      },
      // setSrc: function () {
      //   return 'https://picsum.photos/' + Math.round(Math.random() * 136) + '.jpg';
      // },
    })
    refInit.current = true
  }, [sliderCaptcha])

  return (
    <div className="container-fluid">
      <div className="text-base font-medium mx-auto mt-3 text-center">
        {count + 1}/{max}
      </div>

      <div className="slidercaptcha card">
        <div className="card-body">
          <div id="captcha"></div>
        </div>
      </div>
    </div>
  )
}

export default Captcha
