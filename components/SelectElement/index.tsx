import { MarkIcon } from '@/components/ui/icons'
import useClickOutside from '@/hooks/custom/useClickOutside'
import { cn } from '@/lib/utils'
import { FiveElements } from '@/types/fiveElements'
import { fiveElements } from '@/utils/const'
import Image from 'next/image'
import { memo, useCallback, useRef, useState } from 'react'

interface PropsSelect {
  className?: string
  onSelectElements: (elements: number[]) => void
  elements: number[]
}

const allId = -1
const allElement = [
  {
    id: allId,
    title: 'All Element',
    icon: '',
    type: '',
  },
  ...fiveElements,
]

const SelectElement = ({ className, elements, onSelectElements }: PropsSelect) => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(!show)

  const handleSetSelecteds = useCallback(
    (element: FiveElements) => {
      const _elements = [...elements]

      let clearExistElements = _elements.filter((item) => item !== element.id)

      if (element.id === allId) {
        if (_elements.includes(allId)) {
          clearExistElements = []
        } else {
          clearExistElements = allElement.map((e) => e.id)
        }
      } else {
        if (_elements.includes(allId)) {
          clearExistElements = clearExistElements.filter((item) => item !== allId)
        }
      }

      if (!_elements.includes(element.id)) {
        clearExistElements.unshift(element.id)
      }

      if (clearExistElements.length === allElement.length - 1 && !clearExistElements.includes(allId)) {
        clearExistElements.unshift(allId)
      }

      onSelectElements(clearExistElements)
    },
    [elements, onSelectElements],
  )

  useClickOutside({ ref, show, setShow })

  return (
    <div ref={ref} className={className}>
      <div onClick={handleShow} className="flex w-[120px] cursor-pointer items-center justify-center gap-1 ">
        <div className="flex w-[76px] translate-x-[15px] justify-center">
          {allElement.map((element, index) => {
            if (element.id === allId) return <></>
            return (
              <Image
                key={element.id}
                src={element.icon}
                alt={element.title}
                title={element.title}
                width={20}
                style={{
                  transform: `translateX(-${index * 6}px)`,
                }}
              />
            )
          })}
        </div>
        <div className={cn(show ? 'rotate-180' : '', 'transition-all duration-150 ease-linear')}>
          <svg
            className="stroke-black1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.69247 7.09327C3.91711 6.83119 4.31167 6.80084 4.57375 7.02548L10.0003 11.6768L15.4269 7.02548C15.689 6.80084 16.0836 6.83119 16.3082 7.09327C16.5328 7.35535 16.5025 7.74991 16.2404 7.97455L10.4071 12.9745C10.173 13.1752 9.82765 13.1752 9.59359 12.9745L3.76026 7.97455C3.49818 7.74991 3.46783 7.35535 3.69247 7.09327Z"
            />
          </svg>
        </div>
      </div>

      {/* sub menu */}
      <ul
        className={cn(
          show ? 'h-[228px]' : 'h-0 opacity-0',
          'absolute left-0 top-[115%] z-[50] space-y-[2px] overflow-hidden rounded-xl border bg-text-black_3 shadow-[3px_6px_30px_0_rgba(0,0,0,0.12)] transition-all duration-300 ease-linear',
          'text-sm font-Roboto',
        )}
      >
        {allElement.map((element) => {
          return (
            <li
              onClick={() => {
                handleSetSelecteds(element)
              }}
              className="flex justify-between box-border min-w-36 bg-white hover:bg-secondary h-9 w-full items-center px-4 py-2"
            >
              <div className="flex space-x-4 ">
                {element.icon && (
                  <Image src={element.icon} alt={element.title} title={element.title} width={20} height={20} />
                )}
                <span>{element.title}</span>
              </div>

              {elements.includes(element.id) && <MarkIcon />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(SelectElement)
