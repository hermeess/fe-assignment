import { Input, Select } from 'antd'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { Account } from '../../../types'
import { AccountType } from '../../../types/enum'
import { formatMoney } from '../../../lib/format'
import { QUICK_TRANSFER_AMOUNTS, TRANSFER_NOTE_MAX_LENGTH } from '../../../constants/transfer'
import type { TransferFormValues } from '../validation'
import shared from '../shared.module.css'
import styles from './index.module.css'

function sanitizeAmountInput(value: string) {
  const numericCharacters = value.replace(/[^\d.]/g, '')
  const decimalIndex = numericCharacters.indexOf('.')
  if (decimalIndex === -1) return numericCharacters

  const whole = numericCharacters.slice(0, decimalIndex)
  const fraction = numericCharacters
    .slice(decimalIndex + 1)
    .replace(/\./g, '')
    .slice(0, 2)
  return `${whole}.${fraction}`
}

type Props = {
  account: Account
  accounts: Account[]
  fromId: string
  onFromIdChange: (id: string) => void
  remaining: number
  note: string
  form: UseFormReturn<TransferFormValues>
}

export function AmountStep({
  account,
  accounts,
  fromId,
  onFromIdChange,
  remaining,
  note,
  form,
}: Props) {
  const { errors } = form.formState

  return (
    <div className={shared.dialogContent}>
      <h3>How much?</h3>
      <label className={shared.fieldLabel} id="from-account-label">
        From account
      </label>
      <Select
        id="from-account"
        aria-labelledby="from-account-label"
        className={shared.select}
        value={fromId}
        onChange={onFromIdChange}
        options={accounts
          .filter((item) => item.type !== AccountType.Credit)
          .map((item) => ({ value: item.id, label: `${item.name} · ${item.maskedNumber}` }))}
      />
      <label className={shared.fieldLabel} htmlFor="amount">
        Amount
      </label>
      <div className={styles.amountInputWrap}>
        <span>SGD</span>
        <Controller
          control={form.control}
          name="amount"
          render={({ field }) => (
            <Input
              id="amount"
              type="text"
              name={field.name}
              ref={field.ref}
              value={field.value}
              inputMode="decimal"
              placeholder="0.00"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? 'amount-error' : undefined}
              onChange={(event) => {
                form.clearErrors('amount')
                field.onChange(sanitizeAmountInput(event.target.value))
              }}
              onBlur={(event) => {
                field.onBlur()
                const raw = event.currentTarget.value.trim()
                if (/^\d+(\.\d{1,2})?$/.test(raw) && Number.isFinite(Number(raw))) {
                  field.onChange(Number(raw).toFixed(2))
                }
              }}
            />
          )}
        />
      </div>
      {errors.amount && (
        <p className={shared.fieldError} id="amount-error" role="alert">
          {errors.amount.message}
        </p>
      )}
      <div className={styles.quickAmounts}>
        {QUICK_TRANSFER_AMOUNTS.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => {
              form.clearErrors('amount')
              form.setValue('amount', value.toFixed(2), { shouldValidate: true })
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.availableRow}>
        <span>Available balance</span>
        <strong>{formatMoney(account.balance)}</strong>
      </div>
      <div className={styles.availableRow}>
        <span>Remaining daily limit</span>
        <strong>{formatMoney(remaining)}</strong>
      </div>
      <label className={`${shared.fieldLabel} ${styles.noteLabel}`} htmlFor="note">
        Note (optional)
        <span>
          {note.length}/{TRANSFER_NOTE_MAX_LENGTH}
        </span>
      </label>
      <Input
        id="note"
        maxLength={TRANSFER_NOTE_MAX_LENGTH}
        className={shared.textInput}
        {...form.register('note')}
      />
    </div>
  )
}
