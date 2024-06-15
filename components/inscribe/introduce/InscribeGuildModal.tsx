import { ModalLayout } from '@/components/marketplace/Buy/ModalLayout'
import ModalContainer from '@/components/ui/modal-container'
import { EmbedPDF } from '@simplepdf/react-embed-pdf'

interface Props {
  open: boolean
  handleClose: () => void
  className?: string
}

const InscribeGuildModal: React.FC<Props> = ({ open, handleClose, className }) => {
  return (
    <ModalContainer handleClose={handleClose} open={open}>
      <ModalLayout>
        <EmbedPDF mode="inline" style={{ width: '100%', height: 800 }} documentURL="/mint-guildline.pdf" />
      </ModalLayout>
    </ModalContainer>
  )
}

export default InscribeGuildModal

