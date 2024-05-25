import { useInscribeContext } from '@/context/InscribeContext';
import { NFT } from '@/types/nft'
import React, { InputHTMLAttributes, memo, useCallback, useEffect, useState } from 'react'

const SelectControl = ({ listNft }: { listNft: NFT[] | undefined }) => {

    const [isChecked, setChecked] = useState(true);
    const { inscribeData, setInscribeData } = useInscribeContext();

    const handleSelectChange = () => {
        const newCheckedState = !isChecked;
        setChecked(newCheckedState);
        setInscribeData({
            type: 'PICK_ALL_NFT',
            nfts: newCheckedState ? listNft : []
        });
    }
    useEffect(() => {
        if (listNft?.length !== inscribeData.pickedNfts.length) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }, [inscribeData.pickedNfts.length, listNft?.length])

    const handleClearAllNFT = () => {
        setInscribeData({
            type: 'PICK_ALL_NFT',
            nfts: []
        });
        setChecked(false);
    }

    return (
        <section className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-3'>
                    <input checked={isChecked} onChange={handleSelectChange} className='w-5 accent-[rgba(239,35,44,1)] h-5 border border-stroke checked:text-[#fff]' type='checkbox' />
                    <span className='text-[#4E473F] sm:text-base text-sm leading-5 tracking-[-3%] font-medium'>Select all</span>
                </div>
                <div className='flex items-center space-x-1'>
                    <span className='text-[#2D8B6F] sm:text-base text-sm leading-5 tracking-[-3%] font-medium'>{inscribeData.pickedNfts.length}</span>
                    <span className='text-[#4E473F] sm:text-base text-sm leading-5 tracking-[-3%] font-medium'>Selected</span>
                </div>
            </div>

            <button
                onClick={handleClearAllNFT}
                disabled={inscribeData.pickedNfts.length === 0}
                className={`${inscribeData.pickedNfts.length === 0 && 'opacity-50'} text-[#FF6634] sm:text-base text-sm tracking-[-3%] sm:font-medium font-normal`}>
                Clear all
            </button>
        </section>

    )
}

export default memo(SelectControl)
