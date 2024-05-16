import { HeadMarkIcon } from '@/components/ui/icons'

const Intro = () => {
  return (
    <div id="section-slogan" className="snap-start pt-[108px] pb-[119px] lg:pt-[172px] lg:pb-[169px]">
      <div>
        <div className="flex h-14 w-[70vw] md:h-16 md:w-[80vw] absolute top-[-1px] left-0">
          <div className="w-[75%] md:w-[90%] bg-secondary" />
          <div className="w-[25%] md:w-[10%] bg-secondary opacity-[0.3]" />
        </div>

        <div className="flex flex-col flex-1 items-center justify-center w-full h-full px-4">
          <div>
            <HeadMarkIcon />
          </div>

          <div className="mt-[30px] mb-[57px] text-_black text-2xl font-semibold leading-8 -tracking-[0.48px]">
            About Golden Apple
          </div>
          <div
            className="text-black1 max-w-[315px] 
            lg:max-w-[851px] text-[18px] font-normal leading-[150%] font-Roboto text-center"
          >
            <p>
              Although the history of NFT on Bitcoin has started even before the existence of the Ethereum blockchain,
            </p>
            <p className="mt-8 mb-6">
              It is still relatively subdued compared to its counterpart. As we believe in the overall development of
              the Bitcoin blockchain,
            </p>
            <p>
              We want to allocate part of our venture to create a project that can bring users in the hope that this
              community will be the seed of a bigger ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Intro

