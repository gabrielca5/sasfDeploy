import { useState } from 'react'
import { Alert, Button, Link as MuiLink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  cpf: z.string().min(11, 'CPF incompleto'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha muito curta'),
  repetirSenha: z.string(),
}).refine((data) => data.senha === data.repetirSenha, {
  message: 'As senhas não conferem',
  path: ['repetirSenha'],
})

function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = () => {
    setSubmitted(true)
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
          <TextField {...register('nome')} id="nome" name="nome" label="Nome" autoComplete="name" error={!!errors.nome} helperText={errors.nome?.message} />

          <TextField {...register('cpf')} id="cpf" name="cpf" label="Cpf" inputMode="numeric" autoComplete="off" error={!!errors.cpf} helperText={errors.cpf?.message} />

          <TextField {...register('email')} id="email" name="email" label="Email" type="email" autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />

          <TextField {...register('senha')} id="senha" name="senha" label="Senha" type="password" autoComplete="current-password" error={!!errors.senha} helperText={errors.senha?.message} />

          <TextField {...register('repetirSenha')} id="repetir-senha" name="repetirSenha" label="Repetir Senha" type="password" autoComplete="new-password" error={!!errors.repetirSenha} helperText={errors.repetirSenha?.message} />

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
