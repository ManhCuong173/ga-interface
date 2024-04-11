import Banner from '@/components/about/Banner'
import Elementals from '@/components/about/elementals'
import Intro from '@/components/about/intro'
import Footer from '@/components/footer'
import bg_img from '@/images/marketplace/background.png'
import bg_img_mb from '@/images/marketplace/background-mg.png'

export default function About() {
  return (
    <div className='bg-[#FAF5F0] pt-[67px] bg-[url(/images/marketplace/background.png)] bg-cover bg-fixed'>
      <Banner />
      <Intro />
      <Elementals />
      {/* <Slogan /> */}
      <Footer />
    </div>
  )
}
