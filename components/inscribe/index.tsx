'use client'

import InscribeContextProvider from '@/context/InscribeContext'
import { selectMintProcess, setProcessState } from '@/lib/features/wallet/mintProcess'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InscribeOrderModal from '../inscribe-order-modal'
import { MintModalLayout } from '../mintNFTs/MintModalLayout'
import FrmStepMyOrder from './frmSteps/frmStepMyOrder'
import FrmStepSubmit from './frmSteps/frmStepSubmit'


export default function Inscribe() {

    const mintProcessStep = useSelector(selectMintProcess);
    const [step, setStep] = useState(mintProcessStep);
    const dispatch = useDispatch()
    const [showInscribeOrderModal, setShowInscribeOrderModal] = useState(false)
    const [order, setOrder] = useState<any>()

    useEffect(() => {
        setStep(mintProcessStep);
    }, [mintProcessStep])

    return (
        <MintModalLayout className='mx-auto font-medium lg:max-w-[800px] w-full mt-8 font-ProtoMono'>
            <div className='flex flex-col gap-6 max-sm:py-[29px]'>
                {step === 2 ? <div className='flex items-center justify-between w-full'>
                    <button 
                        className='flex gap-1 py-[6px] sm:px-6 px-2 items-center rounded border border-[#D4C79C]'
                        onClick={() => dispatch(setProcessState(1))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 4L6 8L10 12" stroke="#AE9955" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className='text-[#AE9955] text-sm font-medium leading-5 tracking-[-0.42px]'>back</span>
                    </button>
                    <p className='text-[#4E473F] text_heading text-center'>Your NFT</p>
                    <span className='w-[103px]'></span>
                </div>:<p className='text-[#4E473F] text_heading text-center'>Your NFT</p>}

                <InscribeContextProvider>
                    {
                        step === 1 ? <FrmStepMyOrder setStep={setStep} /> : <FrmStepSubmit
                            setOrder={setOrder}
                            setShowInscribeOrderModal={setShowInscribeOrderModal}
                        />
                    }
                    <InscribeOrderModal
                        open={showInscribeOrderModal}
                        order={order}
                        setOpen={setShowInscribeOrderModal}
                    />
                </InscribeContextProvider>

            </div>

        </MintModalLayout>
    )
}
