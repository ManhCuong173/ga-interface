import frame_NFT from '@/images/mint/popup/frame_nft.svg'
import nftService from '@/services/nft.service'
import { NFT } from '@/types/nft'
import { Dialog } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CustomButton from '../CustomButton'
import InformationRow from '../information-row'

const NFTDetail: React.FC<{
  orderId: string
  nft?: NFT
  isOpen: boolean
  onClose: () => void
}> = ({ orderId, nft, isOpen, onClose }) => {
  const router = useRouter()

  const { data: inscription, refetch } = useQuery({
    queryKey: ['nft-detail', nft?.id],
    queryFn: async () => {
      const res = await nftService
        .getNFTDetail({
          orderId,
          nft: nft as NFT,
        })
        .call()
      return res.data
    },
    enabled: Boolean(nft?.id && isOpen),
  })

  const handleRouterAsset = () => {
    router.push('/profile')
  }

  const [limitTime, setLimitTime] = useState(10)

  useEffect(() => {
    if (limitTime > 0 && isOpen) {
      if (!inscription?.inscription_id) {
        const time = setInterval(() => {
          refetch()
          setLimitTime(limitTime - 1)
        }, 30000)
        return () => {
          clearInterval(time)
        }
      } else {
        console.log('minted')
      }
    }
  }, [limitTime, isOpen, inscription?.inscription_id, refetch])

  const rows = [
    {
      title: 'Inscription Number',
      value: inscription?.inscription_number || 'Unconfirmed',
    },
    {
      title: 'Inscription ID',
      value: inscription?.inscription_id || 'Unconfirmed',
    },
    {
      title: 'Address',
      value: inscription?.address || 'Unconfirmed',
    },
    {
      title: 'Output ID',
      value: inscription?.output_value || 'Unconfirmed',
    },
    {
      title: 'Content',
      value: inscription?.content || 'Unconfirmed',
    },
    {
      title: 'Content Length',
      value: inscription?.content_length || 'Unconfirmed',
    },
    {
      title: 'Content Type',
      value: inscription?.content_type || 'Unconfirmed',
    },
    {
      title: 'Timestamp',
      value: inscription?.timestamp || 'Unconfirmed',
    },
    {
      title: 'Genesis Height',
      value: inscription?.genesis_height || 'Unconfirmed',
    },
    {
      title: 'View',
      value: inscription?.view || 'goldenapple.com',
    },
  ]

  const RouterBar = () => {
    return (
      <div>
        <button onClick={onClose} className="flex gap-1 items-center px-4 py-2 border border-[#D4C79C] rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#AE9955" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#AE9955] text-sm font-light leading-5 tracking-[-0.42px]">BACK</span>
        </button>
      </div>
    )
  }

  const Introduce = () => {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="text-[#4E473F] text-2xl font-medium leading-11 tracking-[-0.72px]">Information</p>
          <span className="text-line text-sm font-light leading-5 tracking-[-0.42px] uppercase max-w-[800px]">
            GOlden Apple only charges the service fee for
            <span className="text-[#FF6634]"> {` the first 25 inscriptionsins `} </span>a single inscribing batch order,
            up to a maximum of 1000 inscriptions.
          </span>
        </div>
        <button className="py-2 px-4 border border-[#AE9955] rounded-[1100px]">
          <span className="text-[#AE9955] text-sm font-medium leading-5 tracking-[-0.42px">Guide on Inscribe</span>
        </button>
      </div>
    )
  }

  const NFTImage = () => {
    return (
      <div className="relative">
        <Image src={frame_NFT} alt="" />
        <div className="absolute inset-0 flex justify-center items-center w-full h-full">
          {inscription ? (
            // TODO nft_link
            <Image src={(inscription as any)?.nft_link} width={320} height={320} alt="" />
          ) : (
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              <Skeleton width={320} height={320} />
            </SkeletonTheme>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={'fixed inset-0 bg-black/70 pt-[120px] w-full flex justify-center overflow-auto z-40'}
    >
      <Dialog.Panel className="h-fit pb-[120px]">
        <div className="relative rounded-[4px] bg-white lg:p-10 p-4 ">
          <div className="lg:w-[720px] w-[350px] bg-white rounded-[4px] flex flex-col gap-6">
            <div className="flex justify-end">
              {/* <RouterBar /> */}
              <div className="cursor-pointer" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                  <rect x="0.515625" y="0.5" width="43" height="43" rx="7.5" stroke="#D4C79C" />
                  <path
                    d="M30.3916 13.624L13.6396 30.376"
                    stroke="#AE9955"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.6396 13.624L30.3916 30.376"
                    stroke="#AE9955"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Introduce />
              <div className="pt-10 pb-16">
                <NFTImage />
              </div>
              <div className="relative flex flex-col gap-4 w-full">
                {rows.map((row, index) => (
                  <InformationRow key={index} title={row.title} value={row.value.toString()} />
                ))}
              </div>
              <div className="pt-[32px] w-full flex lg:justify-end justify-center">
                <CustomButton
                  className="w-[200px] h-[75px] lg:w-[300px] "
                  text={'Go to my asset'}
                  handleClick={handleRouterAsset}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default NFTDetail
