import { Paper } from '@mui/material'
import { calendarSurfaceSx, surfaceCardSx } from './uiStyles'

function CalendarSurface({ children }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ ...surfaceCardSx, ...calendarSurfaceSx }}>
      {children}
    </Paper>
  )
}

export default CalendarSurface
