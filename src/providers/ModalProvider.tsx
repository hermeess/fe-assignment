import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type ModalName = 'transfer'
type ModalContextValue = {
  activeModal: ModalName | null
  openModal: (name: ModalName) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName | null>(null)
  const openModal = useCallback((name: ModalName) => setActiveModal(name), [])
  const closeModal = useCallback(() => setActiveModal(null), [])
  const value = useMemo(
    () => ({ activeModal, openModal, closeModal }),
    [activeModal, openModal, closeModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  const value = useContext(ModalContext)
  if (!value) throw new Error('useModal must be used inside ModalProvider')
  return value
}
