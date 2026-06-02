import { Box } from '@mui/material'
import { actionButtonGroupCompactSx, actionButtonGroupSx } from './uiStyles'

const variantStyles = {
  default: actionButtonGroupSx,
  compact: actionButtonGroupCompactSx,
}

function ActionButtonGroup({ children, variant = 'default' }) {
  const groupSx = variantStyles[variant] ?? variantStyles.default

  return <Box sx={groupSx}>{children}</Box>
}

export default ActionButtonGroup
