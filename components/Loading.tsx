import React from 'react'
import loading from '@/images/inscribe/loading.svg'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='fixed inset-0 z-[1000] flex h-full w-full items-center justify-center bg-[#00000080]'>
      <Image src={loading} width={100} alt='' />
    </div>
  )
}

export default Loading
