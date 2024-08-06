'use client'

import { ACCESS_TOKEN_KEY } from '@/constants/auth.constant'
import { setInitialized, setToken } from '@/lib/features/auth/auth-slice'
import { useAppDispatch } from '@/lib/hook'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function AuthInitializer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
      if (accessToken) {
        dispatch(setToken(accessToken))
      }
    }

    dispatch(setInitialized(true))
  }, [dispatch])

  return children
}

