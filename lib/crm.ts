import { months } from '@/constants/date.constant'
import { CRMChartData } from '@/types/crm'

export const convertTimeStampToDate = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000)
  const month = months[date.getMonth()]
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${month} ${day} ${year}`
}

export const filterVolumeChartDataByWeek = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 6)

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsInRange = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const feemintSum = recordsInRange.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(dateString.split(' ').slice(0, -1).join(' ')) // remove year
    dataset.push(feemintSum)
  }

  return { labels, dataset }
}

export const filterVolumnChartDataByMonth = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsForDate = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const feemintSum = recordsForDate.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(dateString.split(' ').slice(1, 3).join(' ')) // remove date (of week) and year
    dataset.push(feemintSum)
  }

  return { labels, dataset }
}

export const filterVolumnChartDataByYear = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setMonth(currentDate.getMonth() + 1)
  ) {
    const monthString = currentDate.toLocaleString('en-US', { month: 'short' })

    const yearString = currentDate.getFullYear().toString() // Get last two digits of the year
    const label = `${monthString} ${yearString}`

    const recordsInRange = parsedData.filter(
      (item) =>
        item.timecreate.getMonth() === currentDate.getMonth() &&
        item.timecreate.getFullYear() === currentDate.getFullYear(),
    )
    const feemintSum = recordsInRange.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(label)
    dataset.push(feemintSum) // Add feemint sum to dataset array
  }

  return { labels, dataset }
}

export const filterVolumnChartDataAuto = (data: CRMChartData[]) => {
  const earliestDate = new Date(data[0].timecreate)
  const latestDate = new Date(data[data.length - 1].timecreate)

  // Initialize grouped data object with all dates within the range
  const groupedData: { [date: string]: number } = {}
  const currentDate = new Date(earliestDate)
  while (currentDate <= latestDate) {
    const dateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    groupedData[dateString] = 0 // Initialize sum of feemint for each day
    currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
  }

  // Aggregate feemint values for each day
  data.forEach((item) => {
    const dateString = new Date(item.timecreate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    // Add feemint value to the sum for the corresponding day
    groupedData[dateString] += item.feemint
  })

  // Convert grouped data back to arrays for labels and dataset
  const labels = Object.keys(groupedData)
  const dataset = Object.values(groupedData)

  return { labels, dataset }
}

export const filterTransactionChartDataByWeek = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 6)

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsInRange = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const numTransactions = recordsInRange.length // Count the number of transactions

    labels.push(dateString.split(' ').slice(0, -1).join(' ')) // remove year
    dataset.push(numTransactions)
  }

  return { labels, dataset }
}
export const filterTransactionChartDataByMonth = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsForDate = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const numTransactions = recordsForDate.length // Count the number of transactions

    labels.push(dateString.split(' ').slice(1, 3).join(' ')) // remove date (of week) and year
    dataset.push(numTransactions)
  }

  return { labels, dataset }
}

export const filterTransactionChartDataByYear = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(item.timecreate),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setMonth(currentDate.getMonth() + 1)
  ) {
    const monthString = currentDate.toLocaleString('en-US', { month: 'short' })
    const yearString = currentDate.getFullYear().toString() // Get last two digits of the year
    const label = `${monthString} ${yearString}`

    const recordsInRange = parsedData.filter(
      (item) =>
        item.timecreate.getMonth() === currentDate.getMonth() &&
        item.timecreate.getFullYear() === currentDate.getFullYear(),
    )

    const numTransactions = recordsInRange.length // Count the number of transactions

    labels.push(label)
    dataset.push(numTransactions) // Add number of transactions to dataset array
  }

  return { labels, dataset }
}
export const filterTransactionChartDataAuto = (data: CRMChartData[]) => {
  const earliestDate = new Date(data[0].timecreate)
  const latestDate = new Date(data[data.length - 1].timecreate)

  // Initialize grouped data object with all dates within the range
  const groupedData: { [date: string]: number } = {}
  const currentDate = new Date(earliestDate)
  while (currentDate <= latestDate) {
    const dateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    groupedData[dateString] = 0 // Initialize number of transactions for each day
    currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
  }

  // Aggregate number of transactions for each day
  data.forEach((item) => {
    const dateString = new Date(item.timecreate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    // Increment the number of transactions for the corresponding day
    groupedData[dateString]++
  })

  // Convert grouped data back to arrays for labels and dataset
  const labels = Object.keys(groupedData)
  const dataset = Object.values(groupedData)

  return { labels, dataset }
}

// Price:
export const filterPriceByWeek = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(Number(item.timecreate)),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 6)

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsInRange = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const numTransactions = recordsInRange.length // Count the number of transactions
    const total = recordsInRange.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(dateString.split(' ').slice(0, -1).join(' ')) // remove year
    dataset.push(total / numTransactions || 0)
  }

  return { labels, dataset }
}
export const filterPriceByMonth = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(Number(item.timecreate)),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString = currentDate.toDateString() // Convert Date object to string for comparison

    const recordsForDate = parsedData.filter(
      (item) => item.timecreate.toDateString() === dateString,
    )

    const numTransactions = recordsForDate.length // Count the number of transactions
    const total = recordsForDate.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(dateString.split(' ').slice(1, 3).join(' ')) // remove date (of week) and year
    dataset.push(total / numTransactions || 0)
  }

  return { labels, dataset }
}

export const filterPriceDataByYear = (data: CRMChartData[]) => {
  const parsedData = data.map((item) => ({
    ...item,
    timecreate: new Date(Number(item.timecreate)),
  }))

  const endDate = new Date(parsedData[data.length - 1].timecreate)
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate())

  const labels: string[] = []
  const dataset: number[] = []

  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setMonth(currentDate.getMonth() + 1)
  ) {
    const monthString = currentDate.toLocaleString('en-US', { month: 'short' })
    const yearString = currentDate.getFullYear().toString() // Get last two digits of the year
    const label = `${monthString} ${yearString}`

    const recordsInRange = parsedData.filter(
      (item) =>
        item.timecreate.getMonth() === currentDate.getMonth() &&
        item.timecreate.getFullYear() === currentDate.getFullYear(),
    )

    const numTransactions = recordsInRange.length // Count the number of transactions
    const total = recordsInRange.reduce((acc, curr) => acc + curr.feemint, 0)

    labels.push(label)
    dataset.push(total / numTransactions || 0) // Add number of transactions to dataset array
  }

  return { labels, dataset }
}
