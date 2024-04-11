'use client'

import { baseURL } from '@/constants/base64'
import useGetPoints from '@/hooks/api/useGetPoints'
import useLinkSocial from '@/hooks/api/useLinkSocial'
import pen from '@/icons/profile/profile-info/pen.svg'
import ic_discord from '@/icons/socials/discord.svg'
import ic_x from '@/icons/socials/x.svg'
import corner from '@/images/profile/corner.svg'
import decor from '@/images/profile/profile-info/decor.png'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import { truncate } from '@/lib/truncate'
import { backend } from '@/services/endpoint/endpoint'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileType } from '../../types/profile'
import { IconCopy } from '../button'
import ButtonConnect from './button/btnconnect'
import ModalEditProfile from './modal/modal-edit-profile'

interface Props {
  profile: ProfileType | undefined
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ProfileType, Error>>
}

export default function ProfileInfo({ profile, refetch }: Props) {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [editFlag, setEditFlag] = useState(false)
  const [profileEdit, setProfileEdit] = useState<ProfileType | undefined>()
  const queryClient = useQueryClient()
  const oauth_token = searchParams.get('oauth_token')
  const oauth_verifier = searchParams.get('oauth_verifier')
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  // const dispatch = useAppDispatch();
  //get points
  const { data: point } = useGetPoints()

  const { bindDiscord, bindTwitter, removeDiscord, removeX } = useLinkSocial({ refetch })

  const remove = (key1: string, key2: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(key1)
    current.delete(key2)
    const search = current.toString()
    const query = search ? `?${search}` : ''
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
      router.push(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${backend}/authentication/twitter`)
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
      router.push(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${backend}/authentication/discord`)
      window.localStorage.setItem('address', address)
    }
  }

  const editProfileClicked = () => {
    setProfileEdit(profile)
    setEditFlag(true)
  }

  return (
    <div className='relative hidden h-fit w-[303.305693px] translate-y-[-116px] flex-col items-center gap-16 bg-white px-[40px] py-6 lg:flex'>
      <Image
        src={corner}
        alt=''
        width={39.25}
        height={37.93}
        className='absolute left-[13.22px] top-[14.71px]'
      />
      <Image
        src={corner}
        alt=''
        width={39.25}
        height={37.93}
        className='absolute right-[13.22px] top-[14.71px] -scale-x-100'
      />
      <div className='flex w-[250px] flex-col gap-[14px] overflow-hidden'>
        <div className='mx-auto h-[160px] w-[160px] overflow-hidden rounded-full border-4 border-line'>
          {profile?.avatar ? (
            <Image
              src={profile.avatar}
              alt='avatar'
              className='h-full w-full'
              width={0}
              height={0}
              sizes='100vw'
              placeholder='blur'
              blurDataURL={baseURL}
            />
          ) : (
            <div className='mx-auto h-full w-full bg-red-500'></div>
          )}
        </div>
        <div className='flex flex-col items-center gap-6'>
          <div className='space-y-2'>
            <h2 className='w-[250px] truncate text-center text-2xl font-medium leading-8 tracking-[-2%] text-black'>
              {profile?.name || 'Unknown Name'}
            </h2>
            {/* <div className='flex h-fit items-center justify-center gap-2 text-xs font-light leading-[18px] tracking-[-3%] text-text-black'>
              <span> {truncate(address, 13, '...')}</span>
              <IconCopy text={address} />
            </div> */}
          </div>
          <div className='flex h-[60px] w-[202px] items-center justify-center gap-2 bg-[url(/images/profile/profile-info/point.png)] bg-full'>
            <span className='text-[20px] font-medium leading-6 tracking-[-2%] text-[#EF232C]'>
              {point}
            </span>
            <span className='text-base font-medium leading-6 tracking-[-2%] text-text-sub'>
              POINTS
            </span>
          </div>
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
      </div>
      <p className='max-w-[250px] text-wrap break-words text-center text-sm font-light leading-5 tracking-[-3%] text-black1'>
        {profile?.bio}
      </p>
      <Image src={decor} alt='' className='w-full' />
      <div className='flex flex-col space-y-3'>
        {(profile?.twitter_connect || profile?.discord_connect) && (
          <div className='text-left text-xs font-light leading-[18px] text-text-sub'>
            Connected accounts
          </div>
        )}
        <ButtonConnect
          status={profile?.twitter_connect}
          icon={ic_x}
          text={profile?.twitter_connect ? profile.twitter_username : 'connect x'}
          onClick={connectTwitter}
        />
        <ButtonConnect
          icon={ic_discord}
          status={profile?.discord_connect}
          text={profile?.discord_connect ? profile.discord_username : 'connect discord'}
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
        profile={profileEdit}
        queryClient={queryClient}
      />
    </div>
  )
}
