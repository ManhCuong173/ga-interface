import { CSSProperties } from 'react'

type Props = {
  speed: number
  text: string

}

export default function HoverGlyphText({ speed, text }: Props) {
  return (
    <span
      style={
        {
          '--speed': speed,
        } as CSSProperties
      }
    >
      text
    </span>
  )
}
