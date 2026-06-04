import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { get, put } from '../lib/apiClient'
import { useAuth } from '../contexts/AuthContext'
import {
  ActionButton,
  AuthForm,
  AuthTextField,
  ButtonLoading,
  ErrorState,
  InfoGrid,
  InlineFeedback,
  LoadingState,
  PageActionItem,
  PageAvatar,
  PageDialog,
  PageSection,
  PageStack,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusBanner,
  StatusChip,
} from './ui'

const cargoLabels = {
  ADMIN: 'Administrador',
  GESTOR: 'Gestor',
  TECNICO: 'Técnico',
  ORIENTADOR: 'Orientador',
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
}

const editSchema = z.object({
  name: z.string().min(2, 'Informe o nome'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone incompleto'),
  cpf: z.string().min(11, 'CPF incompleto'),
  endereco: z.string().min(3, 'Informe o endereço'),
})

function EditProfileDialog({ open, onClose, onSaved, profile, userId }) {
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState(null)

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
      telefone: profile?.telefone ?? '',
      cpf: profile?.cpf ?? '',
      endereco: profile?.endereco ?? '',
    },
  })
  const hasValidationErrors = isSubmitted && Object.keys(errors).length > 0

  const mutation = useMutation({
    mutationFn: (data) =>
      put(`/usuario/${userId}`, {
        ...data,
        cargo: profile.cargo,
        ativo: profile.ativo,
        dataDeInclusao: profile.dataDeInclusao,
        ultimaAtualizacao: new Date().toISOString().split('T')[0],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuario', userId] })
      onSaved?.()
      onClose()
    },
    onError: (e) => {
      setServerError(e.status === 409 ? 'Este email já está em uso.' : 'Erro ao salvar. Tente novamente.')
    },
  })

  const onSubmit = (data) => {
    setServerError(null)
    mutation.mutate(data)
  }

  return (
    <PageDialog
      open={open}
      onClose={onClose}
      title="Editar perfil"
      showClose
      maxWidth="sm"
      actions={
        <PageToolbar direction="row" alignItems="center" justifyContent="flex-end">
          <ActionButton onClick={onClose} disabled={mutation.isPending}>Cancelar</ActionButton>
          <ButtonLoading
            variant="contained"
            form="edit-profile-form"
            type="submit"
            loading={mutation.isPending}
            loadingLabel="Salvando..."
          >
            Salvar
          </ButtonLoading>
        </PageToolbar>
      }
    >
      <AuthForm
        id="edit-profile-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && <InlineFeedback severity="error" message={serverError} />}
        {hasValidationErrors && (
          <InlineFeedback severity="error" message="Revise os campos destacados antes de salvar." compact />
        )}
        <AuthTextField
          {...register('name')}
          label="Nome completo"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <AuthTextField
          {...register('email')}
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <AuthTextField
          {...register('telefone')}
          label="Telefone"
          inputMode="tel"
          error={!!errors.telefone}
          helperText={errors.telefone?.message}
        />
        <AuthTextField
          {...register('cpf')}
          label="CPF"
          inputMode="numeric"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
        />
        <AuthTextField
          {...register('endereco')}
          label="Endereço"
          error={!!errors.endereco}
          helperText={errors.endereco?.message}
        />
      </AuthForm>
    </PageDialog>
  )
}

function ProfilePage() {
  const { user } = useAuth()
  const [editOpen, setEditOpen] = useState(false)
  const [savedProfile, setSavedProfile] = useState(false)

  const { data: profile, isLoading, isError, refetch } = useQuery({
    queryKey: ['usuario', user?.userId],
    queryFn: () => get(`/usuario/${user.userId}`),
    enabled: !!user?.userId,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <PageWrapper maxWidth={1200} spacing={3}>
        <LoadingState message="Carregando perfil..." skeleton variant="form" rows={4} />
      </PageWrapper>
    )
  }

  if (isError && !profile) {
    return (
      <PageWrapper maxWidth={1200} spacing={3}>
        <ErrorState
          title="Não foi possível carregar o perfil"
          message="Verifique sua conexão e tente novamente."
          onRetry={refetch}
        />
      </PageWrapper>
    )
  }

  const nome = profile?.name ?? user?.email ?? ''
  const cargo = profile?.cargo ?? user?.cargo ?? ''
  const cargoLabel = cargoLabels[cargo] ?? cargo
  const profileDetails = [
    {
      label: 'Nome completo',
      value: profile?.name ?? '—',
      icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Cargo',
      value: cargoLabel,
      icon: <WorkOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Email',
      value: profile?.email ?? user?.email ?? '—',
      icon: <EmailOutlinedIcon fontSize="small" />,
    },
    {
      label: 'CPF',
      value: profile?.cpf ?? '—',
      icon: <BadgeOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Telefone',
      value: profile?.telefone ?? '—',
      icon: <PhoneOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Endereço',
      value: profile?.endereco ?? '—',
      icon: <HomeOutlinedIcon fontSize="small" />,
    },
  ]

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Meu perfil"
        title={nome}
        description={cargoLabel}
        actions={
          <ActionButton
            startIcon={<EditRoundedIcon />}
            onClick={() => {
              setSavedProfile(false)
              setEditOpen(true)
            }}
            disabled={!profile}
          >
            Editar perfil
          </ActionButton>
        }
      >
        <PageToolbar
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-start"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <PageAvatar size="lg">{initials(nome)}</PageAvatar>
          <PageToolbar direction="row">
            <StatusChip label={cargoLabel} tone="highlight" />
            {profile?.ativo === false && <StatusChip label="Inativo" tone="error" />}
          </PageToolbar>
        </PageToolbar>

        <SectionBlock title="Dados do perfil" variant="plain">
          <InfoGrid detailVariant="plain" items={profileDetails} />
        </SectionBlock>

        {isError && (
          <InlineFeedback severity="error" message="Não foi possível atualizar os dados do perfil agora." />
        )}
      </PageSection>

      {savedProfile && (
        <StatusBanner severity="success" message="Perfil atualizado com sucesso." />
      )}

      <SectionBlock
        title="Configurações da conta"
        subtitle="Funcionalidades em desenvolvimento para próximas versões do sistema."
      >
        <PageStack spacing={1}>
          <PageActionItem
            title="Segurança"
            description="Alterar senha e autenticação"
            icon={SecurityOutlinedIcon}
            disabled
          />
          <PageActionItem
            title="Notificações"
            description="Preferências de alertas e avisos"
            icon={NotificationsOutlinedIcon}
            disabled
          />
        </PageStack>
      </SectionBlock>

      {profile && (
        <EditProfileDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSaved={() => setSavedProfile(true)}
          profile={profile}
          userId={user.userId}
        />
      )}
    </PageWrapper>
  )
}

export default ProfilePage
