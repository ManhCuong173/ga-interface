import { useMemo, useRef, useState } from 'react'

import useClickOutside from '@/hooks/custom/useClickOutside'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@/types/orders'
import { ChevronIcon, MarkIcon } from '../ui/icons'

type Status = {
  id: OrderStatus
  title: string
}

const status: Status[] = [
  {
    id: OrderStatus.All,
    title: 'All',
  },
  {
    id: OrderStatus.Pending,
    title: 'Pending',
  },
  {
    id: OrderStatus.Inscribing,
    title: 'Inscribing',
  },
  {
    id: OrderStatus.Minted,
    title: 'Minted',
  },
  {
    id: OrderStatus.Closed,
    title: 'Closed',
  },
]

interface SelectStatusProps {
  className?: string
  onSelectOrderStatus: (status: OrderStatus) => void
  selectedOrderStatus: OrderStatus
}

const SelectStatus = ({ className, onSelectOrderStatus, selectedOrderStatus }: SelectStatusProps) => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useClickOutside({ ref, show, setShow })

  const handleShow = () => {
    setShow(!show)
  }

  const selected = useMemo(() => status.find((t) => t.id === selectedOrderStatus), [selectedOrderStatus])

  return (
    <div
      ref={ref}
      className={cn(
        'rounded border border-bgAlt py-2 px-4 relative flex items-center w-full font-Roboto',
        'max-w-[200px] h-11',
        className,
      )}
    >
      <div onClick={handleShow} className="cursor-pointer flex gap-1 items-center justify-between w-full">
        <span className="text-sm sm:text-base font-medium text-black1">{selected?.title}</span>

        <ChevronIcon className={cn(show ? 'rotate-0' : 'rotate-180', 'transition-all ease-linear duration-100')} />
      </div>
      <div
        className={cn(
          show ? 'h-[200px]' : 'h-0 opacity-0 pointer-events-none',
          `transition-all linear duration-150 absolute w-full shadow-dropdown flex flex-col top-[120%] left-0 bg-white border rounded-lg`,
        )}
      >
        {status.map((item, index) => {
          return (
            <div
              className="flex items-center justify-between px-4 py-2 h-[40px] hover:bg-secondary  cursor-pointer border-b-[1px] last:border-b-0 text-sm"
              onClick={() => onSelectOrderStatus(item.id)}
            >
              <span key={`select-status-my-order-${item.id}`}>{item.title}</span>
              {selectedOrderStatus === item.id && <MarkIcon className="fill-transparent" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectStatus
