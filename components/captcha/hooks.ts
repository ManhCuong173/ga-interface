import { useMemo } from 'react'

export const useVerifyCaptcha = () => {
  const handleReCaptchaChanged = async (captchaResultToken: string) => {
    const captchaResponse = await fetch('/api/captcha-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        captcha: captchaResultToken,
      }),
    })

    return captchaResponse
  }

  return useMemo(() => handleReCaptchaChanged, [handleReCaptchaChanged])
}
