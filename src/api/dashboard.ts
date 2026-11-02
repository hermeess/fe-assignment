import { useQuery, type QueryClient } from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEYS } from '../constants/api'
import { getAccounts, getCustomer, getPayees, getTransactions } from './queries'
import { getApiErrorDetails } from './errors'

export function useDashboardQueries() {
  const customer = useQuery({ queryKey: DASHBOARD_QUERY_KEYS.customer, queryFn: getCustomer })
  const accounts = useQuery({ queryKey: DASHBOARD_QUERY_KEYS.accounts, queryFn: getAccounts })
  const transactions = useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.transactions,
    queryFn: getTransactions,
  })
  const failed = customer.isError || accounts.isError || transactions.isError
  const loading = customer.isPending || accounts.isPending || transactions.isPending
  const error = [customer.error, accounts.error, transactions.error].find(Boolean)

  return {
    customer,
    accounts,
    transactions,
    failed,
    loading,
    errorCode: error ? getApiErrorDetails(error).code : 'UNKNOWN',
    retry: () => Promise.all([customer.refetch(), accounts.refetch(), transactions.refetch()]),
  }
}

export function prefetchPayees(queryClient: QueryClient): void {
  void queryClient
    .query({
      queryKey: DASHBOARD_QUERY_KEYS.payees,
      queryFn: getPayees,
      staleTime: 30_000,
    })
    .catch(() => undefined)
}

export function refreshDashboardQueries(queryClient: QueryClient) {
  return Promise.all(
    [
      DASHBOARD_QUERY_KEYS.customer,
      DASHBOARD_QUERY_KEYS.accounts,
      DASHBOARD_QUERY_KEYS.transactions,
    ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
  )
}

export async function setDashboardScenario(queryClient: QueryClient, scenario?: 'error' | 'empty') {
  const url = new URL(window.location.href)
  if (scenario) url.searchParams.set('scenario', scenario)
  else url.searchParams.delete('scenario')
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  await refreshDashboardQueries(queryClient)
}
