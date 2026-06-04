import PageState from './PageState'

function PermissionState({ message = 'Você não tem permissão para acessar esta área.', compact = false }) {
  return <PageState type="permission" message={message} compact={compact} centered />
}

export default PermissionState
