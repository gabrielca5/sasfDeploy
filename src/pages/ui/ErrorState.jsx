import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ActionButton from './ActionButton'
import PageState from './PageState'

function ErrorState({
  title = 'Não foi possível carregar',
  message = 'Tente novamente em instantes.',
  onRetry,
  retryLabel = 'Tentar novamente',
  compact = false,
}) {
  return (
    <PageState
      type="error"
      title={title}
      message={message}
      compact={compact}
      action={
        onRetry ? (
          <ActionButton startIcon={<RefreshRoundedIcon />} onClick={onRetry}>
            {retryLabel}
          </ActionButton>
        ) : null
      }
    />
  )
}

export default ErrorState
