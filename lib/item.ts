import { Order } from '../types/orders'

export const handleAddItem = <T>(array: T[], item: T): T[] => {
  if (!array.includes(item)) {
    array.push(item)
  } else {
    const index = array.indexOf(item)
    array.splice(index, 1)
  }

  return array
}

export const filterSearchItem = <T extends Order>(array: T[], searchValue: string): T[] => {
  return array.filter((item) => item.id_create.includes(searchValue))
}

export const compareAddress = (ownerAddress: string, walletAddress: string): boolean => {
  return ownerAddress.toLowerCase() === walletAddress.toLowerCase()
}

