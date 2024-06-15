import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { profileService } from '@/services/profile.service'
import { ProfileType } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const useGetProfile = () => {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)

  const getProfileInformation = async () => {
    const { data }: AxiosResponse<ProfileType> = await profileService.getProfileInfo({
      publickey: publicKey,
      wallet_address: address,
    })
    const { data: nftAssets }: AxiosResponse<ProfileType> = await profileService.getProfileAssets(address)

    return data
  }

  return useQuery({
    queryKey: ['profile', address, publicKey],
    queryFn: getProfileInformation,
    enabled: !!address && !!publicKey,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
  })
}

export default useGetProfile

