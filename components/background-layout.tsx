'use client'

import { homePageItems } from '@/constants/home-page-items.constant'
import {
  selectActiveSection,
  setActiveSection,
} from '@/lib/features/home-section/home-section-slice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function BackgroundLayout({ children }: PropsWithChildren) {
  const path = usePathname()
  const isHomePage = path === '/'
  const active = useAppSelector(selectActiveSection)
  const dispatch = useAppDispatch()
  const activeSection = useAppSelector(selectActiveSection)

  useEffect(() => {
    const options = {
      root: document.getElementById('root-div'),
      rootMargin: '0px',
      threshold: 0.5,
    }

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          dispatch(setActiveSection(entry.target.id))
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    ;[{ id: 'background' }, ...homePageItems, { id: 'footer' }].forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [dispatch, path])

  useEffect(() => {
    dispatch(setActiveSection(''))
  }, [dispatch, path])

  return (
    <div
      id='root-div'
      className={`${isHomePage ? 'snap-y snap-mandatory bg-[url(/images/commons/background-home-full.png)]' : 'bg-[#FAF5F0]'} h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden`}
      style={{
        backgroundSize: '100% auto',
      }}
    >
      {children}
      <ToastContainer />
    </div>
  )
}
