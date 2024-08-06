import Trans from '../i18n/Trans'

export const PolicyConfirm = ({ confirmCheckbox, setConfirmCheckbox }: any) => {
  return (
    <div className="flex flex-col gap-4 uppercase">
      <div className="flex items-center gap-[16px]">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          checked={confirmCheckbox}
          onChange={(e) => setConfirmCheckbox(e.currentTarget.checked)}
          className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary accent-[rgba(239,35,44,1)] outline-none ring-transparent checked:bg-primary focus:ring-2 "
        />
        <label htmlFor="default-checkbox text-base font-light">I have read and agreed to the risk warning</label>
      </div>
      <div className="flex items-start gap-4">
        <span className="w-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 18.75C5.16751 18.75 1.25 14.8325 1.25 10C1.25 5.16751 5.16751 1.25 10 1.25C14.8325 1.25 18.75 5.16751 18.75 10C18.75 14.8325 14.8325 18.75 10 18.75ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
              fill="#4E473F"
            />
            <path
              d="M8.75193 13.75C8.75193 13.0596 9.31157 12.5 10.0019 12.5C10.6923 12.5 11.2519 13.0596 11.2519 13.75C11.2519 14.4404 10.6923 15 10.0019 15C9.31157 15 8.75193 14.4404 8.75193 13.75Z"
              fill="#4E473F"
            />
            <path
              d="M8.87438 6.2438C8.80779 5.57786 9.33074 5 10 5C10.6693 5 11.1922 5.57785 11.1256 6.2438L10.6872 10.6281C10.6519 10.9811 10.3548 11.25 10 11.25C9.64519 11.25 9.34811 10.9811 9.31281 10.6281L8.87438 6.2438Z"
              fill="#4E473F"
            />
          </svg>
        </span>
        <p className="test-xs font-light">
          <Trans>
            Please note the inscribing transaction delivers the inscription to the receiving address directly
          </Trans>
        </p>
      </div>
    </div>
  )
}
