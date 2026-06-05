import { Box, Paper, Stack } from '@mui/material'
import { formCardBodySx, formCardSx } from './uiStyles'

function FormCard({ header, footer, children, sx = {}, variant = 'card' }) {
  const Surface = variant === 'plain' ? Box : Paper
  const surfaceProps = variant === 'plain'
    ? { sx: { ...formCardSx, ...sx } }
    : { elevation: 0, variant: 'outlined', sx: { ...formCardSx, ...sx } }

  return (
    <Surface {...surfaceProps}>
      {header}
      <Stack spacing={1.25} sx={formCardBodySx}>
        {children}
      </Stack>
      {footer}
    </Surface>
  )
}

export default FormCard
