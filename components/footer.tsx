import { urlRoute } from '@/constants/routes'
import discord from '@/icons/home/discord.svg'
import twitter from '@/icons/home/twitter.svg'
import logo from '@/images/commons/logo.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import LanguageSelect from './header/language-select'
import Trans from './i18n/Trans'

const Social: React.FC<{ className?: string; size?: string }> = ({ className, size }) => {
  return (
    <div className={cn('grid grid-cols-2 gap-3 w-fit', className)}>
      <Link href={urlRoute.twitter} className={cn('flex w-full h-full cursor-pointer hover:opacity-90', size)}>
        <Image src={twitter} alt="twitter" width={48} height={48} />
      </Link>
      <Link href={urlRoute.discord} className={cn('flex w-full h-full cursor-pointer hover:opacity-90', size)}>
        <Image src={discord} alt="discord" width={48} height={48} />
      </Link>
    </div>
  )
}

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex h-fit snap-center flex-col bg-full lg:bg-none bg-secondary border-t-bgAlt border-t-[1px]"
    >
      <div className="py-7 px-5 lg:py-14 lg:px-20 relative flex h-fit w-full flex-col items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]  xl:grid-cols-[1.5fr_1fr_0.5fr] lg:gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] items-start">
            <div className="flex justify-between mb-5 lg:mb-0">
              <Link href="/" className="flex items-center text-base font-semibold lg:text-[24px] lg:leading-[24px]">
                <Image src={logo} alt="" className="size-[42px] lg:size-[48px] mr-3" />
                <span>GOLDEN APPLE</span>
              </Link>
              <Social className=" lg:hidden" size="max-w-[42px]" />
            </div>
            <div className="flex flex-col">
              <p className="w-[316.85px] text-xs font-medium font-Roboto leading-[1.4] tracking-[0.15px] text-black1  lg:w-[379.57px] lg:text-sm cursor:pointer">
                <Trans>{'Title'}</Trans>
              </p>
              <Social className="hidden lg:grid mt-6" size="max-w-12" />
            </div>
          </div>
          <div className="grid grid-cols-[max-content_max-content_max-content_max-content] mt-7 mb-5 lg:mt-0 lg:mb-0   lg:grid-cols-1 gap-6 w-fit  text-sm font-bold leading-6 tracking-[0.03em lg:text-base">
            <Link className="w-fit" href={urlRoute.home}>
              <Trans>{'Home'}</Trans>
            </Link>
            <Link className="w-fit" href={urlRoute.marketplace}>
              <Trans>{'Marketplace'}</Trans>
            </Link>
            <Link className="w-fit" href={urlRoute.mint}>
              <Trans>{'Mint'}</Trans>
            </Link>
            <Link className="w-fit" href={urlRoute.about}>
              <Trans>{'About'}</Trans>
            </Link>
          </div>
          <LanguageSelect className="border border-bgAlt rounded-md w-max h-10" mode="solid" />
        </div>
      </div>
      <div className="py-4 px-5 lg:py-6 lg:px-20 flex flex-col-reverse gap-4 lg:flex-row justify-between border-t-[1px] border-solid border-bgAlt">
        <div className="font-Roboto text-base hover">
          <Trans>{'@ 2023 by golden apple_All rights reserved'}</Trans>
        </div>

        <div className="flex items-center font-Roboto gap-6 text-xs lg:text-sm font-medium  text-black1 ">
          <Link href={urlRoute.privacy}>
            <Trans>Privacy Policy</Trans>
          </Link>
          <Link href={urlRoute.terms}>
            <Trans>Terms of service</Trans>
          </Link>
        </div>
      </div>
    </footer>
  )
}
export default Footer

