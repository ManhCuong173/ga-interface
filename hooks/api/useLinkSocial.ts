import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { profileService } from '@/services/profile.service'
import { ProfileType } from '@/types/profile'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'


interface Props {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ProfileType, Error>>
}

const useLinkSocial = ({ refetch }: Props) => {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)

  const queryClient = useQueryClient()

  const bindDiscord = useCallback(
    async (code: string, state: string) => {
      try {
        const res = await profileService.bindDiscord({
          code,
          state,
          publickey: publicKey,
          wallet_address: address,
        })
        if (res.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ['points', publicKey, address],
          })
          refetch();
        }
        return res
      } catch (err) {
        console.log('--err bind discord: ', err)
      }
    },
    [publicKey, address, queryClient],
  )

  const bindTwitter = useCallback(
    async (oauth_token: string, oauth_verifier: string) => {
      try {
        const res = await profileService.bindTwitter({
          oauth_token,
          oauth_verifier,
          publickey: publicKey,
          wallet_address: address,
        })
        if (res.status === 200) {
          // queryClient.invalidateQueries({
          //   queryKey: ['profile', publicKey, address],
          // })
          queryClient.invalidateQueries({
            queryKey: ['points', publicKey, address],
          })
          refetch();
        }
        return res
      } catch (err) {
        console.log('---error bind twitter: ', err)
      }
    },
    [publicKey, address, queryClient],
  )

  const removeX = useCallback(async () => {
    const res = await profileService.removeTwitter({
      publickey: publicKey,
      wallet_address: address,
    })
    if (res.status === 200) {
      queryClient.invalidateQueries({
        queryKey: ['profile', address, publicKey],
      })
      queryClient.invalidateQueries({
        queryKey: ['points', publicKey, address],
      })
    }
    return res
  }, [publicKey, address, queryClient])

  const removeDiscord = useCallback(async () => {
    const res = await profileService.removeDiscord({
      publickey: publicKey,
      wallet_address: address,
    })
    if (res.status === 200) {
      queryClient.invalidateQueries({
        queryKey: ['profile', publicKey, address],
      })
      refetch();
      queryClient.invalidateQueries({
        queryKey: ['points', publicKey, address],
      })
    }
    return res
  }, [publicKey, address, queryClient])

  return useMemo(() => {
    return {
      bindDiscord,
      bindTwitter,
      removeX,
      removeDiscord,
    }
  }, [bindDiscord, bindTwitter, removeX, removeDiscord])
}

export default useLinkSocial
