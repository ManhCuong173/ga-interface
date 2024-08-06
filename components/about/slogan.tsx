import chineseKnot from '@/icons/home/chineseknot.svg'
import decor from '@/images/about/decor.png'
import Image from 'next/image'

export default function Slogan() {
  return (
    <div className="mx-auto flex max-w-[1440px] justify-center lg:mt-[36.26px] lg:aspect-[1440/1418] lg:pt-[266.56px]">
      <div className="mx-auto size-full bg-[url(/images/about/house.png)] bg-full">
        <div className="mx-auto my-10 w-fit lg:mb-[264.8px] lg:mt-[398px]">
          <Image
            src={chineseKnot}
            alt=""
            className="mx-auto h-[30.848px] w-[30.848px] lg:h-[60px] lg:w-[60px]"
            width={60}
            height={60}
          />
          <div className="mx-auto mb-[49.91px] mt-[35px] w-[718.311px] max-w-[300px] text-center text-xl font-semibold uppercase tracking-[-1.08px] text-yellow1 lg:h-[300px] lg:max-w-[unset] lg:text-4xl lg:leading-[50px]">
            “Golden Apple is the GameFi platform for the Bitcoin Ecosystem. Through mapping the Bitcoin Assets (BRC20,
            Ordinals NFT and others) to Ethereum (and other Layer2) networks,”
          </div>
          <Image src={decor} alt="" className="mx-auto w-[300px] lg:h-[43.3px] lg:w-[541px]" />
        </div>
      </div>
    </div>
  )
}

