import { Typography } from '@mui/material'
import { containedNoWrapSx, textSx } from './uiStyles'

function PageText({
  children,
  variant = 'body2',
  color = 'text.secondary',
  fontWeight,
  noWrap = false,
  ...props
}) {
  return (
    <Typography
      variant={variant}
      color={color}
      fontWeight={fontWeight}
      sx={noWrap ? containedNoWrapSx : textSx}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default PageText
