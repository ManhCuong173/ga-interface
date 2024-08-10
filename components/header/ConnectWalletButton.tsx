'use client'

import { appearAnimation } from '@/constants/animation.constant'
import { wallets } from '@/constants/wallet'
import { useBitcoinAccount, useBitcoinConnected } from '@/context/BitcoinProviderContext/hook'
import { useAuthBitcoin } from '@/hooks/WalletProvider/useAuthBitcoin'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { useToggle } from '@/hooks/custom/useToggle'
import { cn } from '@/lib/utils'
import { userService } from '@/services/user.service'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import WalletModal from '../WalletModal'
import Trans from '../i18n/Trans'

type Props = {
  mode: 'transparent' | 'solid'
}

const ConnectWalletButton: React.FC<Props> = ({ mode }) => {
  const account = useBitcoinAccount()
  const connected = useBitcoinConnected()

  const [isDisplayConnectWalletModal, toggle] = useToggle(false)
  const [hasPubkeyImported, setPubkeyImported] = useState(false)
  const { login } = useAuthBitcoin()

  const importPubKeyMutation = useMutation({
    mutationFn: (data: { public_key: string; wallet_address: string }) => userService.importUserPubkey(data),
  })

  useEffect(() => {
    if (connected && !hasPubkeyImported) {
      importPubKeyMutation.mutate({
        public_key: account.publicKey,
        wallet_address: account.address,
      })
      setPubkeyImported(true)
    }
  }, [account, connected])

  const handleClick = async (connectorKey: WalletBitcoinConnectorEnums) => {
    const wallet = wallets.find((wallet) => wallet.connectorKey === connectorKey)
    if (wallet && !wallet?.installed) {
      window.open(wallet.downloadLink, '_blank')
      return
    }
    login(connectorKey)
  }

  return (
    <motion.div {...appearAnimation} className="flex items-center justify-center p-2 w-full h-full">
      <button className={cn('w-[180px]', '')} onClick={toggle}>
        <div className="flex justify-center items-center">
          <div className={cn('relative h-6 w-6 transition-all')}>
            <div
              className={cn(
                mode !== 'transparent'
                  ? 'bg-[url(/icons/header/wallet.svg)]'
                  : 'bg-[url(/icons/header/wallet-white.svg)]',
                'scale-75 md:scale-100 w-[24px] h-[24px] wallet-icon',
              )}
            />
          </div>
          <span
            className={cn(
              'text-nowrap whitespace-nowrap  transition-all text-[12px] md:text-base font-medium ml-1 md:ml-[12px] font-Roboto',
              'text-red-light address-item-white',
            )}
          >
            <Trans>Connect Wallet</Trans>
          </span>
        </div>
      </button>
      {isDisplayConnectWalletModal && (
        <WalletModal onSelect={handleClick} isOpen={isDisplayConnectWalletModal} onClosed={toggle} />
      )}
    </motion.div>
  )
}
export default ConnectWalletButton

