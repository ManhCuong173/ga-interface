'use client'

import { ButtonImage } from '@/components/button'
import WrapperHero from '@/components/home/WrapperHero'

const Banner = () => {
  return (
    <div id="banner" className="snap-center">
      <WrapperHero className="min-h-[52vh] md:min-h-[70vh]" src="/images/home/bg-nft.svg">
        <div className="flex flex-col flex-1">
          <div className="grid grid-rows-[3fr_1fr] flex-1 h-full">
            <div className="flex flex-col flex-1 justify-center  items-center text-secondary">
              <h1 className="w-fit font-semibold tracking-[0.96px] text-xl lg:text-[40px]  text-center">
                GOlden Apple <br className="md:hidden" /> Inscriber
              </h1>

              <div className="mt-6 mb-9 lg:mt-8 lg:mb-12 text-base lg:text-xl leadig-[150%] font-[400] font-Roboto text-center max-w-[76%] sm:max-w-[540px] lg:max-w-[800px]">
                GOlden Apple only charges the service fee for the first 25 inscriptionsins a single inscribing batch
                order, up to a maximum of 1000 inscriptions.
              </div>

              <ButtonImage varirant="outline" className="rounded-xl text-base lg:text-xl font-Roboto border-secondary">
                Guide on Inscribe
              </ButtonImage>
            </div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}
export default Banner
