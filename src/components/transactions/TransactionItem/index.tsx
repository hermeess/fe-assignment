import type { Transaction } from '../../../types'
import { TransactionDirection, TransactionStatus } from '../../../types/enum'
import { formatShortDate } from '../../../lib/format'
import { MoneyValue } from '../../MoneyValue'
import styles from './index.module.css'

export function TransactionItem({
  transaction,
  hidden = false,
}: {
  transaction: Transaction
  hidden?: boolean
}) {
  const incoming = transaction.direction === TransactionDirection.In

  return (
    <article className={styles.row}>
      <span className={`${styles.icon} ${incoming ? styles.incoming : ''}`}>
        {incoming ? '↓' : '↗'}
      </span>
      <div className={styles.info}>
        <strong>{transaction.description}</strong>
        <span>
          {transaction.category} · {formatShortDate(transaction.date)}
        </span>
      </div>
      <div className={styles.value}>
        <strong className={incoming ? styles.positive : ''}>
          <MoneyValue
            amount={incoming ? transaction.amount : -transaction.amount}
            hidden={hidden}
            incoming={incoming}
          />
        </strong>
        {transaction.status === TransactionStatus.Pending && (
          <span className={styles.pending}>Pending</span>
        )}
      </div>
    </article>
  )
}
