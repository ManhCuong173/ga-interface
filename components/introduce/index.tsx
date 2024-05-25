import React from 'react'

const Introduce = () => {
  return (
      <div className='sm:pt-12 pt-10 flex flex-col gap-4 items-center'>
          <div className='flex flex-col gap-2 items-center text-center'>
              <p className='text-[#4E473F] sm:text-[32px] font-medium sm:leading-11 text-2xl leading-8 tracking-[-0.72px]'>Golden Apple Inscriber</p>
              <span className='text-[#66605B] text-sm font-medium leading-5  tracking-[-0.42px] uppercase max-w-[800px]'>
                    Golden Apple only charges the service fee for
                    <span className='text-[#2D8B6F]'>
                        {' '}{` the first 25 inscriptionsins `}{' '}
                    </span>
                    a single inscribing batch order, up to a maximum of 1000 inscriptions.
              </span>
          </div>
        <button className='py-2 px-4 border border-[#AE9955] rounded-[1100px]'>
            <span className='text-[#AE9955] text-sm font-medium leading-5 tracking-[-0.42px]'>Guide on Inscribe</span>
        </button>
    </div>
  )
}

export default Introduce
