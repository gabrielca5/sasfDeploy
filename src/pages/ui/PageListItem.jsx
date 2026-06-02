import { Box, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  containedChildrenSx,
  containedNoWrapSx,
  containedSx,
  footerDividerSx,
  footerPlainSx,
  hoverRowSx,
} from './uiStyles'

function PageListItem({
  title,
  subtitle,
  actions,
  footer,
  children,
  variant = 'default',
  selected = false,
  onClick,
  accentColor,
  sx = {},
}) {
  const interactive = Boolean(onClick)
  const compact = variant === 'compact'
  let backgroundColor = compact ? '#fbfcfe' : '#ffffff'

  if (selected) {
    backgroundColor = 'primary.50'
  }

  if (accentColor) {
    let accentOpacity = 0.08
    if (compact) accentOpacity = 0.04
    if (selected) accentOpacity = 0.18
    backgroundColor = alpha(accentColor, accentOpacity)
  }

  let borderColor = compact ? 'rgba(17, 24, 39, 0.08)' : 'divider'
  if (selected) {
    borderColor = 'primary.main'
  }

  const handleKeyDown = (event) => {
    if (!interactive) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      sx={{
        p: compact ? 1.25 : 1.5,
        borderRadius: compact ? 1.5 : 2,
        borderColor,
        backgroundColor,
        cursor: interactive ? 'pointer' : 'default',
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        ...(interactive ? hoverRowSx : {}),
        ...sx,
      }}
    >
      <Stack spacing={compact ? 0.75 : 1} sx={{ ...containedSx, ...containedChildrenSx }}>
        {(title || subtitle || actions) ? (
          <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="flex-start" sx={{ ...containedSx }}>
            <Box sx={{ ...containedSx, flex: '1 1 auto' }}>
              {title ? (
                <Typography variant="subtitle1" fontWeight={800} noWrap sx={containedNoWrapSx}>
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography variant="body2" color="text.secondary" noWrap sx={containedNoWrapSx}>
                  {subtitle}
                </Typography>
              ) : null}
            </Box>
            <Box sx={{ minWidth: 0, maxWidth: '100%', flexShrink: 0 }}>{actions}</Box>
          </Stack>
        ) : null}

        {children}
        {footer ? <Box sx={compact ? footerPlainSx : footerDividerSx}>{footer}</Box> : null}
      </Stack>
    </Paper>
  )
}

export default PageListItem
