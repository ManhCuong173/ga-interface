export enum ChainId {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export type BasePropsTransfer = {
  recipient: string
  memo?: string
  amount: number
}
export type Balance = {
  total: number
  confirmed: number
}

export type BitcoinAccountWallet = {
  address: string
  publicKey: string
}

export type Inscription = {
  total: number
  list: {
    inscriptionId: string
  }[]
}

export type OptionsSignPsbt = {
  signInputs: {
    [address: string]: number[]
  }
  allowedSignHash?: number
}

export abstract class WalletProvider<T> {
  public provider: T

  constructor(args: any) {
    this.provider = args
  }

  protected abstract connect(): Promise<any>

  protected abstract getAccounts(): Promise<BitcoinAccountWallet[]>

  protected abstract getAccount(): Promise<BitcoinAccountWallet>

  protected abstract changeNetwork(chainId: ChainId): Promise<void>

  protected abstract getNetwork(): Promise<ChainId>

  // return txId
  // amount is 1100000000000. not 1.1
  protected abstract sendBitcoin(data: BasePropsTransfer): Promise<string>

  // return base64 string
  protected abstract signPsbt(address: string, psbt: string, options?: OptionsSignPsbt): Promise<string>

  protected abstract onAccountsChanged(callBack: (...args: any) => void): void

  protected abstract signMessage(address: string, message: string): Promise<string>

  protected abstract getInscriptions(address: string, offset: number, limit: number): Promise<Inscription>

  protected abstract getBalance(address: string): Promise<Balance>
}

