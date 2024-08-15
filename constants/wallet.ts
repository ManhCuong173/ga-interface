import { isOkxInstalled, isUnisatInstalled } from '@/hooks/WalletProvider/connectors/utils'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'

export type WalletListType = {
  name: string
  connectorKey: WalletBitcoinConnectorEnums
  downloadLink: string
  logo: string
  active: boolean
  get installed(): boolean
}

export const wallets: WalletListType[] = [
  {
    name: 'UniSat',
    connectorKey: WalletBitcoinConnectorEnums.UniSat,
    get installed() {
      return isUnisatInstalled()
    },
    downloadLink: 'https://unisat.io',
    logo: '/images/wallets/unisat-wallet.png',
    active: true,
  },
  {
    name: 'Okx',
    connectorKey: WalletBitcoinConnectorEnums.Okx,
    get installed() {
      return isOkxInstalled()
    },
    downloadLink: 'https://www.okx.com',
    logo: '/images/wallets/okx-wallet.png',
    active: true,
  },
  // {
  //   name: 'Xverse',
  //   connectorKey: WalletBitcoinConnectorEnums.Xverse,
  //   get installed() {
  //     return isXverseInstalled()
  //   },
  //   downloadLink: 'https://www.xverse.app/',
  //   logo: '/images/wallets/xverse-wallet.png',
  //   active: false
  // },
]
