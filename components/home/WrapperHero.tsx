import { cn } from '@/lib/utils'
import React from 'react'

const WrapperHero: React.FC<React.PropsWithChildren<{ className?: string; src: string }>> = ({
  className,
  src,
  children,
}) => {
  return (
    <div
      className={cn('flex flex-col max-w-screen w-full min-h-screen bg-cover bg-center relative', className)}
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      {children}
    </div>
  )
}

export default WrapperHero
