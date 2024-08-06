'use client'

import Banner from '@/components/about/Banner'
import Document from '@/components/about/documents'
import Intro from '@/components/about/intro'
import Footer from '@/components/footer'
import NFTGallery from '@/components/home/nft-gallery'

export default function About({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="lg:pt-[67px] page-container">
      <Banner />
      <Intro />
      <NFTGallery />
      <Document />
      <Footer />
    </div>
  )
}

