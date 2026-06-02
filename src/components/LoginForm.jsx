import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  AuthCard,
  AuthFooter,
  AuthForm,
  AuthFormHeader,
  AuthLink,
  AuthPasswordField,
  AuthSubmitButton,
  AuthTextField,
} from '../pages/ui'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Informe a senha'),
})

function LoginForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async () => {
    setIsLoading(true)
    // TODO: POST /api/usuario/login
    setTimeout(() => { setIsLoading(false); navigate('/dashboard/visao-geral') }, 600)
  }

  return (
    <AuthCard>
      <AuthFormHeader
        icon={LockOutlinedIcon}
        title="Entrar no sistema"
        subtitle="Use suas credenciais institucionais"
      />

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          {...register('email')}
          label="Email institucional"
          type="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="seu@email.gov.br"
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
