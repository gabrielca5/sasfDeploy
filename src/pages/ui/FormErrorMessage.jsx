import { FormHelperText } from '@mui/material'
import { formErrorMessageSx } from './uiStyles'

function FormErrorMessage({ children }) {
  if (!children) {
    return null
  }

  return (
    <FormHelperText error sx={formErrorMessageSx}>
      {children}
    </FormHelperText>
  )
}

export default FormErrorMessage
