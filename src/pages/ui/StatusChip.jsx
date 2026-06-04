import { Chip } from '@mui/material'
import { chipContainedSx } from './uiStyles'

const toneStyles = {
  highlight: {
    backgroundColor: 'primary.50',
    color: 'primary.dark',
    fontWeight: 700,
  },
  muted: {
    backgroundColor: '#f3f4f6',
    color: 'text.secondary',
    fontWeight: 700,
  },
  success: {
    backgroundColor: 'success.light',
    color: 'success.main',
    fontWeight: 700,
  },
  warning: {
    backgroundColor: 'warning.light',
    color: 'warning.main',
    fontWeight: 700,
  },
  error: {
    backgroundColor: 'error.light',
    color: 'error.main',
    fontWeight: 700,
  },
}

function resolveStatusProps(status) {
  if (status === 'Prioritária') {
    return { color: 'error', variant: 'filled' }
  }

  if (status === 'Ativa') {
    return { color: 'primary', variant: 'outlined' }
  }

  return { color: 'primary', variant: 'filled' }
}

function StatusChip({
  label,
  status,
  tone,
  customColor,
  customTextColor,
  fit = false,
  max = true,
  size = 'small',
  variant = 'outlined',
  sx = {},
  ...props
}) {
  const statusProps = status ? resolveStatusProps(status) : {}
  const customSx = customColor
    ? {
        backgroundColor: customColor,
        color: customTextColor,
        fontWeight: 700,
      }
    : {}

  return (
    <Chip
      label={label ?? status}
      size={size}
      variant={statusProps.variant ?? variant}
      color={statusProps.color}
      sx={{
        ...chipContainedSx,
        ...(tone ? toneStyles[tone] : {}),
        ...customSx,
        ...(fit ? { width: 'fit-content' } : {}),
        ...(max ? { maxWidth: '100%' } : {}),
        ...sx,
      }}
      {...props}
    />
  )
}

export default StatusChip
