import CircularProgress from '@mui/material/CircularProgress'
import Button from '../../components/ui/button'
import { actionButtonSx } from './uiStyles'

function ButtonLoading({
  loading = false,
  loadingLabel = 'Carregando...',
  children,
  startIcon,
  disabled,
  variant = 'outlined',
  sx = {},
  ...props
}) {
  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      aria-busy={loading}
      sx={{ ...actionButtonSx, ...sx }}
      {...props}
    >
      {loading ? loadingLabel : children}
    </Button>
  )
}

export default ButtonLoading
