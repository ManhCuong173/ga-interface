'use client'

import Footer from '@/components/footer'
import MyNFTs from '@/components/profile/my-nfts'
import ProfileInfo from '@/components/profile/profile-info'
import ProfileInfoMobile from '@/components/profile/profile-infor-mobile'
import useGetProfile from '@/hooks/api/useGetProfile'
import banner from '@/images/profile/banner.png'
import Image from 'next/image'

export default function Profile() {
  //get profile information
  const { data: profile, refetch } = useGetProfile()

  return (
    <>
      <div className='mt-[67px] bg-[#FAF5F0]'>
        <div className='relative h-[225.61px] w-full'>
          {profile?.cover ? (
            <Image
              fill
              src={String(profile?.cover)}
              loader={() => String(profile?.cover)}
              width={0}
              height={0}
              sizes='100vw'
              alt='background'
              objectFit='cover'
              objectPosition='center'
              className='h-full w-full'
              priority
            />
          ) : (
            <Image src={banner} alt='banner' objectFit='cover' fill objectPosition='center' />
          )}

          <div className='absolute -bottom-[65%] left-1/2 block h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-[#D4C79C] lg:hidden'>
            {profile?.avatar ? (
              <Image
                src={profile.avatar}
                alt='avatar'
                className='h-full w-full'
                width={0}
                height={0}
                sizes='100vw'
              />
            ) : (
              <div className='h-full w-full rounded-full bg-red-500'></div>
            )}
          </div>
        </div>
        <div className='mx-auto flex w-full max-w-container flex-col lg:gap-10 bg-[#faf5ef] px-6 lg:flex-row'>
          <ProfileInfoMobile profile={profile} refetch={refetch} />
          <ProfileInfo profile={profile} refetch={refetch} />
          <div className='flex-1'>
            <MyNFTs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
