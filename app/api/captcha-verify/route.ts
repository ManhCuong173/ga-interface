import { NextResponse } from 'next/server'

export async function POST(req: Request, res: any) {
  const data = await req.json()
  if (!(data as any)?.captcha) {
    return NextResponse.json({ message: 'Please provide captcha action' })
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LcGySAqAAAAAJl-VHxig9uvzHFkvh1EgmVFrKFN&response=${(data as any).captcha}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        method: 'POST',
      },
    )
    const captchaValidation = await response.json()
    if (captchaValidation.success) {
      return NextResponse.json(200)
    }
  } catch (error) {
    return NextResponse.json(422)
  }

  return NextResponse.json(422)
}

