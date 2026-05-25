import { useState } from 'react'
import { Alert, Button, Link as MuiLink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
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
          <TextField id="nome" name="nome" label="Nome" autoComplete="name" required />

          <TextField
            id="cpf"
            name="cpf"
            label="Cpf"
            inputMode="numeric"
            autoComplete="off"
            required
          />

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

          <TextField
            id="repetir-senha"
            name="repetirSenha"
            label="Repetir Senha"
            type="password"
            autoComplete="new-password"
            required
          />

          <Button type="submit" fullWidth sx={{ mt: 0.5 }}>
            Enviar
          </Button>

          {submitted && (
            <Alert severity="success" variant="outlined" sx={{ mt: 0.5 }}>
              O administrador recebeu sua solicitação e vai analisar.
            </Alert>
          )}
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
          Ja possui cadastro?{' '}
          <MuiLink component={RouterLink} to="/login" underline="hover">
            Fazer login
          </MuiLink>
        </Typography>
      </Paper>
    </Stack>
  )
}

export default RegisterForm
