import { Paper, Stack, Typography } from '@mui/material'
import { surfaceActionCardCompactSx, surfaceActionCardSx, textSx } from './uiStyles'
import ActionButtonGroup from './ActionButtonGroup'

/**
 * ActionCard
 * Outlined Paper with a title and a horizontal row of action buttons.
 * Pattern from FamiliasPage: "Ações do prontuário" panel.
 *
 * Props:
 *   title    – card heading (subtitle2, color primary, fontWeight 800)
 *   children – action buttons / controls
 *   sx       – Paper sx overrides
 */
const variantStyles = {
  default: surfaceActionCardSx,
  compact: surfaceActionCardCompactSx,
}

function ActionCard({ title, children, variant = 'default', sx = {} }) {
  const surfaceSx = variantStyles[variant] ?? variantStyles.default

  return (
    <Paper elevation={0} variant="outlined" sx={{ ...surfaceSx, ...sx }}>
      <Stack spacing={variant === 'compact' ? 1 : 1.5}>
        {title ? (
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 800, ...textSx }}>
            {title}
          </Typography>
        ) : null}

        <ActionButtonGroup variant={variant === 'compact' ? 'compact' : 'default'}>
          {children}
        </ActionButtonGroup>
      </Stack>
    </Paper>
  )
}

export default ActionCard
