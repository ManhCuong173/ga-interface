import { ButtonImage } from '@/components/button'
import { OrderDetail } from '@/types/orders'
import React, { ReactNode, useRef, useState } from 'react'
import { MarkCircleIcon } from '../../../ui/icons'
import { PayMethodEnum } from '../../types'
import QRCode from './QRCode'
import { cn } from '@/lib/utils'

const CardSelect: React.FC<{
  title: string
  children?: ReactNode
  selectedPayMethod: PayMethodEnum | null
  method: PayMethodEnum
  onSelectPayMethod: (method: PayMethodEnum) => void
}> = ({ title, method, onSelectPayMethod, selectedPayMethod, children }) => {
  const isActive = selectedPayMethod === method

  return (
    <div className="cursor-pointer flex w-full flex-col gap-4 rounded-lg border border-bgAlt">
      <div
        className={cn('flex w-full items-center justify-start gap-2  p-5', isActive ? 'pb-0' : '')}
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
  return (
    <div className="flex flex-col font-Roboto items-center gap-3">
      <CardSelect
        title="Pay with BTC"
        method={PayMethodEnum.QRCode}
        selectedPayMethod={selectedPayMethod}
        onSelectPayMethod={onSelectPayMethod}
      >
        <QRCode url={orderDetail?.qrCodeUrl} addressTransferFee={orderDetail?.collectorFeeAddress} />
      </CardSelect>
      <CardSelect
        title="Pay with Wallet"
        method={PayMethodEnum.Wallet}
        selectedPayMethod={selectedPayMethod}
        onSelectPayMethod={onSelectPayMethod}
      >
        <ButtonImage
          varirant="primary-asset"
          disabled={isSiging}
          className="w-full px-12 py-4 my-4 whitespace-nowrap"
          onClick={onPayWallet}
        >
          Open Wallet
        </ButtonImage>
      </CardSelect>
    </div>
  )
}

export default PayMethod
