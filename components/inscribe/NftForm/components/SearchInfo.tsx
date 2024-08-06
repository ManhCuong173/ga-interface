import Trans from '@/components/i18n/Trans'

const SearchInfoHelper = () => {
  return (
    <div>
      <span>
        <Trans>Enter the NFT name or ID here_Use X to represent unspecified digits</Trans>
      </span>{' '}
      <br />
      <Trans>For example:</Trans>
      <ul className="list-disc pl-10">
        <li>
          <Trans>To find an NFT starting with 123, enter 123X</Trans>.
        </li>
        <li>
          <Trans>To find an NFT ending with 456, enter X456</Trans>.
        </li>
      </ul>
    </div>
  )
}

export default SearchInfoHelper

