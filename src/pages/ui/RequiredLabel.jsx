import { Stack, Typography } from '@mui/material'
import { formLabelSx, requiredAsteriskSx, textSx } from './uiStyles'

function RequiredLabel({ children, required = false, color = 'text.primary' }) {
  return (
    <Stack direction="row" spacing={0.35} alignItems="center" sx={{ minWidth: 0 }}>
      <Typography component="span" sx={{ ...formLabelSx, ...textSx, color }}>
        {children}
      </Typography>
      {required ? (
        <Typography component="span" aria-hidden="true" sx={requiredAsteriskSx}>
          *
        </Typography>
      ) : null}
    </Stack>
  )
}

export default RequiredLabel
