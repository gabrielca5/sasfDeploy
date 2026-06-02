import { Box, Paper, Stack, Typography } from '@mui/material'
import {
  sectionHeadingCompactSx,
  sectionHeadingPlainSx,
  sectionHeadingSx,
  sectionTitleTextSx,
  surfaceBlockSx,
  surfaceCompactBlockSx,
  surfaceNestedBlockSx,
  surfacePlainBlockSx,
  textSx,
} from './uiStyles'

/**
 * SectionBlock
 * Outlined Paper with a title + subtitle header above children.
 * Pattern from FamiliasPage: used for "Dados do representante", "Endereço e contato", etc.
 *
 * Props:
 *   title    – section label (subtitle2, color primary, fontWeight 800)
 *   subtitle – supporting description (body2, text.secondary)
 *   children – content rendered below the header
 *   sx       – Paper sx overrides
 */
const variantStyles = {
  default: surfaceBlockSx,
  outlined: surfaceBlockSx,
  nested: surfaceNestedBlockSx,
  compact: surfaceCompactBlockSx,
  plain: surfacePlainBlockSx,
}

const headingStyles = {
  default: sectionHeadingSx,
  outlined: sectionHeadingSx,
  nested: sectionHeadingCompactSx,
  compact: sectionHeadingCompactSx,
  plain: sectionHeadingPlainSx,
}

function SectionBlock({ title, subtitle, children, variant = 'default', sx = {} }) {
  const surfaceSx = variantStyles[variant] ?? variantStyles.default
  const headingSx = headingStyles[variant] ?? headingStyles.default
  const paperVariant = variant === 'default' || variant === 'outlined' || variant === 'nested' ? 'outlined' : 'elevation'

  return (
    <Paper elevation={0} variant={paperVariant} sx={{ ...surfaceSx, ...sx }}>
      <Stack spacing={variant === 'default' || variant === 'outlined' ? 1.25 : 1} sx={{ minWidth: 0 }}>
        <Box sx={headingSx}>
          <Typography variant="subtitle2" color="primary" gutterBottom sx={sectionTitleTextSx}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary" sx={textSx}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {children}
      </Stack>
    </Paper>
  )
}

export default SectionBlock
