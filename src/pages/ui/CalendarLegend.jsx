import { Box, Stack, Typography } from '@mui/material'
import { textSx } from './uiStyles'

function CalendarLegend({ items = [] }) {
  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ minWidth: 0 }}>
      {items.map((item) => (
        <Stack key={item.label} direction="row" alignItems="center" spacing={0.75} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: 1,
              backgroundColor: item.color,
              flexShrink: 0,
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={textSx}>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default CalendarLegend
