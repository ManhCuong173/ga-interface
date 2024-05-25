import { baseURL } from '@/constants/base64'
import useGetPoints from '@/hooks/api/useGetPoints'

import useLinkSocial from '@/hooks/api/useLinkSocial'
import pen from '@/icons/profile/profile-info/pen.svg'
import ic_discord from '@/icons/socials/discord.svg'
import ic_x from '@/icons/socials/x.svg'
import { setProfile } from '@/lib/features/profile/profile.slice'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileType } from '../../types/profile'
import ButtonConnect from './button/btnconnect'
import ModalEditProfile from './modal/modal-edit-profile'
interface PropsProfile {
  profile: ProfileType | undefined
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileType, Error>>
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
    <div className="flex w-full flex-col justify-center gap-1 pt-20 md:hidden">
      <div className="flex">
        <div className="w-[100px]">
          <div className="mx-auto h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-bgAlt">
            {profile?.avatar ? (
              <Image
                src={profile.avatar}
                alt="avatar"
                className="h-full w-full"
                width={0}
                height={0}
                fill
                blurDataURL={baseURL}
              />
            ) : (
              <div className="mx-auto h-full w-full bg-red-500"></div>
            )}
          </div>
          <button onClick={editProfileClicked} className=" flex h-10 w-fit items-center mt-[19p]">
            <span className="text-sm font-medium leading-5 tracking-[-3%] text-text-secondary font-Roboto">
              Edit Profile
            </span>
            <Image src={pen} alt="" width={16} height={16} className="ml-2" />
          </button>
        </div>
        <div className="flex flex-col ml-4">
          <h2 className='h2 className="w-[250px] truncate  text-lg font-medium leading-8 tracking-[-2%] text-black font-Roboto'>
            {profile?.name || 'Unknown name '}
          </h2>
          <div className="flex h-[36px] w-[129px] items-center justify-center gap-2 bg-full border-bgAlt border-[1px] border-solid py-[6px] px-[18px] rounded-[100px]">
            <span className="text-[20px] font-medium leading-6 tracking-[-2%] text-[#EF232C]">{point}</span>
            <span className="text-base font-medium leading-6 tracking-[-2%] text-text-sub ">Points</span>
          </div>
        </div>
      </div>

      <p className="w-full break-words text-md font-light leading-5 tracking-[-3%] text-black1 font-Roboto">
        {profile?.bio}
      </p>
      <div className="flex justify-between items-center gap-3 my-5">
        <ButtonConnect
          className="text-base font-medium leading-[130%] font-Roboto text-text-secondary"
          status={profile?.twitter_connect}
          icon={ic_x}
          text={profile?.twitter_connect ? profile.twitter_username : 'Connect X'}
          onClick={connectTwitter}
        />
        <ButtonConnect
          className="text-base font-medium leading-[130%] font-Roboto text-text-secondary"
          status={profile?.discord_connect}
          icon={ic_discord}
          text={profile?.discord_connect ? profile.discord_username : 'Connect Discord'}
          onClick={connectDiscord}
        />
      </div>
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

