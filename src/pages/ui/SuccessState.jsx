import PageState from './PageState'

function SuccessState({ title = 'Tudo certo', message = 'A ação foi concluída com sucesso.', compact = false }) {
  return <PageState type="success" title={title} message={message} compact={compact} />
}

export default SuccessState
