import { clsx, type ClassValue } from 'clsx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export const copyFunction = async (text: string) => {
  const textCopied = await navigator.clipboard.writeText(text)
  toast.success('Copied successfully')
  return textCopied
}

export const sliceAddress = (address: string | undefined) => {
  if (!address) return '---'
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delayed = (delayedTime: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, delayedTime)
  })
}
