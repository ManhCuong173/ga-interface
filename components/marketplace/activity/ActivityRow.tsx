import { IconCopy } from '@/components/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { nftTypes } from '@/constants/nft.constant'
import iconApple from '@/images/activity/img.png'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { useAppSelector } from '@/lib/hook'
import { formatTimeCreate } from '@/lib/time'
import { sliceAddress } from '@/lib/utils'
import { Activity } from '@/types/activity'
import Image from 'next/image'
import React, { useMemo } from 'react'

const ActivityRow: React.FC<{ activity: Activity }> = ({ activity }) => {
  const btcUSD = useAppSelector(selectBtnToUsdRateData)

  const element = useMemo(() => nftTypes.find((nft) => nft.id.toString() === activity.nftId), [activity])

  return (
    <TableRow className="font-Roboto" key={`row-orders-info-${activity.inscriptionId}`}>
      <TableCell>
        <div className="relative flex items-center space-x-3 text-base font-medium">
          <div>
            {activity.nftUrl ? (
              <Image
                loader={() => activity.nftUrl}
                src={activity.nftUrl}
                alt="icon"
                width={0}
                height={0}
                sizes="100vw"
                className="h-10 w-10 min-w-10 rounded-[4px]"
              />
            ) : (
              <Image src={iconApple} alt="icon" className="h-10 w-10 min-w-10" />
            )}
          </div>

          <p className="flex flex-col">
            <span className="text-sm text-black1 font-medium">{element?.label} APPLE</span>
            <span className="text-xs font-light text-[#4E473F]">Inscription #{activity.inscriptionNumber}</span>
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <Image src={element?.icon} alt="" width={24} height={24} />
          {element?.label}
        </div>
      </TableCell>
      <TableCell>
        <p className="flex flex-col items-start font-ProtoMono font-medium gap-1 text-sm whitespace-nowrap">
          <span>{activity.price} BTC</span>
          <span className="text-xs">
            ${!isNaN(Number(btcUSD)) ? (activity.price * Number(btcUSD)).toFixed(4) : '--'}
          </span>
        </p>
      </TableCell>

      <TableCell>
        <p className="flex items-center space-x-3 text-sm font-ProtoMono text-black1">
          <span>{sliceAddress(activity.seller)}</span>
          <IconCopy text={activity.seller} />
        </p>
      </TableCell>

      <TableCell>
        <p className="flex items-center space-x-3 text-sm font-ProtoMono text-black1">
          <span>{sliceAddress(activity.buyer)}</span>
          <IconCopy text={activity.buyer} />
        </p>
      </TableCell>

      <TableCell className="text-sm  text-black1 font-ProtoMono  whitespace-nowrap">
        {formatTimeCreate(activity.createdAt)}
      </TableCell>
    </TableRow>
  )
}

export default ActivityRow
