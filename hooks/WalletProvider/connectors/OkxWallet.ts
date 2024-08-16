import { CHAIN_ID } from '@/constants'
import { Balance, BasePropsTransfer, BitcoinAccountWallet, ChainId, Inscription, WalletProvider } from './base'
import { getBalanceByMempool, isTestnet } from './utils'

enum BitcoinNetworkEnum {
  BITCOIN_MAINNET = 'livenet',
  BITCOIN_MAINNET_APP = 'mainnet',
  BITCOIN_TESTNET = 'testnet',
}

type IWalletProvider = {
  call: () => void
  callBacksMap: any
  chainId: ChainId
  connect: () => Promise<BitcoinAccountWallet>
  getAccounts: () => Promise<string[]>
  requestAccounts: () => Promise<void>
  getPublicKey: () => Promise<string>
  getNetwork: () => Promise<string>

  signPsbt: (
    psbt: string,
    options: {
      autoFinalized: boolean
      toSignInputs: {
        index: number
        address: string
      }[]
    },
  ) => Promise<string>
  // amount is 1100000000000. not 1.1
  sendBitcoin: (recipient: string, amount: number) => Promise<any>
  switchNetwork: (network: BitcoinNetworkEnum) => void
  signMessage: (message: string, option?: 'ecdsa' | 'bip322-simple') => string // option with The default value is 'ecdsa'
  on: (event: string, callback: (...args: any) => void) => void
  getBalance: () => Promise<Balance>
  getInscriptions: (offset: number, limit: number) => Promise<Inscription>
}

export class OkxWalletProvider extends WalletProvider<IWalletProvider> {
  public connect = async () => {
    const account = await this.provider.connect()
    return account ? [account.address] : []
  }

  public getAccounts = async (): Promise<BitcoinAccountWallet[]> => {
    const accounts = await (isTestnet(CHAIN_ID) ? this.connect() : this.provider.getAccounts())

    return accounts.map(
      (account): BitcoinAccountWallet => ({
        address: account,
        publicKey: '',
      }),
    )
  }

  public getAccount = async (): Promise<BitcoinAccountWallet> => {
    const account = (await this.getAccounts())?.[0]
    const key = isTestnet(CHAIN_ID) ? (await this.provider.connect())?.publicKey : await this.provider.getPublicKey()

    return {
      ...account,
      publicKey: key,
    }
  }

  public onAccountsChanged = async (callback: (account: BitcoinAccountWallet) => void) => {
    this.provider.on('accountChanged', async (account: BitcoinAccountWallet) => {
      if (account.address) {
        callback(account)
      }
    })
  }

  public getNetwork = async (): Promise<ChainId> => {
    const network = await this.provider.getNetwork()
    return network === BitcoinNetworkEnum.BITCOIN_MAINNET ? ChainId.Mainnet : ChainId.Testnet
  }

  public changeNetwork = async (chainId: ChainId) => {
    // if (isTestnet(CHAIN_ID)) {
    //   alert(chainId)
    //   return this.provider.switchNetwork(
    //     isTestnet(chainId) ? BitcoinNetworkEnum.BITCOIN_TESTNET : BitcoinNetworkEnum.BITCOIN_MAINNET,
    //   )
    // }
  }

  public async getInscriptions(_: string, offset: number, limit: number): Promise<Inscription> {
    const inscription = (await this.provider.getInscriptions(offset, limit)) || {
      total: 0,
      list: [],
    }

    return {
      total: inscription.total,
      list: inscription.list.map((i) => ({
        inscriptionId: i.inscriptionId,
      })),
    }
  }

  public async signMessage(_: string, message: string): Promise<string> {
    const signature = await this.provider.signMessage(message)
    return signature
  }

  public sendBitcoin = async ({ amount, recipient }: BasePropsTransfer): Promise<string> => {
    // amount is 1100000000000. not 1.1
    return this.provider.sendBitcoin(recipient, amount)
  }

  public signPsbt = async (address: string, psbt: string): Promise<string> => {
    const signedPsbt = await this.provider.signPsbt(psbt, {
      autoFinalized: true,
      toSignInputs: [
        {
          index: 0,
          address: address,
        },
        {
          index: 1,
          address: address,
        },
      ],
    })
    return Buffer.from(signedPsbt, 'hex').toString('base64')
  }

  public getBalance = async (address: string): Promise<Balance> => {
    const balance = isTestnet(CHAIN_ID) ? await getBalanceByMempool(address) : await this.provider.getBalance()
    return balance
  }
}
