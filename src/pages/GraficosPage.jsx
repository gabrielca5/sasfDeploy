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
import { useMemo } from 'react'
import {
  ChartFrame,
  ChartTooltipCard,
  ErrorState,
  LoadingState,
  PageList,
  PageListItem,
  PageCard,
  PageGrid,
  PageMetricCard,
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

const channelData = [
  { name: 'CRAS', value: 14 },
  { name: 'Busca ativa', value: 9 },
  { name: 'Encaminhamento', value: 12 },
  { name: 'Demanda espontânea', value: 7 },
]

const chartNotes = [
  {
    title: 'Gráfico de linha/área',
    description: 'Mostra tendência mensal de famílias, cadastros e atendimentos.',
  },
  {
    title: 'Gráfico de pizza',
    description: 'Ajuda a entender a distribuição atual das famílias por situação.',
  },
  {
    title: 'Gráfico de barras',
    description: 'Compara os canais de entrada para orientar ações operacionais.',
  },
]

function GraficosPage() {
  const { data: familiasData = [], isLoading, isError, refetch } = useFamilias()

  const realStats = useMemo(() => {
    const familias = Array.isArray(familiasData) ? familiasData : []
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
  }, [familiasData, isLoading])

  const priorityData = useMemo(() => {
    const familias = Array.isArray(familiasData) ? familiasData : []
    return [
      { name: 'Alta', value: familias.filter(f => f.prioridade === 'Alta').length },
      { name: 'Média', value: familias.filter(f => f.prioridade === 'Média').length },
      { name: 'Baixa', value: familias.filter(f => f.prioridade === 'Baixa').length },
    ].filter(d => d.value > 0)
  }, [familiasData])

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Gráficos"
        title="Central analítica do painel"
        description="Estatísticas em tempo real das famílias registradas no sistema."
        actions={<StatusChip label="Dados reais" tone="highlight" />}
      />

      {isError && (
        <ErrorState
          title="Não foi possível atualizar os dados dos gráficos"
          message="Os gráficos com dados reais podem estar desatualizados."
          onRetry={refetch}
          compact
        />
      )}

      {isLoading ? (
        <LoadingState message="Carregando estatísticas..." skeleton variant="cards" rows={4} />
      ) : (
        <PageGrid variant="stats">
          {realStats.map((item) => (
            <PageMetricCard key={item.label} label={item.label} value={item.value} helper={item.help} />
          ))}
        </PageGrid>
      )}

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
                <Tooltip content={<ChartTooltipCard />} />
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
                <Tooltip content={<ChartTooltipCard />} />
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
                <Tooltip content={<ChartTooltipCard />} />
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
          <PageList variant="embedded">
            {chartNotes.map((item) => (
              <PageListItem
                key={item.title}
                title={item.title}
                subtitle={item.description}
                variant="compact"
              />
            ))}
          </PageList>
        </PageCard>
      </PageGrid>
    </PageWrapper>
  )
}

export default GraficosPage
