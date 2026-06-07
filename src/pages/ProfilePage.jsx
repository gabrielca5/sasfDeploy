import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { Box, Typography } from '@mui/material'
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
  ConfirmDialog,
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
        email: profile.email,
        cpf: profile.cpf,
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
          disabled
          error={!!errors.email}
          helperText="Email não pode ser alterado"
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
          disabled
          error={!!errors.cpf}
          helperText="CPF não pode ser alterado"
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
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [editOpen, setEditOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [savedProfile, setSavedProfile] = useState(false)

  const { data: profile, isLoading, isError, refetch } = useQuery({
    queryKey: ['usuario', user?.userId],
    queryFn: () => get(`/usuario/${user.userId}`),
    enabled: !!user?.userId,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <PageWrapper maxWidth={1440} spacing={3}>
        <LoadingState message="Carregando perfil..." skeleton variant="form" rows={4} />
      </PageWrapper>
    )
  }

  if (isError && !profile) {
    return (
      <PageWrapper maxWidth={1440} spacing={3}>
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
  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false)
    logout()
    navigate('/login')
  }
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
    <PageWrapper maxWidth={1440} spacing={3}>
      <PageSection
        eyebrow="Meu perfil"
        contentSx={{ display: { xs: 'none', sm: 'grid' } }}
        childrenSx={{ mt: { xs: 0, sm: -1 } }}
        actions={
          <PageToolbar direction="row" justifyContent="flex-end">
            <ActionButton
              color="error"
              variant="outlined"
              startIcon={<LogoutRoundedIcon />}
              onClick={() => setLogoutDialogOpen(true)}
              sx={{
                color: 'error.main',
                borderColor: 'error.main',
                '&:hover': { borderColor: 'error.dark', backgroundColor: 'rgba(211, 47, 47, 0.04)' },
              }}
            >
              Sair
            </ActionButton>
            <ActionButton
              startIcon={<EditRoundedIcon />}
              onClick={() => { setSavedProfile(false); setEditOpen(true) }}
              disabled={!profile}
            >
              Editar perfil
            </ActionButton>
          </PageToolbar>
        }
      >
        {/* Hero do usuário — linha horizontal: avatar | info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 2.5 },
            mb: 1,
          }}
        >
          <PageAvatar
            size="lg"
            sx={{
              width: { xs: 56, sm: 72 },
              height: { xs: 56, sm: 72 },
              fontSize: { xs: '1.15rem', sm: '1.5rem' },
            }}
          >
            {initials(nome)}
          </PageAvatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{
              fontSize: { xs: '1.1rem', sm: '1.35rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'text.primary',
              mt: 0.3,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {nome}
            </Typography>
            <PageToolbar direction="row" sx={{ mt: 0 }}>
              <StatusChip label={cargoLabel} tone="highlight" />
              {profile?.ativo === false && <StatusChip label="Inativo" tone="error" />}
            </PageToolbar>
          </Box>
        </Box>

        <SectionBlock title="Dados do perfil" variant="plain">
          <InfoGrid detailVariant="plain" items={profileDetails} />
        </SectionBlock>

        <PageToolbar
          direction="row"
          spacing={0.75}
          justifyContent="flex-start"
          sx={{ display: { xs: 'flex', sm: 'none' }, mt: -0.5 }}
        >
          <ActionButton
            color="error"
            variant="outlined"
            size="sm"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => setLogoutDialogOpen(true)}
            sx={{
              minHeight: 34,
              color: 'error.main',
              borderColor: 'error.main',
              '&:hover': { borderColor: 'error.dark', backgroundColor: 'rgba(211, 47, 47, 0.04)' },
            }}
          >
            Sair
          </ActionButton>
          <ActionButton
            size="sm"
            startIcon={<EditRoundedIcon />}
            onClick={() => { setSavedProfile(false); setEditOpen(true) }}
            disabled={!profile}
            sx={{ minHeight: 34 }}
          >
            Editar perfil
          </ActionButton>
        </PageToolbar>

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
      <ConfirmDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirmar saída"
        titleIcon={<LogoutRoundedIcon color="error" />}
        message="Deseja realmente sair da sua conta?"
        confirmLabel="Sair"
        confirmColor="error"
      />
    </PageWrapper>
  )
}

export default ProfilePage
