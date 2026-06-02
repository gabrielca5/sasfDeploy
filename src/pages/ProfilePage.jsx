import { Button, Divider } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import {
  DetailItem,
  PageAvatar,
  PageCard,
  PageGrid,
  PageSection,
  PageToolbar,
  PageWrapper,
  StatusChip,
} from './ui'

// TODO: substituir pelo parse real do JWT
// const jwt = localStorage.getItem('token')
// const { userId, cargoUsuario } = jwtDecode(jwt)
// e buscar dados via GET /api/tecnico/{userId} ou /api/usuario/{userId}
const profile = {
  nome: 'Carlos Eduardo Silva',
  cargo: 'TECNICO',
  cargoLabel: 'Técnico de Referência',
  email: 'carlos.silva@sasf.sp.gov.br',
  matricula: '12345-6',
  unidade: 'CRAS Ipiranga',
}

function ProfilePage() {
  const initials = profile.nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Meu perfil"
        title={profile.nome}
        description={profile.unidade}
        actions={
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={() => {
              // TODO: abrir modal de edição usando PUT /api/tecnico/{id} ou /api/usuario/{id}
            }}
          >
            Editar perfil
          </Button>
        }
      >
        <PageToolbar direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-start" alignItems={{ xs: 'flex-start', sm: 'center' }}>
          <PageAvatar size="lg">{initials}</PageAvatar>
          <PageToolbar direction="row">
            <StatusChip label={profile.cargoLabel} tone="highlight" />
            <StatusChip label={profile.unidade} />
          </PageToolbar>
        </PageToolbar>

        <Divider />

        <PageGrid variant="detail2">
          <DetailItem label="Nome completo" value={profile.nome} icon={<PersonOutlineOutlinedIcon fontSize="small" />} />
          <DetailItem label="Cargo" value={profile.cargoLabel} icon={<WorkOutlineOutlinedIcon fontSize="small" />} />
          <DetailItem label="Email" value={profile.email} icon={<EmailOutlinedIcon fontSize="small" />} />
          <DetailItem label="Matrícula" value={profile.matricula} icon={<BadgeOutlinedIcon fontSize="small" />} />
        </PageGrid>
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
    </PageWrapper>
  )
}

export default ProfilePage
