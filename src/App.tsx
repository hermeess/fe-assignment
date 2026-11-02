import DashboardPage from './pages/DashboardPage'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import { usePreferences } from './hooks/usePreferences'
export default function App() {
  const { theme: selectedTheme } = usePreferences()
  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: selectedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: 'var(--brand)', borderRadius: 9, fontFamily: 'var(--font-sans)' },
      }}
    >
      <DashboardPage />
    </ConfigProvider>
  )
}
