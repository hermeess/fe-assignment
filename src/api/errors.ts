import { ApiError } from './client'

export type ApiErrorDetails = {
  message: string
  code: string
  fields?: Record<string, string>
}

export function getApiErrorDetails(error: unknown): ApiErrorDetails {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      code: error.code,
      fields: error.fields,
    }
  }

  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    code: 'UNKNOWN',
  }
}
