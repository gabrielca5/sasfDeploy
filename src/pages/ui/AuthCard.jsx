import { Box, Paper, Stack } from '@mui/material'
import { authCardBodySx, authCardBodyWithFooterSx, authCardSx } from './uiStyles'

function AuthCard({ children, footer, withBodyFooter = false }) {
  return (
    <Paper elevation={0} sx={authCardSx}>
      <Stack spacing={0}>
        <Box sx={withBodyFooter ? authCardBodyWithFooterSx : authCardBodySx}>
          {children}
        </Box>

        {footer}
      </Stack>
    </Paper>
  )
}

export default AuthCard
