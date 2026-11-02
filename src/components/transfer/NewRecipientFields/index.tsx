import { Input, Select } from 'antd'
import { SUPPORTED_BANKS } from '../../../constants/transfer'
import { getRecipientErrors, type RecipientDraft } from '../validation'
import shared from '../shared.module.css'
import styles from './index.module.css'

type Props = {
  value: RecipientDraft | null
  onChange: (recipient: RecipientDraft) => void
}

export function NewRecipientFields({ value, onChange }: Props) {
  const errors = value ? getRecipientErrors(value) : {}
  const recipient = value ?? { name: '', accountNumber: '', bank: '' }

  return (
    <div className={styles.fields}>
      <label className={shared.fieldLabel} htmlFor="new-name">
        Recipient name
      </label>
      <Input
        id="new-name"
        className={shared.textInput}
        aria-invalid={Boolean(errors.name?.length)}
        aria-describedby={errors.name?.length ? 'new-name-error' : undefined}
        value={recipient.name}
        onChange={(event) => onChange({ ...recipient, name: event.target.value })}
      />
      {errors.name?.[0] && (
        <p className={shared.fieldError} id="new-name-error" role="alert">
          {errors.name[0]}
        </p>
      )}

      <label className={shared.fieldLabel} htmlFor="new-account">
        Account number
      </label>
      <Input
        id="new-account"
        className={shared.textInput}
        inputMode="numeric"
        maxLength={8}
        aria-invalid={Boolean(errors.accountNumber?.length)}
        aria-describedby={errors.accountNumber?.length ? 'new-account-error' : undefined}
        value={recipient.accountNumber}
        onChange={(event) =>
          onChange({ ...recipient, accountNumber: event.target.value.replace(/\D/g, '') })
        }
      />
      {errors.accountNumber?.[0] && (
        <p className={shared.fieldError} id="new-account-error" role="alert">
          {errors.accountNumber[0]}
        </p>
      )}

      <label className={shared.fieldLabel} id="new-bank-label">
        Bank
      </label>
      <Select
        id="new-bank"
        aria-labelledby="new-bank-label"
        aria-invalid={Boolean(errors.bank?.length)}
        aria-describedby={errors.bank?.length ? 'new-bank-error' : undefined}
        className={shared.select}
        value={recipient.bank}
        options={SUPPORTED_BANKS.map((bank) => ({ value: bank, label: bank }))}
        placeholder="Choose a bank"
        onChange={(bank) => onChange({ ...recipient, bank })}
      />
      {errors.bank?.[0] && (
        <p className={shared.fieldError} id="new-bank-error" role="alert">
          {errors.bank[0]}
        </p>
      )}
    </div>
  )
}
