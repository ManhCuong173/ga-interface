import React from 'react'
import Svg, { SVGProps } from '../Svg'
import { cn } from '@/lib/utils'

const X: React.FC<SVGProps> = ({ className, ...props }) => {
  return (
    <Svg className={cn('text-text-sub fill-current ', className)} viewBox="0 0 24 25" {...props}>
      <path d="M13.4287 11.1454L19.0134 4.79321H17.6902L12.8388 10.3075L8.96687 4.79321H4.5L10.3565 13.1326L4.5 19.7932H5.82322L10.9432 13.9685L15.0331 19.7932H19.5L13.4287 11.1454ZM11.6158 13.2058L11.0215 12.3749L6.3004 5.76931H8.33313L12.1443 11.1022L12.7361 11.9331L17.6896 18.8647H15.6568L11.6158 13.2058Z" />
    </Svg>
  )
}

export default X
