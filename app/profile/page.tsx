'use client'

import Footer from '@/components/footer'
import MyNFTs from '@/components/profile/my-nfts'
import ProfileInfo from '@/components/profile/profile-info'
import ProfileInfoMobile from '@/components/profile/profile-infor-mobile'
import useGetProfile from '@/hooks/api/useGetProfile'

export default function Profile() {
  const { data: profile, refetch } = useGetProfile()

  return (
    <>
      <div className="mt-[67px] bg-[#FAF5F0] px-[60px]">
        <div className="flex">
          <div
            className="
            w-full
            lg:w-[23%]"
          >
            <ProfileInfoMobile profile={profile} refetch={refetch} />
            <ProfileInfo profile={profile} refetch={refetch} />
          </div>
          <div className="flex-grow py-5">
            <div className="aspect-[1020/108] w-full bg-[url(/images/profile/profile-cover-background.svg)] bg-cover bg-center rounded-[20px] py-10 px-12 flex justify-center flex-col text-secondary">
              <div className="text-[32px] font-semibold leading-[150%] -tracking-[-0.96px]">My Collection</div>
              <div className="font-Roboto text-base font-normal leading-[150%] mt-5 max-w-[529px]">
                The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens
                (NFTs). Buy, sell, and discover exclusive digital items.
              </div>
            </div>
            <MyNFTs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
