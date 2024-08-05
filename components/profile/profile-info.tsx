'use client'

import { baseURL } from '@/constants/base64'
import useGetPoints from '@/hooks/api/useGetPoints'
import useLinkSocial from '@/hooks/api/useLinkSocial'
import pen from '@/icons/profile/profile-info/pen.svg'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { backend } from '@/services/endpoint/endpoint'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileType } from '../../types/profile'
import Trans from '../i18n/Trans'
import { useGATranslation } from '../i18n/hooks'
import ButtonConnect from './button/btnconnect'
import ModalEditProfile from './modal/modal-edit-profile'
import { DiscordIcon, TwitterIcon } from '../svgs'

interface Props {
  profile: ProfileType | undefined
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ProfileType, Error>>
}

export default function ProfileInfo({ profile, refetch }: Props) {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)
  const router = useRouter()
  const searchParams = useSearchParams()
  const oauth_token = searchParams.get('oauth_token')
  const oauth_verifier = searchParams.get('oauth_verifier')
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const pathname = usePathname()
  const [editFlag, setEditFlag] = useState(false)
  const [profileEdit, setProfileEdit] = useState<ProfileType | undefined>()
  const queryClient = useQueryClient()
  const { data: point } = useGetPoints()
  const t = useGATranslation()

  const { bindDiscord, bindTwitter, removeDiscord, removeX } = useLinkSocial({ refetch })

  const remove = (key1: string, key2: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(key1)
    current.delete(key2)
    router.push(`${pathname}`)
  }
  useEffect(() => {
    if (oauth_token && oauth_verifier && publicKey && address) {
      bindTwitter(oauth_token, oauth_verifier)
    }
  }, [oauth_token, oauth_verifier])

  useEffect(() => {
    if (code && state && oauth_verifier && publicKey && address) {
      bindDiscord(code, state)
    }
  }, [code, state])

  const connectTwitter = () => {
    if (profile?.twitter_connect) {
      remove(String(oauth_token), String(oauth_verifier))
      removeX()

      return
    }
    // router.push(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authentication/twitter`);
    if (typeof window !== 'undefined') {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/${backend}/authentication/twitter`)
      window.localStorage.setItem('address', address)
    }
  }
  const connectDiscord = () => {
    if (profile?.discord_connect) {
      removeDiscord()
      remove(String(code), String(state))
      return
    }
    if (typeof window !== 'undefined') {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/${backend}/authentication/discord`)
      window.localStorage.setItem('address', address)
    }
  }

  const editProfileClicked = () => {
    setProfileEdit(profile)
    setEditFlag(true)
  }

  return (
    <div
      className="
        relative hidden h-fit lg:w-[220px]  
        flex-col items-center 
        md:flex md:pt-10
    "
    >
      <div className="flex w-full flex-col gap-[14px] overflow-hidden">
        <div className="mx-auto h-[160px] w-[160px] overflow-hidden rounded-full border-4 border-bgAlt">
          {profile?.avatar ? (
            <Image
              src={profile.avatar}
              alt="avatar"
              className="h-full w-full"
              width={0}
              height={0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={baseURL}
            />
          ) : (
            <div className="mx-auto h-full w-full bg-red-500"></div>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="space-y-2">
            <h2 className="w-[250px] truncate text-center text-lg font-medium leading-8 tracking-[-2%] text-black font-Roboto">
              {profile?.name || <Trans>Unknown Name</Trans>}
            </h2>
          </div>
          <div className="flex h-[36px] w-[129px] items-center justify-center gap-2 bg-full border-bgAlt border-[1px] border-solid py-[6px] px-[18px] rounded-[100px]">
            <span className="text-[20px] font-medium leading-6 tracking-[-2%] text-[#EF232C]">{point}</span>
            <span className="text-base font-medium leading-6 tracking-[-2%] text-text-sub ">
              <Trans>Points</Trans>
            </span>
          </div>
        </div>
        <button
          onClick={editProfileClicked}
          className="mx-auto flex h-10 w-fit items-center mt-[19p] hover:text-[#7E6238] text-text-secondary"
        >
          <span className="text-sm font-medium leading-5 tracking-[-3%]  font-Roboto">
            <Trans>Edit Profile</Trans>
          </span>
          <Image src={pen} alt="" width={16} height={16} className="ml-2 hover:fill-[#7E6238] hover:stroke-[#7E6238]" />
        </button>
      </div>
      <p
        className="w-full md:max-w-[220px] text-wrap 
      break-words text-center text-base 
      leading-[150%] font-light tracking-[-3%] 
      text-black1 mt-[39px] font-Roboto "
      >
        {profile?.bio || <Trans>DefaultBio</Trans>}
      </p>
      {!profile?.twitter_connect && !profile?.discord_connect && (
        <div className="flex flex-col lg:w-[170px] mt-[120px]">
          <div className="flex flex-col items-center space-y-4">
            <ButtonConnect
              status={profile?.twitter_connect}
              icon={<TwitterIcon />}
              text={profile?.twitter_connect ? profile.twitter_username : useGATranslation()('Connect X')}
              onClick={connectTwitter}
              className="border-[1px] border-solid border-bgAlt rounded-[10px] w-[200px] text-text-secondary text-base font-Roboto hover:bg-red-light hover:text-white hover:border-red-light [&>svg]:hover:text-white"
            />
            <ButtonConnect
              status={profile?.discord_connect}
              icon={<DiscordIcon />}
              text={profile?.discord_connect ? profile.discord_username : useGATranslation()('Connect Discord')}
              onClick={connectDiscord}
              className="border-[1px] border-solid border-bgAlt rounded-[10px] w-[200px] text-text-secondary text-base font-Roboto hover:bg-red-light hover:text-white hover:border-red-light [&>svg]:hover:text-white"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-3">
        {(profile?.twitter_connect || profile?.discord_connect) && (
          <div className="text-left text-xs font-light leading-[18px] text-text-sub">Connected accounts</div>
        )}
      </div>
      <ModalEditProfile
        open={editFlag}
        handleClose={() => {
          setEditFlag(false)
        }}
        refetch={refetch}
        publickey={publicKey}
        wallet_address={address}
        profile={profileEdit}
        queryClient={queryClient}
      />
    </div>
  )
}
