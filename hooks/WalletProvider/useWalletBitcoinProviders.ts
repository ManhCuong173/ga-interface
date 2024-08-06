import { useBitcoinAddress } from '@/context/BitcoinProviderContext/hook'
import { useMemo } from 'react'
import { useVariableLoaded } from '../useVariableLoaded'
import { UniSatWalletProvider } from './connectors/UniSatWallet'
import { XverseWalletProvider } from './connectors/XverseWallet'
import { isUnisatInstalled, isXverseInstalled } from './connectors/utils'
import { useLatestWallet } from './useLatestWallet'

export enum WalletBitcoinConnectorEnums {
  UniSat = 'UniSat',
  Xverse = 'Xverse',
}

export const useUnisat = () => {
  const unisat = useVariableLoaded(() => isUnisatInstalled())
  return useMemo(() => (unisat ? (window as any)?.unisat : null), [unisat])
}

export const useXverse = () => {
  const xverse = useVariableLoaded(() => isXverseInstalled())
  return useMemo(() => (xverse ? (window as any)?.XverseProviders?.BitcoinProvider : null), [xverse])
}

export const useWalletBitcoinProviders = () => {
  const uniSat = useUnisat()
  const xverse = useXverse()

  return useMemo(
    () => ({
      [WalletBitcoinConnectorEnums.UniSat]: uniSat ? new UniSatWalletProvider(uniSat) : null,
      [WalletBitcoinConnectorEnums.Xverse]: xverse ? new XverseWalletProvider(xverse) : null,
    }),
    [uniSat, xverse],
  )
}

export const useWalletBitcoinProviderByWallet = () => {
  const account = useBitcoinAddress()
  const providers = useWalletBitcoinProviders()
  const wallet = useLatestWallet()

  return useMemo(() => {
    return account && wallet ? providers[wallet] : null
  }, [providers, account])
}

