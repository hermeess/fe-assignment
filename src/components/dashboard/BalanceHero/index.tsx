import { MoneyValue } from '../../MoneyValue'
import styles from './index.module.css'

type Props = { total: number; hidden: boolean; onToggleVisibility: () => void }

export function BalanceHero({ total, hidden, onToggleVisibility }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.label}>
        <span className={styles.symbol}>✦</span> TOTAL AVAILABLE
      </div>
      <div className={styles.balanceRow}>
        <strong className={styles.amount}>
          <MoneyValue amount={total} hidden={hidden} />
        </strong>
        <button
          className={styles.balanceToggle}
          aria-label={hidden ? 'Show balances' : 'Hide balances'}
          title={hidden ? 'Show balances' : 'Hide balances'}
          aria-pressed={hidden}
          onClick={onToggleVisibility}
        >
          {hidden ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7" />
              <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.4 9.5 7-.4 1-1.2 2.1-2.2 3.1M6.2 6.3C4.3 7.6 3 9.5 2.5 12c.8 2.1 3.3 5.8 8.2 6.8" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          )}
        </button>
      </div>
      <span className={styles.caption}>Across 2 deposit accounts</span>
      <div className={styles.decoration} aria-hidden="true">
        M
      </div>
    </section>
  )
}
