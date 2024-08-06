import { IconCopy } from '@/components/button'
import Trans from '@/components/i18n/Trans'
import { useGATranslation } from '@/components/i18n/hooks'
import Image from 'next/image'
import React from 'react'

const QRCode: React.FC<{ url: string; addressTransferFee: string }> = ({ url, addressTransferFee }) => {
  return (
    <div className="flex flex-col gap-6 max-sm:flex-col">
      <div className="flex flex-col items-center gap-1 px-6">
        <div className="flex h-44 w-44">{url && <Image src={url} width={220} height={220} alt="" />}</div>
        <span className="text-sm font-Roboto text-black1">
          <Trans>Scan the QR code to pay</Trans>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-Roboto font-medium text-black1">
            <Trans>Or pay to the address below:</Trans>
          </span>
          <div className="flex w-full rounded-lg border border-bgAlt ">
            <div className="flex-1 flex min-h-10 w-full items-center px-3 truncate  ">
              <span className="text-xs text-black font-light break-all whitespace-normal max-w-[300px] overflow-hidden">
                {addressTransferFee}
              </span>
            </div>
            <div className="flex h-10 w-10 min-w-10 items-center justify-center">
              <IconCopy text={addressTransferFee} />
            </div>
          </div>
          <p className="text-xs font-Roboto text-black2">
            <Trans>Do not carry inscription in the payment, otherwise it will fail</Trans>
          </p>
        </div>
        <p className="inline font-medium text-sm font-Roboto py-2 px-3 rounded-md bg-bgAlt4d">
          {useGATranslation().rich('Need BTC? <span>Click here</span> to buy some BTC with MoonPay!', {
            span: () => <span className="cursor-pointer text-red-light font-bold" />,
          })}
        </p>
      </div>
    </div>
  )
}

export default QRCode

