import { FC, ReactNode, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import Button from '../button/button'

import s from './modal.module.scss'

import { Close } from 'assets/icons'

type ModalProps = {
  trigger: ReactNode
  title: ReactNode
  children: ReactNode
  showCloseBtn?: boolean
  footerBtn: ReactNode
}

export const Modal: FC<ModalProps> = ({
  trigger,
  title,
  children,
  showCloseBtn = true,
  footerBtn,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild
        onClick={() => {
          setOpen(true)
        }}
      >
        {trigger}
      </Dialog.Trigger>
      {open && (
        <Dialog.Portal>
          <Dialog.Content className={s.DialogContent}>
            <header className={showCloseBtn ? s.header : s.headerWithoutCLose}>
              <Dialog.Title>{title}</Dialog.Title>
              {showCloseBtn && (
                <Dialog.Close asChild>
                  <Close />
                </Dialog.Close>
              )}
            </header>
            <main className={s.main}>{children}</main>
            <footer className={showCloseBtn ? s.footer : s.footerWithoutClose}>
              {showCloseBtn && (
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
              )}
              <Dialog.Close
                asChild
                onClick={() => {
                  setOpen(false)
                }}
              >
                {footerBtn}
              </Dialog.Close>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}
