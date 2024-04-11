import useGetPoints from '@/hooks/api/useGetPoints'
import useLinkSocial from '@/hooks/api/useLinkSocial'
import pen from '@/icons/profile/profile-info/pen.svg'
import ic_discord from '@/icons/socials/discord.svg'
import ic_x from '@/icons/socials/x.svg'
import decor from '@/images/profile/profile-info/decor.png'
import { setProfile } from '@/lib/features/profile/profile.slice'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { sliceAddress } from '@/lib/utils'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileType } from '../../types/profile'
import { IconCopy } from '../button'
import ButtonConnect from './button/btnconnect'
import ModalEditProfile from './modal/modal-edit-profile'
interface PropsProfile {
  profile: ProfileType | undefined
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ProfileType, Error>>
}

const ProfileInfoMobile = ({ profile, refetch }: PropsProfile) => {
  const router = useRouter()
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [editFlag, setEditFlag] = useState(false)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const oauth_token = searchParams.get('oauth_token')
  const oauth_verifier = searchParams.get('oauth_verifier')
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const { bindDiscord, bindTwitter, removeDiscord, removeX } = useLinkSocial({ refetch })
  const { data: point } = useGetPoints()

  const remove = (key1: string, key2: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(key1)
    current.delete(key2)
    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  const connectTwitter = () => {
    if (profile?.twitter_connect) {
      remove(String(oauth_token), String(oauth_verifier))
      removeX()
      return
    }
    router.push(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authentication/twitter`)
  }
  const connectDiscord = () => {
    if (profile?.discord_connect) {
      removeDiscord()
      return
    }
    router.push(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authentication/discord`)
  }

  useEffect(() => {
    if (oauth_token && oauth_verifier && publicKey && address && !profile?.twitter_connect) {
      bindTwitter(oauth_token, oauth_verifier)
    }
    if (code && state && publicKey && address && !profile?.discord_connect) {
      bindDiscord(code, state)
    }
  }, [
    oauth_token,
    oauth_verifier,
    code,
    state,
    publicKey,
    address,
    bindDiscord,
    bindTwitter,
    profile?.discord_connect,
    profile?.twitter_connect,
  ])

  const editProfileClicked = () => {
    dispatch(setProfile(profile))
    setEditFlag(true)
  }

  return (
    <div className='flex w-full flex-col justify-center gap-4 pt-20 lg:hidden'>
      <h2 className='mx-auto w-[250px] truncate text-center text-2xl font-medium leading-8 tracking-[-2%] text-black'>
        {profile?.name || 'Unknown name '}
      </h2>
      {/* <div className='flex h-fit items-center justify-center gap-2 text-xs font-light leading-[18px] tracking-[-3%] text-text-black'>
        <span> {sliceAddress(profile?.wallet_address)}</span>
        <IconCopy text={String(profile?.wallet_address)} />
      </div> */}
      <div className='flex items-center justify-center gap-2'>
        <span className='text-[20px] font-medium leading-6 tracking-[-2%] text-[#EF232C]'>
          {point || 0}
        </span>
        <span className='text-base font-medium leading-6 tracking-[-2%] text-text-sub'>POINTS</span>
      </div>
      <button
        onClick={editProfileClicked}
        className='mx-auto flex h-10 w-fit items-center gap-2 rounded-full border border-line px-4'
      >
        <Image src={pen} alt='' width={24} height={24} />
        <span className='text-sm font-light leading-5 tracking-[-3%] text-black1'>
          Edit Profile
        </span>
      </button>
      <p className='w-full break-words text-center text-sm font-light leading-5 tracking-[-3%] text-black1'>
        {profile?.bio}
      </p>
      <div className='flex flex-col items-center space-y-4'>
        <ButtonConnect
          className='bg-[#fff]'
          status={profile?.twitter_connect}
          icon={ic_x}
          text={profile?.twitter_connect ? profile.twitter_username : 'connect x'}
          onClick={connectTwitter}
        />
        <ButtonConnect
          className='bg-[#fff]'
          status={profile?.discord_connect}
          icon={ic_discord}
          text={profile?.discord_connect ? profile.discord_username : 'connect discord'}
          onClick={connectDiscord}
        />
      </div>
      <Image src={decor} alt='' className='mx-auto w-[180px]' />
      <ModalEditProfile
        open={editFlag}
        handleClose={() => {
          setEditFlag(false)
        }}
        refetch={refetch}
        publickey={publicKey}
        wallet_address={address}
        profile={profile}
        queryClient={queryClient}
      />
    </div>
  )
}

export default ProfileInfoMobile
