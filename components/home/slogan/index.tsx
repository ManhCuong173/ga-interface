import { ButtonImage } from '@/components/button'
import { HeadMarkIcon } from '@/components/ui/icons'
import { useMediaQuery } from '@/hooks/custom/useMediaQuery'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import WrapperHero from '../WrapperHero'

const Slogin = () => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [ratioDimension, setRatioDimension] = useState(0)
  const isTablet = useMediaQuery('(min-width: 768px)')
  const ratio = !isTablet
    ? `calc(0px + ${(ratioDimension / 100) * 10}px)`
    : `calc(0px + ${(ratioDimension / 100) * 50}px)`

  useEffect(() => {
    const scroll = (event: any) => {
      const rootDiv = document.getElementById('root-div')
      const crm = document.getElementById('section-crm')
      const crmOffsetTop = Number(crm?.offsetTop)
      const rootScrollTop = Number(rootDiv?.scrollTop)

      if (rootScrollTop - crmOffsetTop >= 0) {
        setRatioDimension(rootScrollTop - crmOffsetTop)
      }
    }
    if (isInView) {
      window.addEventListener('scroll', scroll, true)
    }
    ;() => window.removeEventListener('scroll', scroll, true)
  }, [isInView, ref])

  return (
    <div id="section-slogan" className="snap-start" ref={ref}>
      <WrapperHero src="/images/home/bg-slogan.svg">
        <div className="flex justify-start h-14 md:h-16 md:w-full absolute top-[-1px] left-0">
          <div className=" bg-secondary" style={{ width: ratio }} />
          <div className=" bg-secondary opacity-[0.3]" style={{ width: ratio }} />
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
            <ButtonImage
              varirant="light-asset"
              className="text-sm lg:text-base font-medium text-red-light w-[105%] h-[100px] md:h-[80px] lg:w-[420px] text-center"
            >
              Grab your golden ticket today
              <br />
              Mint your NFT now!
            </ButtonImage>
          </Link>
        </div>
      </WrapperHero>
    </div>
  )
}
export default Slogin

