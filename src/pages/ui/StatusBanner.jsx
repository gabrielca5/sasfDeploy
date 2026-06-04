import { Alert, AlertTitle } from '@mui/material'
import { statusBannerSx, textSx } from './uiStyles'

function StatusBanner({ severity = 'info', title, message, children, action }) {
  return (
    <Alert
      severity={severity}
      variant="outlined"
      action={action}
      role={severity === 'error' ? 'alert' : 'status'}
      aria-live={severity === 'error' ? 'assertive' : 'polite'}
      sx={statusBannerSx}
    >
      {title ? <AlertTitle sx={textSx}>{title}</AlertTitle> : null}
      {message ?? children}
    </Alert>
  )
}

export default StatusBanner
