import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { authLinkSx } from './uiStyles'

function AuthLink({ to, children }) {
  return (
    <MuiLink component={RouterLink} to={to} underline="hover" sx={authLinkSx}>
      {children}
    </MuiLink>
  )
}

export default AuthLink
