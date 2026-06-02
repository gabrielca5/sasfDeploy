import { Box, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  footerDividerSx,
  hoverLiftSx,
  iconTileMutedSx,
  iconTilePrimarySx,
  containedChildrenSx,
  containedNoWrapSx,
  containedSx,
  surfaceBlockSx,
  surfaceCardSx,
  surfaceDetailSx,
  surfaceHeaderSx,
  textSx,
} from './uiStyles'
import StatusChip from './StatusChip'

const surfaceMap = {
  block: surfaceBlockSx,
  card: surfaceCardSx,
  detail: surfaceDetailSx,
  header: surfaceHeaderSx,
}

function PageCard({
  title,
  subtitle,
  eyebrow,
  icon,
  badge,
  actions,
  children,
  footer,
  onClick,
  selected = false,
  hover = false,
  surface = 'card',
  iconTone = 'primary',
  accentColor,
  sx = {},
  contentSx = {},
}) {
  const interactive = Boolean(onClick)
  const baseSurface = surfaceMap[surface] ?? surfaceMap.card
  const accentBackground = accentColor ? alpha(accentColor, selected ? 0.2 : 0.08) : null

  const handleKeyDown = (event) => {
    if (!interactive) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Paper
      elevation={interactive && selected ? 2 : 0}
      variant="outlined"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      sx={{
        ...baseSurface,
        height: '100%',
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        cursor: interactive ? 'pointer' : 'default',
        ...(accentBackground ? { backgroundColor: accentBackground } : {}),
        ...(selected ? { borderColor: 'primary.main', backgroundColor: accentBackground ?? 'primary.50' } : {}),
        ...((hover || interactive) ? hoverLiftSx : {}),
        ...sx,
      }}
    >
      <Stack spacing={1.5} sx={{ ...containedSx, height: '100%', ...containedChildrenSx, ...contentSx }}>
        {(eyebrow || title || subtitle || icon || badge || actions) ? (
          <Stack direction="row" spacing={1.5} justifyContent="space-between" alignItems="flex-start" sx={{ ...containedSx }}>
            <Stack direction="row" spacing={1.25} sx={{ ...containedSx, flex: '1 1 auto' }}>
              {icon ? (
                <Box sx={iconTone === 'muted' ? iconTileMutedSx : iconTilePrimarySx}>
                  {icon}
                </Box>
              ) : null}

              <Box sx={{ ...containedSx }}>
                {eyebrow ? (
                  <Typography variant="overline" color="primary" letterSpacing={1.6} sx={textSx}>
                    {eyebrow}
                  </Typography>
                ) : null}

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
            </Stack>

            <Box sx={{ minWidth: 0, maxWidth: '100%', flexShrink: 0 }}>
              {actions ?? (badge ? <StatusChip label={badge} tone="highlight" /> : null)}
            </Box>
          </Stack>
        ) : null}

        {children}

        {footer ? <Box sx={footerDividerSx}>{footer}</Box> : null}
      </Stack>
    </Paper>
  )
}

export default PageCard
