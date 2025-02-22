import React from 'react'
import Trans from '../i18n/Trans'
import { InfoFullCircleIcon } from '../ui/icons'
import InputInfoHelp from './InputInfoHelp'

const ReceiveAddress = ({
  address,
  error,
  onChange,
}: {
  address: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
}) => {
  return (
    <div className="font-Roboto">
      <div className="mt-5 mb-2">
        <InputInfoHelp
          hideIcon
          hideEndIcon
          value={address}
          placeholder="Provide your address to receive inscription"
          onChange={onChange}
        >
          <span>
            <Trans>Enter the NFT name or ID here_Use X to represent unspecified digits</Trans>
          </span>{' '}
          <br />
          <Trans>For example:</Trans>
          <ul className="list-disc pl-10">
            <li>
              <Trans>To find an NFT starting with 123, enter 123X</Trans>
            </li>
            <li>
              <Trans>To find an NFT ending with 456, enter X456</Trans>
            </li>
          </ul>
        </InputInfoHelp>

        <p className="text-red-600 text-xs font-light mt-2">{error}</p>
      </div>

      <p className="flex text-xs font-light p-2 space-x-3 rounded-md bg-bgAlt4d">
        <InfoFullCircleIcon className="min-w-4" />
        <span>
          <Trans>
            Please note the inscribing transaction delivers the inscription to the receiving address directly
          </Trans>
        </span>
      </p>
    </div>
  )
}

export default ReceiveAddress

