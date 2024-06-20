import { ModalProps } from '@/types/modal'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Trans from '../i18n/Trans'
import WalletItemCard from './WallletItemCard'
import { WalletItemCardProps } from './types'

const MockWallet: WalletItemCardProps[] = [
  {
    name: 'Unisat Wallet',
    logo: '/images/wallets/unisat-wallet.png',
    isDefault: true,
  },
  {
    name: 'Xverse Wallet',
    logo: '/images/wallets/xverse-wallet.png',
  },
]

const WalletModal: React.FC<ModalProps> = ({ isOpen, onClosed }) => {
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
        <Dialog.Panel className={'h-fit bg-white rounded-[8px] lg:w-[362px] lg:h-[400px] p-[40px]'}>
          <div className="flex flex-col items-center justify-center  bg-textPrimary rounded-[8px] overflow-hidden">
            <Image src={'/images/commons/app-logo.png'} width={80} height={80} alt="logo" />
          </div>

          <p className="text-[24px] font-bold text-red-light text-nowrap m-auto mt-6 mb-10">
            <Trans>Connect Your Wallet</Trans>
          </p>

          <div className="gap-[12px] flex flex-col ">
            {MockWallet.map((item, index) => (
              <WalletItemCard {...item} key={index} />
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}

export default WalletModal

