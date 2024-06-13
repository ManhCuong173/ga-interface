'use client'

import Footer from '@/components/footer'
import MyNFTs from '@/components/profile/my-nfts'
import ProfileInfo from '@/components/profile/profile-info'
import ProfileInfoMobile from '@/components/profile/profile-infor-mobile'
import useGetProfile from '@/hooks/api/useGetProfile'

export default function Profile({ params: { locale } }: { params: { locale: string } }) {
  const { data: profile, refetch } = useGetProfile()

  return (
    <>
      <div className="mt-[67px] bg-[#FAF5F0] px-[16px] lg:px-[50px] pb-16 lg;pb-[186px]">
        <div className="flex flex-col md:flex-row">
          <div
            className="
            sm:w-full
            md:w-1/2
            lg:w-[23%] flex flex-col items-center"
          >
            <ProfileInfoMobile profile={profile} refetch={refetch} />
            <ProfileInfo profile={profile} refetch={refetch} />
          </div>
          <div className="flex-grow py-3 md:py-5">
            <div
              className="
              aspect-[378/170]
              lg:aspect-[1020/108] w-full bg-[url(/images/profile/profile-cover-background.svg)] 
              bg-cover bg-center rounded-[20px] py-5 lg:py-10 px-12 flex justify-center flex-col text-secondary"
            >
              <div
                className="
              -tracking-[0.72px] text-[24px] md:text-[32px] 
              font-semibold leading-[150%] md:-tracking-[-0.96px]"
              >
                My Collection
              </div>
              <div className="font-Roboto tex-sm  md:text-base font-normal leading-[150%] mt-5 max-w-[529px]">
                Dive into my unique collection of lucky and rare NFTs. Explore the distinctive pieces that bring fortune
                and exclusivity, all part of the Golden Apple series. Each NFT is the golden ticket for you to win at
                least 1 BTC and more.
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

