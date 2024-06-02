'use client'

import { HeadMarkIcon } from '@/components/ui/icons'
import { appearAnimation } from '@/constants/animation.constant'
import { NFTGalleryList } from '@/constants/gallery-card.constant'
import { motion } from 'framer-motion'
import Card from './card'

export default function NFTGallery() {
  return (
    <div id="section-nft-gallery" className="snap-center">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center my-40 lg:pl-20 lg:pr-6 bg-secondary">
        <div className="flex flex-col gap-6 px-4 lg:px-0 lg:gap-10">
          <motion.div {...appearAnimation} transition={{ duration: 0.6, delay: 0.5 }}>
            <div className="flex  items-center justify-evenly w-full">
              <HeadMarkIcon className="hidden lg:block" />
              <span className="text-2xl lg:text-[40px] whitespace-nowrap font-semibold tracking-[-0.96px] text-red-light lg:text-5xl">
                NFT Gallery
              </span>
              <HeadMarkIcon className="hidden lg:block" />
            </div>
          </motion.div>
          <div className="grid gap-4 items-center lg:grid-cols-5">
            {NFTGalleryList.map((nftGallery, index) => (
              <Card key={index} {...nftGallery} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

