import { ButtonImage } from '@/components/button'
import { BoostIcon, HourGlassIcon } from '@/components/ui/icons'

const Inscribing: React.FC<{ unconfirmed: number; confirmed: number }> = ({ confirmed, unconfirmed }) => {
  return (
    <div className="relative flex flex-col items-center gap-4 px-4 py-6 font-Roboto">
      <div className="flex gap-7 text-sm  bg-bgAlt2 px-4 py-1 rounded-lg">
        <p>
          <span className="text-orange2 font-ProtoMono mr-1">{unconfirmed}</span>Unconfirmed
        </p>
        <p>
          <span className="text-orange2 font-ProtoMono mr-1">{confirmed}</span>Confirmed
        </p>
      </div>
      <HourGlassIcon className="mt-4" />

      <p className="flex flex-col items-center gap-1">
        <span className="text-base font-bold text-red-light">Inscribing...</span>{' '}
        <span className="text-sm  font-medium text-black1">Waiting for Confirmation</span>
      </p>
      {/* <ButtonImage varirant="outline" className="border-red-light">
        <BoostIcon />
        <span className="text-red-light font-semibold ml-3">Boots</span>
      </ButtonImage> */}
    </div>
  )
}
export default Inscribing
