import Trans from '@/components/i18n/Trans'
import decor from '@/images/marketplace/analytics/decor.png'
import { ownerService } from '@/services/owner.service'
import { Distribution } from '@/types/owner'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

type Props = {
  nftId: number
  backgroundColor: string
}

export default function OwnerDistribution({ nftId, backgroundColor }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['owner-distribution', nftId],
    queryFn: () => ownerService.getDistribution(nftId as any),
  })

  const convertData = (data: Distribution) =>
    Object.entries(data).map(([label, value]) => ({
      label,
      value,
    }))

  return (
    <div
      className="flex h-fit w-full flex-col gap-6 rounded-lg bg-white p-4 lg:gap-8 lg:p-[60px]"
      style={{
        boxShadow: 'box-shadow: 0px 4px 15px 0px #0000000F',
      }}
    >
      <div className="flex flex-col gap-2.5 lg:gap-4">
        <Image src={decor} alt="" className="mx-auto h-[28.85px] w-[283.92px] object-cover lg:w-[360.21px]" />
        <h2 className="text-center text-2xl font-semibold leading-8 text-text-black lg:text-[32px] lg:font-medium">
          <Trans>Owner distribution</Trans>
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading
          ? 'Is loading ...'
          : data
            ? convertData(data).map((line, index) => (
                <div key={index} className="flex flex-col gap-2.5">
                  <div className="flex justify-between text-base font-medium leading-6 text-[#4E473F]">
                    <span>{line.value.percent.toFixed()}%</span>
                    <span>{line.label}</span>
                  </div>
                  <div className="relative h-6 w-full rounded-[32px] bg-[#FAF5F0]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-[32px] transition-all"
                      style={{
                        backgroundColor: backgroundColor,
                        width: `${line.value.percent}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            : 'No data'}
      </div>
    </div>
  )
}

