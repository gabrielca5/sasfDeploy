import { forwardRef } from 'react'
import MuiButton from '@mui/material/Button'

const sizeMap = { sm: 'small', default: 'medium', lg: 'large' }

const Button = forwardRef(({ size = 'default', children, ...props }, ref) => {
  const muiSize = sizeMap[size] || sizeMap.default
  return (
    <MuiButton ref={ref} size={muiSize} {...props}>
      {children}
    </MuiButton>
  )
})

Button.displayName = 'Button'
export default Button
