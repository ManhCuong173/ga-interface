'use client'

import CustomButton from '@/components/CustomButton'
import NFTSection from '@/components/mintNFTs/NFTSection'
import ProgressBar from '@/components/progress-bar'
import ReceiveAddress from '@/components/receiver'
import { useInscribeContext } from '@/context/InscribeContext'
import { useDebounce } from '@/hooks/custom/useDebouce'
import { selectAddressReceiver, setAddressReceiver, setProcessState } from '@/lib/features/wallet/mintProcess'
import { selectAddress } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { checkInvalidAddress } from '@/lib/truncate'
import { nftService } from '@/services/nft.service'
import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useState } from 'react'
import InputField from '../InputField'
import SelectField from '../Select'
import SelectControl from '../selectControl'

interface FrmStepMyOrderProps {
  setStep: React.Dispatch<SetStateAction<number>>
}

const FrmStepMyOrder = ({ setStep }: FrmStepMyOrderProps) => {
  const [confirmCheckbox, setConfirmCheckbox] = useState(false)
  const [filter, setFilter] = useState({
    number: '',
    page_size: 50,
  })
  const [nftIds, setNftIds] = useState<number[]>([1, 2, 3, 4, 5])

  const dispatch = useAppDispatch()

  const address = useAppSelector(selectAddress)
  const addressReceiver = useAppSelector(selectAddressReceiver)
  const MAX_PAGE_SIZE = 100

  const debounceValue = useDebounce(filter.number, 500)

  const { inscribeData, setInscribeData } = useInscribeContext()

  useEffect(() => {
    if (address) dispatch(setAddressReceiver(address))
  }, [address, dispatch])

  const getFilterNft = async () => {
    const data = await nftService.filterNft({
      number: debounceValue,
      nft: JSON.stringify(nftIds),
      page_size: filter.page_size,
    })
    return data
  }

  const {
    data: listNft,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['nfts', debounceValue, nftIds, filter.page_size],
    queryFn: () => {
      return getFilterNft()
    },
    enabled: !!nftIds.length,
  })

  useEffect(() => {
    setInscribeData({
      type: 'PICK_ALL_NFT',
      nfts: listNft?.data,
    })
  }, [listNft?.data, setInscribeData])

  const handleStepMyOrder = () => {
    dispatch(setProcessState(2))
  }

  const handleChangeNumberFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNumberFilter(e.currentTarget.value)
    setFilter({ ...filter, number: e.currentTarget.value })
  }

  const handleChangeReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressReceiver(e.currentTarget.value.trimStart()))
  }

  // useEffect(() => {
  //   if (address) {
  //     setAddressReceiver(address)
  //   }
  // }, [address])

  return (
    <>
      <div className="flex w-full flex-row-reverse items-center gap-4">
        <SelectField
          nftIds={nftIds}
          setNftIds={setNftIds}
          className="relative flex h-[44px] w-[120px] cursor-pointer items-center rounded border border-stroke"
        />
        <InputField
          onChange={handleChangeNumberFilter}
          className="w-full border border-stroke lg:h-[44px]"
          placeholder="SEARCH NUMBER"
        />
      </div>
      <div className="flex flex-col gap-4">
        {<SelectControl listNft={listNft?.data} />}

        <div className="flex items-center space-x-4">
          <div className="relative w-full">
            <div className="relative z-[1]">
              <ProgressBar
                value={filter.page_size}
                number={filter.page_size}
                className="h-[10px]"
                bulletSize={40}
                total={100}
              >
                <div className="tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                    <g filter="url(#filter0_d_972_73232)">
                      <rect
                        x="10.2642"
                        y="6"
                        width="40"
                        height="40"
                        rx="20"
                        fill="white"
                        shape-rendering="crispEdges"
                      />
                      <path
                        d="M28.5778 17.0582H31.9386L31.801 16.003L29.6635 15.9934V13.9073H30.8336V12.8387H31.9386V11.8186H33.0958V10.7833H34.2495V9.6958H37.5736V11.8186H35.3667V12.8387H34.2495V13.9073H33.0958V14.9759H31.9386V16.003H37.5736V17.0473H38.7294V18.1017H39.8446V19.1561H40.9801V20.2004H42.0852V21.2548H43.2005V30.6837H42.1157V32.7824H40.9629V34.8585H39.8256V36.9221H38.6708V38.0199H37.5611V39.0744H36.4687V40.1128H33.0593V39.0744H27.4651V40.1128H24.0683V39.0744H22.9418V38.0008H21.7978V36.9623H20.689V34.8151H19.545V32.791H18.4361V30.6614H17.3276V21.2395H18.4463V20.1954H19.5202V19.1878H20.6917V18.123H21.8895V17.0582H22.9211V15.9934H28.5778V17.0582Z"
                        fill="#EF232C"
                      />
                      <path
                        d="M28.5997 11.8145V14.987H26.3148V12.8531H25.2007V10.7571H27.4478V11.8145H28.5997Z"
                        fill="#EF232C"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_972_73232"
                        x="0.26416"
                        y="0"
                        width="60"
                        height="60"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_972_73232" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_972_73232" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                  <span className="tooltiptext">{filter.page_size}</span>
                </div>
              </ProgressBar>
            </div>
            <input
              type="range"
              className="absolute inset-0 z-[2] w-full cursor-pointer opacity-0"
              min={1}
              max={100}
              step={1}
              value={filter.page_size}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                setFilter({ ...filter, page_size: value })
              }}
            />
          </div>
          <span className="text-[20px] font-medium leading-[32px] tracking-[-2%] text-[#4E473F]">{MAX_PAGE_SIZE}</span>
        </div>

        {<NFTSection nfts={listNft?.data} isLoading={isLoading} canPick={true} />}
      </div>

      <ReceiveAddress
        addressReceiver={address}
        onChange={handleChangeReceiverAddress}
        error={checkInvalidAddress(addressReceiver) ? 'Invalid address' : ''}
      />

      <div className="flex flex-col gap-4 uppercase">
        <div className="flex items-start gap-[16px] sm:items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            checked={confirmCheckbox}
            onChange={(e) => {
              setConfirmCheckbox(e.currentTarget.checked)
            }}
            className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary accent-[rgba(239,35,44,1)] outline-none ring-transparent checked:bg-primary focus:ring-2 "
          />
          <label className="default-checkbox text-base font-light">I have read and agreed to the risk warning</label>
        </div>
        <CustomButton
          disabled={
            !confirmCheckbox ||
            !addressReceiver ||
            !address ||
            inscribeData.pickedNfts.length === 0 ||
            checkInvalidAddress(addressReceiver)
          }
          text={'Submit & Pay Invoice'}
          className="mx-auto sm:ml-auto w-[280px] lg:w-[300px] h-[75px]"
          handleClick={handleStepMyOrder}
        />
      </div>
    </>
  )
}

export default FrmStepMyOrder

