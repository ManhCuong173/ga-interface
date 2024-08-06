import { useToggle } from '@/hooks/custom/useToggle'
import React, { PropsWithChildren } from 'react'

export interface DropdownActionProps {
  show: boolean
  toggle: () => void
}

const DropdownAction: React.FC<PropsWithChildren> = ({ children }) => {
  const [show, toggle] = useToggle(false)
  return (
    <div>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          show,
          toggle,
        } as DropdownActionProps)}
    </div>
  )
}

export default DropdownAction

