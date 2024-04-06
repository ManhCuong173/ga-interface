import useClickOutside from '@/hooks/custom/useClickOutside';
import decor_frame from '@/images/marketplace/buy/decor_frame.svg';
import decor_line from '@/images/marketplace/buy/decor_line.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const ModalLayout = ({children}:any) => {

    const modalRef = useRef<null | HTMLDivElement>(null)
    const [openModal, setOpenModal] = useState(false);
    useClickOutside({modalRef, openModal, setOpenModal})

    

    return (
        <div>
            <div className='max-w-[840px] px-[60px] py-8 bg-white flex flex-col gap-8 items-center relative text-[#4E473F]' ref={modalRef}>
                <>
                    <Image src={decor_frame} alt='' className='absolute top-6 left-6 z-0'/>
                    <Image src={decor_frame} alt='' className='rotate-90 absolute top-6 right-6 z-0'/>
                </>
                <Image src={decor_line} alt='' /> 
                <div className='relative z-10  flex flex-col gap-8 items-center w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}