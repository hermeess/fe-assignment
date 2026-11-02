import { MoneyValue } from '../../MoneyValue'
import { formatMoney } from '../../../lib/format'
import styles from './index.module.css'

type Props = { remaining: number; totalLimit: number; usage: number }

export function DailyLimitCard({ remaining, totalLimit, usage }: Props) {
  return (
    <section className={`panel ${styles.panel}`}>
      <div className={styles.icon}>↗</div>
      <p className="eyebrow">DAILY TRANSFER LIMIT</p>
      <h2>
        <MoneyValue amount={remaining} />
      </h2>
      <p className={styles.subtitle}>remaining today</p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label="Daily transfer limit used"
        aria-valuenow={Math.round(usage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${usage}%` }} />
      </div>
      <p className={styles.foot}>{formatMoney(totalLimit)} total limit</p>
      <div className={styles.divider} />
      <p className={styles.note}>
        <span>⟳</span> Resets daily. Applies to all transfers.
      </p>
    </section>
  )
}
