import { cn } from '@/lib/utils'
import React from 'react'

export type SVGProps = React.SVGProps<SVGSVGElement>

const Svg = React.forwardRef<SVGSVGElement, SVGProps>(({ className, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
    className={cn('w-6', className)}
    {...props}
  />
))

Svg.displayName = 'Svg'

export default Svg
