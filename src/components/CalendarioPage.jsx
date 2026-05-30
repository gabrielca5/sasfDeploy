import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'

const weekHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const monthGrid = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
]

const highlightedDays = {
  2: 'Visita domiciliar - Familia Souza',
  5: 'Reuniao de equipe com CRAS',
  12: 'Atualizacao cadastral UNAS',
  18: 'Atendimento prioritario',
  22: 'Oficina comunitaria',
  28: 'Retorno tecnico mensal',
}

const upcomingEvents = [
  {
    title: 'Atendimento prioritario',
    dateLabel: '18 mai, 09:00',
    owner: 'Tecnico de referencia',
    status: 'Confirmado',
  },
  {
    title: 'Oficina comunitaria',
    dateLabel: '22 mai, 14:30',
    owner: 'Equipe territorial',
    status: 'Pendente sincronizacao',
  },
  {
    title: 'Retorno tecnico mensal',
    dateLabel: '28 mai, 10:00',
    owner: 'Coordenacao',
    status: 'Rascunho',
  },
]

const integrationChecklist = [
  'Conectar OAuth 2.0 com conta institucional do Google',
  'Mapear evento SASF para recurso calendar.events do Google',
  'Criar sincronizacao bidirecional com fila de conflitos',
  'Registrar auditoria de alteracoes por usuario e horario',
]

function CalendarioPage() {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1320 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 3,
          borderColor: 'divider',
          background: 'linear-gradient(140deg, #ffffff 0%, #f3f8f5 55%, #e8f2ec 100%)',
        }}
      >
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
              <CalendarMonthRoundedIcon color="primary" fontSize="small" />
              <Typography variant="overline" color="primary" letterSpacing={1.8}>
                Calendario inteligente
              </Typography>
            </Stack>

            <Typography variant="h4" fontWeight={800} gutterBottom>
              Mockup de agenda para futura integracao com Google Agenda
            </Typography>

            <Typography color="text.secondary" sx={{ maxWidth: 780 }}>
              Estrutura visual pronta para evoluir para sincronizacao real de compromissos, com espaco para status de evento, responsavel e trilha de auditoria.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Chip label="Mockup funcional" sx={{ backgroundColor: '#fffaf0', color: 'primary.dark', fontWeight: 700 }} />
            <Chip label="Foco em Google Agenda" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 1.5 }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2.5,
            borderColor: 'divider',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Maio 2026
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  Visao mensal de compromissos
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button variant="outlined" startIcon={<LinkRoundedIcon />}>
                  Conectar Google
                </Button>
                <Button variant="contained" startIcon={<SyncRoundedIcon />}>
                  Simular sync
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: 1,
              }}
            >
              {weekHeaders.map((weekDay) => (
                <Paper
                  key={weekDay}
                  variant="outlined"
                  sx={{
                    py: 1,
                    px: 0.5,
                    textAlign: 'center',
                    borderRadius: 1.5,
                    borderColor: 'divider',
                    backgroundColor: '#f7faf8',
                  }}
                >
                  <Typography variant="caption" fontWeight={700} color="text.secondary">
                    {weekDay}
                  </Typography>
                </Paper>
              ))}

              {monthGrid.flat().map((day, index) => {
                const eventTitle = day ? highlightedDays[day] : null
                const isToday = day === 18

                return (
                  <Paper
                    key={`${day ?? 'empty'}-${index}`}
                    variant="outlined"
                    sx={{
                      minHeight: { xs: 68, sm: 88 },
                      p: 1,
                      borderRadius: 1.75,
                      borderColor: isToday ? 'primary.main' : 'divider',
                      backgroundColor: isToday ? '#e8f5ff' : eventTitle ? '#f7fbf8' : '#ffffff',
                      opacity: day ? 1 : 0.5,
                    }}
                  >
                    {day && (
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={isToday ? 800 : 700} color={isToday ? 'primary.main' : 'text.primary'}>
                          {day}
                        </Typography>
                        {eventTitle && (
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                            {eventTitle}
                          </Typography>
                        )}
                      </Stack>
                    )}
                  </Paper>
                )
              })}
            </Box>
          </Stack>
        </Paper>

        <Stack spacing={1.5}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2.25, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff' }}
          >
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Proximos compromissos
            </Typography>
            <Stack spacing={1.25}>
              {upcomingEvents.map((event) => (
                <Paper key={event.title} variant="outlined" sx={{ p: 1.25, borderRadius: 1.75, borderColor: 'divider', backgroundColor: '#fcfdfc' }}>
                  <Typography variant="body2" fontWeight={700}>
                    {event.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {event.dateLabel} - {event.owner}
                  </Typography>
                  <Chip
                    size="small"
                    label={event.status}
                    sx={{ mt: 0.75, backgroundColor: '#fffaf0', color: 'primary.dark' }}
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2.25, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff' }}
          >
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Preparacao da integracao
            </Typography>
            <Stack spacing={1.1} sx={{ mb: 2 }}>
              {integrationChecklist.map((item) => (
                <Typography key={item} variant="body2" color="text.secondary">
                  • {item}
                </Typography>
              ))}
            </Stack>

            <Button variant="text" endIcon={<OpenInNewRoundedIcon />} sx={{ px: 0 }}>
              Ver especificacao de integracao
            </Button>
          </Paper>
        </Stack>
      </Box>
    </Stack>
  )
}

export default CalendarioPage
