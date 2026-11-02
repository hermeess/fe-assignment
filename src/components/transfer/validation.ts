import { z } from 'zod'
import { SUPPORTED_BANKS, TRANSFER_NOTE_MAX_LENGTH } from '../../constants/transfer'

export const recipientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter a name with at least 2 characters.')
    .max(50, 'Name must be 50 characters or fewer.'),
  accountNumber: z.string().regex(/^\d{8}$/, 'Enter a valid 8-digit account number.'),
  bank: z
    .string()
    .trim()
    .min(1, 'Choose a bank.')
    .max(30, 'Bank name must be 30 characters or fewer.')
    .refine((value) => SUPPORTED_BANKS.some((bank) => bank === value), 'Choose a supported bank.'),
})

export const transferFormSchema = z.object({
  amount: z
    .string()
    .min(1, 'Enter an amount.')
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(value) && Number(value) >= 1,
      'Enter at least SGD 1.00 with no more than 2 decimal places.',
    ),
  note: z
    .string()
    .max(TRANSFER_NOTE_MAX_LENGTH, `Note must be ${TRANSFER_NOTE_MAX_LENGTH} characters or fewer.`),
})

export type RecipientDraft = z.infer<typeof recipientSchema>
export type TransferFormValues = z.infer<typeof transferFormSchema>

export function getRecipientErrors(value: unknown) {
  const result = recipientSchema.safeParse(value)
  return result.success ? {} : z.flattenError(result.error).fieldErrors
}
