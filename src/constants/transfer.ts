import { TransferStep } from '../types/enum'

export const QUICK_TRANSFER_AMOUNTS = [50, 100, 250, 500] as const

export const TRANSFER_STEPS = [
  { id: TransferStep.Recipient, label: 'Recipient' },
  { id: TransferStep.Amount, label: 'Amount' },
  { id: TransferStep.Review, label: 'Review' },
] as const

export const SUPPORTED_BANKS = ['DBS', 'OCBC', 'UOB', 'Standard Chartered', 'Other'] as const

export const TRANSFER_NOTE_MAX_LENGTH = 50
