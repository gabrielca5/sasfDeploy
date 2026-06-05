import { Paper, Stack } from '@mui/material'
import { formCardBodySx, formCardSx } from './uiStyles'

function FormCard({ header, footer, children, sx = {} }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ ...formCardSx, ...sx }}>
      {header}
      <Stack spacing={1.25} sx={formCardBodySx}>
        {children}
      </Stack>
      {footer}
    </Paper>
  )
}

export default FormCard
