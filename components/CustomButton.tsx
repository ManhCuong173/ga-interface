import bg_button from '@/images/mint/bg-button.png'
import Image from 'next/image'

export default function CustomButton({ text, className, disabled, handleClick}: any) {
  return (
    <button
      disabled={disabled}
      className={`relative ${className} ${disabled? 'opacity-50':''}`}
      onClick={handleClick}
    >
      <Image src={bg_button} fill priority alt=''/> 
      <div className='w-full h-full relative flex justify-center items-center'>
          <span className='text-[#FFF4DD] text-base font-medium uppercase'>{text}</span>
      </div>
  </button>
)
}
