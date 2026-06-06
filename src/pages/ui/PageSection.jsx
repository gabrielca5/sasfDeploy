import { Box, Paper, Stack, Typography } from '@mui/material'
import { pageSectionActionsSx, pageSectionHeaderGridSx, surfaceHeaderSx, textSx } from './uiStyles'

/**
 * PageSection
 * Hero header card with eyebrow, title, description, and optional actions slot.
 * Pattern from FamiliasPage: outlined Paper + Stack layout.
 *
 * Props:
 *   eyebrow      – string or node displayed as overline above the title
 *   title        – page title (h4, fontWeight 800)
 *   description  – supporting text below the title
 *   actions      – node slotted to the right/bottom (e.g. count Chip, CTA Button)
 *   children     – additional content rendered below the header row
 *   sx           – Paper sx overrides
 *   contentSx    – Stack sx overrides
 *   direction    – Stack direction (default: column on xs, row on lg)
 *   justifyContent / alignItems – Stack alignment
 */
const pageSectionPaperSx = surfaceHeaderSx

function PageSection({
  top,
  beforeEyebrow,
  eyebrow,
  title,
  description,
  actions,
  children,
  sx = {},
  contentSx = {},
  childrenSx = {},
  direction = { xs: 'column', lg: 'row' },
  justifyContent = 'space-between',
  alignItems = { xs: 'flex-start', lg: 'center' },
  centered = false,
}) {
  const resolvedContentSx = centered ? { textAlign: 'center', ...contentSx } : contentSx

  return (
    <Paper elevation={0} variant="outlined" sx={{ ...pageSectionPaperSx, ...sx }}>
      {top ? (
        <Box sx={{ mb: 1.5, minWidth: 0, width: '100%' }}>
          {top}
        </Box>
      ) : null}

      {actions ? (
        <Box sx={{ ...pageSectionHeaderGridSx, ...resolvedContentSx }}>
          <Box sx={{ minWidth: 0 }}>
            {beforeEyebrow ? (
              <Box sx={{ mb: 0.5, ...textSx }}>{beforeEyebrow}</Box>
            ) : null}

            {eyebrow ? (
              typeof eyebrow === 'string' ? (
                <Typography variant="overline" color="primary" letterSpacing={1.8} sx={textSx}>
                  {eyebrow}
                </Typography>
              ) : (
                <Box sx={{ color: 'primary.main', ...textSx }}>{eyebrow}</Box>
              )
            ) : null}

            {title ? (
              <Typography variant="h4" fontWeight={800} gutterBottom sx={textSx}>
                {title}
              </Typography>
            ) : null}

            {description ? (
              <Typography color="text.secondary" sx={{ maxWidth: 820, ...textSx }}>
                {description}
              </Typography>
            ) : null}
          </Box>

          <Box sx={pageSectionActionsSx}>{actions}</Box>
        </Box>
      ) : (
        <Stack
          spacing={2}
          direction={direction}
          justifyContent={justifyContent}
          alignItems={alignItems}
          sx={{ minWidth: 0, ...resolvedContentSx }}
        >
          <Box sx={{ minWidth: 0 }}>
            {beforeEyebrow ? (
              <Box sx={{ mb: 0.5, ...textSx }}>{beforeEyebrow}</Box>
            ) : null}

            {eyebrow ? (
              typeof eyebrow === 'string' ? (
                <Typography variant="overline" color="primary" letterSpacing={1.8} sx={textSx}>
                  {eyebrow}
                </Typography>
              ) : (
                <Box sx={{ color: 'primary.main', ...textSx }}>{eyebrow}</Box>
              )
            ) : null}

            {title ? (
              <Typography variant="h4" fontWeight={800} gutterBottom sx={textSx}>
                {title}
              </Typography>
            ) : null}

            {description ? (
              <Typography color="text.secondary" sx={{ maxWidth: 820, ...textSx }}>
                {description}
              </Typography>
            ) : null}
          </Box>
        </Stack>
      )}

      {children ? (
        <Stack spacing={2} sx={{ mt: 2, minWidth: 0, ...childrenSx }}>
          {children}
        </Stack>
      ) : null}
    </Paper>
  )
}

export default PageSection
