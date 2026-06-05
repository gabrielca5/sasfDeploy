import { Box, Paper, Stack, Typography } from '@mui/material'
import {
  containedChildrenSx,
  listHeaderRowSx,
  sectionTitleSx,
  surfaceEmbeddedListSx,
  surfaceListSx,
  textSx,
} from './uiStyles'

function PageList({
  title,
  actions,
  headers,
  columns,
  children,
  variant = 'default',
  bodySx = {},
  sx = {},
}) {
  const embedded = variant === 'embedded' || variant === 'plain'
  const Root = embedded ? Box : Paper
  const rootProps = embedded ? {} : { elevation: 0, variant: 'outlined' }
  const rootSx = embedded ? surfaceEmbeddedListSx : surfaceListSx
  const headerSx = embedded ? { pb: 1, minWidth: 0 } : sectionTitleSx

  return (
    <Root {...rootProps} sx={{ ...rootSx, overflow: 'hidden', ...sx }}>
      {(title || actions) ? (
        <Box sx={headerSx}>
          <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" sx={{ minWidth: 0 }}>
            {title ? (
              <Typography variant="subtitle2" color="primary" fontWeight={800} sx={textSx}>
                {title}
              </Typography>
            ) : null}
            {actions ? (
              <Box sx={{ minWidth: 0, width: '100%', flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {actions}
              </Box>
            ) : null}
          </Stack>
        </Box>
      ) : null}

      <Box sx={{ p: embedded ? 0 : 2, minWidth: 0, maxWidth: '100%', overflowX: 'hidden', ...bodySx }}>
        {headers ? (
          <Box sx={{ ...listHeaderRowSx, ...(columns ? { gridTemplateColumns: columns } : {}) }}>
            {headers.map((header) => (
              <Typography key={header} variant="caption" color="text.secondary">
                {header}
              </Typography>
            ))}
          </Box>
        ) : null}
        {children ? (
          <Stack spacing={1.25} sx={{ mt: headers ? 1 : 0, minWidth: 0, maxWidth: '100%', ...containedChildrenSx }}>
            {children}
          </Stack>
        ) : null}
      </Box>
    </Root>
  )
}

export default PageList
