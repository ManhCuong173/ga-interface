import { nftService } from '@/services/nft.service'
import React, { useCallback, useEffect, useState } from 'react'
import InformationRow from '../information-row'
import { Dialog } from '@headlessui/react'
import { MintModalLayout } from './MintModalLayout'
import CustomButton from '../CustomButton'
import Image from 'next/image'
import frame_NFT from '@/images/mint/popup/frame_nft.svg'
import { useRouter } from 'next/navigation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const NFTDetail = ({
    id_create,
    item,
    openModal,
    setNFT
}: any) => {

    const [inscription, setInscription] = useState<any>()
    const router = useRouter()

    const getNFTDetail = useCallback(async () => {
        const res = await nftService.getNFTDetail({
            id_create: id_create,
            nft_id: item?.nft_id,
            number: item?.number
        })
        if (res)
            setInscription(res)
    }, [id_create, item?.nft_id, item?.number])

    useEffect(() => {
        if (openModal)
            getNFTDetail()
    }, [openModal, getNFTDetail])

    const closeModal = () => {
        setNFT('');
        // dispatch(setProcessState(1))
    }

    const handleRouterAsset = () => {
        router.push('/profile')
    }

    const [limitTime, setLimitTime] = useState(10)

    useEffect(() => {
        if (limitTime > 0 && openModal) {
            if (!inscription?.inscription_id) { //
                const time = setInterval(() => {
                    getNFTDetail()
                    setLimitTime(limitTime - 1)
                }, 30000)
                return () => {
                    clearInterval(time)
                }
            } else {
                console.log('minted')
                // setShowInscribeOrderModal(false)
            }
        }
    }, [limitTime, openModal, inscription?.inscription_id, getNFTDetail])



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
                <button
                    onClick={() => setNFT('')}
                    className='flex gap-1 items-center px-4 py-2 border border-[#D4C79C] rounded-lg'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#AE9955" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className='text-[#AE9955] text-sm font-light leading-5 tracking-[-0.42px]'>BACK</span>
                </button>
            </div>
        )
    }

    const Introduce = () => {
        return (
            <div className='flex flex-col gap-4 items-center'>
                <div className='flex flex-col gap-2 items-center text-center'>
                    <p className='text-[#4E473F] text-2xl font-medium leading-11 tracking-[-0.72px]'>Information</p>
                    <span className='text-[#66605B] text-sm font-light leading-5 tracking-[-0.42px] uppercase max-w-[800px]'>
                        GOlden Apple only charges the service fee for
                        <span className='text-[#FF6634]'>
                            {' '}{` the first 25 inscriptionsins `}{' '}
                        </span>
                        a single inscribing batch order, up to a maximum of 1000 inscriptions.
                    </span>
                </div>
                <button className='py-2 px-4 border border-[#AE9955] rounded-[1100px]'>
                    <span className='text-[#AE9955] text-sm font-medium leading-5 tracking-[-0.42px'>Guide on Inscribe</span>
                </button>
            </div>
        )
    }

    const NFTImage = () => {
        return (
            <div className='relative'>
                <Image src={frame_NFT} alt='' />
                <div className='absolute inset-0 flex justify-center items-center w-full h-full'>
                    {inscription ?
                        <Image src={inscription?.nft_link} width={320} height={320} alt='' />
                        :
                        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                            <Skeleton width={320} height={320} />
                        </SkeletonTheme>
                    }
                </div>
            </div>
        )
    }

    return (
        <Dialog open={openModal} onClose={closeModal}
            className={'fixed inset-0 bg-black/70 pt-[120px] w-full flex justify-center overflow-auto z-40'}
        >
            <Dialog.Panel
                className='h-fit pb-[120px]'
            >  
                <div className='relative rounded-[4px] bg-white lg:p-10 p-4 '>
                    <div className='lg:w-[720px] w-[350px] bg-white rounded-[4px] flex flex-col gap-6'>
                        <div className='flex justify-end'>
                            {/* <RouterBar /> */}
                            <div className='cursor-pointer'
                                onClick={() => setNFT('')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                    <rect x="0.515625" y="0.5" width="43" height="43" rx="7.5" stroke="#D4C79C" />
                                    <path d="M30.3916 13.624L13.6396 30.376" stroke="#AE9955" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.6396 13.624L30.3916 30.376" stroke="#AE9955" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Introduce />
                            <div className='pt-10 pb-16'>
                                <NFTImage />
                            </div>
                            <div className='relative flex flex-col gap-4 w-full'>
                                {rows.map((row, index) => (
                                    <InformationRow key={index} title={row.title} value={row.value} />
                                ))}
                            </div>
                            <div className='pt-[32px] w-full flex lg:justify-end justify-center'>
                                <CustomButton
                                    className='w-[200px] h-[75px] lg:w-[300px] '
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