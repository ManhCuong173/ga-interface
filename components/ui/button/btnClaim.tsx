import { useWalletBitcoinProviderByWallet } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { claimService } from '@/services/claim.service'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface PropsBtnClaim {
  round: number
  walletAddress: string
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
  isCompleted: boolean | undefined
  lucky_number: string
  inscriptionId: string
}

const BtnClaim = ({ round, refetch, isCompleted, inscriptionId }: PropsBtnClaim) => {
  const addressOwner = useAppSelector(selectAddress)
  const public_key = useAppSelector(selectedPublicKey)
  const provider = useWalletBitcoinProviderByWallet()

  const [isClaim, setIsClaim] = useState(false)

  const handleGetSignature = async () => {
    try {
      if (!provider) return ''

      const res = await provider.signMessage(addressOwner, inscriptionId)
      return res
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message)
        toast.error(err.response?.data.message)
      }
    }
    return ''
  }
  const handleGetTxInscription = async (): Promise<string[]> => {
    try {
      if (!provider) return []

      const res = await provider.getInscriptions(addressOwner, 0, 10)
      const list = await res.list.map((inscription) => {
        return inscription.inscriptionId
      })
      return list
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const verifyClaim = async (
    id_inscription: string,
    list_txid_inscription: Array<string>,
    public_key: string,
    round: number,
    signature: string,
    wallet_address: string,
  ) => {
    const res = await claimService.claimVerify({
      id_inscription,
      list_txid_inscription,
      public_key,
      round,
      signature,
      wallet_address,
    })
    if (res.status === 200) {
      return res.data.psbt_claim
    }
  }

  const disable = isCompleted

  const handleRewardClaim = async (psbt_claim: string, psbt_claim_sign: string) => {
    if (!psbt_claim || !psbt_claim_sign) return
    const res = await claimService.claimReward({
      psbt_claim,
      psbt_claim_sign,
    })
    return res
  }

  const handleClaim = async () => {
    try {
      setIsClaim(true)
      const signature = await handleGetSignature()
      const list_txid_inscription = await handleGetTxInscription()
      const psbt_claim = await verifyClaim(
        inscriptionId,
        list_txid_inscription,
        public_key,
        round,
        signature,
        addressOwner,
      )

      if (!psbt_claim || !provider) return

      const psbt_claim_sign = await provider.signPsbt(addressOwner, psbt_claim, {
        signInputs: {
          address: [0],
        },
      })

      if (!psbt_claim_sign) return

      const res = await handleRewardClaim(psbt_claim, String(psbt_claim_sign))
      if (res?.status === 200) {
        refetch()
        setIsClaim(false)
      }
      return
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message)
        toast.error(err.response?.data.message)
      }
      setIsClaim(false)
    }
  }

  return (
    <button
      disabled={disable}
      onClick={handleClaim}
      className={` ${disable && 'opacity-50'} shadow-[box-shadow:_0px_5px_8px_0px_#00000026] flex items-center justify-center rounded bg-red-light px-4 py-1.5 text-xs font-medium leading-5 text-[#FFF5EB]`}
    >
      {isClaim ? 'Claiming' : 'Claim'}
    </button>
  )
}

export default BtnClaim
