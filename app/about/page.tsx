import Banner from '@/components/about/Banner'
import Elementals from '@/components/about/elementals'
import Intro from '@/components/about/intro'
import Footer from '@/components/footer'

export default function About() {
  return (
    <div className='bg-[#FAF5F0] bg-[100%_auto] pt-[67px]'>
      <Banner />
      <Intro />
      <Elementals />
      {/* <Slogan /> */}
      <Footer />
    </div>
  )
}
