import { Stack } from '@mui/material'

function AuthForm({ children, id, onSubmit }) {
  return (
    <Stack spacing={2} component="form" id={id} onSubmit={onSubmit} noValidate>
      {children}
    </Stack>
  )
}

export default AuthForm
