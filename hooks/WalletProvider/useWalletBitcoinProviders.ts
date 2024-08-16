import { useBitcoinAddress } from '@/context/BitcoinProviderContext/hook'
import { useMemo } from 'react'
import { useVariableLoaded } from '../useVariableLoaded'
import { OkxWalletProvider } from './connectors/OkxWallet'
import { UniSatWalletProvider } from './connectors/UniSatWallet'
import { XverseWalletProvider } from './connectors/XverseWallet'
import {
  getProviderOkx,
  getProviderUniSat,
  getProviderXverse,
  isOkxInstalled,
  isUnisatInstalled,
  isXverseInstalled,
} from './connectors/utils'
import { useLatestWallet } from './useLatestWallet'

export enum WalletBitcoinConnectorEnums {
  UniSat = 'UniSat',
  Xverse = 'Xverse',
  Okx = 'Okx',
}

export const useUnisat = () => {
  const unisat = useVariableLoaded(() => isUnisatInstalled())
  return useMemo(() => (unisat ? getProviderUniSat() : null), [unisat])
}

export const useXverse = () => {
  const xverse = useVariableLoaded(() => isXverseInstalled())
  return useMemo(() => (xverse ? getProviderXverse() : null), [xverse])
}

export const useOkx = () => {
  const okx = useVariableLoaded(() => isOkxInstalled())
  return useMemo(() => (okx ? getProviderOkx() : null), [okx])
}

export const useWalletBitcoinProviders = () => {
  const uniSat = useUnisat()
  const xverse = useXverse()
  const okx = useOkx()

  return useMemo(
    () => ({
      [WalletBitcoinConnectorEnums.UniSat]: uniSat ? new UniSatWalletProvider(uniSat) : null,
      [WalletBitcoinConnectorEnums.Xverse]: xverse ? new XverseWalletProvider(xverse) : null,
      [WalletBitcoinConnectorEnums.Okx]: okx ? new OkxWalletProvider(okx) : null,
    }),
    [uniSat, xverse, okx],
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
