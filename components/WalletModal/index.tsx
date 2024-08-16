import { wallets } from '@/constants/wallet'
import { useLatestWallet } from '@/hooks/WalletProvider/useLatestWallet'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { cn } from '@/lib/utils'
import { ModalProps } from '@/types/modal'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Trans from '../i18n/Trans'
import WalletItemCard from './WallletItemCard'

const WalletModal: React.FC<ModalProps & { onSelect: (wallet: WalletBitcoinConnectorEnums) => void }> = ({
  isOpen,
  onClosed,
  onSelect,
}) => {
  const wallet = useLatestWallet()

  return (
    <Transition
      show={isOpen}
      enter="duration-400 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        onClose={onClosed}
        className={'fixed inset-0 bg-black/70 w-full flex justify-center  items-center overflow-auto z-40'}
      >
        <Dialog.Panel className={'h-fit bg-white rounded-[8px] lg:w-[362px] lg:min-h-[320px] p-[40px]'}>
          <div className="flex flex-col items-center justify-center  bg-textPrimary rounded-[8px] overflow-hidden">
            <Image src={'/images/commons/app-logo.png'} width={80} height={80} alt="logo" />
          </div>

          <p className="text-[24px] font-bold text-red-light text-nowrap m-auto mt-6 mb-10">
            <Trans>Connect Your Wallet</Trans>
          </p>

          <div className={cn('gap-[12px] flex flex-col')}>
            {wallets.map((item, index) => (
              <div className="relative" key={item.connectorKey}>
                <WalletItemCard
                  onSelect={() => {
                    if (!item.active) return
                    onSelect(item.connectorKey)
                  }}
                  isSelected={wallet === item.connectorKey}
                  {...item}
                  key={index}
                />
                {!item.active && (
                  <div
                    className="absolute w-full h-full z-10 
              left-0 top-0 bottom-0 right-0 
              text-base font-medium 
              bg-black/50  rounded-lg 
              flex items-center justify-center text-white
              cursor-not-allowed pointer-event-none
              "
                  >
                    Maintenance
                  </div>
                )}
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}

export default WalletModal
