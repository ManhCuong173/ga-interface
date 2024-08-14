import { BEARER_UNISAT, CHAIN_ID } from '@/constants'
import { Balance, ChainId, Inscription } from './base'

export const MEMPOOL_APIs = {
  [ChainId.Mainnet]: 'https://mempool.space/api',
  [ChainId.Testnet]: 'https://mempool.space/testnet/api',
}
export const UNI_SATs = {
  [ChainId.Mainnet]: '', // TODO
  [ChainId.Testnet]: 'https://open-api.unisat.io/v1/',
}
export const UNI_SAT = UNI_SATs[CHAIN_ID]
export const MEMPOOL_API = MEMPOOL_APIs[CHAIN_ID]

export const isTestnet = (chain: string) => {
  return chain === ChainId.Testnet
}

export const getInscriptionsByAddress = async ({
  address,
  limit,
  offset,
}: {
  address: string
  limit: number
  offset: number
}): Promise<Inscription> => {
  const params = { size: `${limit}`, cursor: `${offset}` }
  const res = await fetch(`${UNI_SAT}/indexer/address/${address}/utxo-data`, {
    headers: {
      Authorization: `Bearer ${BEARER_UNISAT}`,
    },
  })
  if (res.ok) {
    const { data } = await res.json()
    const list = data.utxo.map((item: any) => ({
      inscriptionId: item.inscriptions[0].inscriptionId,
    }))
    return { list, total: data.total }
  } else {
    return {
      list: [],
      total: 0,
    }
  }
}

export const getBalanceByMempool = async (address: string): Promise<Balance> => {
  if (!address) {
    return {
      total: 0,
      confirmed: 0,
    }
  }

  const res = await fetch(`${MEMPOOL_API}/address/${address}`)
  if (res.ok) {
    const data = await res.json()
    const { chain_stats } = data
    const { funded_txo_sum, spent_txo_sum } = chain_stats
    return {
      total: funded_txo_sum,
      confirmed: funded_txo_sum - spent_txo_sum, // this is balance of acccount
    }
  } else {
    return {
      total: 0,
      confirmed: 0,
    }
  }
}

export const isUnisatInstalled = () => {
  if (typeof window === 'undefined') {
    return false
  }
  const unisat = (window as any)?.unisat
  return unisat
}

export const isXverseInstalled = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return (window as any)?.XverseProviders?.BitcoinProvider
}

