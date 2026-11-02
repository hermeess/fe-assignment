import styles from './index.module.css'

export function InsightCard() {
  return (
    <section className={styles.card}>
      <span className={styles.icon}>✧</span>
      <p className="eyebrow">GOOD TO KNOW</p>
      <h3>Your money is in good hands.</h3>
      <p>Transfers to saved payees usually arrive within minutes.</p>
    </section>
  )
}
