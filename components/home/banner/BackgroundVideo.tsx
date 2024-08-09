import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import { forwardRef } from 'react'

const BackgroundVideo = forwardRef<any, PropsWithClassName & { src: string }>(({ src, className }, ref) => {
  return (
    <video
      className={cn('absolute top-0 left-0 object-cover w-full h-full z-10', className)}
      autoPlay={true}
      muted={true}
      loop={true}
      controls={false}
      playsInline={true}
      ref={ref}
    >
      <source src={src} type="video/mp4" className="hidden" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  )
})

export default BackgroundVideo

