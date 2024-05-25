export const MintModalLayout = ({ className, children }: any) => {
  return (
    <div className={`${className} relative rounded-[4px] py-6  `}>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

