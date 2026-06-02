import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
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
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) })
  const onSubmit = () => setSubmitted(true)

  return (
    <AuthCard>
      <AuthFormHeader
        icon={PersonAddOutlinedIcon}
        title="Criar conta"
        subtitle="Preencha os dados para solicitar acesso"
      />

      <AuthForm id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField {...register('nome')} label="Nome completo" autoComplete="name" error={!!errors.nome} helperText={errors.nome?.message} autoFocus />
        <AuthTextField {...register('cpf')} label="CPF" inputMode="numeric" autoComplete="off" error={!!errors.cpf} helperText={errors.cpf?.message} />
        <AuthTextField {...register('email')} label="Email institucional" type="email" autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />
        <AuthPasswordField {...register('senha')} label="Senha" autoComplete="new-password" error={!!errors.senha} helperText={errors.senha?.message} />
        <AuthPasswordField {...register('repetirSenha')} label="Confirmar senha" autoComplete="new-password" error={!!errors.repetirSenha} helperText={errors.repetirSenha?.message} />

        {submitted ? (
          <AuthAlert>
            Solicitação enviada. O administrador irá analisar e liberar seu acesso.
          </AuthAlert>
        ) : (
          <AuthSubmitButton>Enviar solicitação</AuthSubmitButton>
        )}
      </AuthForm>
      <AuthFooter inline>
        Já possui cadastro? <AuthLink to="/login">Fazer login</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}

export default RegisterForm
