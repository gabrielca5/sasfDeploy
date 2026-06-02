import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import PageGrid from './PageGrid'

function CalendarMonthGrid({ weekHeaders = [], cells = [], today }) {
  return (
    <Box>
      <PageGrid variant="week">
        {weekHeaders.map((day) => (
          <Box key={day} sx={{ textAlign: 'center', py: 0.75 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary">
              {day}
            </Typography>
          </Box>
        ))}
      </PageGrid>

      <PageGrid variant="week" sx={{ mt: 0.75 }}>
        {cells.map((cell, index) => {
          const isToday = cell.isCurrentMonth && cell.day === today

          return (
            <Box
              key={`${cell.day ?? 'empty'}-${index}`}
              sx={{
                minHeight: { xs: 56, sm: 72 },
                p: { xs: 0.5, sm: 0.75 },
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: isToday ? 'primary.main' : cell.isCurrentMonth ? 'divider' : 'transparent',
                backgroundColor: isToday ? alpha('#1e88e5', 0.08) : cell.isCurrentMonth ? '#ffffff' : 'transparent',
                cursor: cell.isCurrentMonth ? 'pointer' : 'default',
                transition: 'all 150ms ease',
                '&:hover': cell.isCurrentMonth
                  ? { borderColor: 'primary.light', backgroundColor: alpha('#1e88e5', 0.05) }
                  : {},
              }}
            >
              {cell.isCurrentMonth ? (
                <Typography
                  variant="body2"
                  fontWeight={isToday ? 800 : 600}
                  color={isToday ? 'primary.main' : 'text.primary'}
                >
                  {cell.day}
                </Typography>
              ) : null}
            </Box>
          )
        })}
      </PageGrid>
    </Box>
  )
}

export default CalendarMonthGrid
