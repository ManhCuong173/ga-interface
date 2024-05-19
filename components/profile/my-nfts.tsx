'use client'

import Assets from '@/components/profile/assets'
import { emptyAsset } from '@/constants/asset.constant'
import { nftTypes } from '@/constants/nft.constant'
import { selectAddress, selectedPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppSelector } from '@/lib/hook'
import axiosClient from '@/services/axios-client'
import { backend } from '@/services/endpoint/endpoint'
import { listService } from '@/services/list.service'
import { userService } from '@/services/user.service'
import { UserAsset } from '@/types/asset'
import { NFTDetail } from '@/types/nft'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useTransition } from 'react'
import { toast } from 'react-toastify'
import Loading from '../Loading'
import ModalConfirmCancel from './modal/modal-confirm-cancel'
import ModalListNft from './modal/modal-list-nft'
import ModalListSuccess from './modal/modal-list-success'
import ModalNftInfo from './modal/modal-nft-info'

export default function MyNFTs() {
  const address = useAppSelector(selectAddress)
  const publicKey = useAppSelector(selectedPublicKey)

  const [selectedAsset, setSelectedAsset] = useState<UserAsset>(emptyAsset)
  const [price, setPrice] = useState('')
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState<'nft-info' | 'list-nft' | 'list-success' | 'confirm-cancel' | null>(null)
  const [isListing, startListingTransition] = useTransition()
  const [isCancelListing, startCancelListingTransition] = useTransition()

  const { data: assets, isLoading: loadingAssets } = useQuery({
    queryKey: ['user-assets', address],
    queryFn: () => userService.getUserAssets(address),
    enabled: !!address,
    refetchIntervalInBackground: true,
  })

  const {
    data: nftDetail,
    isLoading: loadingDetail,
    refetch,
  } = useQuery({
    queryKey: ['nft-detail', selectedAsset.id_create, selectedAsset.number, selectedAsset.inscription_number],
    queryFn: async () =>
      (
        await axiosClient.post<NFTDetail>(`${backend}/inscription/info`, {
          id_create: selectedAsset.id_create,
          nft_id: selectedAsset.nft_id,
          number: selectedAsset.number,
        })
      ).data,
    enabled: !!selectedAsset.id_create,
  })

  const handleShowNftInfo = (asset: UserAsset) => {
    setSelectedAsset(asset)
    setModalOpen('nft-info')
  }

  const handleShowListNft = async (asset: UserAsset) => {
    setSelectedAsset(asset)
    setModalOpen('list-nft')
  }

  const handleCancelNft = async (asset: UserAsset) => {
    setSelectedAsset(asset)
    setModalOpen('confirm-cancel')
  }

  const handleListNft = async () => {
    startListingTransition(async () => {
      try {
        const listTxIdInscription = await getListTxidInscription()

        if (!listTxIdInscription.length) return

        const res = (
          await listService.getPsbt({
            id_inscription: selectedAsset.id_inscription,
            list_txid_inscrtiption: listTxIdInscription,
            wallet_address: address,
          })
        ).data

        const signedPsbt: string = await (window as any).unisat.signPsbt(res.psbt)
        const psbtBase64 = Buffer.from(signedPsbt, 'hex').toString('base64')

        await listService.sellNft({
          address: address,
          id_inscription: selectedAsset.id_inscription,
          list_unspent_lock: res.list_unspent_lock,
          price: Number(price),
          psbt: psbtBase64,
          pubkey: publicKey,
        })

        // Response status 200 => SUCCESS
        queryClient.invalidateQueries({
          queryKey: ['user-assets', address],
        })
        setModalOpen('list-success')
      } catch (err) {
        toast.error('Error happed when listing nft. Please try again')
      }
    })
  }

  const handleCancelListing = async () => {
    startCancelListingTransition(async () => {
      try {
        const res = await listService.cancel({
          id_inscription: selectedAsset.id_inscription,
          pubkey: publicKey,
        })
        if (res.status === 200) {
          setModalOpen(null)
          toast.success('success')
          queryClient.invalidateQueries({
            queryKey: ['user-assets', address],
          })
        }
      } catch {
        toast.error('Error happed when cancel listing this NFT')
      }
    })
  }

  const getListTxidInscription = async () => {
    try {
      let res = await (window as any).unisat.getInscriptions(0, 10000)
      return res.list.map((item: { location: string }) => item.location.split(':')[0])
    } catch (e) {
      toast.error('Error getting list tx id inscription! Please try again')
      return []
    }
  }

  const handleChangePrice = (value: string) => {
    setPrice(value)
  }

  const handleCloseModal = () => {
    modalOpen === 'list-success' && refetch()
    setPrice('')
    setModalOpen(null)
  }

  const matchedType = nftTypes.find((item) => item.id.toString() === selectedAsset.nft_id)

  return (
    <div className="pt-11">
      <div className="space-y-8">
        <Assets
          key={assets?.user_asset?.length}
          isLoading={loadingAssets}
          assets={assets && assets.user_asset ? assets.user_asset : []}
          onShowInfo={handleShowNftInfo}
          onCancel={handleCancelNft}
          onList={handleShowListNft}
        />
      </div>
      <ModalNftInfo
        open={modalOpen === 'nft-info'}
        loadingDetail={loadingDetail}
        number={Number(selectedAsset.number)}
        nftId={selectedAsset.nft_id}
        nftDetail={nftDetail}
        nftImage={selectedAsset.link_image}
        nftName={matchedType?.label || ''}
        inscriptionNumber={nftDetail?.inscription_number || 0}
        canList={!selectedAsset.is_listing}
        handleClose={handleCloseModal}
        handleSubmit={() => setModalOpen('list-nft')}
      />
      <ModalListNft
        open={modalOpen === 'list-nft'}
        price={price}
        loadingDetail={loadingDetail}
        number={Number(selectedAsset.number)}
        nftId={selectedAsset.nft_id}
        nftDetail={nftDetail}
        nftImage={selectedAsset.link_image}
        nftName={matchedType?.label || ''}
        inscriptionNumber={nftDetail?.inscription_number || 0}
        handleChangePrice={handleChangePrice}
        handleBack={() => setModalOpen('nft-info')}
        handleClose={handleCloseModal}
        handleSubmit={handleListNft}
      />
      <ModalListSuccess
        loadingDetail={loadingDetail}
        open={modalOpen === 'list-success'}
        price={price}
        nftId={selectedAsset.nft_id}
        nftDetail={nftDetail}
        nftImage={selectedAsset.link_image}
        nftName={matchedType?.label || ''}
        inscriptionNumber={nftDetail?.inscription_number || 0}
        number={Number(selectedAsset.number)}
        handleClose={() => setModalOpen(null)}
        handleSubmit={handleCloseModal}
      />
      <ModalConfirmCancel
        nftId={selectedAsset.nft_id}
        nftImage={selectedAsset.link_image}
        nftName={matchedType?.label || ''}
        inscriptionNumber={nftDetail?.inscription_number || 0}
        number={Number(selectedAsset.number)}
        open={modalOpen === 'confirm-cancel'}
        handleClose={handleCloseModal}
        handleSubmit={() => {
          handleCancelListing()
        }}
      />
      {(isListing || isCancelListing) && <Loading />}
    </div>
  )
}

