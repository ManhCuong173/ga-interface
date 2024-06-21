import { isUnisatInstalled, isXverseInstalled } from '@/hooks/WalletProvider/connectors/utils'
import { WalletBitcoinConnectorEnums } from '@/hooks/WalletProvider/useWalletBitcoinProviders'

export const wallets = [
  {
    name: 'UniSat',
    connectorKey: WalletBitcoinConnectorEnums.UniSat,
    get installed() {
      return isUnisatInstalled()
    },
    downloadLink: 'https://unisat.io',
    logo: '/images/wallets/unisat-wallet.png',
  },
  {
    name: 'Xverse',
    connectorKey: WalletBitcoinConnectorEnums.Xverse,
    get installed() {
      return isXverseInstalled()
    },
    downloadLink: 'https://www.xverse.app/',
    logo: '/images/wallets/xverse-wallet.png',
  },
]
