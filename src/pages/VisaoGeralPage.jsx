import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import useFamilias from '../hooks/useFamilias'
import {
  ErrorState,
  PageActionItem,
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
    hint: 'Envie um MP3 e receba a transcrição automaticamente',
    icon: GraphicEqOutlinedIcon,
    available: true,
  },
]

function StatCard({ icon: Icon, label, value, color = '#1d4ed8', bg = '#eff6ff', loading }) {
  return (
    <Box sx={{
      p: 2.5,
      borderRadius: 3,
      backgroundColor: '#ffffff',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 1.5,
    }}>
      <Box>
        <Typography sx={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: 'text.primary', mb: 0.75 }}>
          {loading ? '—' : value}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ lineHeight: 1.3 }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', backgroundColor: bg, color, flexShrink: 0, mt: 0.25 }}>
        <Icon sx={{ fontSize: 22 }} />
      </Box>
    </Box>
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
    <PageWrapper maxWidth={1440} spacing={3}>
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
        <StatCard icon={FamilyRestroomOutlinedIcon} label="Famílias registradas" value={stats.total} color="#1d4ed8" bg="#dbeafe" loading={isLoading} />
        <StatCard icon={WarningAmberOutlinedIcon} label="Prioridade Alta" value={stats.alta} color="#b91c1c" bg="#fee2e2" loading={isLoading} />
        <StatCard icon={EventAvailableOutlinedIcon} label="Visitadas (30 dias)" value={stats.visitadasRecente} color="#1d4ed8" bg="#dbeafe" loading={isLoading} />
        <StatCard icon={ScheduleOutlinedIcon} label="Visita pendente" value={stats.proximaVisitaHoje} color="#92400e" bg="#fef3c7" loading={isLoading} />
      </PageGrid>

      <PageSection
        title="Eu quero..."
        description="Escolha o que você precisa fazer. Cada opção abre um passo a passo."
      />

      <PageStack spacing={1.5}>
        {actions.map((action) => (
          <PageActionItem
            key={action.slug}
            title={action.label}
            description={action.description}
            hint={action.hint}
            icon={action.icon}
            disabled={!action.available}
            onClick={() => onOpenAction(action.slug)}
          />
        ))}
      </PageStack>
    </PageWrapper>
  )
}

export default VisaoGeralPage


