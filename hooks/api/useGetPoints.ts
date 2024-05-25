import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { profileService } from '@/services/profile.service'
import { useQuery } from '@tanstack/react-query'

const useGetPoints = () => {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)

  const getPoints = async () => {
    const res = await profileService.getPoints({
      publickey: publicKey,
      wallet_address: address,
    })
    return res.data.point
  }

  return useQuery({
    queryKey: ['points', publicKey, address],
    queryFn: getPoints,
    enabled: !!address && !!publicKey,
    refetchIntervalInBackground: true,
  })
}

export default useGetPoints
