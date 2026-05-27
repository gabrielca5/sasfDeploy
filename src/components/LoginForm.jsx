import { Button, Link as MuiLink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Informe a senha'),
})

function LoginForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = () => {
    navigate('/dashboard/visao-geral')
  }

  return (
    <Stack spacing={2}>
      <Paper
        elevation={0}
        variant="outlined"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 2,
          borderRadius: 2,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Stack spacing={1.5}>
          <TextField {...register('email')} id="email" name="email" label="Email" type="email" autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />

          <TextField {...register('senha')} id="senha" name="senha" label="Senha" type="password" autoComplete="current-password" error={!!errors.senha} helperText={errors.senha?.message} />

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
