import type { Account } from '../../../types'
import { AccountCard } from '../../AccountCard'
import styles from './index.module.css'

export function AccountsSection({ accounts, hidden }: { accounts: Account[]; hidden: boolean }) {
  return (
    <section className={styles.section}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR MONEY</p>
          <h2>Accounts</h2>
        </div>
        <span className={styles.count}>{String(accounts.length).padStart(2, '0')} accounts</span>
      </div>
      {accounts.length > 0 ? (
        <div className={styles.grid}>
          {accounts.map((account) => (
            <AccountCard account={account} key={account.id} hidden={hidden} />
          ))}
        </div>
      ) : (
        <div className={`empty-state ${styles.empty}`}>No accounts to show right now.</div>
      )}
    </section>
  )
}
