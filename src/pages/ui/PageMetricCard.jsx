import { Box, Paper, Stack, Typography } from '@mui/material'
import { containedChildrenSx, surfaceCardSx, textSx } from './uiStyles'

function PageMetricCard({
  icon: Icon,
  label,
  value,
  helper,
  loading = false,
  color = 'primary.main',
  backgroundColor = 'primary.50',
}) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        ...surfaceCardSx,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        minHeight: 96,
        ...containedChildrenSx,
      }}
    >
      {Icon ? (
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            backgroundColor,
            color,
            flexShrink: 0,
          }}
        >
          <Icon fontSize="small" />
        </Box>
      ) : null}

      <Stack spacing={0.35} sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="h5" fontWeight={800} lineHeight={1.1} sx={textSx}>
          {loading ? '-' : value}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={textSx}>
          {label}
        </Typography>
        {helper ? (
          <Typography variant="caption" color="text.disabled" sx={textSx}>
            {helper}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  )
}

export default PageMetricCard
