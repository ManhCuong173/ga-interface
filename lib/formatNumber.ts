export const getDecimalAmount = (amount: string | number, decimals = 8) => {
  return Number.isNaN(amount) ? 0 : Math.ceil(Number(amount) * Math.pow(10, decimals))
}

export const getBalanceAmount = (amount: string | number, decimals = 18) => {
  return Number.isNaN(amount) ? 0 : Number(amount) / Math.pow(10, decimals)
}
