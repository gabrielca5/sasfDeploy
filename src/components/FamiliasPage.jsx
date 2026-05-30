import { useMemo, useState } from 'react'
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import IconButton from '@mui/material/IconButton'

import familiesMock from '../data/familiesMock'
import useFamilias from '../hooks/useFamilias'

// fallback when hook not used directly
const families = familiesMock

const statusOptions = ['Todas', 'Ativa', 'Acompanhamento', 'Prioritária']
const priorityOptions = ['Todas', 'Alta', 'Média', 'Baixa']
const districtOptions = ['Todos', 'Ipiranga', 'Vila Prudente', 'Sacomã']
const benefitOptions = ['Todos', 'Bolsa Família', 'Renda Cidadã', 'BPC', 'Sem benefício']

const orientadorPalette = [
  { id: 'orientador1', backgroundColor: '#FDECEC', color: '#B91C1C' },
  { id: 'orientador2', backgroundColor: '#FEF9C3', color: '#A16207' },
  { id: 'orientador3', backgroundColor: '#DCFCE7', color: '#15803D' },
  { id: 'orientador4', backgroundColor: '#DBEAFE', color: '#1D4ED8' },
  { id: 'orientador5', backgroundColor: '#F3E8FF', color: '#7E22CE' },
  { id: 'orientador6', backgroundColor: '#FFEDD5', color: '#C2410C' },
  { id: 'orientador7', backgroundColor: '#FCE7F3', color: '#BE185D' },
  { id: 'orientador8', backgroundColor: '#EFE2D6', color: '#7C2D12' },
]

function getOrientadorLabel(seed) {
  const value = String(seed || '')
  let hash = 0

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) % 2147483647
  }

  return orientadorPalette[hash % orientadorPalette.length]
}

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`))
}

async function copyTextToClipboard(text) {
  if (!text || text === '—') {
    return
  }

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

function DetailItem({ label, value, icon }) {
  const copyValue = typeof value === 'string' ? value : String(value ?? '')
  const canCopy = Boolean(copyValue && copyValue !== '—')

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#ffffff',
        minWidth: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ minWidth: 0 }}>
        <Box sx={{ flexShrink: 0, pt: 0.2 }}>{icon}</Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={cardTextSx}>
            {label}
          </Typography>
          <Typography variant="body2" fontWeight={700} sx={cardTextSx}>
            {value || '—'}
          </Typography>
        </Box>
        <IconButton
          size="small"
          aria-label={`Copiar ${label}`}
          disabled={!canCopy}
          onClick={() => copyTextToClipboard(copyValue)}
          sx={{ flexShrink: 0, mt: -0.25, color: 'text.secondary' }}
        >
          <ContentCopyOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  )
}

function FamilySummaryChip({ label, color = 'default' }) {
  return <Chip label={label} size="small" color={color} variant={color === 'default' ? 'outlined' : 'filled'} sx={{ maxWidth: '100%' }} />
}

function FamilyPreviewCard({ family, selected, onSelect }) {
  const orientador = getOrientadorLabel(family.nome_representante)

  return (
    <Paper
      elevation={0}
      variant="outlined"
      onClick={onSelect}
      sx={{
        p: 1.75,
        borderRadius: 2.5,
        cursor: 'pointer',
        borderColor: selected ? 'primary.main' : 'divider',
        backgroundColor: selected ? '#fffaf0' : '#ffffff',
        transition: 'border-color 160ms ease, transform 160ms ease, background-color 160ms ease',
        '&:hover': { transform: 'translateY(-1px)', borderColor: 'primary.main' },
      }}
    >
      <Stack spacing={1} sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={800} noWrap sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {family.nome_representante}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {family.endereco}, {family.numero} • {family.bairro}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ minWidth: 0 }}>
          <Chip label={family.status} size="small" color={family.status === 'Prioritária' ? 'error' : 'primary'} variant={family.status === 'Ativa' ? 'outlined' : 'filled'} />
          <Chip label={`Prioridade ${family.prioridade}`} size="small" variant="outlined" />
          <Chip
            label={orientador.id}
            size="small"
            sx={{
              backgroundColor: orientador.backgroundColor,
              color: orientador.color,
              fontWeight: 700,
            }}
          />
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 0 }}>
          {family.cras} • {family.tags.slice(0, 2).join(' · ')}
        </Typography>
      </Stack>
    </Paper>
  )
}

function FamilyDetailPanel({ family }) {
  if (!family) return null

  const orientadorRepresentante = getOrientadorLabel(family.nome_representante)
  const identityGroups = [
    {
      title: 'Cadastro pessoal',
      items: [
        ['Sexo', family.sexo],
        ['Data de matrícula', family.data_matricula],
        ['Data de nascimento', family.data_nascimento],
        ['Naturalidade', family.naturalidade],
        ['Cor/raça', family.cor_raca],
        ['Pessoa com deficiência', family.pessoa_deficiencia],
      ],
    },
    {
      title: 'Documentos e vínculos',
      items: [
        ['CPF', family.cpf],
        ['RG / Órgão emissor', `${family.rg} • ${family.orgao_emissor}`],
        ['UF / CTPS', `${family.uf} • ${family.ctps_numero}/${family.ctps_serie}`],
        ['Emissão CTPS', family.ctps_emissao],
        ['Mãe / Pai', `${family.mae} • ${family.pai}`],
        ['Estado civil', family.estado_civil],
      ],
    },
    {
      title: 'Escolaridade e trabalho',
      items: [
        ['Grau de instrução', family.grau_instrucao],
        ['Profissão', family.profissao],
        ['Ocupação', family.ocupacao_descricao],
        ['Situação ocupacional', family.ocupacao_situacao],
        ['Renda', `R$ ${family.renda}`],
        ['Desligamento', family.data_desligamento || 'Em acompanhamento'],
      ],
    },
  ]

  return (
    <Stack spacing={1.5} sx={{ minWidth: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.6} sx={cardTextSx}>
              Família selecionada
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={cardTextSx}>
              {family.nome_representante}
            </Typography>
            <Typography color="text.secondary" sx={cardTextSx}>
              {family.endereco}, {family.numero} — {family.bairro} / {family.distrito}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end" sx={{ minWidth: 0 }}>
            <FamilySummaryChip label={family.status} color={family.status === 'Prioritária' ? 'error' : 'primary'} />
            <FamilySummaryChip label={`Prioridade ${family.prioridade}`} />
            <FamilySummaryChip label={family.cras} />
            <Chip
              label={orientadorRepresentante.id}
              size="small"
              sx={{
                backgroundColor: orientadorRepresentante.backgroundColor,
                color: orientadorRepresentante.color,
                fontWeight: 700,
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
        <DetailItem label="Serviço SASF" value={family.nome_servico_sasf} icon={<FamilyRestroomOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="CAS / CRAS" value={`${family.cas} • ${family.cras}`} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="Matrícula" value={family.numero_matricula} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="NIS / NIT / NB" value={family.nis_nit_nb} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="Última atualização" value={formatDate(family.ultima_atualizacao)} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
      </Box>

      <SectionBlock title="Dados do representante" subtitle="Informações principais da ficha cadastral da família.">
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          {identityGroups.map((group) => (
            <SectionBlock key={group.title} title={group.title} subtitle="Campos relacionados agrupados por leitura natural.">
              <InfoGrid items={group.items} />
            </SectionBlock>
          ))}
        </Stack>
      </SectionBlock>

      <SectionBlock title="Endereço e contato" subtitle="Localização e meios de contato registrados na ficha.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Endereço" value={family.endereco} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Número / complemento" value={`${family.numero} • ${family.complemento || '—'}`} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="CEP" value={family.cep} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Bairro / distrito" value={`${family.bairro} • ${family.distrito}`} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Telefone residencial" value={family.telefone_residencial || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Telefone celular" value={family.telefone_celular || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Outro telefone" value={family.telefone_outro || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Ponto de referência" value={family.ponto_referencia} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>

      <SectionBlock title="Moradia e benefícios" subtitle="Condições habitacionais, programas e proteções acessadas.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Condição de moradia" value={family.condicao_moradia} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Nº de cômodos" value={family.numero_comodos} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Aluguel/financiamento" value={`R$ ${family.valor_aluguel_financiamento}`} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Tipo de construção" value={family.tipo_construcao} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Situação habitacional" value={family.situacao_habitacional.join(', ') || '—'} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Transferência de renda" value={family.programa_transferencia_renda.join(', ')} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Outro programa" value={family.programa_outro || '—'} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="BPC" value={family.beneficio_prestacao_continuada.join(', ')} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>

      <SectionBlock title="Composição familiar" subtitle="Pessoas vinculadas à família no cadastro.">
        <Stack spacing={1} sx={{ minWidth: 0 }}>
          {family.composicao_familiar.map((member) => {
            const orientadorMembro = getOrientadorLabel(`${family.id}-${member.nome}`)

            return (
              <Paper key={`${family.id}-${member.nome}`} elevation={0} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} justifyContent="space-between" sx={{ minWidth: 0 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={800} sx={cardTextSx}>
                      {member.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
                      {member.parentesco} • {member.idade} anos
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ minWidth: 0 }}>
                    <Chip
                      label={orientadorMembro.id}
                      size="small"
                      sx={{
                        maxWidth: '100%',
                        backgroundColor: orientadorMembro.backgroundColor,
                        color: orientadorMembro.color,
                        fontWeight: 700,
                      }}
                    />
                    <Chip label={`Renda ${member.renda === '—' ? 'não informada' : `R$ ${member.renda}`}`} size="small" variant="outlined" sx={{ maxWidth: '100%' }} />
                    <Chip label={member.fator} size="small" variant="outlined" sx={{ maxWidth: '100%' }} />
                  </Stack>
                </Stack>
              </Paper>
            )
          })}
        </Stack>
      </SectionBlock>

      <SectionBlock title="Leitura rápida" subtitle="Campos de apoio para decisão e acompanhamento.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Escola" value={family.escola} icon={<SchoolOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Saúde" value={family.saude} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Vulnerabilidade" value={family.vulnerabilidade} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>
    </Stack>
  )
}

function InfoGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
      {items.map(([label, value]) => (
        <DetailItem key={label} label={label} value={value} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
      ))}
    </Box>
  )
}

function SectionBlock({ title, subtitle, children }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
      <Stack spacing={1.25} sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom sx={{ minWidth: 0 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
            {subtitle}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Paper>
  )
}

function FamiliesDetailDrawer({ family, open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: '100%', maxWidth: 560, p: 2 } }}>
      <Stack spacing={2} sx={{ minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ minWidth: 0 }}>
          <Typography variant="h6" fontWeight={800} sx={cardTextSx}>
            Detalhes da família
          </Typography>
          <IconButton onClick={onClose} aria-label="Fechar detalhes">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        {family && <FamilyDetailPanel family={family} />}
      </Stack>
    </Drawer>
  )
}

function FamiliesPage() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const { data: familiasData = families, isLoading } = useFamilias()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todas')
  const [priorityFilter, setPriorityFilter] = useState('Todas')
  const [districtFilter, setDistrictFilter] = useState('Todos')
  const [benefitFilter, setBenefitFilter] = useState('Todos')
  const [streetFilter, setStreetFilter] = useState('')
  const [updatedAtFilter, setUpdatedAtFilter] = useState('')
  const [selectedId, setSelectedId] = useState(families[0]?.id)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [labelsDialogOpen, setLabelsDialogOpen] = useState(false)

  // no temporary debug effects

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const familiasList = Array.isArray(familiasData) ? familiasData : Array.isArray(families) ? families : []
    return familiasList.filter((family) => {
      const matchesQuery =
        !normalizedQuery ||
        [family.nome_representante, family.endereco, family.bairro, family.cras, family.cas, family.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      const matchesStatus = statusFilter === 'Todas' || family.status === statusFilter
      const matchesPriority = priorityFilter === 'Todas' || family.prioridade === priorityFilter
      const matchesDistrict = districtFilter === 'Todos' || family.distrito === districtFilter
      const normalizedStreetFilter = streetFilter.trim().toLowerCase()
      const matchesStreet =
        !normalizedStreetFilter ||
        [family.endereco, family.numero, family.complemento, family.bairro]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedStreetFilter)
      const matchesUpdatedAt = !updatedAtFilter || family.ultima_atualizacao === updatedAtFilter
      const matchesBenefit =
        benefitFilter === 'Todos' ||
        (benefitFilter === 'Sem benefício'
          ? family.programa_transferencia_renda.includes('Não recebe') && family.beneficio_prestacao_continuada.includes('Não recebe')
          : family.tags.includes(benefitFilter) || family.programa_transferencia_renda.includes(benefitFilter) || family.beneficio_prestacao_continuada.includes(benefitFilter))

      return matchesQuery && matchesStatus && matchesPriority && matchesDistrict && matchesStreet && matchesUpdatedAt && matchesBenefit
    })
  }, [benefitFilter, districtFilter, priorityFilter, query, statusFilter, streetFilter, updatedAtFilter, familiasData])

  const familiasList = Array.isArray(familiasData) ? familiasData : Array.isArray(families) ? families : []
  const selectedFamily = filteredFamilies.find((family) => family.id === selectedId) ?? filteredFamilies[0] ?? familiasList[0] ?? families[0]

  const allLabels = useMemo(() => {
    const labels = new Set()
    familiasList.forEach((family) => (family.tags || []).forEach((tag) => labels.add(tag)))
    return Array.from(labels)
  }, [familiasList])

  const handleSelectFamily = (familyId) => {
    setSelectedId(familyId)
    if (!isDesktop) {
      setMobileDrawerOpen(true)
    }
  }

  return (
    <Stack spacing={2.5} sx={{ minWidth: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
        <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
              Famílias
            </Typography>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
              Página de acompanhamento por família
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 820, ...cardTextSx }}>
              Mock completo com os campos da ficha cadastral da família, organizado para busca rápida, leitura por etiquetas e análise por filtros.
            </Typography>
          </Box>

          <Chip label={`${families.length} famílias mockadas`} sx={{ backgroundColor: '#fffaf0', color: 'primary.dark', fontWeight: 700, maxWidth: '100%' }} />
        </Stack>
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <FilterAltOutlinedIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary" fontWeight={800} sx={cardTextSx}>
              Filtros e labels
            </Typography>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(7, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
            <TextField label="Buscar" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, bairro, CRAS..." />

            <TextField label="Rua" value={streetFilter} onChange={(event) => setStreetFilter(event.target.value)} placeholder="Ex.: Santa Cruz" />

            <TextField
              label="Última atualização"
              type="text"
              value={updatedAtFilter}
              onChange={(event) => setUpdatedAtFilter(event.target.value)}
              placeholder=""
              inputMode="numeric"
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(event) => setStatusFilter(event.target.value)}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select value={priorityFilter} label="Prioridade" onChange={(event) => setPriorityFilter(event.target.value)}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Distrito</InputLabel>
              <Select value={districtFilter} label="Distrito" onChange={(event) => setDistrictFilter(event.target.value)}>
                {districtOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Benefício</InputLabel>
              <Select value={benefitFilter} label="Benefício" onChange={(event) => setBenefitFilter(event.target.value)}>
                {benefitOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0, flex: 1 }}>
              As etiquetas do mock estão agrupadas em uma visão rápida.
            </Typography>
            <Chip
              icon={<InfoOutlinedIcon />}
              label="Ver labels"
              clickable
              onClick={() => setLabelsDialogOpen(true)}
              variant="outlined"
              sx={{ flexShrink: 0 }}
            />
          </Stack>
        </Stack>
      </Paper>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '33% 67%' }, gap: 1.5, alignItems: 'start', minWidth: 0 }}>
        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0, overflow: 'hidden', position: { md: 'sticky' }, top: { md: 96 } }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="primary" fontWeight={800} sx={cardTextSx}>
                Famílias encontradas
              </Typography>
              <Chip label={`${filteredFamilies.length}`} size="small" variant="outlined" />
            </Stack>
          </Box>

          <Stack spacing={1.25} sx={{ p: 1.5, maxHeight: { xs: 'none', md: 760 }, overflow: 'auto' }}>
            {isLoading ? (
              <Box sx={{ p: 2 }}>Carregando famílias...</Box>
            ) : (
              filteredFamilies.map((family) => (
              <FamilyPreviewCard
                key={family.id}
                family={family}
                selected={selectedFamily?.id === family.id}
                onSelect={() => handleSelectFamily(family.id)}
              />
              ))
            )}

            {filteredFamilies.length === 0 && (
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhuma família encontrada com os filtros atuais.
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        {isDesktop ? <FamilyDetailPanel family={selectedFamily} /> : null}
      </Box>

      <FamiliesDetailDrawer
        family={selectedFamily}
        open={mobileDrawerOpen && !isDesktop}
        onClose={() => setMobileDrawerOpen(false)}
      />

      <Dialog open={labelsDialogOpen} onClose={() => setLabelsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Labels disponíveis</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {allLabels.map((label) => (
              <Chip key={label} label={label} variant="outlined" sx={{ maxWidth: '100%' }} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default FamiliesPage
