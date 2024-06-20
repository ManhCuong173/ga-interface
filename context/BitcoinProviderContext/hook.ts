import { useContext, useMemo } from 'react'
import { BitcoinProviderCreateContext } from '.'

export const useBitcoinUpdateAccount = () => {
  const { updateAccount } = useContext(BitcoinProviderCreateContext)
  return useMemo(() => updateAccount, [updateAccount])
}

export const useBitcoinAccount = () => {
  const { account } = useContext(BitcoinProviderCreateContext)
  return useMemo(() => account, [account])
}

export const useBitcoinConnected = () => {
  const { isConnected } = useContext(BitcoinProviderCreateContext)
  return useMemo(() => isConnected, [isConnected])
}

export const useBitcoinAddress = () => {
  const account = useBitcoinAccount()
  return useMemo(() => account?.address, [account])
}

export const useBitcoinLogout = () => {
  const { clearAccount } = useContext(BitcoinProviderCreateContext)
  return useMemo(() => clearAccount, [clearAccount])
}

