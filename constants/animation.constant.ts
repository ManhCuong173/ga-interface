export const appearAnimation = {
  initial: 'start',
  whileInView: 'end',
  viewport: { once: true },
  variants: {
    start: { opacity: 0 },
    end: { opacity: 1 },
  },
}

export const scaleAnimation = {
  initial: 'start',
  whileInView: 'end',
  viewport: { once: true },
  variants: {
    start: { scale: 0 },
    end: { scale: 1 },
  },
}

export const flyInAnimation = {
  initial: 'start',
  whileInView: 'end',
  viewport: { once: true },
  variants: {
    start: { opacity: 0, y: 32 },
    end: { opacity: 1, y: 0 },
  },
}

export const flyToAnimation = {
  initial: 'start',
  whileInView: 'end',
  viewport: { once: true },
  variants: {
    start: { opacity: 0, x: -32 },
    end: { opacity: 1, x: 0 },
  },
}
