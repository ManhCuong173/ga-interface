import { useBitcoinAddress } from '@/context/BitcoinProviderContext/hook'
import { useMemo } from 'react'
import { useVariableLoaded } from '../useVariableLoaded'
import { UniSatWalletProvider } from './connectors/UniSatWallet'
import { XverseWalletProvider } from './connectors/XverseWallet'
import { isOkxInstalled, isTestnet, isUnisatInstalled, isXverseInstalled } from './connectors/utils'
import { useLatestWallet } from './useLatestWallet'
import { OkxWalletProvider } from './connectors/OkxWallet'
import { CHAIN_ID } from '@/constants'

export enum WalletBitcoinConnectorEnums {
  UniSat = 'UniSat',
  Xverse = 'Xverse',
  Okx = 'Okx',
}

export const useUnisat = () => {
  const unisat = useVariableLoaded(() => isUnisatInstalled())
  return useMemo(() => (unisat ? (window as any)?.unisat : null), [unisat])
}

export const useXverse = () => {
  const xverse = useVariableLoaded(() => isXverseInstalled())
  return useMemo(() => (xverse ? (window as any)?.XverseProviders?.BitcoinProvider : null), [xverse])
}

export const useOkx = () => {
  const okx = useVariableLoaded(() => isOkxInstalled())
  return useMemo(
    () => (okx ? (isTestnet(CHAIN_ID) ? window?.okxwallet?.bitcoinTestnet : window?.okxwallet?.bitcoin) : null),
    [okx],
  )
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
