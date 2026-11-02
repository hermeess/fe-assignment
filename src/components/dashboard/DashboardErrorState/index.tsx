import styles from './index.module.css'

type Props = { code: string; onRetry: () => void }

export function DashboardErrorState({ code, onRetry }: Props) {
  return (
    <main className={`dashboard ${styles.page}`}>
      <div className={styles.card}>
        <span className={styles.mark}>!</span>
        <h1>We couldn't load your dashboard.</h1>
        <p>We couldn’t retrieve your account information. Please try again.</p>
        <p className={styles.errorCode}>
          Error code <code>{code}</code>
        </p>
        <button className="primary-button" onClick={onRetry}>
          Retry
        </button>
      </div>
    </main>
  )
}
