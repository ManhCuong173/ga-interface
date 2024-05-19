'use client'

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  direction?: 'up' | 'down'
}

export default function Counter({ value, direction = 'up' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 50,
  })
  const isInView = useInView(ref, { margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(latest.toFixed(0))
        }
      }),
    [springValue],
  )

  return <span ref={ref} />
}
