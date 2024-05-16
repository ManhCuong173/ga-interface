export type Transaction = {
  address_buyer: string
  address_seller: string
  price_nft: number
  time_exchange: number
  inscription_id: string
  nft_id: string
  number: string
  nft_link: string
}

export type DailySummary = {
  date: string
  average_price: number
  sum_price: number
}

export type ChartData<T> = {
  labels: string[]
  dataset: T[]
}

type AllChartData<T> = {
  year: number
  data: ChartData<T>
}
