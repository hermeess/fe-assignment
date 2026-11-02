import { Button, Modal } from 'antd'
import styles from './index.module.css'

type Props = { onKeepEditing: () => void; onDiscard: () => void }

export function DiscardConfirmation({ onKeepEditing, onDiscard }: Props) {
  return (
    <Modal
      className={styles.modal}
      open
      centered
      width={390}
      zIndex={1100}
      title="Discard this transfer?"
      closable={false}
      keyboard
      onCancel={onKeepEditing}
      footer={
        <div className={styles.actions}>
          <Button className="secondary-button" onClick={onKeepEditing}>
            Keep editing
          </Button>
          <Button className="danger-button" danger type="primary" onClick={onDiscard}>
            Discard
          </Button>
        </div>
      }
    >
      <div className={styles.confirm}>
        <span className={styles.icon}>!</span>
        <p>Your transfer details will be cleared if you leave now.</p>
      </div>
    </Modal>
  )
}
