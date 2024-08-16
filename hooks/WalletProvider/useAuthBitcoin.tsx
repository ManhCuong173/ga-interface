'use client'

import { CHAIN_ID, walletAuthenticated } from '@/constants'
import { REFERRAL_KEY } from '@/constants/auth.constant'
import {
  useBitcoinAddress,
  useBitcoinConnected,
  useBitcoinLogout,
  useBitcoinUpdateAccount,
} from '@/context/BitcoinProviderContext/hook'
import { selectInitializer, selectToken, setToken } from '@/lib/features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useLogin from '../api/useLogin'
import { BitcoinAccountWallet, ChainId } from './connectors/base'
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

  const token = useAppSelector(selectToken)
  const loginBySignWallet = useLoginBySignWallet()

  const login = useCallback(
    async (wallet: WalletBitcoinConnectorEnums, chainId: ChainId = CHAIN_ID) => {
      try {
        const provider = walletBitcoinProvider[wallet]

        setLoading(true)
        if (provider) {
          await provider.connect()
          await provider.changeNetwork(chainId)

          const account = await provider.getAccount()

          if (account.address && account.publicKey) {
            const result = await loginBySignWallet({
              account,
              provider,
            })

            if (result) {
              updateAccount(wallet, account)
            }
          }
          console.log('2')

          updateAccount(wallet, account)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [updateAccount, walletBitcoinProvider, token, loginBySignWallet],
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
  const dispatch = useAppDispatch()
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
        dispatch(setToken(''))

        updateAccount(wallet, account)
      })
    }
  }, [provider, isConnected])

  return null
}

export const useLoginBySignWallet = () => {
  const hasAuthInitialized = useAppSelector(selectInitializer)

  const { login } = useLogin()

  // useEffect(() => {
  //   if (!provider || typeof window === 'undefined') return

  //   if (!token && hasAuthInitialized) {
  //     ;(async () => {
  //       const message = `GoldenAppleConnect-${Date.now()}`
  //       const signature = await provider.signMessage(walletAddress, message)

  //       const refCode = localStorage.getItem(REFERRAL_KEY) || ''

  //       login({
  //         message,
  //         public_key: publicKey,
  //         ref_code: refCode,
  //         signature,
  //         wallet_address: walletAddress,
  //       })
  //     })()
  //   }
  // }, [walletAddress])

  return useCallback(
    async ({ account, provider }: { account: BitcoinAccountWallet; provider: any }) => {
      if (!provider || !hasAuthInitialized) return null

      const message = `GoldenAppleConnect-${Date.now()}`
      const signature = await provider.signMessage(account.address, message)

      const refCode = localStorage.getItem(REFERRAL_KEY) || ''

      const auth = await login({
        message,
        public_key: account.publicKey,
        ref_code: refCode,
        signature,
        wallet_address: account.address,
      })
      return auth
    },
    [hasAuthInitialized],
  )
}

