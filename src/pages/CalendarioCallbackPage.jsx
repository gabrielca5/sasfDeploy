import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { post } from '../lib/apiClient'
import { PageState, PageWrapper } from './ui'

function CalendarioCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const hasRequiredParams = Boolean(code && state)
  const [status, setStatus] = useState(hasRequiredParams ? 'loading' : 'error')
  const [errorMsg, setErrorMsg] = useState(hasRequiredParams ? null : 'Parâmetros inválidos na URL de callback.')
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    if (!hasRequiredParams) {
      const timer = setTimeout(() => navigate('/dashboard/calendario', { replace: true }), 3000)
      return () => clearTimeout(timer)
    }

    post('/google-calendar/callback', { code, state })
      .then(() => {
        setStatus('success')
        setTimeout(() => navigate('/dashboard/calendario', { replace: true }), 1800)
      })
      .catch((e) => {
        setErrorMsg(e.data?.mensagem || 'Erro ao finalizar conexão com o Google Agenda.')
        setStatus('error')
        setTimeout(() => navigate('/dashboard/calendario', { replace: true }), 3000)
      })
  }, [code, hasRequiredParams, navigate, state])

  return (
    <PageWrapper maxWidth={420} spacing={0} centered>
      <PageState
        type={status}
        title={status === 'success' ? 'Google Agenda conectado!' : status === 'error' ? 'Falha na conexão' : 'Conectando ao Google Agenda'}
        message={status === 'error' ? errorMsg : status === 'success' ? 'A conexão foi concluída. Redirecionando...' : 'Finalizando autenticação com o Google Agenda.'}
        centered
      />
    </PageWrapper>
  )
}

export default CalendarioCallbackPage
