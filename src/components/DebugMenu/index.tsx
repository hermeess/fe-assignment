import { useQueryClient } from '@tanstack/react-query'
import { setDashboardScenario } from '../../api/dashboard'
import styles from './index.module.css'

type Scenario = 'error' | 'empty'

export function DebugMenu() {
  const queryClient = useQueryClient()

  const activate = (scenario?: Scenario) => {
    void setDashboardScenario(queryClient, scenario)
  }

  return (
    <details className={styles.menu}>
      <summary>Demo tools</summary>
      <div className={styles.panel}>
        <p>Preview API states</p>
        <button onClick={() => activate('error')}>Show dashboard error</button>
        <button onClick={() => activate('empty')}>Show empty state</button>
        <button onClick={() => activate()}>Reset demo data</button>
      </div>
    </details>
  )
}
