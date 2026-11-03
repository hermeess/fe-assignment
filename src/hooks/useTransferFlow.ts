import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Account, CreateTransferRequest, Payee } from '../types'
import { dashboardKeys, getPayees } from '../api/queries'
import { useCreateTransferMutation } from '../api/transfers'
import { formatMoney } from '../lib/format'
import { TRANSFER_STEPS } from '../constants/transfer'
import { TransferStep } from '../types/enum'
import {
  recipientSchema,
  transferFormSchema,
  type RecipientDraft,
  type TransferFormValues,
} from '../components/transfer/validation'

type Props = { onClose: () => void; accounts: Account[]; remaining: number }
type TransferSuccess = { reference: string; amount: number; recipient: string }

export function useTransferFlow({ onClose, accounts, remaining }: Props) {
  const [step, setStep] = useState<TransferStep>(TransferStep.Recipient)
  const activeStepIndex = TRANSFER_STEPS.findIndex(({ id }) => id === step)
  const [selected, setSelected] = useState<Payee | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [recipient, setRecipient] = useState<RecipientDraft | null>(null)
  const [fromId, setFromId] = useState(accounts[0]?.id ?? '')
  const [sendError, setSendError] = useState('')
  const [success, setSuccess] = useState<TransferSuccess | null>(null)
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: { amount: '', note: '' },
    mode: 'onBlur',
  })
  const note = useWatch({ control: form.control, name: 'note' })
  const amountDraft = useWatch({ control: form.control, name: 'amount' })
  const payeesQuery = useQuery({
    queryKey: dashboardKeys.payees,
    queryFn: getPayees,
    staleTime: 30_000,
  })
  const payees = useMemo(() => payeesQuery.data?.payees ?? [], [payeesQuery.data])
  const account = accounts.find((item) => item.id === fromId) ?? accounts[0]
  const amount = Number(amountDraft) || 0
  const mutation = useCreateTransferMutation({
    onSuccess: (result) => {
      setSuccess({
        reference: result.transfer.reference,
        amount: result.transfer.amount,
        recipient: result.transfer.recipient.name,
      })
    },
    onError: (error) => {
      if (error.fields?.amount)
        form.setError('amount', { type: 'server', message: error.fields.amount })
      setSendError(error.message)
    },
  })
  const hasDraft = Boolean(
    selected ||
    amountDraft ||
    note ||
    recipient?.name ||
    recipient?.accountNumber ||
    recipient?.bank,
  )

  const requestClose = () => {
    if (mutation.isPending) return
    if (!success && hasDraft) setConfirmDiscard(true)
    else onClose()
  }

  const continueRecipient = () => {
    if (isNew) {
      const candidate = recipient ?? { name: '', accountNumber: '', bank: '' }
      const parsed = recipientSchema.safeParse(candidate)
      if (!parsed.success) {
        setRecipient(candidate)
        const firstInvalid = parsed.error.issues[0]?.path[0]
        window.setTimeout(() => {
          document
            .getElementById(
              firstInvalid === 'accountNumber'
                ? 'new-account'
                : firstInvalid === 'bank'
                  ? 'new-bank'
                  : 'new-name',
            )
            ?.focus()
        }, 0)
        return
      }
      setRecipient(parsed.data)
    } else if (!selected) {
      return
    } else {
      setRecipient(null)
    }
    setStep(TransferStep.Amount)
  }

  const continueAmount = form.handleSubmit((values) => {
    const numericAmount = Number(values.amount)
    if (!account) return
    if (numericAmount > account.balance) {
      form.setError('amount', {
        type: 'limit',
        message: `Amount can't be more than your available balance (${formatMoney(account.balance)}).`,
      })
      form.setFocus('amount')
      return
    }
    if (numericAmount > remaining) {
      form.setError('amount', {
        type: 'limit',
        message: `This transfer exceeds your remaining daily limit (${formatMoney(remaining)}).`,
      })
      form.setFocus('amount')
      return
    }
    setStep(TransferStep.Review)
  })

  const continueStep = () => {
    if (step === TransferStep.Recipient) continueRecipient()
    else if (step === TransferStep.Amount) void continueAmount()
  }

  const goBack = () => {
    setSendError('')
    const previousStep = TRANSFER_STEPS[activeStepIndex - 1]
    if (previousStep) setStep(previousStep.id)
  }

  const submit = () => {
    const values = form.getValues()
    const request: CreateTransferRequest = {
      fromAccountId: fromId,
      amount: Number(values.amount),
      ...(values.note ? { note: values.note } : {}),
      ...(selected ? { payeeId: selected.id } : { recipient: recipient ?? undefined }),
    }
    setSendError('')
    mutation.mutate(request)
  }

  const recipientName = selected?.name ?? recipient?.name ?? ''

  return {
    step,
    activeStepIndex,
    account,
    amount,
    note,
    form,
    success,
    isSending: mutation.isPending,
    confirmDiscard,
    sendError,
    requestClose,
    submit,
    goBack,
    continueStep,
    keepEditing: () => setConfirmDiscard(false),
    discard: onClose,
    recipientStep: {
      payees,
      loading: payeesQuery.isPending,
      state: { selected, isNew, recipient },
      actions: {
        onSelect: (payee: Payee) => {
          setSelected(payee)
          setIsNew(false)
          setRecipient(null)
        },
        onNewRecipient: (isNew: boolean) => {
          setIsNew(isNew)
          if (isNew) setSelected(null)
        },
        onRecipientChange: setRecipient,
      },
      continueDisabled: !selected && !isNew,
    },
    amountStep: {
      accounts,
      fromId,
      onFromIdChange: setFromId,
      remaining,
      note,
      form,
    },
    reviewStep: {
      recipientName,
      recipient,
      selected,
      amount,
      note,
      error: sendError,
    },
  }
}
