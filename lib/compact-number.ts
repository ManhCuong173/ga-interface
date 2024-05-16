export function compactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed() + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed() + 'K'
  } else {
    return num.toString()
  }
}
