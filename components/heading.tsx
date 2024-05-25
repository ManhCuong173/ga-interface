import Image from 'next/image'
import heading from '@/images/inscribe/heading.png'

export default function Heading() {
  return (
    <div className='mx-auto w-[800px] max-w-full space-y-6'>
      <div className='relative mx-auto h-[51px] w-[396px] lg:h-[82px] lg:w-[600px]'>
        <Image src={heading} alt='heading' fill className='object-cover' />
      </div>
      <p className='text-center font-DKLemonYellowSun'>
        Innovaz only charges the service fee for the first 25 inscriptionsins a single inscribing
        batch order, up to a maximum of 1000 inscriptions.
      </p>
      <div className='mx-auto w-fit border-b-2 border-primary text-center font-Japanese3017 text-sm leading-3 text-primary'>
        Guide on Inscribe
      </div>
    </div>
  )
}
