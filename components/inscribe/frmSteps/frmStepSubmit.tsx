import MintForm from '@/components/mintNFTs/MintForm'
import { memo } from 'react'

const FrmStepSubmit = ({ setOrder, setShowInscribeOrderModal }: any) => {
  return <MintForm onUpdateOrder={setOrder} onShowInscribeOrderModal={setShowInscribeOrderModal} />
}

export default memo(FrmStepSubmit)

