import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CircularProgress, Stack, Typography } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { post } from '../lib/apiClient'

function CalendarioCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [errorMsg, setErrorMsg] = useState(null)
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      setErrorMsg('Parâmetros inválidos na URL de callback.')
      setStatus('error')
      return
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
  }, [searchParams, navigate])

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: '100vh', backgroundColor: '#f3f6fa' }}
    >
      {status === 'loading' && (
        <>
          <CircularProgress size={40} />
          <Typography variant="body1" color="text.secondary">
            Conectando ao Google Agenda…
          </Typography>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircleRoundedIcon sx={{ fontSize: 48, color: 'success.main' }} />
          <Typography variant="h6" fontWeight={700}>Google Agenda conectado!</Typography>
          <Typography variant="body2" color="text.secondary">Redirecionando…</Typography>
        </>
      )}

      {status === 'error' && (
        <>
          <ErrorOutlineRoundedIcon sx={{ fontSize: 48, color: 'error.main' }} />
          <Typography variant="h6" fontWeight={700}>Falha na conexão</Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={360}>
            {errorMsg}
          </Typography>
          <Typography variant="caption" color="text.disabled">Redirecionando…</Typography>
        </>
      )}
    </Stack>
  )
}

export default CalendarioCallbackPage
