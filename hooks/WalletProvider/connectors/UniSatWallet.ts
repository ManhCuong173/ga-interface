import { Balance, BasePropsTransfer, BitcoinAccountWallet, ChainId, Inscription, WalletProvider } from './base'
import { isTestnet } from './utils'

enum BitcoinNetworkEnum {
  BITCOIN_MAINNET = 'livenet',
  BITCOIN_MAINNET_APP = 'mainnet',
  BITCOIN_TESTNET = 'testnet',
}

type IWalletProvider = {
  call: () => void
  callBacksMap: any
  chainId: ChainId
  connect: () => void
  getAccounts: () => Promise<string[]>
  requestAccounts: () => Promise<void>
  getPublicKey: () => Promise<string>
  getNetwork: () => Promise<string>

  signPsbt: (psbt: string) => Promise<string>
  // amount is 1100000000000. not 1.1
  sendBitcoin: (recipient: string, amount: number) => Promise<any>
  switchNetwork: (network: BitcoinNetworkEnum) => void
  signMessage: (message: string) => string
  on: (event: string, callback: (...args: any) => void) => void
  getBalance: (address: string) => Promise<Balance>
  getInscriptions: (offset: number, limit: number) => Promise<Inscription>
}

export class UniSatWalletProvider extends WalletProvider<IWalletProvider> {
  public connect = async () => {
    return this.provider.requestAccounts()
  }

  public getAccounts = async (): Promise<BitcoinAccountWallet[]> => {
    const accounts = await this.provider.getAccounts()
    return accounts.map(
      (account): BitcoinAccountWallet => ({
        address: account,
        publicKey: '',
      }),
    )
  }

  public getAccount = async (): Promise<BitcoinAccountWallet> => {
    const account = (await this.getAccounts())?.[0]
    const key = await this.provider.getPublicKey()

    return {
      ...account,
      publicKey: key,
    }
  }

  public onAccountsChanged = async (callback: (account: BitcoinAccountWallet) => void) => {
    this.provider.on('accountsChanged', async () => {
      const account = await this.getAccount()
      callback(account)
    })
  }

  public getNetwork = async (): Promise<ChainId> => {
    const network = await this.provider.getNetwork()
    return network === BitcoinNetworkEnum.BITCOIN_MAINNET ? ChainId.Mainnet : ChainId.Testnet
  }

  public changeNetwork = async (chainId: ChainId) => {
    return this.provider.switchNetwork(
      isTestnet(chainId) ? BitcoinNetworkEnum.BITCOIN_TESTNET : BitcoinNetworkEnum.BITCOIN_MAINNET,
    )
  }

  public getInscriptions(_: string, offset: number, limit: number): Promise<Inscription> {
    return this.provider.getInscriptions(offset, limit)
  }

  public async signMessage(_: string, message: string): Promise<string> {
    const signature = await this.provider.signMessage(message)
    return signature
  }

  public sendBitcoin = async ({ amount, recipient }: BasePropsTransfer): Promise<string> => {
    // amount is 1100000000000. not 1.1
    return this.provider.sendBitcoin(recipient, amount)
  }

  public signPsbt = async (_: string, psbt: string): Promise<string> => {
    const signedPsbt = await this.provider.signPsbt(psbt)
    return Buffer.from(signedPsbt, 'hex').toString('base64')
  }

  public getBalance = async (_: string): Promise<Balance> => {
    const account = await this.getAccount()
    const balance = await this.provider.getBalance(account.address)
    return balance
  }
}

