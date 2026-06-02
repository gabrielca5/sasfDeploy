import { Alert } from '@mui/material'
import { authInlineAlertSx } from './uiStyles'

function AuthAlert({ children, severity = 'success' }) {
  return (
    <Alert severity={severity} variant="outlined" sx={authInlineAlertSx}>
      {children}
    </Alert>
  )
}

export default AuthAlert
