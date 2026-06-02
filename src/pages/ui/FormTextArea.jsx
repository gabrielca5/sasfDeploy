import { TextField } from '@mui/material'
import { formTextAreaSx } from './uiStyles'

function FormTextArea({
  label,
  value,
  onChange,
  minRows = 3,
  maxRows = 12,
  helperText,
  disabled = false,
  required = false,
  error = false,
}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      multiline
      minRows={minRows}
      maxRows={maxRows}
      fullWidth
      size="small"
      helperText={helperText}
      disabled={disabled}
      required={required}
      error={error}
      sx={formTextAreaSx}
    />
  )
}

export default FormTextArea
