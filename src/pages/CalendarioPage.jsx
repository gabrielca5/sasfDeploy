import { useState, useMemo, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Divider, FormControl, InputLabel, MenuItem,
  Select, Stack, TextField, Typography,
} from '@mui/material'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import GoogleIcon from '@mui/icons-material/Google'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import LinkOffRoundedIcon from '@mui/icons-material/LinkOffRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { get, post, del } from '../lib/apiClient'
import { useAuth } from '../contexts/AuthContext'
import useFamilias from '../hooks/useFamilias'
import {
  ActionButton,
  ButtonLoading,
  CalendarLegend,
  CalendarSurface,
  DetailItem,
  EmptyState,
  getCalendarEventProps,
  InlineFeedback,
  PageCard,
  PageDialog,
  PageGrid,
  PageSection,
  PageStack,
  PageToolbar,
  PageWrapper,
  StatusChip,
  StatusBanner,
  SuccessState,
} from './ui'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales: { 'pt-BR': ptBR },
})

const messages = {
  allDay: 'Dia inteiro',
  previous: '‹',
  next: '›',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Nenhum evento neste período.',
  showMore: (n) => `+${n} mais`,
}

const calendarLegendItems = [
  { label: 'Google Agenda', color: '#1e88e5' },
  { label: 'Reavaliação PDU', color: '#d97706' },
  { label: 'Validade PDU', color: '#db2777' },
]

function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR')
}

function GoogleCalendarCard({ status, isLoading, onDisconnect, isDisconnecting }) {
  const [connectError, setConnectError] = useState(null)
  const credenciaisOk =
    status?.clientIdConfigured && status?.clientSecretConfigured && status?.redirectUriConfigured

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

  return (
    <PageCard
      title="Google Agenda"
      subtitle={status?.applicationName ?? 'Sincronização de eventos'}
      icon={<GoogleIcon fontSize="small" />}
    >
      <Stack spacing={1.5}>
        {connectError && <InlineFeedback severity="error" message={connectError} />}

        {!isLoading && !credenciaisOk && (
          <InlineFeedback severity="warning" message="Credenciais OAuth não configuradas. Contate o administrador." />
        )}

        {status?.conectado ? (
          <>
            <StatusChip label="Conectado" tone="success" icon={<CheckCircleRoundedIcon />} />
            <DetailItem label="Conectado em" value={status.conectadoEm ?? '—'} />
            <DetailItem label="Token expira em" value={status.tokenExpiraEm ?? '—'} />
            <ButtonLoading
              color="error"
              size="small"
              startIcon={<LinkOffRoundedIcon />}
              loading={isDisconnecting}
              loadingLabel="Desconectando..."
              onClick={onDisconnect}
            >
              Desconectar
            </ButtonLoading>
          </>
        ) : (
          <>
            {!isLoading && credenciaisOk && (
              <EmptyState message="Conecte sua conta Google para sincronizar eventos com o calendário." />
            )}
            <ButtonLoading
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleConnect}
              disabled={isLoading || !credenciaisOk}
            >
              Conectar Google Agenda
            </ButtonLoading>
          </>
        )}
      </Stack>
    </PageCard>
  )
}

function TarefasCard({ pdus, userName }) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const upcoming = useMemo(() => {
    const items = []
    pdus.forEach((p) => {
      const label = p.numeroPlano ? `PDU Nº${p.numeroPlano}` : 'PDU'
      if (p.dataReavaliacao) {
        const d = new Date(p.dataReavaliacao + 'T00:00:00')
        items.push({ id: `reav-${p.id}`, label, tipo: 'Reavaliação', date: d, pdu: p })
      } else if (p.dataValidade) {
        const d = new Date(p.dataValidade + 'T00:00:00')
        items.push({ id: `val-${p.id}`, label, tipo: 'Validade', date: d, pdu: p })
      }
    })
    return items.sort((a, b) => a.date - b.date).slice(0, 6)
  }, [pdus])

  return (
    <PageCard
      title="Minhas tarefas"
      subtitle={userName ?? '—'}
      icon={<AssignmentOutlinedIcon fontSize="small" />}
    >
      {upcoming.length === 0 ? (
        <EmptyState message="Nenhuma tarefa encontrada para sua conta." />
      ) : (
        <Stack divider={<Divider />} spacing={0}>
          {upcoming.map((item) => {
            const vencida = item.date < hoje
            return (
              <Stack key={item.id} direction="row" alignItems="center" justifyContent="space-between" py={1}>
                <Stack spacing={0.25}>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {item.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.tipo}
                  </Typography>
                </Stack>
                <StatusChip
                  label={item.date.toLocaleDateString('pt-BR')}
                  customColor={vencida ? '#fee2e2' : item.tipo === 'Reavaliação' ? '#fef3c7' : '#fce7f3'}
                  customTextColor={vencida ? '#dc2626' : item.tipo === 'Reavaliação' ? '#92400e' : '#9d174d'}
                  fit
                />
              </Stack>
            )
          })}
        </Stack>
      )}
    </PageCard>
  )
}

function CalendarioPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const { data: familiasData = [] } = useFamilias()
  const familiasList = useMemo(() => (Array.isArray(familiasData) ? familiasData : []), [familiasData])

  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState(Views.MONTH)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedPdu, setSelectedPdu] = useState(null)
  const [selectedFamilyId, setSelectedFamilyId] = useState('')
  const [professionalName, setProfessionalName] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState('')
  const [scheduleError, setScheduleError] = useState(null)

  const timeMin = useMemo(() => format(startOfMonth(currentDate), "yyyy-MM-dd'T'HH:mm:ssxxx"), [currentDate])
  const timeMax = useMemo(() => format(endOfMonth(currentDate), "yyyy-MM-dd'T'23:59:59xxx"), [currentDate])

  const { data: gcStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['google-calendar-status'],
    queryFn: () => get('/google-calendar/status'),
    staleTime: 60_000,
  })

  const { data: rawEvents = [], isError: eventosError, refetch: refetchEvents } = useQuery({
    queryKey: ['google-calendar-eventos', timeMin, timeMax],
    queryFn: () =>
      get(`/google-calendar/eventos?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&maxResults=100`),
    enabled: !!gcStatus?.conectado,
    staleTime: 2 * 60_000,
  })

  const { data: profile } = useQuery({
    queryKey: ['usuario', user?.userId],
    queryFn: () => get(`/usuario/${user.userId}`),
    enabled: !!user?.userId,
    staleTime: 5 * 60_000,
  })

  const { data: rawPdus = [] } = useQuery({
    queryKey: ['pdu'],
    queryFn: () => get('/pdu?size=2000'),
    staleTime: 5 * 60_000,
  })
  
  // O backend devolve coleções paginadas (Spring Page: { content: [...] }).
  // Normaliza para array para evitar quebrar .filter/.map e deixar a tela branca.
  const pdus = useMemo(() => (Array.isArray(rawPdus) ? rawPdus : rawPdus?.content ?? []), [rawPdus])
  const eventos = useMemo(() => (Array.isArray(rawEvents) ? rawEvents : rawEvents?.content ?? []), [rawEvents])

  const myPdus = useMemo(() =>
    pdus.filter(
      (p) => p.tecnicoReferenciaId === user?.userId || p.tecnicoAcompanhamentoId === user?.userId,
    ),
  [pdus, user?.userId])

  const calendarEvents = useMemo(() =>
    eventos.map((e) => ({
      id: e.id,
      title: e.titulo ?? '(sem título)',
      start: new Date(e.inicio),
      end: e.fim ? new Date(e.fim) : new Date(new Date(e.inicio).getTime() + 60 * 60 * 1000),
      resource: { type: 'google', data: e },
    })),
  [eventos])

  const pduEvents = useMemo(() => {
    const events = []
    myPdus.forEach((p) => {
      const label = p.numeroPlano ? `PDU Nº${p.numeroPlano}` : 'PDU'
      if (p.dataReavaliacao) {
        const d = new Date(p.dataReavaliacao + 'T00:00:00')
        events.push({
          id: `pdu-reav-${p.id}`,
          title: `Reavaliação — ${label}`,
          start: d,
          end: d,
          allDay: true,
          resource: { type: 'pdu-reavaliacao', data: p },
        })
      }
      if (p.dataValidade) {
        const d = new Date(p.dataValidade + 'T00:00:00')
        events.push({
          id: `pdu-val-${p.id}`,
          title: `Validade — ${label}`,
          start: d,
          end: d,
          allDay: true,
          resource: { type: 'pdu-validade', data: p },
        })
      }
    })
    return events
  }, [myPdus])

  const allEvents = useMemo(() => [...calendarEvents, ...pduEvents], [calendarEvents, pduEvents])

  const eventPropGetter = useCallback((event) => getCalendarEventProps(event.resource?.type), [])

  const disconnectMutation = useMutation({
    mutationFn: () => del('/google-calendar/conexao'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-calendar-status'] })
      queryClient.removeQueries({ queryKey: ['google-calendar-eventos'] })
    },
  })

  const scheduleMutation = useMutation({
    mutationFn: (payload) => post('/google-calendar/eventos', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-calendar-eventos'] })
      setScheduleOpen(false)
      setConfirmationOpen(true)
      setSelectedFamilyId('')
      setSelectedDateTime('')
    },
    onError: (e) => {
      setScheduleError(e.data?.mensagem || e.message || `Erro ${e.status ?? ''} ao criar evento no Google Agenda.`)
    },
  })

  const selectedFamily = useMemo(
    () => familiasList.find((f) => f.id === selectedFamilyId) ?? null,
    [familiasList, selectedFamilyId],
  )

  const eventTitle = selectedFamily
    ? `ATENDIMENTO - ${professionalName ?? profile?.name ?? ''} - ${selectedFamily.nome_representante}`
    : ''

  const handleSelectSlot = useCallback(({ start }) => {
    const d = new Date(start)
    const date = d.toISOString().split('T')[0]
    const time = d.getHours() === 0 ? '09:00' : `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    setSelectedDateTime(`${date}T${time}`)
    setScheduleError(null)
    setScheduleOpen(true)
  }, [])

  const handleSelectEvent = useCallback((event) => {
    const type = event.resource?.type
    if (type === 'pdu-reavaliacao' || type === 'pdu-validade') {
      setSelectedPdu({ ...event.resource.data, _tipo: type })
    } else {
      setSelectedEvent(event.resource.data)
    }
  }, [])

  const handleNavigate = useCallback((date) => setCurrentDate(date), [])
  const handleViewChange = useCallback((view) => setCurrentView(view), [])

  const toUTCSeconds = (localDateTimeStr) =>
    new Date(`${localDateTimeStr}:00`).toISOString().replace(/\.\d+Z$/, 'Z')

  const handleAgendar = () => {
    if (!selectedFamilyId || !selectedDateTime) return
    setScheduleError(null)
    const inicioDate = new Date(`${selectedDateTime}:00`)
    const fimDate = new Date(inicioDate.getTime() + 60 * 60 * 1000)
    scheduleMutation.mutate({
      titulo: eventTitle,
      inicio: toUTCSeconds(selectedDateTime),
      fim: fimDate.toISOString().replace(/\.\d+Z$/, 'Z'),
      fusoHorario: 'America/Sao_Paulo',
      descricao: `Família: ${selectedFamily?.nome_representante ?? ''}`,
    })
  }

  const userName = profile?.name ?? user?.email ?? '—'

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Minha Agenda"
        title="Calendário de atendimentos"
        description="Eventos do Google Agenda e tarefas do plano de desenvolvimento."
        actions={
          <ActionButton
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => { setScheduleError(null); setScheduleOpen(true) }}
            disabled={!gcStatus?.conectado}
          >
            Agendar atendimento
          </ActionButton>
        }
      />

      <CalendarLegend items={calendarLegendItems} />

      <PageGrid variant="calendar">
        <CalendarSurface>
          <Calendar
            localizer={localizer}
            events={allEvents}
            eventPropGetter={eventPropGetter}
            date={currentDate}
            view={currentView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable={!!gcStatus?.conectado}
            culture="pt-BR"
            messages={messages}
            popup
          />
        </CalendarSurface>

        {/* Painel lateral */}
        <PageStack spacing={1.5}>
          {!gcStatus?.conectado && !statusLoading && (
            <StatusBanner severity="info" message="Conecte o Google Agenda para visualizar e criar eventos no calendário." />
          )}

          {eventosError && gcStatus?.conectado && (
            <StatusBanner
              severity="error"
              message="Não foi possível carregar os eventos do Google Agenda."
              action={<ActionButton onClick={() => refetchEvents()}>Tentar novamente</ActionButton>}
            />
          )}

          <TarefasCard pdus={myPdus} userName={userName} />

          <GoogleCalendarCard
            status={gcStatus}
            isLoading={statusLoading}
            onDisconnect={() => disconnectMutation.mutate()}
            isDisconnecting={disconnectMutation.isPending}
          />
        </PageStack>
      </PageGrid>

      {/* Dialog: Detalhe evento Google */}
      {selectedEvent && (
        <PageDialog
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.titulo ?? 'Evento'}
          titleIcon={<EventOutlinedIcon color="primary" />}
          maxWidth="xs"
          showClose
          actions={
            selectedEvent.htmlLink ? (
              <ActionButton
                endIcon={<OpenInNewRoundedIcon />}
                onClick={() => window.open(selectedEvent.htmlLink, '_blank')}
              >
                Abrir no Google Agenda
              </ActionButton>
            ) : null
          }
        >
          <Stack spacing={1.5}>
            <DetailItem label="Início" value={
              selectedEvent.inicio
                ? new Date(selectedEvent.inicio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                : '—'
            } />
            <DetailItem label="Fim" value={
              selectedEvent.fim
                ? new Date(selectedEvent.fim).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                : '—'
            } />
            {selectedEvent.descricao && (
              <DetailItem label="Descrição" value={selectedEvent.descricao} />
            )}
            {selectedEvent.local && (
              <DetailItem label="Local" value={selectedEvent.local} />
            )}
            {selectedEvent.status && (
              <StatusChip
                label={selectedEvent.status === 'confirmed' ? 'Confirmado' : selectedEvent.status}
                tone={selectedEvent.status === 'confirmed' ? 'success' : 'muted'}
                fit
              />
            )}
          </Stack>
        </PageDialog>
      )}

      {/* Dialog: Detalhe PDU */}
      {selectedPdu && (
        <PageDialog
          open={!!selectedPdu}
          onClose={() => setSelectedPdu(null)}
          title={selectedPdu.numeroPlano ? `PDU Nº${selectedPdu.numeroPlano}` : 'Plano de Desenvolvimento'}
          titleIcon={<AssignmentOutlinedIcon color={selectedPdu._tipo === 'pdu-reavaliacao' ? 'warning' : 'error'} />}
          maxWidth="xs"
          showClose
        >
          <Stack spacing={1.5}>
            <StatusChip
              label={selectedPdu._tipo === 'pdu-reavaliacao' ? 'Reavaliação' : 'Validade'}
              tone={selectedPdu._tipo === 'pdu-reavaliacao' ? 'highlight' : 'error'}
            />
            <DetailItem label="Técnico responsável" value={userName} />
            {selectedPdu.dataElaboracao && (
              <DetailItem label="Elaboração" value={fmtDate(selectedPdu.dataElaboracao)} />
            )}
            {selectedPdu.dataReavaliacao && (
              <DetailItem label="Reavaliação" value={fmtDate(selectedPdu.dataReavaliacao)} />
            )}
            {selectedPdu.dataValidade && (
              <DetailItem label="Validade" value={fmtDate(selectedPdu.dataValidade)} />
            )}
            {selectedPdu.sinteseSituacaoApresentada && (
              <DetailItem label="Síntese" value={selectedPdu.sinteseSituacaoApresentada} />
            )}
            {selectedPdu.observacoes && (
              <DetailItem label="Observações" value={selectedPdu.observacoes} />
            )}
          </Stack>
        </PageDialog>
      )}

      {/* Dialog: Agendar atendimento */}
      <PageDialog
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        title="Agendar atendimento"
        maxWidth="sm"
        actions={
          <PageToolbar direction="row" alignItems="center" justifyContent="flex-end">
            <ActionButton onClick={() => setScheduleOpen(false)}>
              Cancelar
            </ActionButton>
            <ButtonLoading
              variant="contained"
              loading={scheduleMutation.isPending}
              loadingLabel="Agendando..."
              disabled={!selectedFamilyId || !selectedDateTime || scheduleMutation.isPending}
              onClick={handleAgendar}
            >
              Agendar
            </ButtonLoading>
          </PageToolbar>
        }
      >
        <PageStack spacing={2}>
          {scheduleError && <InlineFeedback severity="error" message={scheduleError} />}

          <FormControl fullWidth>
            <InputLabel>Família</InputLabel>
            <Select value={selectedFamilyId} label="Família" onChange={(e) => setSelectedFamilyId(e.target.value)}>
              {familiasList.map((family) => (
                <MenuItem key={family.id} value={family.id}>
                  {family.nome_representante} · {family.cpf}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Profissional responsável"
            value={professionalName ?? profile?.name ?? ''}
            onChange={(e) => setProfessionalName(e.target.value)}
          />

          <TextField
            label="Data e horário"
            type="datetime-local"
            fullWidth
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          {selectedFamily && (
            <DetailItem
              label="Pré-visualização do evento"
              value={eventTitle || '—'}
              icon={<CalendarMonthRoundedIcon fontSize="small" />}
            />
          )}
        </PageStack>
      </PageDialog>

      {/* Dialog: Confirmação */}
      <PageDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        title="Atendimento agendado!"
        titleIcon={<CheckCircleRoundedIcon color="success" />}
        maxWidth="xs"
        actions={
          <ActionButton variant="contained" onClick={() => setConfirmationOpen(false)}>Fechar</ActionButton>
        }
      >
        <SuccessState message="O evento foi criado no Google Agenda e já aparece no calendário." compact />
      </PageDialog>
    </PageWrapper>
  )
}

export default CalendarioPage
