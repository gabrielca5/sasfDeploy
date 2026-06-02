import { Box, Typography } from '@mui/material'
import { authFooterSx, authInlineFooterSx } from './uiStyles'

function AuthFooter({ children, inline = false }) {
  return (
    <Box sx={inline ? authInlineFooterSx : authFooterSx}>
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  )
}

export default AuthFooter
