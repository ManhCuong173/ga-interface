'use client'

import { walletAuthenticated } from '@/constants'
import { BitcoinAccountWallet } from '@/hooks/WalletProvider/connectors/base'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { useDebounce } from '@/hooks/custom/useDebouce'
import { setAddress, setPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch } from '@/lib/hook'
import { createContext, useCallback, useMemo, useState } from 'react'

export type BitcoinProviderContextProps = {
  account: BitcoinAccountWallet
  isConnected: boolean
  updateAccount: (wallet: WalletBitcoinConnectorEnums, address: BitcoinAccountWallet) => void
  clearAccount: () => void
}
const defaultAccount = {
  address: '',
  publicKey: '',
}

export const BitcoinProviderCreateContext = createContext<BitcoinProviderContextProps>({
  account: defaultAccount,
  isConnected: false,
  updateAccount: () => {},
  clearAccount: () => {},
})

const BitcoinProviderContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState<BitcoinAccountWallet>({
    address: '',
    publicKey: '',
  })

  const isConnected = useDebounce(Boolean(account?.address && account?.publicKey), 100)

  const dispatch = useAppDispatch()

  const handleUpdateAccount = useCallback(
    (wallet: WalletBitcoinConnectorEnums, account: BitcoinAccountWallet) => {
      if (wallet && account.address && account.publicKey) {
        setAccount(account)
        dispatch(setAddress(account.address))
        dispatch(setPublicKey(account.publicKey))
        localStorage.setItem(walletAuthenticated, wallet)
      } else {
        setAccount(defaultAccount)
        dispatch(setAddress(defaultAccount.address))
        dispatch(setPublicKey(defaultAccount.publicKey))
        window.localStorage.removeItem(walletAuthenticated)
      }
    },
    [setAccount],
  )

  const clearAccount = useCallback(() => {
    setAccount({
      address: '',
      publicKey: '',
    })
    dispatch(setAddress(''))
    dispatch(setPublicKey(''))
    window.localStorage.removeItem(walletAuthenticated)
  }, [account, dispatch, setAccount, setAddress, setPublicKey])

  const value = useMemo(
    () => ({
      isConnected,
      account,
      clearAccount,

      updateAccount: handleUpdateAccount,
    }),
    [account, isConnected, clearAccount, handleUpdateAccount],
  )
  return <BitcoinProviderCreateContext.Provider value={value}>{children}</BitcoinProviderCreateContext.Provider>
}
export default BitcoinProviderContext
