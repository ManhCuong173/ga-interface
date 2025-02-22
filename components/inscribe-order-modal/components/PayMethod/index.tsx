import { ButtonImage } from '@/components/button'
import Captcha from '@/components/captcha'
import { useVerifyCaptcha } from '@/components/captcha/hooks'
import Trans from '@/components/i18n/Trans'
import { useGATranslation } from '@/components/i18n/hooks'
import { useToggle } from '@/hooks/custom/useToggle'
import { cn } from '@/lib/utils'
import { OrderDetail } from '@/types/orders'
import React, { ReactNode, useState } from 'react'
import { MarkCircleIcon } from '../../../ui/icons'
import { PayMethodEnum } from '../../types'
import QRCode from './QRCode'

const CardSelect: React.FC<{
  title: string
  children?: ReactNode
  selectedPayMethod: PayMethodEnum | null
  method: PayMethodEnum
  onSelectPayMethod: (method: PayMethodEnum) => void
}> = ({ title, method, onSelectPayMethod, selectedPayMethod, children }) => {
  const isActive = selectedPayMethod === method

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-bgAlt">
      <div
        className={cn('flex w-full items-center justify-start gap-2  p-5 cursor-pointer ', isActive ? 'pb-0' : '')}
        onClick={() => onSelectPayMethod(method)}
      >
        <MarkCircleIcon checked={isActive} />
        <span className="text-base font-bold ml-3">{title}</span>
      </div>
      {isActive && <div className="p-5 pt-0">{children}</div>}
    </div>
  )
}
export type PayMethodProps = {
  selectedPayMethod: PayMethodEnum | null
  onSelectPayMethod: (method: PayMethodEnum) => void
  onPayWallet: () => void
  orderDetail: OrderDetail
  isSiging: boolean
}
const PayMethod: React.FC<PayMethodProps> = ({
  selectedPayMethod,
  onSelectPayMethod,
  orderDetail,
  onPayWallet,
  isSiging,
}) => {
  const [isAbleToMintNFT, toggle] = useToggle(false)

  return (
    <div className="flex flex-col font-Roboto items-center gap-3">
      <CardSelect
        title={useGATranslation()('Pay with BTC')}
        method={PayMethodEnum.QRCode}
        selectedPayMethod={selectedPayMethod}
        onSelectPayMethod={onSelectPayMethod}
      >
        <QRCode url={orderDetail?.qrCodeUrl} addressTransferFee={orderDetail?.collectorFeeAddress} />
      </CardSelect>
      <CardSelect
        title={useGATranslation()('Pay with Wallet')}
        method={PayMethodEnum.Wallet}
        selectedPayMethod={selectedPayMethod}
        onSelectPayMethod={onSelectPayMethod}
      >
        {isAbleToMintNFT ? (
          <ButtonImage
            varirant="primary-asset"
            disabled={isSiging}
            className={cn('w-full px-12 py-4 my-4 whitespace-nowrap')}
            onClick={onPayWallet}
          >
            <Trans>Open Wallet</Trans>
          </ButtonImage>
        ) : (
          <Captcha max={10} onFinished={toggle} />
        )}
      </CardSelect>
    </div>
  )
}

export default PayMethod
