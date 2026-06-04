import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ActionButton from './ActionButton'
import PageState from './PageState'

function OfflineState({ message = 'Verifique sua conexão e tente novamente.', onRetry, compact = false }) {
  return (
    <PageState
      type="offline"
      message={message}
      compact={compact}
      action={
        onRetry ? (
          <ActionButton startIcon={<RefreshRoundedIcon />} onClick={onRetry}>
            Tentar novamente
          </ActionButton>
        ) : null
      }
    />
  )
}

export default OfflineState
