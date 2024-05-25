import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
  title: string
  value: string
}

export default function InformationRow({ title, value }: Props) {
  return (
    // <div className='w-full space-y-4'>
    //   <div className='border-b border-primary py-2 font-semibold text-primary'>{title}</div>
    //   <div className='flex h-11 w-full max-w-full items-center justify-start rounded-lg border-[1px] border-[#E8B24F] bg-[url(/images/commons/retro-bg.png)] bg-full px-4'>
    //     <div className='max-w-full truncate'>{value}</div>
    //   </div>
    // </div>
    <div className="flex flex-col gap-2">
      <p className="text-xs font-light leading-6 tracking-[-0.48px]">{title}</p>
      {value !== 'Unconfirmed'? <div className={`py-3 px-4 border border-[#E5E4E3] rounded-[4px] w-full truncate`}>
        <span className="text-sm font-light leading-5 tracking-[-0.42px] text-[#B2B0AD]">{value}</span>
      </div>
      :<Skeleton height={40} />
      }
    </div>
  )
}
