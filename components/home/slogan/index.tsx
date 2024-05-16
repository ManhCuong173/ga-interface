import { ButtonImage } from '@/components/button'
import { HeadMarkIcon } from '@/components/ui/icons'
import Link from 'next/link'
import WrapperHero from '../WrapperHero'

const Slogin = () => {
  return (
    <div id="section-slogan" className="snap-start">
      <WrapperHero src="/images/home/bg-slogan.svg">
        <div className="flex h-14 w-[70vw] md:h-16 md:w-[80vw] absolute top-[-1px] left-0">
          <div className="w-[75%] md:w-[90%] bg-secondary" />
          <div className="w-[25%] md:w-[10%] bg-secondary opacity-[0.3]" />
        </div>

        <div className="flex flex-col flex-1 items-center justify-center w-full h-full px-4">
          <div>
            <HeadMarkIcon />
          </div>
          <div className="max-w-[980px] mt-16 mb-14 lg:mt-24 text-center text-2xl font-semibold leading-[1.4] tracking-[-0.72px] uppercase text-secondary">
            “Golden Apple is the GameFi platform for the Bitcoin Ecosystem. Through mapping the Bitcoin Assets (BRC20,
            Ordinals NFT and others) to Ethereum (and other Layer2) networks,”
          </div>

          <Link href="/inscribe">
            <ButtonImage varirant="light-asset" className="text-lg font-medium text-red-light w-64 h-14 ">
              Explore Now
            </ButtonImage>
          </Link>
        </div>
      </WrapperHero>
    </div>
  )
}
export default Slogin

