import { Alert, AlertTitle } from '@mui/material'
import { inlineFeedbackSx, textSx } from './uiStyles'

function InlineFeedback({ severity = 'info', title, message, children, action, compact = false }) {
  return (
    <Alert
      severity={severity}
      variant="outlined"
      action={action}
      role={severity === 'error' ? 'alert' : 'status'}
      aria-live={severity === 'error' ? 'assertive' : 'polite'}
      sx={{ ...inlineFeedbackSx, ...(compact ? { py: 0.5 } : {}) }}
    >
      {title ? <AlertTitle sx={textSx}>{title}</AlertTitle> : null}
      {message ?? children}
    </Alert>
  )
}

export default InlineFeedback
