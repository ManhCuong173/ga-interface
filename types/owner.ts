export type Distribution = {
  [fieldName: string]: {
    percent: number
    quantity: number
  }
}

export type Owner = {
  id: number
  name: string
  WalletAddress: string
  avatar: string
  Count: number
}

export type ParamsOwner = {
  idnft: string
  page: string
  page_size: string
}
