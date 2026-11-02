import type { Account } from '../../types'
import { AccountType } from '../../types/enum'
import { MoneyValue } from '../MoneyValue'
import styles from './index.module.css'

export function AccountCard({ account, hidden = false }: { account: Account; hidden?: boolean }) {
  const cardClassName = [styles.card, account.type === AccountType.Credit && styles.credit]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClassName}>
      <div className={styles.top}>
        <span className={styles.icon}>
          {account.type === AccountType.Checking
            ? '↗'
            : account.type === AccountType.Savings
              ? '◈'
              : '▤'}
        </span>
        <span className={styles.type}>
          {account.type === AccountType.Credit ? 'CREDIT CARD' : 'DEPOSIT ACCOUNT'}
        </span>
      </div>
      <h3>{account.name}</h3>
      <p className={styles.masked}>{account.maskedNumber}</p>
      <div className={styles.balance}>
        <span>{account.type === AccountType.Credit ? 'Amount due' : 'Available balance'}</span>
        <strong>
          <MoneyValue amount={account.balance} hidden={hidden} />
        </strong>
      </div>
    </article>
  )
}
