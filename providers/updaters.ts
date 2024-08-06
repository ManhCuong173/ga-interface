'use client'

import { REFERRAL_KEY } from '@/constants/auth.constant'
import useLogin from '@/hooks/api/useLogin'
import { useAutoConnectBitcoinWallet } from '@/hooks/WalletProvider/useAuthBitcoin'
import { useWalletBitcoinProviderByWallet } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { selectInitializer, selectToken } from '@/lib/features/auth/auth-slice'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { useEffect } from 'react'

export const Updaters = () => {
  const provider = useWalletBitcoinProviderByWallet()

  const walletAddress = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)

  const token = useAppSelector(selectToken)
  const hasAuthInitialized = useAppSelector(selectInitializer)

  const { login } = useLogin()

  useAutoConnectBitcoinWallet()

  useEffect(() => {
    if (!provider || typeof window === 'undefined') return

    if (!token && hasAuthInitialized) {
      ;(async () => {
        const message = `GoldenAppleConnect-${Date.now()}`
        const signature = await provider.signMessage(walletAddress, message)

        const refCode = localStorage.getItem(REFERRAL_KEY) || ''

        login({
          message,
          public_key: publicKey,
          ref_code: refCode,
          signature,
          wallet_address: walletAddress,
        })
      })()
    }
  }, [walletAddress])

  return null
}

