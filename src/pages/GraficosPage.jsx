import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Divider, Typography } from '@mui/material'
import { useMemo } from 'react'
import {
  ChartFrame,
  PageCard,
  PageGrid,
  PageSection,
  PageWrapper,
  StatusChip,
} from './ui'
import useFamilias from '../hooks/useFamilias'

const monthlyData = [
  { month: 'Jan', familias: 24, cadastros: 12, atendimentos: 18 },
  { month: 'Fev', familias: 28, cadastros: 16, atendimentos: 20 },
  { month: 'Mar', familias: 31, cadastros: 18, atendimentos: 26 },
  { month: 'Abr', familias: 36, cadastros: 24, atendimentos: 30 },
  { month: 'Mai', familias: 39, cadastros: 27, atendimentos: 33 },
  { month: 'Jun', familias: 43, cadastros: 29, atendimentos: 35 },
]

const statusData = [
  { name: 'Ativas', value: 18 },
  { name: 'Acompanhamento', value: 9 },
  { name: 'Pendentes', value: 6 },
  { name: 'Concluídas', value: 11 },
]

const channelData = [
  { name: 'CRAS', value: 14 },
  { name: 'Busca ativa', value: 9 },
  { name: 'Encaminhamento', value: 12 },
  { name: 'Demanda espontânea', value: 7 },
]

const statusColors = ['#1e88e5', '#5b9bd9', '#a9c6ea', '#d6e9fb']


function DashboardTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <PageCard surface="detail">
      <Typography variant="body2" fontWeight={700} gutterBottom>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Typography key={entry.dataKey} variant="caption" display="block" color="text.secondary">
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </PageCard>
  )
}

function GraficosPage() {
  const { data: familiasData = [], isLoading } = useFamilias()
  const familias = Array.isArray(familiasData) ? familiasData : []

  const realStats = useMemo(() => {
    const hoje = new Date()
    const trintaDiasAtras = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 30)
    const alta = familias.filter(f => f.prioridade === 'Alta').length
    const media = familias.filter(f => f.prioridade === 'Média').length
    const visitadasRecente = familias.filter(f => {
      if (!f.ultima_visita) return false
      return new Date(`${f.ultima_visita}T00:00:00`) >= trintaDiasAtras
    }).length
    return [
      { label: 'Famílias registradas', value: isLoading ? '—' : String(familias.length), help: 'dados reais' },
      { label: 'Prioridade Alta', value: isLoading ? '—' : String(alta), help: 'requer atenção imediata' },
      { label: 'Prioridade Média', value: isLoading ? '—' : String(media), help: 'em acompanhamento' },
      { label: 'Visitadas (30 dias)', value: isLoading ? '—' : String(visitadasRecente), help: 'dados reais' },
    ]
  }, [familias, isLoading])

  const priorityData = useMemo(() => [
    { name: 'Alta', value: familias.filter(f => f.prioridade === 'Alta').length },
    { name: 'Média', value: familias.filter(f => f.prioridade === 'Média').length },
    { name: 'Baixa', value: familias.filter(f => f.prioridade === 'Baixa').length },
  ].filter(d => d.value > 0), [familias])

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Gráficos"
        title="Central analítica do painel"
        description="Estatísticas em tempo real das famílias registradas no sistema."
        actions={<StatusChip label="Dados reais" tone="highlight" />}
      />

      <PageGrid variant="stats">
        {realStats.map((item) => (
          <PageCard key={item.label} hover>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {item.label}
            </Typography>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              {item.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.help}
            </Typography>
          </PageCard>
        ))}
      </PageGrid>

      <PageGrid variant="chart">
        <PageCard
          eyebrow="Evolução mensal"
          title="Famílias, cadastros e atendimentos em linha do tempo"
          subtitle="Gráfico-base com dados simulados para mostrar como a informação pode crescer."
          actions={<StatusChip label="Dados mockados" tone="highlight" />}
        >
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<DashboardTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="familias" name="Famílias" stroke="#1e88e5" fill="#1e88e5" fillOpacity={0.18} strokeWidth={2} />
                <Area type="monotone" dataKey="cadastros" name="Cadastros" stroke="#5b9bd9" fill="#5b9bd9" fillOpacity={0.16} strokeWidth={2} />
                <Area type="monotone" dataKey="atendimentos" name="Atendimentos" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.14} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </PageCard>

        <PageCard
          eyebrow="Distribuição por prioridade"
          title="Prioridades das famílias"
          subtitle="Distribuição real das famílias cadastradas por nível de prioridade."
          actions={<StatusChip label="Dados reais" tone="highlight" />}
        >
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<DashboardTooltip />} />
                <Legend />
                <Pie data={priorityData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92} paddingAngle={3}>
                  {priorityData.map((entry) => {
                    const color = entry.name === 'Alta' ? '#B91C1C' : entry.name === 'Média' ? '#92400E' : '#065F46'
                    return <Cell key={entry.name} fill={color} />
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartFrame>
        </PageCard>
      </PageGrid>

      <PageGrid variant="chart">
        <PageCard
          eyebrow="Origem dos cadastros"
          title="Canais de entrada simulados"
          subtitle="Use esse espaço para entender de onde os registros chegam e quais canais merecem mais atenção."
          actions={<StatusChip label="Preparado para troca de dados reais" tone="highlight" />}
        >
          <ChartFrame compact>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<DashboardTooltip />} />
                <Bar dataKey="value" name="Cadastros" fill="#1e88e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </PageCard>

        <PageCard
          eyebrow="Como ler os gráficos"
          title="Texto de apoio para a futura camada analítica"
          subtitle="Os valores ainda são simulados. O objetivo aqui é deixar o padrão visual pronto para conectar dados reais depois, sem refazer o layout."
        >
          <Divider />
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Gráfico de linha/área
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mostra tendência mensal de famílias, cadastros e atendimentos.
          </Typography>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Gráfico de pizza
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ajuda a entender a distribuição atual das famílias por situação.
          </Typography>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Gráfico de barras
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Compara os canais de entrada para orientar ações operacionais.
          </Typography>
        </PageCard>
      </PageGrid>
    </PageWrapper>
  )
}

export default GraficosPage
