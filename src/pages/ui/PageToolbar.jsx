import { Box, Stack } from '@mui/material'
import { containedChildrenSx } from './uiStyles'

function PageToolbar({
  children,
  actions,
  helper,
  direction = { xs: 'column', md: 'row' },
  alignItems = { xs: 'flex-start', md: 'center' },
  justifyContent = 'space-between',
  spacing = 1,
  flexWrap = 'wrap',
  sx = {},
}) {
  return (
    <Stack
      direction={direction}
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      useFlexGap
      sx={{ minWidth: 0, maxWidth: '100%', ...containedChildrenSx, ...sx }}
    >
      {children}
      {helper ? <Box sx={{ minWidth: 0, flex: 1 }}>{helper}</Box> : null}
      {actions ? <Box sx={{ minWidth: 0, maxWidth: '100%', flexShrink: 0 }}>{actions}</Box> : null}
    </Stack>
  )
}

export default PageToolbar
