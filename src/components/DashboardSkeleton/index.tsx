import { Skeleton } from 'antd'
import styles from './index.module.css'

export function DashboardSkeleton() {
  return (
    <main className={`dashboard ${styles.page}`} aria-label="Loading dashboard" aria-busy="true">
      <div className={styles.welcomeRow}>
        <div>
          <Skeleton active title={{ width: 235 }} paragraph={{ rows: 1, width: 180 }} />
        </div>
        <div className={styles.desktopButton}>
          <Skeleton.Button active block />
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="main-column">
          <div className={styles.hero}>
            <Skeleton
              active
              title={{ width: 130 }}
              paragraph={{ rows: 2, width: ['40%', '24%'] }}
            />
          </div>
          <div className={styles.sectionTitle}>
            <Skeleton.Button active size="small" />
          </div>
          <div className={styles.cards}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index}>
                <Skeleton active avatar title paragraph={{ rows: 2, width: ['80%', '52%'] }} />
              </div>
            ))}
          </div>
          <div className={styles.transactions}>
            <div className={styles.sectionTitle}>
              <Skeleton.Button active size="small" />
            </div>
            {Array.from({ length: 8 }, (_, index) => (
              <div className={styles.transaction} key={index}>
                <Skeleton active avatar title={false} paragraph={{ rows: 1, width: '64%' }} />
              </div>
            ))}
          </div>
        </div>
        <aside className={styles.rail}>
          <div>
            <Skeleton
              active
              title={{ width: '56%' }}
              paragraph={{ rows: 4, width: ['85%', '70%', '95%', '58%'] }}
            />
          </div>
          <div>
            <Skeleton
              active
              title={{ width: '54%' }}
              paragraph={{ rows: 3, width: ['90%', '75%', '62%'] }}
            />
          </div>
        </aside>
      </div>
      <div className={styles.mobileButton}>
        <Skeleton.Button active block />
      </div>
    </main>
  )
}
