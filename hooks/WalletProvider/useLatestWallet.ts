import { walletAuthenticated } from '@/constants'
import { useVariableLoaded } from '../useVariableLoaded'
import { useMemo } from 'react'
import { WalletBitcoinConnectorEnums } from './useWalletBitcoinProviders'

export const useLatestWallet = (): WalletBitcoinConnectorEnums => {
  const localStorage = useVariableLoaded(() => {
    if (typeof window !== 'object') return null
    const w = (window as any) || {}
    return w?.localStorage
  })
  return useMemo(() => localStorage?.getItem(walletAuthenticated), [localStorage])
}
