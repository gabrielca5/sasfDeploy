import PageState from './PageState'

function SavingState({ message = 'Salvando dados...', compact = true }) {
  return <PageState type="saving" message={message} compact={compact} />
}

export default SavingState
