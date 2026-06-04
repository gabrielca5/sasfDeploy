import { useState } from 'react'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AuthTextField from './AuthTextField'

function AuthPasswordField({ InputProps, slotProps, ...props }) {
  const [visible, setVisible] = useState(false)
  const passwordAdornment = (
    <InputAdornment position="end">
      <Tooltip title={visible ? 'Ocultar senha' : 'Mostrar senha'}>
        <IconButton
          type="button"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          edge="end"
          size="small"
        >
          {visible ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  )

  return (
    <AuthTextField
      {...props}
      type={visible ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: passwordAdornment,
      }}
      slotProps={{
        ...slotProps,
        input: {
          ...InputProps,
          ...slotProps?.input,
          endAdornment: passwordAdornment,
        },
      }}
    />
  )
}

export default AuthPasswordField
