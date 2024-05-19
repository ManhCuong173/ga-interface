import { DailySummary, Transaction } from '@/types/chart'

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000) // Convert from seconds to milliseconds
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
}

export function groupTransactionsByDate(transactions: Transaction[]): DailySummary[] {
  const groupedTransactions: Map<string, DailySummary> = new Map()

  // Iterate over transactions to group them by date
  for (const transaction of transactions) {
    const dateKey = new Date(transaction.time_exchange * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    if (!groupedTransactions.has(dateKey)) {
      groupedTransactions.set(dateKey, { date: dateKey, average_price: 0, sum_price: 0 })
    }
    const dailySummary = groupedTransactions.get(dateKey)!
    dailySummary.sum_price += transaction.price_nft
    dailySummary.average_price = dailySummary.sum_price / groupedTransactions.size
  }

  return Array.from(groupedTransactions.values())
}
