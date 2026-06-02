import { useMemo, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded'
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded'
import { useNavigate } from 'react-router-dom'

import familiesMock from '../data/familiesMock'
import useFamilias from '../hooks/useFamilias'
import {
  ActionButton,
  ActionCard,
  DetailItem,
  EmptyState,
  FilterGrid,
  FilterPanel,
  InfoGrid,
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

const families = familiesMock

const priorityOptions = ['Todas', 'Alta', 'Média', 'Baixa']
const districtOptions = ['Todos', 'Ipiranga', 'Vila Prudente', 'Sacomã']
const benefitOptions = ['Todos', 'Bolsa Família', 'Renda Cidadã', 'BPC', 'Sem benefício']
const sortOptions = [
  { label: 'Visitas mais recentes', value: 'visita-desc' },
  { label: 'Visitas menos recentes', value: 'visita-asc' },
  { label: 'Registro mais recente', value: 'registro-desc' },
  { label: 'Registro menos recente', value: 'registro-asc' },
]

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

function getOrientadorInfo(family) {
  const fromApi = family?.orientador
  if (fromApi?.corFundo && fromApi?.corTexto) {
    return {
      id: fromApi.nome ?? fromApi.id ?? 'Orientador',
      backgroundColor: fromApi.corFundo,
      color: fromApi.corTexto,
      isFallback: false,
    }
  }

  // TODO: usar cor do orientador quando o backend expor no prontuario-controller.
  const fallback = getOrientadorLabel(fromApi?.id ?? fromApi?.nome ?? family?.nome_representante)
  return {
    id: fromApi?.nome ?? fallback.id,
    backgroundColor: fallback.backgroundColor,
    color: fallback.color,
    isFallback: true,
  }
}

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`))
}

function FamilyPreviewCard({ family, selected, onSelect }) {
  const orientador = getOrientadorInfo(family)

  return (
    <PageCard
      title={family.nome_representante}
      subtitle={`${family.endereco}, ${family.numero} • ${family.bairro}`}
      selected={selected}
      onClick={onSelect}
      accentColor={orientador.backgroundColor}
      hover
      footer={
        <Typography variant="caption" color="text.secondary" noWrap>
          Última visita: {formatDate(family.ultima_visita)} • {family.cras}
        </Typography>
      }
    >
      <PageToolbar justifyContent="flex-start">
        <StatusChip status={family.status} />
        <StatusChip label={`Prioridade ${family.prioridade}`} />
        <StatusChip label={orientador.id} customColor={orientador.backgroundColor} customTextColor={orientador.color} />
      </PageToolbar>
    </PageCard>
  )
}

function FamilyListItem({ family, selected, onSelect }) {
  const orientador = getOrientadorInfo(family)

  return (
    <PageListItem selected={selected} onClick={onSelect} accentColor={orientador.backgroundColor}>
      <PageGrid variant="familyList">
        <PageStack spacing={0.25}>
          <Typography variant="subtitle2" fontWeight={700} noWrap>
            {family.nome_representante}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            CPF {family.cpf}
          </Typography>
        </PageStack>
        <Typography variant="body2" color="text.secondary" noWrap>
          {family.endereco}, {family.numero}
        </Typography>
        <StatusChip label={`Prioridade ${family.prioridade}`} fit />
        <Typography variant="body2" color="text.secondary" noWrap>
          {formatDate(family.ultima_visita)}
        </Typography>
        <StatusChip label={orientador.id} customColor={orientador.backgroundColor} customTextColor={orientador.color} fit />
      </PageGrid>
    </PageListItem>
  )
}

function FamilyDetailPanel({ family, onStartRegistro }) {
  if (!family) return null

  const orientadorRepresentante = getOrientadorInfo(family)
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
    <PageStack spacing={2.25}>
      <PageCard
        eyebrow="Família selecionada"
        title={family.nome_representante}
        subtitle={`${family.endereco}, ${family.numero} — ${family.bairro} / ${family.distrito}`}
        actions={
          <PageToolbar justifyContent="flex-end">
            <StatusChip status={family.status} />
            <StatusChip label={`Prioridade ${family.prioridade}`} />
            <StatusChip label={family.cras} />
            <StatusChip
              label={orientadorRepresentante.id}
              customColor={orientadorRepresentante.backgroundColor}
              customTextColor={orientadorRepresentante.color}
            />
          </PageToolbar>
        }
      />

      <ActionCard title="Ações do prontuário" variant="compact">
        <ActionButton
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            // TODO: abrir ficha no prontuário selecionado com dados pré-preenchidos.
            onStartRegistro?.()
          }}
        >
          Fazer novo registro
        </ActionButton>
        <ActionButton
          startIcon={<PictureAsPdfRoundedIcon />}
          onClick={() => {
            // TODO: buscar PDF no item-pdf-controller.
          }}
        >
          Prontuário em PDF
        </ActionButton>
        <ActionButton
          startIcon={<PrintRoundedIcon />}
          onClick={() => {
            // TODO: endpoint para download/impressão do prontuário.
          }}
        >
          Imprimir/baixar
        </ActionButton>
        <ActionButton
          startIcon={<PhoneRoundedIcon />}
          onClick={() => {
            // TODO: integrar contato com orientador pelo orientador-controller.
          }}
        >
          Contatar orientador
        </ActionButton>
        <ActionButton
          startIcon={<OpenInNewRoundedIcon />}
          onClick={() => {
            // TODO: integrar contato com representante da família.
          }}
        >
          Contatar representante
        </ActionButton>
      </ActionCard>

      <PageGrid variant="detail2">
        <DetailItem label="Serviço SASF" value={family.nome_servico_sasf} variant="soft" />
        <DetailItem label="CAS / CRAS" value={`${family.cas} • ${family.cras}`} variant="soft" />
        <DetailItem label="Matrícula" value={family.numero_matricula} variant="soft" />
        <DetailItem label="NIS / NIT / NB" value={family.nis_nit_nb} variant="soft" />
        <DetailItem label="Última atualização" value={formatDate(family.ultima_atualizacao)} variant="soft" />
      </PageGrid>

      <SectionBlock title="Dados do representante" variant="plain">
        <PageStack spacing={2}>
          {identityGroups.map((group) => (
            <SectionBlock key={group.title} title={group.title} variant="compact">
              <InfoGrid items={group.items} detailVariant="plain" />
            </SectionBlock>
          ))}
        </PageStack>
      </SectionBlock>

      <SectionBlock title="Endereço e contato" variant="plain">
        <PageGrid variant="detail2">
          <DetailItem label="Endereço" value={family.endereco} variant="plain"/>
          <DetailItem label="Número / complemento" value={`${family.numero} • ${family.complemento || '—'}`} variant="plain" />
          <DetailItem label="CEP" value={family.cep} variant="plain" />
          <DetailItem label="Bairro / distrito" value={`${family.bairro} • ${family.distrito}`} variant="plain" />
          <DetailItem label="Telefone residencial" value={family.telefone_residencial || '—'} variant="plain" />
          <DetailItem label="Telefone celular" value={family.telefone_celular || '—'} variant="plain" />
          <DetailItem label="Outro telefone" value={family.telefone_outro || '—'} variant="plain" />
          <DetailItem label="Ponto de referência" value={family.ponto_referencia} variant="plain" />
        </PageGrid>
      </SectionBlock>

      <SectionBlock title="Moradia e benefícios" variant="plain">
        <PageGrid variant="detail2">
          <DetailItem label="Condição de moradia" value={family.condicao_moradia} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Nº de cômodos" value={family.numero_comodos} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Aluguel/financiamento" value={`R$ ${family.valor_aluguel_financiamento}`} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Tipo de construção" value={family.tipo_construcao} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Situação habitacional" value={family.situacao_habitacional.join(', ') || '—'} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Transferência de renda" value={family.programa_transferencia_renda.join(', ')} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Outro programa" value={family.programa_outro || '—'} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="BPC" value={family.beneficio_prestacao_continuada.join(', ')} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
        </PageGrid>
      </SectionBlock>

      <SectionBlock title="Composição familiar" variant="plain">
        <PageList variant="embedded">
          {family.composicao_familiar.map((member) => {
            const orientadorMembro = getOrientadorLabel(`${family.id}-${member.nome}`)

            return (
              <PageListItem
                key={`${family.id}-${member.nome}`}
                title={member.nome}
                subtitle={`${member.parentesco} • ${member.idade} anos`}
                variant="compact"
                footer={
                  <PageToolbar justifyContent="flex-start">
                    <StatusChip label={orientadorMembro.id} customColor={orientadorMembro.backgroundColor} customTextColor={orientadorMembro.color} />
                    <StatusChip label={`Renda ${member.renda === '—' ? 'não informada' : `R$ ${member.renda}`}`} />
                    <StatusChip label={member.fator} />
                  </PageToolbar>
                }
              />
            )
          })}
        </PageList>
      </SectionBlock>

      <SectionBlock title="Leitura rápida" variant="plain">
        <PageGrid variant="detail3">
          <DetailItem label="Escola" value={family.escola} icon={<SchoolOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Saúde" value={family.saude} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
          <DetailItem label="Vulnerabilidade" value={family.vulnerabilidade} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} variant="plain" />
        </PageGrid>
      </SectionBlock>
    </PageStack>
  )
}

function FamiliesPage() {
  const navigate = useNavigate()
  const { data: familiasData = families, isLoading } = useFamilias()
  const [query, setQuery] = useState('')
  const [statusFilter] = useState('Todas')
  const [priorityFilter, setPriorityFilter] = useState('Todas')
  const [districtFilter, setDistrictFilter] = useState('Todos')
  const [benefitFilter, setBenefitFilter] = useState('Todos')
  const [orientadorFilter, setOrientadorFilter] = useState('Todos')
  const [streetFilter, setStreetFilter] = useState('')
  const [updatedAtFilter, setUpdatedAtFilter] = useState('')
  const [sortBy, setSortBy] = useState('visita-desc')
  const [viewMode, setViewMode] = useState('gallery')
  const [selectedId, setSelectedId] = useState(families[0]?.id)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const familiasList = useMemo(
    () => (Array.isArray(familiasData) ? familiasData : Array.isArray(families) ? families : []),
    [familiasData],
  )

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return familiasList.filter((family) => {
      const matchesQuery =
        !normalizedQuery ||
        [family.nome_representante, family.cpf, family.endereco, family.bairro, family.cras, family.cas, family.tags.join(' ')]
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

      const matchesOrientador =
        orientadorFilter === 'Todos' ||
        family.orientador?.nome === orientadorFilter ||
        getOrientadorInfo(family).id === orientadorFilter

      return matchesQuery && matchesStatus && matchesPriority && matchesDistrict && matchesStreet && matchesUpdatedAt && matchesBenefit && matchesOrientador
    })
  }, [benefitFilter, districtFilter, familiasList, orientadorFilter, priorityFilter, query, statusFilter, streetFilter, updatedAtFilter])

  const selectedFamily = filteredFamilies.find((family) => family.id === selectedId) ?? filteredFamilies[0] ?? familiasList[0] ?? families[0]

  const orientadorOptions = useMemo(() => {
    const values = new Set()
    familiasList.forEach((family) => {
      if (family.orientador?.nome) values.add(family.orientador.nome)
      values.add(getOrientadorInfo(family).id)
    })
    return ['Todos', ...Array.from(values)]
  }, [familiasList])

  const sortedFamilies = useMemo(() => {
    const list = [...filteredFamilies]
    const parseDate = (value) => (value ? new Date(`${value}T00:00:00`).getTime() : 0)

    return list.sort((a, b) => {
      const visitaA = parseDate(a.ultima_visita || a.ultima_atualizacao)
      const visitaB = parseDate(b.ultima_visita || b.ultima_atualizacao)
      const registroA = parseDate(a.data_registro || a.data_matricula)
      const registroB = parseDate(b.data_registro || b.data_matricula)

      if (sortBy === 'visita-asc') return visitaA - visitaB
      if (sortBy === 'visita-desc') return visitaB - visitaA
      if (sortBy === 'registro-asc') return registroA - registroB
      if (sortBy === 'registro-desc') return registroB - registroA
      return 0
    })
  }, [filteredFamilies, sortBy])

  const handleSelectFamily = (familyId) => {
    setSelectedId(familyId)
    setDetailDialogOpen(true)
  }

  const handleStartRegistro = () => {
    // TODO: passar identificação do prontuário para pré-preenchimento.
    navigate('/dashboard/cadastro/novo')
  }

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Consultar Famílias"
        title="Acompanhamento de famílias"
        description="Acompanhe as famílias registradas, aplique filtros e acesse os detalhes de cada prontuário."
        actions={<StatusChip label={`${familiasList.length} famílias`} tone="highlight" />}
      />

      <FilterPanel title="Filtros e ordenação">
        <PageStack spacing={1.5}>
          <FilterGrid>
            <TextField label="Buscar" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou CPF do representante" />
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
              <InputLabel>Orientador</InputLabel>
              <Select value={orientadorFilter} label="Orientador" onChange={(event) => setOrientadorFilter(event.target.value)}>
                {orientadorOptions.map((option) => (
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
          </FilterGrid>

          <PageToolbar
            actions={
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, nextValue) => nextValue && setViewMode(nextValue)}
                size="small"
              >
                <ToggleButton value="gallery">
                  <ViewModuleRoundedIcon fontSize="small" />
                  Galeria
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewListRoundedIcon fontSize="small" />
                  Lista
                </ToggleButton>
              </ToggleButtonGroup>
            }
          >
            <FormControl fullWidth>
              <InputLabel>Ordenar por</InputLabel>
              <Select value={sortBy} label="Ordenar por" onChange={(event) => setSortBy(event.target.value)}>
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </PageToolbar>
        </PageStack>
      </FilterPanel>

      <PageList
        title="Famílias encontradas"
        actions={<StatusChip label={`${sortedFamilies.length}`} />}
        headers={viewMode === 'list' ? ['Representante', 'Rua', 'Prioridade', 'Última visita', 'Orientador'] : null}
      >
        {isLoading ? (
          <EmptyState message="Carregando famílias..." />
        ) : viewMode === 'gallery' ? (
          <PageGrid variant="gallery">
            {sortedFamilies.map((family) => (
              <FamilyPreviewCard
                key={family.id}
                family={family}
                selected={selectedFamily?.id === family.id}
                onSelect={() => handleSelectFamily(family.id)}
              />
            ))}
          </PageGrid>
        ) : (
          sortedFamilies.map((family) => (
            <FamilyListItem
              key={family.id}
              family={family}
              selected={selectedFamily?.id === family.id}
              onSelect={() => handleSelectFamily(family.id)}
            />
          ))
        )}

        {sortedFamilies.length === 0 && <EmptyState message="Nenhuma família encontrada com os filtros atuais." />}
      </PageList>

      <PageDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        title="Detalhes da família"
        maxWidth="lg"
        showClose
        closeLabel="Fechar detalhes"
      >
        {selectedFamily && <FamilyDetailPanel family={selectedFamily} onStartRegistro={handleStartRegistro} />}
      </PageDialog>

    </PageWrapper>
  )
}

export default FamiliesPage
