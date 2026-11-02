import { apiFetch } from './client'
import type {
  AccountsResponse,
  CustomerResponse,
  PayeesResponse,
  TransactionsResponse,
  CreateTransferRequest,
  TransferResponse,
} from '../types'
import { API_PATHS, DASHBOARD_QUERY_KEYS } from '../constants/api'
export const dashboardKeys = DASHBOARD_QUERY_KEYS
function demoPath(path: string) {
  const scenario = new URLSearchParams(window.location.search).get('scenario')
  if (!scenario) return path
  return `${path}${path.includes('?') ? '&' : '?'}scenario=${encodeURIComponent(scenario)}`
}
export const getCustomer = () => apiFetch<CustomerResponse>(demoPath(API_PATHS.customer))
export const getAccounts = () => apiFetch<AccountsResponse>(demoPath(API_PATHS.accounts))
export const getTransactions = () =>
  apiFetch<TransactionsResponse>(demoPath(API_PATHS.transactions))
export const getPayees = () => apiFetch<PayeesResponse>(demoPath(API_PATHS.payees))
export const createTransfer = (data: CreateTransferRequest) =>
  apiFetch<TransferResponse>(API_PATHS.transfers, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
