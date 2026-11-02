import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateTransferRequest, TransferResponse } from '../types'
import { createTransfer } from './queries'
import { refreshDashboardQueries } from './dashboard'
import { getApiErrorDetails, type ApiErrorDetails } from './errors'

type Handlers = {
  onSuccess: (response: TransferResponse) => void | Promise<void>
  onError: (error: ApiErrorDetails) => void
}

export function useCreateTransferMutation(handlers: Handlers) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateTransferRequest) => createTransfer(request),
    onSuccess: async (response) => {
      await handlers.onSuccess(response)
      await refreshDashboardQueries(queryClient)
    },
    onError: (error) => handlers.onError(getApiErrorDetails(error)),
  })
}
