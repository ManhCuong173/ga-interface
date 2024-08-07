'use client'

import { ButtonImage } from '@/components/button'
import WrapperHero from '@/components/home/WrapperHero'
import Trans from '@/components/i18n/Trans'
import { useGATranslation } from '@/components/i18n/hooks'
import { useState } from 'react'

const Banner = () => {
  const [isPresentOpenInscribeGuildModal, setOpenInscribeGuiidModal] = useState(false)
  const t = useGATranslation()

  return (
    <div id="banner" className="snap-center">
      <WrapperHero className="min-h-[52vh] md:min-h-[70vh]" src="/images/home/bg-nft.svg">
        <div className="flex flex-col flex-1">
          <div className="grid grid-rows-[3fr_1fr] flex-1 h-full">
            <div className="flex flex-col flex-1 justify-center  items-center text-secondary">
              <h1 className="w-fit font-semibold tracking-[0.96px] text-xl lg:text-[40px]  text-center">
                {/* {t.rich('Golden Apple <tag /> Inscriber', { tag: (chunks) => <br className="md:hidden" /> })} */}
                <Trans>Golden Apple Testnet is now LIVE!</Trans>
              </h1>

              <div
                className="mt-6 mb-6 lg:mt-8 lg:mb-12 
              text-base lg:text-xl leadig-[150%] font-[400] 
              font-Roboto text-center max-w-[70%] sm:max-w-[540px] lg:max-w-[800px]"
              >
                <Trans>Win 0_1 BTC & 99 Rewards worth $99 Each! Join Now!</Trans>
              </div>

              <ButtonImage
                varirant="outline"
                className="rounded-xl text-base lg:text-xl font-Roboto border-secondary"
                onClick={() => {
                  window.open('/mint-guildline.pdf')
                }}
              >
                <Trans>Guide on Inscribe</Trans>
              </ButtonImage>
            </div>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}
export default Banner

