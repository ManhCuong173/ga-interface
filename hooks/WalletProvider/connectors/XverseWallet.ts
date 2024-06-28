import { CHAIN_ID } from '@/constants'
import { AddressPurpose, BitcoinNetworkType, request, signTransaction } from 'sats-connect'
import {
  Balance,
  BasePropsTransfer,
  BitcoinAccountWallet,
  ChainId,
  Inscription,
  OptionsSignPsbt,
  WalletProvider,
} from './base'
import { getBalanceByMempool, getInscriptionsByAddress, isTestnet } from './utils'

type IWalletProvider = {
  call: () => void
  connect: () => void
  createInscription: () => Promise<void>
  createRepeatInscriptions: () => Promise<void>
  sendBtcTransaction: () => Promise<void>
  signMessage: () => Promise<void>
  signMultipleTransactions: () => Promise<void>
  signTransaction: () => Promise<void>
}

export class XverseWalletProvider extends WalletProvider<IWalletProvider> {
  public connect = async () => {
    return null
  }

  private getAccountsByPurpose = async (purposes: AddressPurpose[]): Promise<BitcoinAccountWallet[]> => {
    const response = await request('getAccounts', {
      purposes: purposes,
    })
    if (response.status === 'success') {
      return response.result
        .map(
          (account) =>
            account?.address && {
              address: account?.address,
              publicKey: account?.publicKey,
            },
        )
        .filter((account) => account) as BitcoinAccountWallet[]
    }
    return []
  }

  public getAccounts = async (): Promise<BitcoinAccountWallet[]> => {
    const accounts = await this.getAccountsByPurpose([AddressPurpose.Payment, AddressPurpose.Ordinals])
    return accounts
  }

  public onAccountsChanged = async (_: (...args: any) => void) => {
    // TODO, xverse do not supported change account
  }

  public getAccount = async (): Promise<BitcoinAccountWallet> => {
    const account = await this.getAccounts()
    return account[0]
  }

  public changeNetwork = async (_: ChainId) => {
    // TODO
  }

  public getNetwork = (): Promise<ChainId> => {
    return new Promise((resolve) => (isTestnet(CHAIN_ID) ? resolve(ChainId.Testnet) : resolve(ChainId.Mainnet)))
  }

  public sendBitcoin = async ({ amount, recipient }: BasePropsTransfer) => {
    const response = await request('sendTransfer', {
      recipients: [
        {
          address: recipient,
          amount: Number(amount),
        },
      ],
    })
    if (response.status === 'success') {
      return response.result.txid
    }
    return ''
  }

  public signPsbt = async (address: string, psbt: string, options: OptionsSignPsbt): Promise<string> => {
    try {
      let responseData = ''
      await signTransaction({
        payload: {
          network: {
            type: BitcoinNetworkType.Testnet,
          },
          psbtBase64: psbt,
          broadcast: true,
          inputsToSign: [
            {
              address,
              signingIndexes: [0, 1],
            },
          ],
          message: 'Sign transaction hello',
        },
        onFinish(response) {},
        onCancel() {},
      })
      return responseData
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  public signMessage = async (address: string, message: string): Promise<string> => {
    const response = await request('signMessage', {
      address: address,
      message: message,
    })
    if (response.status === 'success') {
      return response.result.signature
    }
    return ''
  }

  public getInscriptions = async (address: string, offset: number, limit: number): Promise<Inscription> => {
    const response = await getInscriptionsByAddress({
      address,
      limit,
      offset,
    })
    return response
  }

  public getBalance = async (address: string): Promise<Balance> => {
    const balance = await getBalanceByMempool(address)
    return balance
  }
}

