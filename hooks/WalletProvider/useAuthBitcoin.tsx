'use client'

import { CHAIN_ID, walletAuthenticated } from '@/constants'
import {
  useBitcoinUpdateAccount,
  useBitcoinAddress,
  useBitcoinConnected,
  useBitcoinLogout,
} from '@/context/BitcoinProviderContext/hook'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { ChainId } from './connectors/base'
import { useLatestWallet } from './useLatestWallet'
import {
  WalletBitcoinConnectorEnums,
  useWalletBitcoinProviderByWallet,
  useWalletBitcoinProviders,
} from './useWalletBitcoinProviders'

export const useAuthBitcoin = () => {
  const walletBitcoinProvider = useWalletBitcoinProviders()
  const updateAccount = useBitcoinUpdateAccount()
  const [loading, setLoading] = useState(false)
  const logout = useBitcoinLogout()

  const login = useCallback(
    async (wallet: WalletBitcoinConnectorEnums, chainId: ChainId = CHAIN_ID) => {
      const provider = walletBitcoinProvider[wallet]

      try {
        setLoading(true)
        if (provider) {
          await provider.connect()
          await provider.changeNetwork(chainId)

          const account = await provider.getAccount()

          updateAccount(wallet, account)
        } else {
          toast.error('Provider not found')
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [updateAccount, walletBitcoinProvider],
  )

  const switchNetwork = useCallback(
    async (chainId: ChainId) => {
      const wallet = localStorage.getItem(walletAuthenticated)
      await login(wallet as WalletBitcoinConnectorEnums, chainId)
    },
    [login],
  )

  return useMemo(() => ({ login, switchNetwork, logout, isLoading: loading }), [login, logout, switchNetwork, loading])
}

export const useAutoConnectBitcoinWallet = () => {
  const refLogin = useRef(false)
  const bitcoinAddress = useBitcoinAddress()
  const logoutBitcoin = useBitcoinLogout()

  const wallet = useLatestWallet()

  const updateAccount = useBitcoinUpdateAccount()
  const isConnected = useBitcoinConnected()

  const provider = useWalletBitcoinProviderByWallet()

  const { login } = useAuthBitcoin()

  useEffect(() => {
    if (refLogin.current) return

    if (wallet) {
      login(wallet)
    } else if (bitcoinAddress && !wallet) {
      logoutBitcoin()
    }
    refLogin.current = true
  }, [login, wallet])

  useEffect(() => {
    if (provider && isConnected && wallet) {
      provider.onAccountsChanged((account) => {
        updateAccount(wallet, account)
      })
    }
  }, [provider, isConnected])

  return null
}
