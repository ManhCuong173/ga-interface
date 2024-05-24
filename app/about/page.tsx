'use client'

import Banner from '@/components/about/Banner'
import Document from '@/components/about/documents'
import Intro from '@/components/about/intro'
import Footer from '@/components/footer'
import NFTGallery from '@/components/home/nft-gallery'

export default function About() {
  return (
    <div>
      <Banner />
      <Intro />
      <NFTGallery />
      <Document />
      <Footer />
    </div>
  )
}

