import { Modal } from 'antd'
import { TransferStep } from '../../../types/enum'
import { TRANSFER_STEPS } from '../../../constants/transfer'
import { useTransferFlow } from '../../../hooks/useTransferFlow'
import type { Account } from '../../../types'
import { DiscardConfirmation } from '../DiscardConfirmation'
import { AmountStep } from '../AmountStep'
import { RecipientStep } from '../RecipientStep'
import { ReviewStep } from '../ReviewStep'
import { SuccessPanel } from '../SuccessPanel'
import shared from '../shared.module.css'
import styles from './index.module.css'

type Props = { onClose: () => void; accounts: Account[]; remaining: number }

export function TransferDialog({ onClose, accounts, remaining }: Props) {
  const flow = useTransferFlow({ onClose, accounts, remaining })
  const { account } = flow
  if (!account) return null

  return (
    <Modal
      className={styles.modal}
      open
      centered
      width={520}
      title={
        <div className={styles.title}>
          <p className="eyebrow">PAYMENTS</p>
          <h2>New transfer</h2>
        </div>
      }
      footer={null}
      destroyOnHidden
      keyboard={!flow.isSending}
      closable={!flow.isSending}
      onCancel={flow.requestClose}
    >
      <div className={styles.body}>
        {flow.success ? (
          <SuccessPanel {...flow.success} onClose={onClose} />
        ) : (
          <>
            <div className={shared.stepper} aria-label={`Step ${flow.activeStepIndex + 1} of 3`}>
              {TRANSFER_STEPS.map(({ id, label }, index) => (
                <div
                  className={`${shared.step} ${id === flow.step ? shared.current : ''} ${index < flow.activeStepIndex ? shared.done : ''}`}
                  key={id}
                >
                  <span>{index < flow.activeStepIndex ? '✓' : index + 1}</span>
                  {label}
                </div>
              ))}
            </div>

            {flow.step === TransferStep.Recipient && (
              <RecipientStep
                payees={flow.recipientStep.payees}
                loading={flow.recipientStep.loading}
                state={flow.recipientStep.state}
                actions={flow.recipientStep.actions}
              />
            )}
            {flow.step === TransferStep.Amount && (
              <AmountStep {...flow.amountStep} account={account} />
            )}
            {flow.step === TransferStep.Review && (
              <ReviewStep {...flow.reviewStep} account={account} />
            )}

            <footer className={shared.footer}>
              {flow.activeStepIndex > 0 ? (
                <button className="secondary-button" onClick={flow.goBack}>
                  ← Back
                </button>
              ) : (
                <button className="secondary-button" onClick={flow.requestClose}>
                  Cancel
                </button>
              )}
              {flow.step !== TransferStep.Review ? (
                <button
                  className="primary-button"
                  disabled={
                    flow.step === TransferStep.Recipient && flow.recipientStep.continueDisabled
                  }
                  onClick={flow.continueStep}
                >
                  Continue
                </button>
              ) : (
                <button className="primary-button" disabled={flow.isSending} onClick={flow.submit}>
                  {flow.isSending ? 'Sending…' : 'Confirm transfer'}
                </button>
              )}
            </footer>
          </>
        )}

        {flow.confirmDiscard && (
          <DiscardConfirmation onKeepEditing={flow.keepEditing} onDiscard={flow.discard} />
        )}
      </div>
    </Modal>
  )
}
