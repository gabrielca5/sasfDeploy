import { Box } from '@mui/material'
import {
  gridCalendarSx,
  gridCards3Sx,
  gridChartSx,
  gridDetail2ColSx,
  gridDetail3ColSx,
  gridFilterSx,
  gridGallerySx,
  gridInfoSx,
  gridListRowSx,
  gridSplitSx,
  gridStatsSx,
  weekGridSx,
  containedChildrenSx,
} from './uiStyles'

const variantStyles = {
  cards: gridCards3Sx,
  calendar: gridCalendarSx,
  chart: gridChartSx,
  detail2: gridDetail2ColSx,
  detail3: gridDetail3ColSx,
  filter: gridFilterSx,
  gallery: gridGallerySx,
  info: gridInfoSx,
  familyList: gridListRowSx,
  split: gridSplitSx,
  stats: gridStatsSx,
  week: weekGridSx,
}

function PageGrid({ variant = 'detail2', columns, gap, children, sx = {}, ...props }) {
  const preset = variantStyles[variant] ?? variantStyles.detail2

  return (
    <Box
      sx={{
        ...preset,
        width: '100%',
        minWidth: 0,
        maxWidth: '100%',
        ...containedChildrenSx,
        ...(columns ? { gridTemplateColumns: columns } : {}),
        ...(gap ? { gap } : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default PageGrid
