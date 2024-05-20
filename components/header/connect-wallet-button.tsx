'use client'

import { default as walletWhite } from '@/icons/header/wallet-white.svg'
import { default as wallet } from '@/icons/header/wallet.svg'
import { selectedPublicKey, setAddress, setPublicKey } from '@/lib/features/wallet/wallet-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { getUnisat } from '@/lib/unisat'
import { cn } from '@/lib/utils'
import { userService } from '@/services/user.service'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Menu from './menu'

type Props = {
  mode: 'transparent' | 'solid'
}

export default function ConnectWalletButton({ mode }: Props) {
  const [showMenu, setShowMenu] = useState(false)

  const path = usePathname()
  const dispatch = useAppDispatch()
  // const address = useAppSelector(selectAddress);
  const [address, setAddressUnisat] = useState('')
  const publicKey = useAppSelector(selectedPublicKey)

  const [hasPubkeyImported, setPubkeyImported] = useState(false)
  const [unisatInstalled, setUnisatInstalled] = useState(false)

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  })

  useEffect(() => {
    if (window !== undefined && window.localStorage.getItem('address')) {
      setAddress(String(window.localStorage.getItem('address')))
      dispatch(setAddress(address))
    }
  }, [address, dispatch])

  const getBasicInfo = useCallback(async () => {
    const unisat = (window as any).unisat
    const [address] = await unisat?.getAccounts()
    if (address) {
      setAddressUnisat(address)
      dispatch(setAddress(address))
      if (window !== undefined) {
        window.localStorage.setItem('address', address)
      }
    }

    const publicKey = await unisat?.getPublicKey()
    dispatch(setPublicKey(publicKey))
  }, [dispatch])

  const importPubKeyMutation = useMutation({
    mutationFn: (data: { public_key: string; wallet_address: string }) => userService.importUserPubkey(data),
  })

  const handleAccountsChanged = useCallback(
    async (_accounts: string[]) => {
      if (selfRef.current.accounts[0] === _accounts[0]) {
        // prevent from triggering twice
        return
      }
      selfRef.current.accounts = _accounts
      if (_accounts.length > 0) {
        getBasicInfo()
      }
    },
    [getBasicInfo],
  )

  useEffect(() => {
    async function checkUnisat() {
      let unisat = await getUnisat()

      if (unisat) {
        setUnisatInstalled(true)
      } else if (!unisat) return

      handleAccountsChanged(await unisat.getAccounts())

      unisat.on('accountsChanged', handleAccountsChanged)
      return () => {
        unisat.removeListener('accountsChanged', handleAccountsChanged)
      }
    }

    if (window !== undefined) {
      checkUnisat().then()
    }
  }, [handleAccountsChanged])

  useEffect(() => {
    if (!!address && !!publicKey && !hasPubkeyImported) {
      importPubKeyMutation.mutate({
        public_key: publicKey,
        wallet_address: address,
      })
      setPubkeyImported(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, publicKey])

  const handleClick = async () => {
    if (!unisatInstalled) {
      if (window) {
        window.location.href = 'https://unisat.io'
      }
    } else if (address) {
      setShowMenu((prev) => !prev)
    } else {
      if (window !== undefined) {
        const result = await (window as any).unisat.requestAccounts()
        handleAccountsChanged(result)
      }
    }
  }

  const handleDisconnect = () => {
    handleAccountsChanged([])
    dispatch(setAddress(''))
    setAddressUnisat('')
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <button
        className={cn(
          `h-[42px] w-full rounded-[10px]   border-solid border-[1px] flex justify-center items-center p-[8px_16px] cursor-pointer`,
          mode === 'transparent' ? 'border-white' : 'border-red-light',
        )}
        onClick={handleClick}
      >
        {!address && (
          <>
            <div
              className={cn(
                'relative h-6 w-6 transition-all',
                mode === 'transparent' ? 'fill-white' : 'fill-red-light',
              )}
            >
              {mode === 'transparent' && (
                <Image
                  src={walletWhite}
                  alt=""
                  width={24}
                  height={24}
                  className={'absolute inset-0 transition-opacity'}
                />
              )}
              {mode === 'solid' && (
                <Image src={wallet} alt="" width={24} height={24} className={'absolute inset-0 transition-opacity'} />
              )}
            </div>
            <span
              className={cn(
                'text-nowrap transition-all text-base font-medium ml-[18px] font-Roboto',
                mode === 'transparent' ? 'text-white' : 'text-red-light',
              )}
            >
              Connect Wallet
            </span>
          </>
        )}
        {address && <Menu mode={mode} handleDisconnect={handleDisconnect} />}
      </button>
      {address && (
        <button
          onClick={() => {
            handleDisconnect()
          }}
          className="lg:hidden w-full text-black1 text-base font-medium leading-[130%] font-Roboto"
        >
          Disconnect
        </button>
      )}
    </div>
  )
}

