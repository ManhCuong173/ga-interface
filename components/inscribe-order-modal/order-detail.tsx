import stepLine from '@/images/inscribe/step-line.png'
import Image from 'next/image'
import Trans from '../i18n/Trans'
import Detail from './detail'

export default function OrderDetail() {
  return (
    <div className="space-y-4">
      <div className="flex">
        <span className="relative h-7 w-[200px]">
          <Image src={stepLine} alt="stepline" fill className="object-cover" />
        </span>
        <span className="font-Japanese3017 text-2xl text-[#383F4A]">ORDERS</span>
        <span className="relative h-7 w-[200px]">
          <Image src={stepLine} alt="stepline" fill className="object-cover" />
        </span>
      </div>
      <div className="space-y-2">
        <Detail
          order={1}
          image={'/images/profile/asset-img.png'}
          name="Orange aple #9999"
          owner="0x765...a62"
          size="12KB"
        />
        <Detail
          order={1}
          image={'/images/profile/asset-img.png'}
          name="Orange aple #9999"
          owner="0x765...a62"
          size="12KB"
        />
        <Detail
          order={1}
          image={'/images/profile/asset-img.png'}
          name="Orange aple #9999"
          owner="0x765...a62"
          size="12KB"
        />
      </div>
      <div className="text-center font-DKLemonYellowSun">
        <Trans>Order created</Trans> Nov 09, 2023, 01:24:52 (UTC+7:00)
      </div>
    </div>
  )
}

