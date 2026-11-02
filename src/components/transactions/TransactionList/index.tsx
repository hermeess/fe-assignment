import { useMemo, useState } from 'react'
import { Input } from 'antd'
import type { Transaction } from '../../../types'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { TransactionItem } from '../TransactionItem'
import styles from './index.module.css'

export function TransactionList({
  transactions,
  hidden = false,
}: {
  transactions: Transaction[]
  hidden?: boolean
}) {
  const [searchInput, setSearchInput] = useState('')
  const search = useDebouncedValue(searchInput)
  const matches = useMemo(
    () =>
      transactions.filter((transaction) =>
        `${transaction.description} ${transaction.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      ),
    [transactions, search],
  )

  return (
    <section className={`panel ${styles.panel}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">ACTIVITY</p>
          <h2>Recent transactions</h2>
        </div>
        <div className={styles.searchWrap}>
          <Input
            aria-label="Search transactions"
            placeholder="Search transactions"
            prefix={<span aria-hidden="true">⌕</span>}
            allowClear
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
      </div>
      <p
        className={`${styles.resultCount} ${search ? '' : styles.reserved}`}
        aria-live="polite"
        aria-hidden={!search}
      >
        {search ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'}` : '\u00a0'}
      </p>
      {matches.length ? (
        <div className={styles.list}>
          {matches.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} hidden={hidden} />
          ))}
        </div>
      ) : (
        <div className={`empty-state ${styles.empty}`}>
          {search ? (
            <>
              <p>No transactions match your search.</p>
              <button className={styles.clearButton} onClick={() => setSearchInput('')}>
                Clear search
              </button>
            </>
          ) : (
            <p>No recent transactions.</p>
          )}
        </div>
      )}
    </section>
  )
}
