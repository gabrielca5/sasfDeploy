import ActionButton from './ActionButton'
import PageDialog from './PageDialog'
import PageText from './PageText'

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Deseja continuar?',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmColor = 'primary',
  titleIcon,
  maxWidth = 'xs',
}) {
  return (
    <PageDialog
      open={open}
      onClose={onClose}
      title={title}
      titleIcon={titleIcon}
      maxWidth={maxWidth}
      actions={
        <>
          <ActionButton onClick={onClose}>
            {cancelLabel}
          </ActionButton>
          <ActionButton variant="contained" color={confirmColor} onClick={onConfirm}>
            {confirmLabel}
          </ActionButton>
        </>
      }
    >
      <PageText>{message}</PageText>
    </PageDialog>
  )
}

export default ConfirmDialog
