'use client'

import ModalContainer from '@/components/ui/modal-container'
interface Props {
  open: boolean
  handleClose: () => void
  className?: string
}

export default function InscribeGuildModal({ open, handleClose, className }: Props) {
  return (
    <div className="Example">
      <ModalContainer handleClose={handleClose} open={open}>
        <div>
          <iframe src="/mint-guildline.pdf" className="w-[70vw] aspect-[3/2]" />
        </div>
      </ModalContainer>
    </div>
  )
}

