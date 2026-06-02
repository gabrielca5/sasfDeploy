import { Box, Paper, Stack, Typography } from '@mui/material'
import { surfaceCardSx, textSx } from './uiStyles'

/**
 * FilterPanel
 * Outlined Paper wrapping filter controls with a labelled header.
 * Pattern from FamiliasPage: "Filtros e labels" panel.
 *
 * Props:
 *   title    – panel label (default: "Filtros")
 *   icon     – header icon node (default: FilterAltOutlinedIcon)
 *   children – filter controls (TextFields, Selects, ToggleGroups, etc.)
 *   sx       – Paper sx overrides
 */
function FilterPanel({ title = 'Filtros', children, sx = {} }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ ...surfaceCardSx, ...sx }}>
      <Stack spacing={1.5} sx={{ minWidth: 0 }}>
        <Stack direction="row" spacing={1}   sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" color="primary" fontWeight={800} sx={textSx}>
            {title}
          </Typography>
        </Stack>
        {children}
      </Stack>
    </Paper>
  )
}

/**
 * FilterGrid
 * Convenience wrapper for the filter field grid inside FilterPanel.
 * Defaults to the 8-column responsive grid used in FamiliasPage.
 *
 * Props:
 *   cols – override gridTemplateColumns (object or string)
 *   sx   – Box sx overrides
 */
export function FilterGrid({ cols, children, sx = {} }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: cols ?? {
          xs: '1fr',
          md: 'repeat(3, minmax(0, 1fr))',
          xl: 'repeat(8, minmax(0, 1fr))',
        },
        gap: 1.25,
        minWidth: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default FilterPanel
