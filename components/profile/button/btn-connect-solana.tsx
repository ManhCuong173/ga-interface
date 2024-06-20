import { useWalletBitcoinProviderByWallet } from '@/hooks/WalletProvider/useWalletBitcoinProviders'
import icSolana from '@/icons/ic-solana.svg'
import ic_line from '@/icons/socials/line.svg'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { profileService } from '@/services/profile.service'
import { ProfileType } from '@/types/profile'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'

interface PropsSolana {
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileType, Error>>
  isConnected: boolean | undefined
  solana_wallet: string | undefined
  className?: string
}

const ButtonConnectSolana = ({ refetch, isConnected, solana_wallet, className }: PropsSolana) => {
  const wallet_address = useAppSelector(selectAddress)
  const publicKeyUnisat = useAppSelector(selectedPublicKey)
  const { publicKey: publicKeySolana, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const provider = useWalletBitcoinProviderByWallet()

  const signMessage = async (solanaWallet: string | undefined) => {
    try {
      if (!provider || !solanaWallet) return undefined

      let res = await provider.signMessage(wallet_address, solanaWallet)
      return res
    } catch (e) {
      console.log(e)
    }
  }

  const handleProfileBindData = async () => {
    const signature = await signMessage(publicKeySolana?.toBase58())

    const res = await profileService.bindSolana({
      public_key: publicKeyUnisat,
      signature,
      solana_wallet: publicKeySolana?.toBase58(),
      wallet_address: wallet_address,
    })
    if (res.status === 200) {
      refetch()
    }
    return res
  }
  const handleProfileRemoveSolana = async () => {
    const signature = await signMessage(solana_wallet)
    const res = await profileService.removeSolana({
      public_key: publicKeyUnisat,
      wallet_address: wallet_address,
      solana_wallet: solana_wallet,
      signature,
    })
    if (res.status === 200) {
      refetch()
    }
  }

  const { mutate: bindSolana } = useMutation({
    mutationFn: handleProfileBindData,
    mutationKey: ['bindSolana', publicKeySolana],
  })

  const { mutate: removeSolana } = useMutation({
    mutationFn: handleProfileRemoveSolana,
    mutationKey: ['removeSolana', publicKeyUnisat, wallet_address],
  })

  const connect = () => {
    setVisible(true)
  }

  const handleDisconnect = () => {
    disconnect()
    removeSolana()
  }

  useEffect(() => {
    if (publicKeySolana?.toBase58() && isConnected !== undefined && !isConnected) {
      bindSolana()
    }
  }, [publicKeySolana, bindSolana, isConnected])

  return (
    <>
      {!isConnected ? (
        <button
          onClick={connect}
          className={`${className} box-border flex h-10 w-[250px] items-center justify-center gap-2 rounded-full border border-[#E5E4E3] px-4 py-2 text-sm font-light`}
        >
          <Image src={icSolana} alt="solana" />
          <span className="">Connect Solana</span>
        </button>
      ) : (
        <button
          onClick={handleDisconnect}
          className={`${className} box-border flex h-10 w-[250px] items-center justify-center gap-2 rounded-full border border-[#E5E4E3] px-4 py-2 text-sm font-light`}
        >
          <p className="flex items-center space-x-2">
            <Image src={icSolana} alt="solana" />
            <Image src={ic_line} alt="iconLine" />
            <span className="">{solana_wallet?.slice(0, 6) + '...' + solana_wallet?.slice(-4)}</span>
          </p>

          <span className="text-xs font-light text-[#D4C79C] ">Remove</span>
        </button>
      )}
    </>
  )
}

export default ButtonConnectSolana
