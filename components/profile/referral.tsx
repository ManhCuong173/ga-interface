import useGetUserRefCodeId from '@/hooks/api/useGetUserRefCodeId'
import useGetUserTotalRef from '@/hooks/api/useGetUserTotalRef'
import { IconCopy } from '../button'
import { REFERRAL_KEY } from '@/constants/auth.constant'
import { useBitcoinAccount } from '@/context/BitcoinProviderContext/hook'
import { useAppSelector } from '@/lib/hook'
import { selectToken } from '@/lib/features/auth/auth-slice'

export default function Referral() {
  const token = useAppSelector(selectToken)
  const { address, publicKey } = useBitcoinAccount()

  const { data: refCodeIdData, isLoading: isLoadingRefCodeId } = useGetUserRefCodeId([address, token])
  const { data: totalRefData, isLoading: isLoadingTotalRef } = useGetUserTotalRef([address, token])

  let referrerLink = ''
  if (typeof window !== 'undefined' && address && publicKey) {
    referrerLink = `${window.location.origin}?${REFERRAL_KEY}=${refCodeIdData?.ref_id}`
  }

  const disableCopy = isLoadingRefCodeId || !refCodeIdData || !address || !publicKey

  return (
    <div className="font-ProtoMono my-6 lg:my-16 flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center">
        <p className="font-light text-xs text-text-sub leading-[18px] tracking-[0.03em] text-center">Your ReferralID</p>
        <p className="font-medium text-2xl max-w-[250px] leading-8 tracking-[-0.02em] text-black1 text-center">
          {!isLoadingRefCodeId ? (refCodeIdData ? refCodeIdData.ref_id : 'No data') : 'loading...'}
        </p>
      </div>
      <IconCopy
        text={referrerLink}
        className="w-[unset] h-[unset]"
        customIcon={
          <span
            className={`${disableCopy ? 'opacity-50 cursor-not-allowed' : 'hover:bg-text-sub/10 transition-colors'} h-9 rounded-full border border-[#D4C79C] py-2 px-4 flex gap-2`}
          >
            <span>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3284_24204)">
                  <path
                    d="M13.8333 6.60962H7.83333C7.09695 6.60962 6.5 7.20657 6.5 7.94295V13.943C6.5 14.6793 7.09695 15.2763 7.83333 15.2763H13.8333C14.5697 15.2763 15.1667 14.6793 15.1667 13.943V7.94295C15.1667 7.20657 14.5697 6.60962 13.8333 6.60962Z"
                    stroke="#AE9955"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.83398 10.6097H3.16732C2.8137 10.6097 2.47456 10.4692 2.22451 10.2191C1.97446 9.96909 1.83398 9.62995 1.83398 9.27633V3.27633C1.83398 2.9227 1.97446 2.58357 2.22451 2.33352C2.47456 2.08347 2.8137 1.94299 3.16732 1.94299H9.16732C9.52094 1.94299 9.86008 2.08347 10.1101 2.33352C10.3602 2.58357 10.5007 2.9227 10.5007 3.27633V3.94299"
                    stroke="#AE9955"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3284_24204">
                    <rect width="16" height="16" fill="white" transform="translate(0.5 0.609619)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className="font-light text-sm leading-5 tracking-[-0.03em] text-black1">Copy my link</span>
          </span>
        }
      />
      <p className="font-medium text-sm leading-5 tracking-[-0.03em] text-text-sub">
        Total: {!isLoadingTotalRef ? (totalRefData ? totalRefData.ref_total + ' referrals' : 'No data') : 'loading...'}
      </p>
    </div>
  )
}

