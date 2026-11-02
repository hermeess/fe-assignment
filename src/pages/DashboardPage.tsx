import { lazy, Suspense, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { prefetchPayees, useDashboardQueries } from '../api/dashboard'
import { AccountType } from '../types/enum'
import { DashboardHeader } from '../components/DashboardHeader'
import { DashboardSkeleton } from '../components/DashboardSkeleton'
import { DebugMenu } from '../components/DebugMenu'
import { TransactionList } from '../components/transactions/TransactionList'
import { AccountsSection } from '../components/dashboard/AccountsSection'
import { BalanceHero } from '../components/dashboard/BalanceHero'
import { DailyLimitCard } from '../components/dashboard/DailyLimitCard'
import { DashboardErrorState } from '../components/dashboard/DashboardErrorState'
import { DashboardWelcome } from '../components/dashboard/DashboardWelcome'
import { InsightCard } from '../components/dashboard/InsightCard'
import { useTransferDeepLink } from '../hooks/useTransferDeepLink'
import { useModal } from '../providers/ModalProvider'

const loadTransferDialog = () => import('../components/transfer/TransferDialog')
const TransferDialog = lazy(() =>
  loadTransferDialog().then(({ TransferDialog: Component }) => ({ default: Component })),
)

export default function DashboardPage() {
  const [balancesHidden, setBalancesHidden] = useState(false)
  const queryClient = useQueryClient()
  const { activeModal } = useModal()
  const { openTransfer, closeTransfer } = useTransferDeepLink()
  const { customer, accounts, transactions, failed, loading, errorCode, retry } =
    useDashboardQueries()
  const prefetchPayeesOnIntent = () => {
    prefetchPayees(queryClient)
    void loadTransferDialog()
  }

  if (failed) {
    return (
      <>
        <DashboardHeader />
        <DashboardErrorState code={errorCode} onRetry={() => void retry()} />
        <DebugMenu />
      </>
    )
  }

  if (loading || !customer.data || !accounts.data || !transactions.data) {
    return (
      <>
        <DashboardHeader />
        <DashboardSkeleton />
        <DebugMenu />
      </>
    )
  }

  const allAccounts = accounts.data.accounts
  const depositAccounts = allAccounts.filter((account) => account.type !== AccountType.Credit)
  const totalAvailable = depositAccounts.reduce((total, account) => total + account.balance, 0)
  const dailyLimit = customer.data.customer.dailyTransferLimit
  const remainingLimit = dailyLimit - customer.data.customer.transferredToday
  const limitUsage = Math.min(100, (customer.data.customer.transferredToday / dailyLimit) * 100)

  return (
    <div id="top">
      <DashboardHeader />
      <main className="dashboard" id="overview">
        <DashboardWelcome
          onNewTransfer={openTransfer}
          onIntent={prefetchPayeesOnIntent}
          disabled={depositAccounts.length === 0}
        />
        <div className="dashboard-grid">
          <div className="main-column">
            <BalanceHero
              total={totalAvailable}
              hidden={balancesHidden}
              onToggleVisibility={() => setBalancesHidden((hidden) => !hidden)}
            />
            <AccountsSection accounts={allAccounts} hidden={balancesHidden} />
            <TransactionList transactions={transactions.data.transactions} />
          </div>
          <aside className="side-column">
            <DailyLimitCard remaining={remainingLimit} totalLimit={dailyLimit} usage={limitUsage} />
            <InsightCard />
          </aside>
        </div>
      </main>
      <button
        className="mobile-transfer primary-button"
        disabled={depositAccounts.length === 0}
        onClick={openTransfer}
        onMouseEnter={prefetchPayeesOnIntent}
        onFocus={prefetchPayeesOnIntent}
      >
        ＋ New transfer
      </button>
      {activeModal === 'transfer' && depositAccounts.length > 0 && (
        <Suspense fallback={null}>
          <TransferDialog
            onClose={closeTransfer}
            accounts={depositAccounts}
            remaining={remainingLimit}
          />
        </Suspense>
      )}
      <DebugMenu />
    </div>
  )
}
