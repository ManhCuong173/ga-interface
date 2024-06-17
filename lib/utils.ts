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

export function isInViewport(el: any) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

