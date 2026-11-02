import { usePreferences } from '../../hooks/usePreferences'
import { Segment } from '../../types/enum'
import styles from './index.module.css'

export function DashboardHeader() {
  const { theme, segment, setTheme, setSegment } = usePreferences()
  return (
    <header className={styles.topbar}>
      <a className={styles.brand} href="#top" aria-label="Meridian home">
        <span className={styles.brandMark}>M</span>
        <span>Meridian</span>
      </a>
      <nav className={styles.nav} aria-label="Main navigation">
        <a className={styles.active} href="#overview">
          Overview
        </a>
        <span>Cards</span>
        <span>Payments</span>
        <span>Insights</span>
      </nav>
      <div className={styles.actions}>
        <div className={styles.segmentSwitch} aria-label="Customer segment">
          <button
            aria-pressed={segment === Segment.Retail}
            onClick={() => setSegment(Segment.Retail)}
          >
            Retail
          </button>
          <button
            aria-pressed={segment === Segment.Premium}
            onClick={() => setSegment(Segment.Premium)}
          >
            Premium
          </button>
        </div>
        <button
          className={styles.iconButton}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☼' : '◐'}
        </button>
        <span className={styles.avatar} aria-label="Ava Chen">
          AC
        </span>
      </div>
    </header>
  )
}
