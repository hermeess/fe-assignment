export const API_PATHS = {
  customer: '/api/customer',
  accounts: '/api/accounts',
  transactions: '/api/transactions?limit=8',
  payees: '/api/payees',
  transfers: '/api/transfers',
} as const

export const DASHBOARD_QUERY_KEYS = {
  customer: ['customer'] as const,
  accounts: ['accounts'] as const,
  transactions: ['transactions', 8] as const,
  payees: ['payees'] as const,
}
