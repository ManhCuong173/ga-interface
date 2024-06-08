import FileViewer from '@/components/common/FileViewer'
import { ModalLayout } from '@/components/marketplace/Buy/ModalLayout'
import ModalContainer from '@/components/ui/modal-container'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  handleClose: () => void
  className?: string
}

const InscribeGuildModal: React.FC<Props> = ({ open, handleClose, className }) => {
  return (
    <ModalContainer handleClose={handleClose} open={open}>
      <ModalLayout>
        <FileViewer src={'/mint-guildline.pdf'} className={cn('w-full h-auto', className)} />
      </ModalLayout>
    </ModalContainer>
  )
}

export default InscribeGuildModal

