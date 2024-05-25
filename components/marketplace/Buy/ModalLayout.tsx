import useClickOutside from '@/hooks/custom/useClickOutside'
import { useRef, useState } from 'react'

export const ModalLayout = ({ children }: any) => {
  const modalRef = useRef<null | HTMLDivElement>(null)
  const [openModal, setOpenModal] = useState(false)
  useClickOutside({ modalRef, openModal, setOpenModal })

  return (
    <div>
      <div
        className="p-[30px] bg-white flex flex-col items-center relative lg:w-[700px] lg:min-h-[600px]"
        ref={modalRef}
      >
        <div className="relative z-10  flex flex-col items-center w-full font-Roboto">{children}</div>
      </div>
    </div>
  )
}

