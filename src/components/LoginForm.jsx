import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  AuthAlert,
  AuthCard,
  AuthFooter,
  AuthForm,
  AuthFormHeader,
  AuthLink,
  AuthPasswordField,
  AuthSubmitButton,
  AuthTextField,
} from '../pages/ui'
import { useAuth } from '../contexts/AuthContext'

const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .refine((value) => value.toLowerCase().endsWith('@unas.org.br'), 'Use um email @unas.org.br'),
  senha: z.string().min(1, 'Informe a senha'),
})

function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      await login(data.email, data.senha)
      navigate('/dashboard/visao-geral')
    } catch (e) {
      setError(e.status === 401 ? 'Email ou senha incorretos.' : 'Erro ao conectar. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <AuthFormHeader
        icon={LockOutlinedIcon}
        title="Entrar no sistema"
        subtitle="Use suas credenciais institucionais"
      />

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        {error && <AuthAlert severity="error">{error}</AuthAlert>}
        <AuthTextField
          {...register('email')}
          label="Email institucional"
          type="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="seu@unas.org.br"
        />
        <AuthPasswordField
          {...register('senha')}
          label="Senha"
          autoComplete="current-password"
          error={!!errors.senha}
          helperText={errors.senha?.message}
        />
        <AuthSubmitButton disabled={isLoading}>
          {isLoading ? 'Entrando…' : 'Entrar'}
        </AuthSubmitButton>
      </AuthForm>

      <AuthFooter inline>
        Não possui cadastro? <AuthLink to="/cadastro">Criar conta</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}

export default LoginForm
