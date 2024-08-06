import Trans from '@/components/i18n/Trans'
import { MarkCircleIcon } from '@/components/ui/icons'

const PaymentReceived = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center max-w-[250px] min-h-[300px] mx-auto">
      <MarkCircleIcon checked={true} className="w-24 h-24 fill-mark" />
      <div className="text-center font-Roboto font-bold text-mark mt-4">
        <Trans>Payment has been received and inscription is now in queue</Trans>
      </div>
    </div>
  )
}
export default PaymentReceived

