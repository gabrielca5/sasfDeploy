import { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
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
  InlineFeedback,
} from '../pages/ui'
import { formatCpf, isValidCpf, onlyDigits } from '../utils/formatters'
import { useAuth } from '../contexts/AuthContext'

const passwordRequirementsMessage = 'Confira os requisitos da senha.'
const passwordRequirements = [
  { label: 'Mínimo de 8 caracteres', test: (value) => value.length >= 8 },
  { label: 'Letra minúscula', test: (value) => /[a-z]/.test(value) },
  { label: 'Letra maiúscula', test: (value) => /[A-Z]/.test(value) },
  { label: 'Número', test: (value) => /[0-9]/.test(value) },
  { label: 'Caractere especial', test: (value) => /[^A-Za-z0-9]/.test(value) },
]

const CARGOS = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'GESTOR', label: 'Gestor' },
  { value: 'TECNICO', label: 'Técnico' },
  { value: 'ORIENTADOR', label: 'Orientador' },
]

const registerSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  cpf: z.string().superRefine((value, context) => {
    if (onlyDigits(value).length !== 11) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'CPF incompleto' })
      return
    }

    if (!isValidCpf(value)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'CPF inválido' })
    }
  }),
  email: z.string()
    .email('Email inválido')
    .refine((value) => value.toLowerCase().endsWith('@unas.org.br'), 'Use um email @unas.org.br'),
  senha: z.string()
    .min(8, passwordRequirementsMessage)
    .regex(/[a-z]/, passwordRequirementsMessage)
    .regex(/[A-Z]/, passwordRequirementsMessage)
    .regex(/[0-9]/, passwordRequirementsMessage)
    .regex(/[^A-Za-z0-9]/, passwordRequirementsMessage),
  telefone: z.string().min(10, 'Telefone incompleto'),
  cargo: z.enum(['ADMIN', 'GESTOR', 'TECNICO', 'ORIENTADOR'], { required_error: 'Selecione o cargo' }),
  endereco: z.string().min(3, 'Informe o endereço'),
  repetirSenha: z.string(),
}).refine((d) => d.senha === d.repetirSenha, {
  message: 'As senhas não conferem',
  path: ['repetirSenha'],
})

function PasswordRequirementsChecklist({ password, visible }) {
  if (!visible) return null

  return (
    <Stack spacing={0.75} role="list" aria-label="Requisitos da senha" sx={{ mt: -1 }}>
      {passwordRequirements.map((requirement) => {
        const isComplete = requirement.test(password)
        const Icon = isComplete ? CheckCircleOutlinedIcon : RadioButtonUncheckedOutlinedIcon

        return (
          <Stack
            key={requirement.label}
            role="listitem"
            direction="row"
            alignItems="center"
            spacing={0.75}
            sx={{ minHeight: 20 }}
          >
            <Icon
              fontSize="small"
              sx={{
                color: isComplete ? 'success.main' : 'text.secondary',
                fontSize: 16,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: isComplete ? 'success.main' : 'text.secondary' }}
            >
              {requirement.label}
            </Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}

function RegisterForm() {
  const { register, control, handleSubmit, formState: { errors, isSubmitted } } = useForm({
    resolver: zodResolver(registerSchema),
  })
  const cpfField = register('cpf')
  const password = useWatch({ control, name: 'senha', defaultValue: '' })
  const showPasswordChecklist = Boolean(password || errors.senha)
  const handleCpfChange = (event) => {
    event.target.value = formatCpf(event.target.value)
    cpfField.onChange(event)
  }
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const hasValidationErrors = isSubmitted && Object.keys(errors).length > 0

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    const today = new Date().toISOString().split('T')[0]
    try {
      await registerUser({
        name: data.nome,
        email: data.email,
        senha: data.senha,
        cargo: data.cargo,
        cpf: data.cpf,
        telefone: data.telefone,
        endereco: data.endereco,
        dataDeInclusao: today,
        ultimaAtualizacao: today,
        ativo: true,
      })
      navigate('/login', { state: { registered: true } })
    } catch (e) {
      setError(
        e.status === 409
          ? 'Este email já está cadastrado.'
          : e.message || 'Erro ao criar conta. Tente novamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <AuthFormHeader
        icon={PersonAddOutlinedIcon}
        title="Criar conta"
        subtitle="Preencha os dados para solicitar acesso"
      />

      <AuthForm id="register-form" onSubmit={handleSubmit(onSubmit)}>
        {error && <AuthAlert severity="error">{error}</AuthAlert>}
        {hasValidationErrors && (
          <InlineFeedback severity="error" message="Revise os campos destacados antes de criar a conta." compact />
        )}

        <AuthTextField
          {...register('nome')}
          label="Nome completo"
          autoComplete="name"
          autoFocus
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />
        <AuthTextField
          {...cpfField}
          label="CPF"
          inputMode="numeric"
          autoComplete="off"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
          placeholder="000.000.000-00"
          onChange={handleCpfChange}
          slotProps={{ htmlInput: { maxLength: 14 } }}
        />
        <AuthTextField
          {...register('telefone')}
          label="Telefone"
          inputMode="tel"
          autoComplete="tel"
          error={!!errors.telefone}
          helperText={errors.telefone?.message}
        />
        <AuthTextField
          {...register('email')}
          label="Email institucional"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="seu@unas.org.br"
        />
        <Controller
          name="cargo"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.cargo} size="small">
              <InputLabel id="cargo-label">Cargo</InputLabel>
              <Select {...field} labelId="cargo-label" label="Cargo">
                {CARGOS.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
              {errors.cargo && <FormHelperText>{errors.cargo.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <AuthTextField
          {...register('endereco')}
          label="Endereço"
          autoComplete="street-address"
          error={!!errors.endereco}
          helperText={errors.endereco?.message}
        />
        <AuthPasswordField
          {...register('senha')}
          label="Senha"
          autoComplete="new-password"
          error={!!errors.senha}
          helperText={errors.senha?.message}
        />
        <PasswordRequirementsChecklist password={password} visible={showPasswordChecklist} />
        <AuthPasswordField
          {...register('repetirSenha')}
          label="Confirmar senha"
          autoComplete="new-password"
          error={!!errors.repetirSenha}
          helperText={errors.repetirSenha?.message}
        />

        <AuthSubmitButton loading={isLoading} loadingLabel="Criando conta...">
          Criar conta
        </AuthSubmitButton>
      </AuthForm>

      <AuthFooter inline>
        Já possui cadastro? <AuthLink to="/login">Fazer login</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}

export default RegisterForm
