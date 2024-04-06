export function truncate(fullStr: string, strLen: number, separator: string) {
  if (fullStr.length <= strLen) return fullStr

  separator = separator || '...'

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2)

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars)
}

export const checkInvalidAddress = (address: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const vietnameseChars = /^[^\u00C0-\u1EF9]+$/i;
  return specialChars.test(address) || (!vietnameseChars.test(address) && address);
}