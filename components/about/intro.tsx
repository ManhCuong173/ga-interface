import { HeadMarkIcon } from '@/components/ui/icons'
import { appearAnimation } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import Trans from '../i18n/Trans'

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

          <motion.div
            {...appearAnimation}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-[30px] mb-[57px] text-_black text-2xl font-semibold leading-8 -tracking-[0.48px]"
          >
            <Trans>About Golden Apple</Trans>
          </motion.div>
          <motion.div
            {...appearAnimation}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="text-black1 max-w-[315px] 
            lg:max-w-[851px] text-[18px] font-normal leading-[150%] font-Roboto text-center"
          >
            <p>
              <Trans>
                At Golden Apple, we are all about possibilities and providing equal opportunities for everyone to
                transform their lives
              </Trans>
            </p>
            <p className="mt-8 mb-6">
              <Trans>Our mission is to foster a thriving community where everyone has a shot at winning</Trans>.
            </p>
            <p>
              <Trans>Golden Apple is your golden to potentially pocket 1 BTC or even more!</Trans>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default Intro

