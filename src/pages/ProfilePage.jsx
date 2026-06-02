import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, CircularProgress, Divider, Stack } from '@mui/material'
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
  AuthAlert,
  AuthTextField,
  DetailItem,
  PageAvatar,
  PageCard,
  PageDialog,
  PageGrid,
  PageSection,
  PageToolbar,
  PageWrapper,
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

function EditProfileDialog({ open, onClose, profile, userId }) {
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
      telefone: profile?.telefone ?? '',
      cpf: profile?.cpf ?? '',
      endereco: profile?.endereco ?? '',
    },
  })

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
        <Stack direction="row" spacing={1}>
          <Button onClick={onClose} disabled={mutation.isPending}>Cancelar</Button>
          <Button
            variant="contained"
            form="edit-profile-form"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Salvando…' : 'Salvar'}
          </Button>
        </Stack>
      }
    >
      <Stack
        component="form"
        id="edit-profile-form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ pt: 1 }}
      >
        {serverError && <AuthAlert severity="error">{serverError}</AuthAlert>}
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
      </Stack>
    </PageDialog>
  )
}

function ProfilePage() {
  const { user } = useAuth()
  const [editOpen, setEditOpen] = useState(false)

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['usuario', user?.userId],
    queryFn: () => get(`/usuario/${user.userId}`),
    enabled: !!user?.userId,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <PageWrapper maxWidth={1200} spacing={3}>
        <CircularProgress size={32} sx={{ m: 'auto', display: 'block', mt: 6 }} />
      </PageWrapper>
    )
  }

  const nome = profile?.name ?? user?.email ?? ''
  const cargo = profile?.cargo ?? user?.cargo ?? ''
  const cargoLabel = cargoLabels[cargo] ?? cargo

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Meu perfil"
        title={nome}
        description={cargoLabel}
        actions={
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={() => setEditOpen(true)}
            disabled={!profile}
          >
            Editar perfil
          </Button>
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

        <Divider />

        <PageGrid variant="detail2">
          <DetailItem
            label="Nome completo"
            value={profile?.name ?? '—'}
            icon={<PersonOutlineOutlinedIcon fontSize="small" />}
          />
          <DetailItem
            label="Cargo"
            value={cargoLabel}
            icon={<WorkOutlineOutlinedIcon fontSize="small" />}
          />
          <DetailItem
            label="Email"
            value={profile?.email ?? user?.email ?? '—'}
            icon={<EmailOutlinedIcon fontSize="small" />}
          />
          <DetailItem
            label="CPF"
            value={profile?.cpf ?? '—'}
            icon={<BadgeOutlinedIcon fontSize="small" />}
          />
          <DetailItem
            label="Telefone"
            value={profile?.telefone ?? '—'}
            icon={<PhoneOutlinedIcon fontSize="small" />}
          />
          <DetailItem
            label="Endereço"
            value={profile?.endereco ?? '—'}
            icon={<HomeOutlinedIcon fontSize="small" />}
          />
        </PageGrid>

        {isError && (
          <AuthAlert severity="error">Não foi possível carregar os dados do perfil.</AuthAlert>
        )}
      </PageSection>

      <PageCard
        eyebrow="Configurações da conta"
        title="Funcionalidades em desenvolvimento para próximas versões do sistema."
      >
        <PageGrid variant="detail2">
          <PageCard
            title="Segurança"
            subtitle="Alterar senha e autenticação"
            icon={<SecurityOutlinedIcon fontSize="small" />}
            iconTone="muted"
            badge="Em breve"
          />
          <PageCard
            title="Notificações"
            subtitle="Preferências de alertas e avisos"
            icon={<NotificationsOutlinedIcon fontSize="small" />}
            iconTone="muted"
            badge="Em breve"
          />
        </PageGrid>
      </PageCard>

      {profile && (
        <EditProfileDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profile}
          userId={user.userId}
        />
      )}
    </PageWrapper>
  )
}

export default ProfilePage
