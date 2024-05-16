import { motion } from 'framer-motion'
import Image from 'next/image'

export type Props = {
  front: string
  back: string

  frontMobile: string
  backMobile: string

  icon: string
  title: string
  body: string
  motionProps: any
}

export default function Card({ ...props }: Props) {
  return (
    <motion.div
      {...props.motionProps}
      className="flip-card group relative w-full max-w-[400px] lg:max-w-auto mx-auto lg:mx-0 "
    >
      <div className="flip-card-inner ">
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image src={props.front} width={235} height={417} alt="" className="hidden object-cover lg:inline-block" />
          <Image src={props.frontMobile} width={400} height={200} alt="" className="object-cover lg:hidden" />
        </div>

        {/* Back */}
        <div
          className="rotate absolute inset-0 flex flex-col items-center justify-between bg-full min-h-[210px] lg:min-h-[417px]"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="relative w-full">
            <Image src={props.back} width={235} height={417} alt="" className="hidden object-cover lg:inline-block" />
            <Image src={props.backMobile} width={400} height={200} alt="" className="object-cover lg:hidden" />

            <div className="absolute bottom-1/2 translate-y-[50%] max-w-[70%] lg:max-w-full lg:translate-y-[80%] right-0 lg:right-[unset] lg:left-0 px-7">
              <p className="relative z-[2] text-[3.5vw] sm:text-sm  font-Roboto text-left lg:text-center leading-normal tracking-[-0.2px] text-secondary">
                {props.body}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={props.front}
        width={235}
        height={417}
        alt=""
        className="hidden object-cover lg:inline-block opacity-0"
      />
      <Image src={props.frontMobile} width={400} height={200} alt="" className="object-cover lg:hidden opacity-0" />
    </motion.div>
  )
}
