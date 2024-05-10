import { useInscribeContext } from '@/context/InscribeContext'
import { selectBtnToUsdRateData } from '@/lib/features/wallet/fee-slice'
import {
  selectAddressReceiver,
  setAddressReceiver,
  setProcessState,
} from '@/lib/features/wallet/mintProcess'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { checkInvalidAddress } from '@/lib/truncate'
import { mintService } from '@/services/mint.service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CustomButton from '../CustomButton'
import ReceiveAddress from '../receiver'
import { NFTSection } from './NFTSection'
import { SetFee } from './SetFee'

export const MintForm = ({setOrder,setShowInscribeOrderModal}:any) => {
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
    setShowInscribeOrderModal(true)
  }

  const handleSetAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressReceiver(e.currentTarget.value.trimStart()))
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
        setOrder(res.data)
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
    <div className='flex flex-col gap-10 text-[#4E473F]'>
      <NFTSection listNft={inscribeData.pickedNfts} isPick={false} />
      <ReceiveAddress
        addressReceiver={addressReceiver}
        onChange={handleSetAddressInput}
        error={checkInvalidAddress(addressReceiver) ? 'Invalid address' : ''}
      />
      <div>
        <p className='pb-4 text-sm font-medium leading-5 tracking-[-0.42px] text-[#383F4A]'>
          Select the network fee you want to pay
        </p>
        <SetFee
          btcToUsdRate={btnToUsdRateData}
          setDataForm={setDataForm}
          numberOfNft={inscribeData.pickedNfts.length}
        />
      </div>
      <div className='z-0 flex flex-col items-center gap-6'>
        <CustomButton
          disabled={
            !address || !addressReceiver
          }
          className='w-[280px] lg:w-[300px] h-[75px]'
          text={'Submit & Pay Invoice'}
          handleClick={handleSubmitPayInvoice}
        />
      </div>
    </div>
  )
}
