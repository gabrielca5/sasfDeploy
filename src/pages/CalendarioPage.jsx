import { useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import Button from '../components/ui/button'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import GoogleIcon from '@mui/icons-material/Google'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LinkOffRoundedIcon from '@mui/icons-material/LinkOffRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import familiesMock from '../data/familiesMock'
import useFamilias from '../hooks/useFamilias'
import { get, del } from '../lib/apiClient'
import {
  AuthAlert,
  CalendarMonthGrid,
  DetailItem,
  EmptyState,
  PageCard,
  PageDialog,
  PageGrid,
  PageList,
  PageListItem,
  PageSection,
  PageStack,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
} from './ui'

const weekHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_LABEL = 'Maio 2026'
const TODAY = 31

// TODO: replace with API data when endpoint /agenda/proximos is available
const upcomingEvents = [
  {
    title: 'Atendimento – Família Silva',
    dateLabel: 'Seg, 02 Jun 2026 · 09:00',
    owner: 'Carlos Eduardo Silva',
    status: 'Confirmado',
    statusColor: '#e8f5e9',
    statusTextColor: '#2e7d32',
  },
  {
    title: 'Visita domiciliar – Família Souza',
    dateLabel: 'Ter, 03 Jun 2026 · 14:30',
    owner: 'Ana Paula Mendes',
    status: 'Pendente',
    statusColor: '#fff8e1',
    statusTextColor: '#f57f17',
  },
  {
    title: 'Reunião de orientadores',
    dateLabel: 'Qui, 05 Jun 2026 · 10:00',
    owner: 'Carlos Eduardo Silva',
    status: 'Confirmado',
    statusColor: '#e8f5e9',
    statusTextColor: '#2e7d32',
  },
]

function GoogleCalendarCard() {
  const queryClient = useQueryClient()
  const [connectError, setConnectError] = useState(null)

  const { data: status, isLoading } = useQuery({
    queryKey: ['google-calendar-status'],
    queryFn: () => get('/google-calendar/status'),
    staleTime: 60_000,
  })

  const disconnectMutation = useMutation({
    mutationFn: () => del('/google-calendar/conexao'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['google-calendar-status'] }),
  })

  const handleConnect = async () => {
    setConnectError(null)
    try {
      const data = await get('/google-calendar/auth-url')
      window.location.href = data.authorizationUrl
    } catch (e) {
      setConnectError(
        e.status === 500
          ? 'Credenciais do Google não configuradas no servidor.'
          : 'Não foi possível iniciar a conexão.',
      )
    }
  }

  const credenciaisOk =
    status?.clientIdConfigured && status?.clientSecretConfigured && status?.redirectUriConfigured

  return (
    <PageCard
      title="Google Agenda"
      subtitle={status?.applicationName ?? 'Sincronização de atendimentos'}
      icon={<GoogleIcon fontSize="small" />}
    >
      <Stack spacing={1.5}>
        {connectError && <AuthAlert severity="error">{connectError}</AuthAlert>}

        {!isLoading && !credenciaisOk && (
          <AuthAlert severity="warning">
            Credenciais OAuth não configuradas no servidor. Contate o administrador.
          </AuthAlert>
        )}

        {status?.conectado ? (
          <>
            <StatusChip label="Conectado" tone="success" icon={<CheckCircleRoundedIcon />} />
            <DetailItem label="Conectado em" value={status.conectadoEm ?? '—'} />
            <DetailItem label="Token expira em" value={status.tokenExpiraEm ?? '—'} />
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<LinkOffRoundedIcon />}
              disabled={disconnectMutation.isPending}
              onClick={() => disconnectMutation.mutate()}
            >
              {disconnectMutation.isPending ? 'Desconectando…' : 'Desconectar'}
            </Button>
          </>
        ) : (
          <>
            {!isLoading && credenciaisOk && (
              <Typography variant="body2" color="text.secondary">
                Conecte sua conta Google para sincronizar atendimentos e visitas com o Google Agenda.
              </Typography>
            )}
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleConnect}
              disabled={isLoading || !credenciaisOk}
              sx={{ alignSelf: 'flex-start' }}
            >
              Conectar Google Agenda
            </Button>
          </>
        )}
      </Stack>
    </PageCard>
  )
}

function CalendarioPage() {
  const { data: familiasData = familiesMock } = useFamilias()
  const familiasList = Array.isArray(familiasData) ? familiasData : familiesMock
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [selectedFamilyId, setSelectedFamilyId] = useState('')
  const [professionalName, setProfessionalName] = useState('Carlos Eduardo Silva')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const selectedFamily = useMemo(
    () => familiasList.find((family) => family.id === selectedFamilyId) ?? null,
    [familiasList, selectedFamilyId],
  )
  // TODO: implement getOrientadorBadge when orientador data shape is defined
  const orientadorBadge = null // selectedFamily ? getOrientadorBadge(selectedFamily) : null
  const eventTitle = selectedFamily
    ? `ATENDIMENTO - ${professionalName} - ${selectedFamily.nome_representante}`
    : ''

  const calendarCells = useMemo(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const firstWeekday = firstDayOfMonth.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    const cells = []

    for (let i = firstWeekday - 1; i >= 0; i -= 1) {
      cells.push({
        day: daysInPreviousMonth - i,
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
      })
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ day, date: new Date(year, month, day), isCurrentMonth: true })
    }

    let nextDay = 1
    while (cells.length < 42) {
      cells.push({
        day: nextDay,
        date: new Date(year, month + 1, nextDay),
        isCurrentMonth: false,
      })
      nextDay += 1
    }

    return cells
  }, [])

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Minha Agenda"
        title="Calendário de atendimentos"
        description="Acompanhe seus compromissos e visitas do mês. Integração com Google Agenda em desenvolvimento."
        actions={(
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setScheduleOpen(true)}
            size="medium"
          >
            Agendar atendimento
          </Button>
        )}
      />

      <PageGrid variant="calendar">
        <PageCard
          title={MONTH_LABEL}
          subtitle="Visão mensal de compromissos"
          actions={<StatusChip label="Visualização" />}
        >
          <CalendarMonthGrid weekHeaders={weekHeaders} cells={calendarCells} today={TODAY} />
        </PageCard>

        <PageStack spacing={1.5}>
          <SectionBlock title="Próximos compromissos">
            <PageList>
              {upcomingEvents?.length ? (
                upcomingEvents.map((event) => (
                  <PageListItem
                    key={event.title}
                    title={event.title}
                    subtitle={event.dateLabel}
                    actions={<EventOutlinedIcon color="primary" fontSize="small" />}
                    footer={
                      <PageToolbar justifyContent="flex-start">
                        <StatusChip label={event.owner} icon={<PersonOutlinedIcon />} />
                        <StatusChip
                          label={event.status}
                          customColor={event.statusColor}
                          customTextColor={event.statusTextColor}
                        />
                      </PageToolbar>
                    }
                  />
                ))
              ) : (
                <EmptyState message="Nenhum compromisso próximo." icon={<EventOutlinedIcon />} />
              )}
            </PageList>
          </SectionBlock>

          <SectionBlock title="Solicitações de agendamento">
            <EmptyState message="Nenhuma solicitação pendente." icon={<CalendarMonthRoundedIcon />} />
          </SectionBlock>

          <GoogleCalendarCard />
        </PageStack>
      </PageGrid>

      <PageDialog
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        title="Agendar atendimento"
        maxWidth="sm"
        actions={
          <>
            <Button variant="outlined" onClick={() => setScheduleOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              disabled={!selectedFamilyId || !selectedDate || !selectedTime}
              onClick={() => {
                setScheduleOpen(false)
                setConfirmationOpen(true)
              }}
            >
              Agendar
            </Button>
          </>
        }
      >
        <PageStack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Família</InputLabel>
            <Select
              value={selectedFamilyId}
              label="Família"
              onChange={(event) => setSelectedFamilyId(event.target.value)}
            >
              {familiasList.map((family) => (
                <MenuItem key={family.id} value={family.id}>
                  {family.nome_representante} · {family.cpf}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Profissional responsável"
            value={professionalName}
            onChange={(event) => setProfessionalName(event.target.value)}
          />

          <PageGrid variant="detail2">
            <TextField
              label="Data"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Horário"
              type="time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </PageGrid>

          {selectedFamily && (
            <PageStack>
              <DetailItem label="Pré-visualização do evento" value={eventTitle || '—'} icon={<CalendarMonthRoundedIcon fontSize="small" />} />
              {orientadorBadge && (
                <StatusChip
                  label={orientadorBadge.label}
                  customColor={orientadorBadge.backgroundColor}
                  customTextColor={orientadorBadge.color}
                  fit
                />
              )}
            </PageStack>
          )}
        </PageStack>
      </PageDialog>

      <PageDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        title="Atendimento agendado com sucesso"
        titleIcon={<CheckCircleRoundedIcon color="success" />}
        maxWidth="xs"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => {
                // TODO: POST /api/notificacao/orientador ou orientador-controller
                setConfirmationOpen(false)
              }}
            >
              Informar orientador
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                // TODO: POST /api/notificacao/representante ou representante-controller
                setConfirmationOpen(false)
              }}
            >
              Informar representante
            </Button>
          </>
        }
      >
        <Typography variant="body2" color="text.secondary">
          O atendimento foi registrado. Deseja notificar o orientador ou o representante da família?
        </Typography>
      </PageDialog>
    </PageWrapper>
  )
}

export default CalendarioPage
