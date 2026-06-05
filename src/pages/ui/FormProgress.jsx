import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import {
  formProgressBarSx,
  formProgressHelperSx,
  formProgressLabelSx,
  formProgressSx,
  textSx,
} from './uiStyles'

function FormProgress({ label, helper, value = 0, sx = {} }) {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <Box sx={{ ...formProgressSx, ...sx }}>
      <Stack spacing={0.75} sx={{ minWidth: 0 }}>
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.primary" sx={{ ...formProgressLabelSx, ...textSx }}>
            {label}
          </Typography>
          {helper ? (
            <Typography variant="caption" color="text.secondary" sx={{ ...formProgressHelperSx, ...textSx }}>
              {helper}
            </Typography>
          ) : null}
        </Stack>
        <LinearProgress variant="determinate" value={normalizedValue} sx={formProgressBarSx} />
      </Stack>
    </Box>
  )
}

export default FormProgress
