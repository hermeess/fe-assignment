import { useCallback, useEffect } from 'react'
import { useModal } from '../providers/ModalProvider'

export function useTransferDeepLink() {
  const { openModal, closeModal } = useModal()

  const openTransfer = useCallback(() => {
    openModal('transfer')
    if (window.location.hash !== '#transfer') window.location.hash = 'transfer'
  }, [openModal])

  const closeTransfer = useCallback(() => {
    closeModal()
    if (window.location.hash === '#transfer') {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}`,
      )
    }
  }, [closeModal])

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === '#transfer') openModal('transfer')
      else closeModal()
    }

    if (window.location.hash === '#transfer') openModal('transfer')
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [openModal, closeModal])

  return { openTransfer, closeTransfer }
}
