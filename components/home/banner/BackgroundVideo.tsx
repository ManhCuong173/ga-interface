import { cn } from '@/lib/utils'
import { PropsWithClassName } from '@/types'
import { forwardRef, VideoHTMLAttributes } from 'react'

const BackgroundVideo = forwardRef<
  any,
  PropsWithClassName & { src: string; videoProps?: VideoHTMLAttributes<HTMLVideoElement> }
>(({ src, className, videoProps }, ref) => {
  return (
    <video
      className={cn('absolute top-0 left-0 object-cover w-screen h-screen z-10', className)}
      autoPlay={true}
      muted={true}
      loop={true}
      controls={false}
      playsInline={true}
      ref={ref}
      {...videoProps}
    >
      <source src={src} type="video/mp4" className="hidden" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  )
})

export default BackgroundVideo

