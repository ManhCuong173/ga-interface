import { PropsWithClassName } from '@/types'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect, useRef, useState } from 'react'

const Captcha: React.FC<PropsWithClassName & { onCaptchaTokenChanged: (value: string) => void }> = ({
  className,
  onCaptchaTokenChanged,
}) => {
  const [token, setToken] = useState('')
  const captchaRef = useRef(null)

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    ;(captchaRef.current as any)?.execute()
  }

  useEffect(() => {
    if (token) onCaptchaTokenChanged(token)
  }, [token])

  return (
    <form>
      <HCaptcha
        sitekey="6546e520-8802-4e86-a2ca-e0dc9fcca1fe"
        onLoad={onLoad}
        onVerify={(value) => setToken(value)}
        ref={captchaRef}
      />
    </form>
  )
}

export default Captcha

