import PageSkeleton from './PageSkeleton'
import PageState from './PageState'

function LoadingState({ message = 'Carregando dados...', skeleton = false, variant = 'list', rows = 3, compact = false, surface = true }) {
  if (skeleton) {
    return <PageSkeleton variant={variant} rows={rows} ariaLabel={message} />
  }

  return <PageState type="loading" message={message} compact={compact} surface={surface} />
}

export default LoadingState
