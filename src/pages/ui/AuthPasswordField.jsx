import { useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AuthTextField from './AuthTextField'

function AuthPasswordField({ InputProps, ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <AuthTextField
      {...props}
      type={visible ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
              onClick={() => setVisible((value) => !value)}
              edge="end"
              size="small"
            >
              {visible ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default AuthPasswordField
