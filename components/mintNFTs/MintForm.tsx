import { useInscribeContext } from '@/context/InscribeContext'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import { selectAddressReceiver, setAddressReceiver, setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { checkInvalidAddress } from '@/lib/truncate'
import { mintService } from '@/services/mint.service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ReceiveAddress from '../ReceiveAddress'
import { ButtonImage } from '../button'
import { SetFee } from './SetFee'

const MintForm: React.FC<{ onShowInscribeOrderModal: () => void; onUpdateOrder: (data: any) => void }> = ({
  onUpdateOrder,
  onShowInscribeOrderModal,
}) => {
  const address = useAppSelector(selectAddress)
  const [dataForm, setDataForm] = useState<any>()
  const addressReceiver = useAppSelector(selectAddressReceiver)

  const publickey = useAppSelector(selectedPublicKey)

  const queryClient = useQueryClient()

  const { inscribeData } = useInscribeContext()
  const btnToUsdRateData = useSelector(selectBtnToUsdRateData)
  const dispatch = useAppDispatch()

  const handleSubmitPayInvoice = async () => {
    handleCreateMintOrder()
    onShowInscribeOrderModal()
  }

  const handleChangeReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressReceiver(e.target.value.trim()))
  }

  const handleCreateMintOrder = async () => {
    try {
      const res: any = await mintService.createMintOrder({
        fee_rate: dataForm?.rateFee,
        wallet_address: addressReceiver,
        gas_fee: dataForm?.totalFee / Math.pow(10, 8),
        mint_list: inscribeData.pickedNfts.map((item) => ({
          nft_id: item.id_nft,
          number: item.number,
        })),
        public_key: publickey,
        sats_in_inscription: dataForm?.satsInscription,
      })
      if (res) {
        onUpdateOrder(res.data)
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    } catch (e) {
      console.log('err: ', e)
      toast.error('NFT already have owner', {
        position: 'bottom-right',
      })
      setTimeout(() => {
        dispatch(setProcessState(1))
      }, 2000)
    }
  }

  return (
    <div>
      <p className="text-base font-semibold leading-tight font-Roboto">Receive Address</p>

      <ReceiveAddress
        address={addressReceiver}
        onChange={handleChangeReceiverAddress}
        error={checkInvalidAddress(addressReceiver) ? 'Invalid address' : ''}
      />

      <div className="flex flex-col gap-2 mt-6 text-black1 font-Roboto">
        <p className="text-sm font-medium leading-tight tracking-[-0.42px]">Select the network fee you want to pay</p>
        <SetFee
          btcToUsdRate={btnToUsdRateData}
          setDataForm={setDataForm}
          numberOfNft={inscribeData.pickedNfts.length}
        />
      </div>

      <div className="flex flex-col flex-1 justify-end gap-4 uppercase">
        <ButtonImage
          varirant="primary-asset"
          disabled={Boolean(
            !addressReceiver ||
              !address ||
              inscribeData.pickedNfts.length === 0 ||
              checkInvalidAddress(addressReceiver),
          )}
          className="w-full px-12 py-4 mt-10 whitespace-nowrap"
          onClick={handleSubmitPayInvoice}
        >
          Submit & Pay Invoice
        </ButtonImage>
      </div>
    </div>
  )
}
export default MintForm
