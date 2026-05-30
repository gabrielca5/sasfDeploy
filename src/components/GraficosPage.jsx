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
import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'

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

const stats = [
  { label: 'Famílias acompanhadas', value: '43', help: '+12% no mês' },
  { label: 'Cadastros recentes', value: '29', help: 'dados simulados' },
  { label: 'Atendimentos em aberto', value: '11', help: 'visão operacional' },
  { label: 'Encaminhamentos', value: '22', help: 'fluxo de rede' },
]

const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

function DashboardTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ p: 1.25, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff' }}
    >
      <Typography variant="body2" fontWeight={700} gutterBottom>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Typography key={entry.dataKey} variant="caption" display="block" color="text.secondary">
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </Paper>
  )
}

function GraficosPage() {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1320 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
              Gráficos
            </Typography>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
              Central analítica do painel
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720, ...cardTextSx }}>
              Os gráficos abaixo usam dados mockados para validar a leitura do painel antes da integração com a base real.
            </Typography>
          </Box>

          <Chip label="Mock data ativo" sx={{ backgroundColor: '#fffaf0', color: 'primary.dark', fontWeight: 700 }} />
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5 }}>
        {stats.map((item) => (
          <Paper
            key={item.label}
            elevation={0}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              borderColor: 'divider',
              backgroundColor: '#ffffff',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
              {item.label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={cardTextSx}>
              {item.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={cardTextSx}>
              {item.help}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            flex: '1 1 640px',
            minWidth: 320,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Evolução mensal
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Famílias, cadastros e atendimentos em linha do tempo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gráfico-base com dados simulados para mostrar como a informação pode crescer.
              </Typography>
            </Box>

            <Chip label="Dados mockados" sx={{ alignSelf: 'flex-start', backgroundColor: '#fffaf0', color: 'primary.dark' }} />
          </Stack>

          <Box sx={{ height: { xs: 260, sm: 300, md: 320 } }}>
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
          </Box>
        </Paper>

        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            flex: '1 1 420px',
            minWidth: 320,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Distribuição de status
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Situação atual das famílias
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Esse bloco simula a leitura de prioridades e acompanhamento por categoria.
              </Typography>
            </Box>

            <Chip label="Base para pizza / donut" sx={{ alignSelf: 'flex-start', backgroundColor: '#f5f5f5', color: 'text.primary' }} />
          </Stack>

          <Box sx={{ height: { xs: 260, sm: 300, md: 320 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<DashboardTooltip />} />
                <Legend />
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92} paddingAngle={3}>
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            flex: '1 1 640px',
            minWidth: 320,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Origem dos cadastros
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Canais de entrada simulados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use esse espaço para entender de onde os registros chegam e quais canais merecem mais atenção.
              </Typography>
            </Box>

            <Chip label="Preparado para troca de dados reais" sx={{ alignSelf: 'flex-start', backgroundColor: '#fffaf0', color: 'primary.dark' }} />
          </Stack>

          <Box sx={{ height: { xs: 240, sm: 280, md: 300 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<DashboardTooltip />} />
                <Bar dataKey="value" name="Cadastros" fill="#1e88e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            flex: '1 1 420px',
            minWidth: 320,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: 2,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Como ler os gráficos
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Texto de apoio para a futura camada analítica
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Os valores ainda são simulados. O objetivo aqui é deixar o padrão visual pronto para conectar dados reais depois, sem refazer o layout.
              </Typography>
            </Box>

            <Divider />

            <Stack spacing={1.5}>
              <Box>
                <Typography variant="body2" fontWeight={700} gutterBottom>
                  Gráfico de linha/área
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mostra tendência mensal de famílias, cadastros e atendimentos.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={700} gutterBottom>
                  Gráfico de pizza
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ajuda a entender a distribuição atual das famílias por situação.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={700} gutterBottom>
                  Gráfico de barras
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compara os canais de entrada para orientar ações operacionais.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

export default GraficosPage
