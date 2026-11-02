import styles from './index.module.css'

type Props = { onNewTransfer: () => void; onIntent: () => void; disabled?: boolean }

export function DashboardWelcome({ onNewTransfer, onIntent, disabled = false }: Props) {
  return (
    <div className={styles.row}>
      <div>
        <p className="eyebrow">TUESDAY, 20 OCTOBER</p>
        <h1>Good evening, Ava</h1>
        <p className={styles.copy}>Here’s your financial overview for today.</p>
      </div>
      <button
        className={`primary-button ${styles.desktopTransfer}`}
        disabled={disabled}
        onClick={onNewTransfer}
        onMouseEnter={onIntent}
        onFocus={onIntent}
      >
        <span>＋</span> New transfer
      </button>
    </div>
  )
}
