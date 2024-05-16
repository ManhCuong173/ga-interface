import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

type Props = {
  open: boolean
  handleClose: () => void
  children?: ReactNode
  backdropClassname?: string
}

export default function ModalContainer({ ...props }: Props) {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[101]"
        onClose={() => {
          props.handleClose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`${props.backdropClassname} fixed inset-0 bg-black/80`} />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-[500px] justify-center px-4 text-center font-ProtoMono text-text-primary lg:px-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>{props.children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
