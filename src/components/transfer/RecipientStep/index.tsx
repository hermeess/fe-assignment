import { useMemo, useState } from 'react'
import { Input, Segmented } from 'antd'
import type { Payee } from '../../../types'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import type { RecipientDraft } from '../validation'
import shared from '../shared.module.css'
import { NewRecipientFields } from '../NewRecipientFields'
import styles from './index.module.css'

export type RecipientStepState = {
  selected: Payee | null
  isNew: boolean
  recipient: RecipientDraft | null
}

export type RecipientStepActions = {
  onSelect: (payee: Payee) => void
  onNewRecipient: (isNew: boolean) => void
  onRecipientChange: (recipient: RecipientDraft) => void
}

type Props = {
  payees: Payee[]
  loading: boolean
  state: RecipientStepState
  actions: RecipientStepActions
}

export function RecipientStep({ payees, loading, state, actions }: Props) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)
  const filteredPayees = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    return payees.filter((payee) => `${payee.name} ${payee.bank}`.toLowerCase().includes(query))
  }, [payees, debouncedSearch])

  const emptyResults = loading || filteredPayees.length === 0

  return (
    <div className={shared.dialogContent}>
      <h3>Who are you sending to?</h3>
      <Segmented
        className={styles.recipientMode}
        block
        value={state.isNew ? 'new' : 'saved'}
        options={[
          { label: 'Saved payees', value: 'saved' },
          { label: 'New recipient', value: 'new' },
        ]}
        onChange={(value) => actions.onNewRecipient(value === 'new')}
      />
      {state.isNew && (
        <NewRecipientFields value={state.recipient} onChange={actions.onRecipientChange} />
      )}
      {!state.isNew && (
        <>
          <label className={shared.fieldLabel} htmlFor="payee-search">
            Search payees
          </label>
          <Input
            id="payee-search"
            className={shared.textInput}
            placeholder="Search saved payees"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div
            className={`${styles.payeeList} ${emptyResults ? styles.message : ''}`}
            role="listbox"
            aria-label="Payees"
            aria-busy={loading}
          >
            {loading ? (
              <p>Loading payees…</p>
            ) : filteredPayees.length ? (
              filteredPayees.map((payee) => (
                <button
                  className={`${styles.option} ${state.selected?.id === payee.id ? styles.selected : ''}`}
                  role="option"
                  aria-selected={state.selected?.id === payee.id}
                  key={payee.id}
                  onClick={() => actions.onSelect(payee)}
                >
                  <span className={styles.avatar}>{payee.initials}</span>
                  <span className={styles.copy}>
                    <strong>{payee.name}</strong>
                    <span>
                      {payee.bank} · {payee.accountNumberMasked}
                    </span>
                  </span>
                  <span className={styles.radio} />
                </button>
              ))
            ) : (
              <p>No saved payees match your search.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
