import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import DownloadIcon from '@/icons/download-icon.svg'
import ViewIcon from '@/icons/home/view-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import WrapperHero from '../home/WrapperHero'
import Trans from '../i18n/Trans'
import { useGATranslation } from '../i18n/hooks'

const Document = () => {
  const ref = useRef(null)
  const isTablet = useMediaQuery('(min-width: 920px)')

  return (
    <div id="section-slogan" className="snap-start font-Roboto" ref={ref}>
      <WrapperHero
        src={isTablet ? '/images/about/document-bg-desktop.svg' : '/images/about/document-bg-mobile.svg'}
        className="lg:min-h-[0px] min-h-[550px]  lg:h-[500px]"
      >
        <div className="flex flex-col flex-1 items-center justify-center w-full max-h-[500px] px-4">
          <div
            className="mt-16 mb-5 lg:mt-24 
          text-center text-[24px] md:text-[32px] font-semibold leading-[1.3] 
          tracking-[-0.64px] uppercase text-secondary
          max-w-[447px] font-ProtoMono
          "
          >
            “<Trans>ALL YOU NEED TO KNOW ABOUT GOLDEN APPLE</Trans>”
          </div>
          <div
            className="text-base font-light leading-3/2 
          max-w-[330px] md:max-w-none  text-white2 text-center mt-5 mb-[60px] xl:text-nowrap"
          >
            {useGATranslation().rich(
              "Have questions about Golden Apple? We've got you covered_Dive into our documentation to learn more about us!",
              {
                br_line1: () => <br className="block xl:hidden" />,
                br_line2: () => <br className="block: md:hidden" />,
              },
            )}
          </div>

          <div className="flex flex-col md:flex-row  justify-center items-center gap-[12px] lg:gap-[18px]">
            <Link href="/inscribe">
              <button
                className=" text-red-light  bg-white px-[33px] py-[18px]
              flex items-center justify-center rounded-lg w-[220px] h-[52px] hover:opacity-[0.96]
              "
              >
                <span className="font-base font-medium leading-3/2 mr-2">
                  {' '}
                  <Trans>View Gitbook</Trans>
                </span>{' '}
                <Image src={ViewIcon} width={18} height={18} alt="" />
              </button>
            </Link>
            <button
              className=" text-red-light  bg-white px-[33px] py-[18px]
              flex items-center justify-center rounded-lg w-[220px] h-[52px] hover:opacity-[0.96]
              "
              onClick={() => {
                window.open('/document_pitchdeck.pdf')
              }}
            >
              <span className="font-base font-medium leading-3/2 mr-2">
                <Trans>View Pitch Desk</Trans>
              </span>
              <Image src={DownloadIcon} width={18} height={18} alt="" />
            </button>
          </div>
        </div>
      </WrapperHero>
    </div>
  )
}
export default Document

