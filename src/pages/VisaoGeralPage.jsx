import { useMemo } from 'react'
import { Box, ButtonBase, Paper, Typography } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import useFamilias from '../hooks/useFamilias'
import {
  ErrorState,
  PageGrid,
  PageSection,
  PageStack,
  PageWrapper,
} from './ui'

const actions = [
  {
    slug: 'cadastrar-usuario',
    label: 'Cadastrar uma Família Nova',
    description: 'Para famílias que ainda não têm registro no sistema.',
    hint: 'Ideal para o primeiro atendimento',
    icon: PersonAddAlt1OutlinedIcon,
    available: true,
  },
  {
    slug: 'atualizar-usuario',
    label: 'Atualizar Dados de uma Família',
    description: 'Para corrigir ou completar informações como endereço, documentos ou contatos.',
    hint: 'Quando algo mudou ou precisa ser ajustado',
    icon: ManageAccountsOutlinedIcon,
    available: true,
  },
  {
    slug: 'acessar-mensario',
    label: 'Acessar Meu Mensário',
    description: 'Para acessar as famílias que devem ser visitadas esse mês.',
    hint: 'Visualição geral das famílias que estão sob minha responsabilidade',
    icon: GroupsOutlinedIcon,
    available: true,
  },
  {
    slug: 'transcricao-audio',
    label: 'Registrar anotação em áudio',
    description: 'Organize gravações e anotações de visitas sem precisar digitar.',
    hint: 'Em preparação — em breve disponível',
    icon: GraphicEqOutlinedIcon,
    available: false,
  },
]

function StatCard({ icon: Icon, label, value, color = 'primary.main', bg = 'primary.50', loading }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ width: 44, height: 44, borderRadius: 2, display: 'grid', placeItems: 'center', backgroundColor: bg, color, flexShrink: 0 }}>
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={800} lineHeight={1.1}>
          {loading ? '—' : value}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
      </Box>
    </Paper>
  )
}

function ActionRow({ action, onClick }) {
  const Icon = action.icon
  const disabled = !action.available

  return (
    <ButtonBase
      component={Paper}
      variant="outlined"
      disabled={disabled}
      focusRipple={!disabled}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        textAlign: 'left',
        gap: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        border: '1.6px solid',
        borderColor: disabled ? 'divider' : 'rgba(30, 136, 229, 0.32)',
        backgroundColor: '#ffffff',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        boxShadow: disabled ? 'none' : '0 1px 4px rgba(17,24,39,0.04)',
        transition: 'border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        outline: 'none',
        ...(!disabled && {
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 4px 14px rgba(17,24,39,0.10)',
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(25,118,210,0.18)',
          },
        }),
      }}
    >
      <Box sx={{ width: { xs: 44, sm: 52 }, height: { xs: 44, sm: 52 }, borderRadius: 2, flexShrink: 0, display: 'grid', placeItems: 'center', backgroundColor: disabled ? '#e5e7eb' : 'primary.50', color: disabled ? '#9ca3af' : 'primary.main' }}>
        <Icon sx={{ fontSize: { xs: 22, sm: 26 } }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" fontWeight={700} color={disabled ? 'text.disabled' : 'text.primary'} sx={{ lineHeight: 1.3 }}>
          {action.label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4, lineHeight: 1.45 }}>
          {action.description}
        </Typography>
        <Typography variant="caption" color={disabled ? 'text.disabled' : 'primary.main'} sx={{ mt: 0.5, display: 'block', fontWeight: 600 }}>
          {action.hint}
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        {disabled
          ? <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
          : <ArrowForwardRoundedIcon sx={{ fontSize: 22, color: 'primary.main', transition: 'transform 180ms ease', '.MuiPaper-root:hover &': { transform: 'translateX(4px)' } }} />
        }
      </Box>
    </ButtonBase>
  )
}

function VisaoGeralPage({ onOpenAction }) {
  const { data: familiasData = [], isLoading, isError, refetch } = useFamilias()

  const stats = useMemo(() => {
    const familias = Array.isArray(familiasData) ? familiasData : []
    const hoje = new Date()
    const trintaDiasAtras = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 30)

    const alta = familias.filter(f => f.prioridade === 'Alta').length
    const visitadasRecente = familias.filter(f => {
      if (!f.ultima_visita) return false
      return new Date(`${f.ultima_visita}T00:00:00`) >= trintaDiasAtras
    }).length
    const proximaVisitaHoje = familias.filter(f => {
      if (!f.proxima_visita) return false
      const proxima = new Date(`${f.proxima_visita}T00:00:00`)
      return proxima <= hoje
    }).length

    return { total: familias.length, alta, visitadasRecente, proximaVisitaHoje }
  }, [familiasData])

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Visão geral"
        title="Olá, bem-vindo"
        description="Resumo do painel e ações rápidas."
      />

      {isError && (
        <ErrorState
          title="Não foi possível atualizar a visão geral"
          message="As informações podem estar desatualizadas."
          onRetry={refetch}
          compact
        />
      )}

      <PageGrid variant="stats">
        <StatCard icon={FamilyRestroomOutlinedIcon} label="Famílias registradas" value={stats.total} loading={isLoading} />
        <StatCard icon={WarningAmberOutlinedIcon} label="Prioridade Alta" value={stats.alta} color="#B91C1C" bg="#FEE2E2" loading={isLoading} />
        <StatCard icon={EventAvailableOutlinedIcon} label="Visitadas (30 dias)" value={stats.visitadasRecente} color="#065F46" bg="#D1FAE5" loading={isLoading} />
        <StatCard icon={ScheduleOutlinedIcon} label="Visita pendente" value={stats.proximaVisitaHoje} color="#92400E" bg="#FEF3C7" loading={isLoading} />
      </PageGrid>

      <PageSection
        title="Eu quero..."
        description="Escolha o que você precisa fazer. Cada opção abre um passo a passo."
      />

      <PageStack spacing={1.5}>
        {actions.map((action) => (
          <ActionRow
            key={action.slug}
            action={action}
            onClick={() => onOpenAction(action.slug)}
          />
        ))}
      </PageStack>
    </PageWrapper>
  )
}

export default VisaoGeralPage


