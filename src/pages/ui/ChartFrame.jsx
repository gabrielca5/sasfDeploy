import { Box } from '@mui/material'
import { chartBoxCompactSx, chartBoxSx } from './uiStyles'

function ChartFrame({ children, compact = false, sx = {} }) {
  return <Box sx={{ ...(compact ? chartBoxCompactSx : chartBoxSx), ...sx }}>{children}</Box>
}

export default ChartFrame
