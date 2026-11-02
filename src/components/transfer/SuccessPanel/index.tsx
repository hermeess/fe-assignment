import { formatMoney } from '../../../lib/format'
import styles from './index.module.css'

type Props = { amount: number; recipient: string; reference: string; onClose: () => void }

export function SuccessPanel({ amount, recipient, reference, onClose }: Props) {
  return (
    <div className={styles.panel} aria-live="polite">
      <span className={styles.mark}>✓</span>
      <p className="eyebrow">TRANSFER COMPLETE</p>
      <h2>Transfer sent</h2>
      <p>The money should arrive within minutes.</p>
      <div className={styles.detail}>
        <span>
          {formatMoney(amount)} to {recipient}
        </span>
        <span>Reference {reference}</span>
      </div>
      <button className="primary-button" onClick={onClose}>
        Back to dashboard
      </button>
    </div>
  )
}
