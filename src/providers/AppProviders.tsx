import { useEffect, useState, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { persistor, store, type RootState } from '../store'
import { ModalProvider } from './ModalProvider'

function PreferenceEffects() {
  const { theme, segment } = useSelector((state: RootState) => state.preferences)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.segment = segment
  }, [theme, segment])
  return null
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } }),
  )
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PreferenceEffects />
        <QueryClientProvider client={queryClient}>
          <ModalProvider>{children}</ModalProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}
