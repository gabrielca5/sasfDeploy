import { Box, Typography } from '@mui/material'
import { textSx } from './uiStyles'

/**
 * EmptyState
 * Simple inline empty-state message.
 * Pattern from FamiliasPage: "Nenhuma família encontrada com os filtros atuais."
 *
 * Props:
 *   message – primary message text
 *   hint    – optional secondary hint text
 *   icon    – optional icon node rendered above the message
 *   sx      – Box sx overrides
 */
function EmptyState({
  message = 'Nenhum resultado encontrado.',
  hint,
  icon,
  sx = {},
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
        minWidth: 0,
        ...sx,
      }}
    >
      {icon ? (
        <Box sx={{ color: 'text.disabled', mb: 0.5 }}>{icon}</Box>
      ) : null}

      <Typography variant="body2" color="text.secondary" sx={textSx}>
        {message}
      </Typography>

      {hint ? (
        <Typography variant="caption" color="text.disabled" sx={textSx}>
          {hint}
        </Typography>
      ) : null}
    </Box>
  )
}

export default EmptyState
