import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import ReCAPTCHA from 'react-google-recaptcha'

const Captcha: React.FC<PropsWithClassName & { onCaptchaTokenChanged: (value: string) => void }> = ({
  className,
  onCaptchaTokenChanged,
}) => {
  let captcha: any
  const setCaptchaRef = (ref: any) => {
    if (ref) {
      return (captcha = ref)
    }
  }

  const resetCaptcha = () => {
    setTimeout(() => {
      captcha.reset()
    }, 5000)
  }

  return (
    <>
      <ReCAPTCHA
        ref={(e) => setCaptchaRef(e)}
        sitekey={'6LcGySAqAAAAAJB-m5Qbpfo3DLfyOgEMsocKx38w'}
        onChange={(value) => {
          onCaptchaTokenChanged(value as string)
          resetCaptcha()
        }}
        className={cn(className)}
      />
    </>
  )
}

export default Captcha

