import { formatMoney } from '../../lib/format'
import styles from './index.module.css'

type Props = {
  amount: number
  hidden?: boolean
  incoming?: boolean
  className?: string
}

export function MoneyValue({ amount, hidden = false, incoming = false, className = '' }: Props) {
  const value = hidden
    ? '••••••'
    : incoming
      ? `+${formatMoney(Math.abs(amount))}`
      : formatMoney(amount)

  return (
    <span
      className={[styles.value, className].filter(Boolean).join(' ')}
      aria-label={hidden ? 'Balance hidden' : undefined}
    >
      {value}
    </span>
  )
}
