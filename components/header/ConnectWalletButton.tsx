'use client'

import { wallets } from '@/constants/wallet'
import { useBitcoinAccount, useBitcoinConnected } from '@/context/BitcoinProviderContext/hook'
import { useAuthBitcoin } from '@/hooks/WalletProvider/useAuthBitcoin'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { useToggle } from '@/hooks/custom/useToggle'
import { cn } from '@/lib/utils'
import { userService } from '@/services/user.service'
import { useMutation } from '@tanstack/react-query'
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
    <>
      <button className={cn('desktop-menu-container')} onClick={toggle}>
        <div className="flex justify-center items-center">
          <div
            className={cn('relative h-6 w-6 transition-all', mode === 'transparent' ? 'fill-white' : 'fill-red-light')}
          >
            <div
              className={cn(
                mode !== 'transparent'
                  ? 'bg-[url(/icons/header/wallet.svg)] wallet-icon'
                  : 'bg-[url(/icons/header/wallet-white.svg)] wallet-white-icon',
                'w-[24px] h-[24px]',
              )}
            />
          </div>
          <span
            className={cn(
              'text-nowrap transition-all text-base font-medium ml-[12px] font-Roboto',
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
    </>
  )
}
export default ConnectWalletButton

