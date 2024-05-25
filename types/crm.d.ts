export type CRMChartDataResponse = {
  walletaddress: string
  feemint: number
  timecreate: number
}

// Date is formatted
export type CRMChartData = {
  walletaddress: string
  feemint: number
  timecreate: number | string
}
