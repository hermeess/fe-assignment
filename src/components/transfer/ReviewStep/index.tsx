import { formatMoney } from '../../../lib/format'
import type { Account, Payee } from '../../../types'
import shared from '../shared.module.css'
import styles from './index.module.css'

type Props = {
  account: Account
  recipientName: string
  recipient: { name: string; bank: string; accountNumber: string } | null
  selected: Payee | null
  amount: number
  note: string
  error: string
}

export function ReviewStep({
  account,
  recipientName,
  recipient,
  selected,
  amount,
  note,
  error,
}: Props) {
  return (
    <div className={shared.dialogContent}>
      <h3>Check the details</h3>
      <div className={styles.card}>
        <div className={styles.row}>
          <span>From</span>
          <strong>
            {account.name} · {account.maskedNumber}
          </strong>
        </div>
        <div className={styles.row}>
          <span>To</span>
          <strong>
            {recipientName} ·{' '}
            {selected
              ? `${selected.bank} · ${selected.accountNumberMasked}`
              : `${recipient?.bank} · •••• ${recipient?.accountNumber.slice(-4)}`}
          </strong>
        </div>
        <div className={styles.row}>
          <span>Amount</span>
          <strong>{formatMoney(amount)}</strong>
        </div>
        <div className={styles.row}>
          <span>Fee</span>
          <strong>{formatMoney(0)}</strong>
        </div>
        {note && (
          <div className={styles.row}>
            <span>Note</span>
            <strong>{note}</strong>
          </div>
        )}
        <div className={`${styles.row} ${styles.total}`}>
          <span>Total</span>
          <strong>{formatMoney(amount)}</strong>
        </div>
      </div>
      <p className={styles.arrivalNote}>ⓘ Usually arrives within minutes.</p>
      {error && (
        <p className={shared.alertError} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
