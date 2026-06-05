import { Box } from '@mui/material'
import { formFieldSx, formGridCompactSx, formGridStrategySx, formGridSx } from './uiStyles'

const variantStyles = {
  default: formGridSx,
  compact: formGridCompactSx,
  strategy: formGridStrategySx,
}

const spanStyles = {
  auto: {},
  short: { gridColumn: { xs: '1 / -1', sm: 'span 1' } },
  medium: { gridColumn: { xs: '1 / -1', sm: 'span 2' } },
  wide: { gridColumn: { xs: '1 / -1', sm: 'span 2', lg: 'span 3' } },
  full: { gridColumn: '1 / -1' },
}

function FormGrid({ children, columns, variant = 'default', sx = {} }) {
  const gridSx = variantStyles[variant] ?? variantStyles.default

  return (
    <Box sx={{ ...gridSx, ...(columns ? { gridTemplateColumns: columns } : {}), ...sx }}>
      {children}
    </Box>
  )
}

function FormField({ children, span = 'auto', sx = {} }) {
  const spanSx = spanStyles[span] ?? spanStyles.auto

  return <Box sx={{ ...formFieldSx, ...spanSx, ...sx }}>{children}</Box>
}

export { FormField }
export default FormGrid
