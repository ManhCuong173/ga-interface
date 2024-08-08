import { FEE_DECIMALS } from '@/constants/fee'
import { useInscribeContext } from '@/context/InscribeContext'
import { selectAddressReceiver, setAddressReceiver, setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { getBalanceAmount } from '@/lib/formatNumber'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { checkInvalidAddress } from '@/lib/truncate'
import { cn } from '@/lib/utils'
import mintService from '@/services/mint.service'
import { FeeMintOrder } from '@/types/orders'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ReceiveAddress from '../ReceiveAddress'
import { ButtonImage } from '../button'
import Trans from '../i18n/Trans'
import { ChevronIcon } from '../ui/icons'
import NetworkFees from './NetworkFees'

const MintForm: React.FC<{ onShowInscribeOrderModal: () => void; onUpdateOrderId: (orderId: string) => void }> = ({
  onUpdateOrderId,
  onShowInscribeOrderModal,
}) => {
  const [isLoading, setLoading] = useState(false)
  const address = useAppSelector(selectAddress)
  const [dataForm, setDataForm] = useState<FeeMintOrder>({
    rateFee: 0,
    totalFee: 0,
    satsInscription: 0,
    networkFee: 0,
  })

  const addressReceiver = useAppSelector(selectAddressReceiver)
  const [enabledCustom, setEnableCustom] = useState(false)

  const publickey = useAppSelector(selectedPublicKey)

  const queryClient = useQueryClient()

  const { inscribeData } = useInscribeContext()
  const dispatch = useAppDispatch()

  const handleChangeReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressReceiver(e.target.value.trim()))
  }

  const handleProcessMintNFT = async () => {
    try {
      setLoading(true)
      const res = await mintService
        .createMintOrder({
          feeRate: dataForm?.rateFee,
          walletAddress: addressReceiver,
          gasFee: getBalanceAmount(dataForm?.totalFee, FEE_DECIMALS),
          nfts: inscribeData.pickedNfts,
          publickey: publickey,
          satsInInscription: dataForm?.satsInscription,
        })
        .call()
      console.log(res)

      if (res.data) {
        onUpdateOrderId(res.data.orderId)
        onShowInscribeOrderModal()
        queryClient.invalidateQueries({ queryKey: ['nfts'] })
        queryClient.invalidateQueries({ queryKey: ['orders'] })
      } else if (res.message) {
        toast.error(res.message, {
          position: 'top-right',
        })
      }
    } catch (e) {
      toast.error('one or some of selected NFTs has already minted', {
        position: 'bottom-right',
      })
      setTimeout(() => {
        dispatch(setProcessState(1))
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <p className="text-base font-semibold leading-tight font-Roboto">
        <Trans>Receive Address</Trans>
      </p>
      <ReceiveAddress
        address={addressReceiver}
        onChange={handleChangeReceiverAddress}
        error={checkInvalidAddress(addressReceiver) ? 'Invalid address' : ''}
      />
      <div
        className="flex items-center justify-center cursor-pointer my-3 mx-auto"
        onClick={() => {
          setEnableCustom(!enabledCustom)
        }}
      >
        <span className="text-base text-text-secondary font-medium mr-1 font-Roboto">
          <Trans>Advanced Settings</Trans>
        </span>
        <span className={cn(enabledCustom ? 'rotate-180' : 'rotate-0', `ml-1 transition-all duration-500`)}>
          <ChevronIcon className="stroke-text-secondary" />
        </span>
      </div>

      <div
        className={cn('flex flex-col gap-2 text-black1 font-Roboto', enabledCustom ? 'max-h-0 overflow-hidden' : '')}
      >
        <p className="text-sm font-medium leading-tight tracking-[-0.42px]">
          <Trans>Select the network fee you want to pay</Trans>
        </p>
        <NetworkFees onChangeDataForm={setDataForm} />
      </div>
      <div className="flex flex-col flex-1 mt-auto justify-end gap-4 uppercase">
        <ButtonImage
          varirant="primary-asset"
          disabled={Boolean(
            isLoading ||
              !addressReceiver ||
              !address ||
              !(
                dataForm.rateFee > 0 &&
                dataForm.totalFee > 0 &&
                dataForm.networkFee > 0 &&
                dataForm.satsInscription > 0
              ) ||
              inscribeData.pickedNfts.length === 0 ||
              checkInvalidAddress(addressReceiver),
          )}
          className="w-full px-12 py-4 mt-10 whitespace-nowrap"
          onClick={handleProcessMintNFT}
        >
          <Trans>Submit & pay invoice</Trans>
        </ButtonImage>
      </div>
    </div>
  )
}
export default MintForm
