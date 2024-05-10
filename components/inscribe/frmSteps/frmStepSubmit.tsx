
import { MintForm } from '@/components/mintNFTs/MintForm';
import { memo } from 'react';

const FrmStepSubmit = ({setOrder,setShowInscribeOrderModal}:any) => {
  return (
    <MintForm
      setOrder={setOrder}
      setShowInscribeOrderModal={setShowInscribeOrderModal}
    />
  )
}

export default memo(FrmStepSubmit);
