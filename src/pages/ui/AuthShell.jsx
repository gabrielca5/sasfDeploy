import { Box } from '@mui/material'
import { authContentSx, authShellSx } from './uiStyles'

function AuthShell({ children, ariaLabel, illustration }) {
  return (
    <Box component="main" sx={authShellSx}>
      <Box sx={authContentSx}>
        <Box component="section" aria-label={ariaLabel}>
          {children}
        </Box>
      </Box>

      {illustration}
    </Box>
  )
}

export default AuthShell
