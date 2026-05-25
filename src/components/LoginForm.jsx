import { Button, Link as MuiLink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard/visao-geral')
  }

  return (
    <Stack spacing={2}>
      <Paper
        elevation={0}
        variant="outlined"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          borderRadius: 2,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Stack spacing={1.5}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
          />

          <TextField
            id="senha"
            name="senha"
            label="Senha"
            type="password"
            autoComplete="current-password"
            required
          />

          <Button type="submit" fullWidth sx={{ mt: 0.5 }}>
            Entrar
          </Button>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center',
          borderRadius: 2,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Ainda nao possui cadastro?{' '}
          <MuiLink component={RouterLink} to="/cadastro" underline="hover">
            Criar conta
          </MuiLink>
        </Typography>
      </Paper>
    </Stack>
  )
}

export default LoginForm
