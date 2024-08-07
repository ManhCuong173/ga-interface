import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const Captcha: React.FC<PropsWithClassName & { onCaptchaVerifySuccess: (isSuccess: boolean) => void }> = ({
  className,
  onCaptchaVerifySuccess,
}) => {
  const reCaptchaRef = useRef(null)

  const handleReCaptchaChanged = async (value: any) => {
    const captchaResponse = await fetch('/api/captcha-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        captcha: value,
      }),
    })

    if (captchaResponse) {
      onCaptchaVerifySuccess(captchaResponse.status === 200)
    }
  }

  return (
    <ReCAPTCHA
      ref={reCaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY as string}
      onChange={handleReCaptchaChanged}
      className={cn(className)}
    />
  )
}

export default Captcha

