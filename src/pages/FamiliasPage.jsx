import { useMemo, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded'
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded'
import { useNavigate } from 'react-router-dom'

import useFamilias from '../hooks/useFamilias'
import useFamiliaDetalhe from '../hooks/useFamiliaDetalhe'
import { DOCS_CONFIG } from '../services/familias.service'
import {
  ActionButton,
  ActionCard,
  DetailItem,
  EmptyState,
  ErrorState,
  FilterGrid,
  FilterPanel,
  InfoGrid,
  LoadingState,
  PageCard,
  PageDialog,
  PageGrid,
  PageList,
  PageListItem,
  PageSection,
  PageStack,
  PageText,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
} from './ui'

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

const priorityChipProps = {
  Alta:  { customColor: '#FEE2E2', customTextColor: '#B91C1C' },
  Média: { customColor: '#FEF3C7', customTextColor: '#92400E' },
  Baixa: { customColor: '#D1FAE5', customTextColor: '#065F46' },
}

function DocTracking({ documentacao = [], prontuarioDetalhe, termos = [] }) {
  // Se temos o prontuário do lazy load, recalcula os docs com dados frescos
  const docs = prontuarioDetalhe
    ? DOCS_CONFIG.map(({ key, label, check }) => ({
        key, label,
        presente: check(prontuarioDetalhe, termos),
      }))
    : documentacao

  if (!docs.length) return null
  return (
    <SectionBlock title="Documentação do prontuário" variant="plain">
      <PageList variant="embedded">
        {docs.map((doc) => (
          <PageListItem
            key={doc.key}
            title={doc.label}
            variant="compact"
            actions={
              <StatusChip
                label={doc.presente ? 'Completo' : 'Pendente'}
                tone={doc.presente ? 'success' : 'error'}
                fit
              />
            }
          />
        ))}
      </PageList>
    </SectionBlock>
  )
}

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`))
}

function hasAddress(family) {
  return family.endereco && family.endereco !== '—'
}

function addressSubtitle(family) {
  if (!hasAddress(family)) return null
  const parts = [family.endereco, family.numero !== '—' ? family.numero : null].filter(Boolean).join(', ')
  return family.bairro !== '—' ? `${parts} • ${family.bairro}` : parts
}

function FamilyPreviewCard({ family, selected, onSelect }) {
  const orientador = getOrientadorInfo(family)
  const subtitle = addressSubtitle(family)
  const footerExtra = family.cras && family.cras !== '—' ? ` • ${family.cras}` : ''
  const prioProps = priorityChipProps[family.prioridade] ?? {}

  return (
    <PageCard
      title={family.nome_representante}
      subtitle={subtitle}
      selected={selected}
      onClick={onSelect}
      accentColor={orientador.backgroundColor}
      hover
      footer={
        <PageText variant="caption" noWrap>
          Última visita: {formatDate(family.ultima_visita)}{footerExtra}
        </PageText>
      }
    >
      <PageToolbar justifyContent="flex-start">
        {family.status === 'Inativo' && <StatusChip status={family.status} />}
        <StatusChip label={`Prioridade ${family.prioridade}`} {...prioProps} />
        <StatusChip
          label={orientador.id}
          customColor={orientador.backgroundColor}
          customTextColor={orientador.color}
        />
      </PageToolbar>
    </PageCard>
  )
}

function FamilyListItem({ family, selected, onSelect }) {
  const orientador = getOrientadorInfo(family)
  const prioProps = priorityChipProps[family.prioridade] ?? {}

  return (
    <PageListItem selected={selected} onClick={onSelect} accentColor={orientador.backgroundColor}>
      <PageGrid variant="familyList">
        <PageStack spacing={0.25}>
          <PageText variant="subtitle2" color="text.primary" fontWeight={700} noWrap>
            {family.nome_representante}
          </PageText>
          {family.cpf && family.cpf !== '—' && (
            <PageText variant="caption" noWrap>
              CPF {family.cpf}
            </PageText>
          )}
        </PageStack>
        <PageText noWrap>
          {hasAddress(family) ? `${family.endereco}${family.numero !== '—' ? `, ${family.numero}` : ''}` : '—'}
        </PageText>
        <StatusChip label={`Prioridade ${family.prioridade}`} fit {...prioProps} />
        <PageText noWrap>
          {formatDate(family.ultima_visita)}
        </PageText>
        <StatusChip label={orientador.id} customColor={orientador.backgroundColor} customTextColor={orientador.color} fit />
      </PageGrid>
    </PageListItem>
  )
}

function RichDataSection({ detalhe, loadingDetalhe }) {
  if (loadingDetalhe) return null
  if (!detalhe) return null

  const { representante: rep, endereco: end, fichaCadastral: fc, planoFamiliar: pdf, folhaProsseguimento: folha, pdu, termos } = detalhe
  const moradiaLabel = { PROPRIA: 'Própria', ALUGADA: 'Alugada', CEDIDA: 'Cedida' }
  const sexoLabel = { FEMININO: 'Feminino', MASCULINO: 'Masculino' }
  const programaLabel = {
    NAO_RECEBE: 'Não recebe', RENDA_MINIMA: 'Renda Mínima', BOLSA_FAMILIA: 'Bolsa Família',
    RENDA_CIDADA: 'Renda Cidadã', ACAO_JOVEM: 'Ação Jovem', PETI: 'PETI',
  }
  const bpcLabel = { NAO_RECEBE: 'Não recebe', IDOSO: 'Idoso', PCD: 'Pessoa com deficiência' }
  const label = (map, val) => map[val] ?? val

  return (
    <>
      {/* ── Representante ─────────────────────────────── */}
      {rep && (
        <SectionBlock title="Dados do representante" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            rep.nome        && ['Nome', rep.nome],
            rep.cpf         && ['CPF', rep.cpf],
            rep.rg          && ['RG', `${rep.rg}${rep.orgaoEmissorRg ? ` / ${rep.orgaoEmissorRg}` : ''}`],
            rep.dataNascimento && ['Nascimento', rep.dataNascimento],
            rep.sexo        && ['Sexo', sexoLabel[rep.sexo] ?? rep.sexo],
            rep.estadoCivil && ['Estado civil', rep.estadoCivil],
            rep.grauInstrucao && ['Grau de instrução', rep.grauInstrucao],
            rep.profissao   && ['Profissão', rep.profissao],
            rep.ocupacao    && ['Situação', rep.ocupacao],
            rep.renda != null && ['Renda', `R$ ${rep.renda}`],
            rep.nisNitNb    && ['NIS/NIT/NB', rep.nisNitNb],
            rep.nomeMae     && ['Mãe', rep.nomeMae],
            rep.nomePai     && ['Pai', rep.nomePai],
            rep.telefoneCelular && ['Celular', rep.telefoneCelular],
            rep.telefoneResidencial && ['Telefone', rep.telefoneResidencial],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── Endereço ──────────────────────────────────── */}
      {end && (end.logradouro || end.bairro) && (
        <SectionBlock title="Endereço" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            end.logradouro && ['Logradouro', `${end.logradouro}${end.numero ? `, ${end.numero}` : ''}`],
            end.complemento && ['Complemento', end.complemento],
            end.bairro      && ['Bairro', end.bairro],
            end.distrito    && ['Distrito', end.distrito],
            end.cep         && ['CEP', end.cep],
            end.cidade      && ['Cidade', end.cidade],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── Ficha Cadastral — Moradia e benefícios ────── */}
      {fc && (fc.condicoesMoradia || fc.programasTransferenciaRenda?.length || fc.dataMatricula) && (
        <SectionBlock title="Ficha cadastral" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            fc.dataMatricula     && ['Data de matrícula', fc.dataMatricula],
            fc.numeroMatricula   && ['Nº matrícula', fc.numeroMatricula],
            fc.condicoesMoradia  && ['Moradia', moradiaLabel[fc.condicoesMoradia] ?? fc.condicoesMoradia],
            fc.tipoConstrucao    && ['Construção', fc.tipoConstrucao],
            fc.numeroComodos != null && ['Cômodos', String(fc.numeroComodos)],
            fc.situacaoHabitacional && ['Situação hab.', fc.situacaoHabitacional],
            fc.programasTransferenciaRenda?.length > 0 && ['Transf. renda', fc.programasTransferenciaRenda.map(v => label(programaLabel, v)).join(', ')],
            fc.beneficioPrestacaoContinuada?.length > 0 && ['BPC', fc.beneficioPrestacaoContinuada.map(v => label(bpcLabel, v)).join(', ')],
            fc.demandaApresentadaOrientacoesEncaminhamentos && ['Demanda/encaminhamentos', fc.demandaApresentadaOrientacoesEncaminhamentos],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── Plano de Desenvolvimento Familiar ─────────── */}
      {pdf && !!(pdf.analiseDiagnostica || pdf.objetivo || pdf.moradia || pdf.saude || pdf.dataElaboracao) && (
        <SectionBlock title="Plano de desenvolvimento familiar" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            pdf.numeroPlano        && ['Nº do plano', pdf.numeroPlano],
            pdf.dataElaboracao     && ['Elaboração', pdf.dataElaboracao],
            pdf.dataValidade       && ['Validade', pdf.dataValidade],
            pdf.dataReavaliacao    && ['Reavaliação', pdf.dataReavaliacao],
            pdf.objetivo           && ['Objetivo', pdf.objetivo],
            pdf.analiseDiagnostica && ['Análise diagnóstica', pdf.analiseDiagnostica],
            pdf.moradia            && ['Moradia', pdf.moradia],
            pdf.saude              && ['Saúde', pdf.saude],
            pdf.educacao           && ['Educação', pdf.educacao],
            pdf.renda              && ['Renda', pdf.renda],
            pdf.observacoes        && ['Observações', pdf.observacoes],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── Folha de Prosseguimento ───────────────────── */}
      {folha && (folha.observacoes || folha.numeroFolha) && (
        <SectionBlock title="Folha de prosseguimento" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            folha.numeroFolha  && ['Nº da folha', String(folha.numeroFolha)],
            folha.observacoes  && ['Observações', folha.observacoes],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── PDU ───────────────────────────────────────── */}
      {pdu && !!(pdu.sinteseSituacaoApresentada || pdu.numeroPlano || pdu.situacoesAgravoIdentificadas?.length > 0) && (
        <SectionBlock title="Plano de desenvolvimento do usuário (PDU)" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            pdu.numeroPlano               && ['Nº do plano', pdu.numeroPlano],
            pdu.dataElaboracao            && ['Elaboração', pdu.dataElaboracao],
            pdu.dataValidade              && ['Validade', pdu.dataValidade],
            pdu.sinteseSituacaoApresentada && ['Síntese', pdu.sinteseSituacaoApresentada],
            pdu.situacoesAgravoIdentificadas?.length > 0 && ['Situações de agravo', pdu.situacoesAgravoIdentificadas.join(', ')],
            pdu.outrasSituacoesAgravo     && ['Outras situações', pdu.outrasSituacoesAgravo],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {/* ── Termo de Uso de Imagem ─────────────────────── */}
      {termos?.[0] && (
        <SectionBlock title="Termo de uso de imagem" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            termos[0].dataAssinatura         && ['Assinado em', new Date(termos[0].dataAssinatura).toLocaleDateString('pt-BR')],
            termos[0].cpf                    && ['CPF', termos[0].cpf],
            termos[0].numeroCedulaIdentidade && ['Cédula de identidade', termos[0].numeroCedulaIdentidade],
            termos[0].nomesCriancasAutorizadas?.length && ['Crianças autorizadas', termos[0].nomesCriancasAutorizadas.join(', ')],
          ].filter(Boolean)} />
        </SectionBlock>
      )}
    </>
  )
}

function FamilyDetailPanel({ family, onStartRegistro, onCompletarCadastro, onNovaAtualizacao }) {
  const { data: detalhe, isLoading: loadingDetalhe } = useFamiliaDetalhe(family?.prontuarioId)

  if (!family) return null

  const orientadorRepresentante = getOrientadorInfo(family)
  const prioPropsDetail = priorityChipProps[family.prioridade] ?? {}

  // Família antiga/incompleta: tem prontuário, mas o lazy load não encontrou
  // representante nem ficha cadastral vinculados. Oferece completar o cadastro.
  const cadastroIncompleto =
    !loadingDetalhe && !!family.prontuarioId && !detalhe?.representante && !detalhe?.fichaCadastral

  return (
    <PageStack spacing={2.25}>
      <PageCard
        eyebrow="Família selecionada"
        title={family.nome_representante}
        subtitle={hasAddress(family) ? `${family.endereco}, ${family.numero} — ${family.bairro} / ${family.distrito}` : null}
        actions={
          <PageToolbar justifyContent="flex-end">
            {loadingDetalhe && <LoadingState message="Carregando detalhes..." compact surface={false} />}
            {family.status === 'Inativo' && <StatusChip status={family.status} />}
            <StatusChip label={`Prioridade ${family.prioridade}`} {...prioPropsDetail} />
            {family.cras && family.cras !== '—' && <StatusChip label={family.cras} />}
            <StatusChip
              label={orientadorRepresentante.id}
              customColor={orientadorRepresentante.backgroundColor}
              customTextColor={orientadorRepresentante.color}
            />
          </PageToolbar>
        }
      />

      {cadastroIncompleto && (
        <SectionBlock title="Cadastro incompleto" variant="plain">
          <PageStack spacing={1}>
            <EmptyState message="Esta família ainda não tem representante e ficha cadastral vinculados. Complete o cadastro para preencher os dados pessoais, endereço e moradia." />
            <PageToolbar justifyContent="flex-start">
              <ActionButton
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => onCompletarCadastro?.(family)}
              >
                Completar cadastro
              </ActionButton>
            </PageToolbar>
          </PageStack>
        </SectionBlock>
      )}

      <ActionCard title="Ações do prontuário" variant="compact">
        <ActionButton variant="contained" startIcon={<AddRoundedIcon />} onClick={() => onStartRegistro?.()}>
          Fazer novo registro
        </ActionButton>
        <ActionButton startIcon={<AddRoundedIcon />} onClick={() => onNovaAtualizacao?.(family)}>
          Nova ficha de atualização
        </ActionButton>
        <ActionButton startIcon={<PictureAsPdfRoundedIcon />} onClick={() => {}}>
          Prontuário em PDF
        </ActionButton>
        <ActionButton startIcon={<PrintRoundedIcon />} onClick={() => {}}>
          Imprimir/baixar
        </ActionButton>
        <ActionButton startIcon={<PhoneRoundedIcon />} onClick={() => {}}>
          Contatar orientador
        </ActionButton>
        <ActionButton startIcon={<OpenInNewRoundedIcon />} onClick={() => {}}>
          Contatar representante
        </ActionButton>
      </ActionCard>

      <PageGrid variant="detail2">
        <DetailItem label="Última visita" value={formatDate(family.ultima_visita)} variant="soft" />
        <DetailItem label="Próxima visita" value={formatDate(family.proxima_visita)} variant="soft" />
      </PageGrid>

      <DocTracking
        documentacao={family.documentacao}
        prontuarioDetalhe={detalhe?.prontuario}
        termos={detalhe?.termos ?? []}
      />

      <RichDataSection detalhe={detalhe} loadingDetalhe={loadingDetalhe} />

      {family.composicao_familiar?.length > 0 && (
        <SectionBlock title="Composição familiar" variant="plain">
          <PageList variant="embedded">
            {family.composicao_familiar.map((member) => {
              const orientadorMembro = getOrientadorLabel(`${family.id}-${member.nome}`)
              return (
                <PageListItem
                  key={`${family.id}-${member.nome}`}
                  title={member.nome}
                  subtitle={`${member.parentesco} • ${member.idade !== '—' ? `${member.idade} anos` : 'idade não informada'}`}
                  variant="compact"
                  footer={
                    <PageToolbar justifyContent="flex-start">
                      <StatusChip label={orientadorMembro.id} customColor={orientadorMembro.backgroundColor} customTextColor={orientadorMembro.color} />
                      <StatusChip label={`Renda ${member.renda === '—' ? 'não informada' : `R$ ${member.renda}`}`} />
                      {member.fator && member.fator !== '—' && <StatusChip label={member.fator} />}
                    </PageToolbar>
                  }
                />
              )
            })}
          </PageList>
        </SectionBlock>
      )}
    </PageStack>
  )
}

function FamiliesPage() {
  const navigate = useNavigate()
  const { data: familiasData = [], isLoading, isError, refetch } = useFamilias()
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
  const [selectedId, setSelectedId] = useState(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const familiasList = useMemo(
    () => (Array.isArray(familiasData) ? familiasData : []),
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

  const selectedFamily = filteredFamilies.find((family) => family.id === selectedId) ?? filteredFamilies[0] ?? null

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

  const handleClearFilters = () => {
    setQuery('')
    setPriorityFilter('Todas')
    setDistrictFilter('Todos')
    setBenefitFilter('Todos')
    setOrientadorFilter('Todos')
    setStreetFilter('')
    setUpdatedAtFilter('')
    setSortBy('visita-desc')
  }

  const handleStartRegistro = () => {
    // TODO: passar identificação do prontuário para pré-preenchimento.
    navigate('/dashboard/cadastro/novo')
  }

  const handleCompletarCadastro = (family) => {
    // Reabre a ficha cadastral em modo "completar", carregando o contexto da
    // família existente via URL para que o service reutilize família/prontuário.
    const params = new URLSearchParams()
    if (family.prontuarioId) params.set('prontuarioId', family.prontuarioId)
    if (family.id) params.set('familiaId', family.id)
    navigate(`/dashboard/cadastro/formulario/ficha_cadastral_familia?${params.toString()}`)
  }

  const handleNovaAtualizacao = (family) => {
    // Abre a Ficha de Atualização (Quadro Situacional) já vinculada ao
    // prontuário da família selecionada.
    const params = new URLSearchParams()
    if (family.prontuarioId) params.set('prontuarioId', family.prontuarioId)
    if (family.id) params.set('familiaId', family.id)
    navigate(`/dashboard/cadastro/formulario/ficha_atualizacao_unas?${params.toString()}`)
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
        {isError ? (
          <ErrorState
            title="Não foi possível carregar famílias"
            message="Verifique sua conexão e tente novamente."
            onRetry={refetch}
            compact
          />
        ) : isLoading ? (
          <LoadingState message="Carregando famílias..." skeleton variant={viewMode === 'gallery' ? 'cards' : 'list'} rows={4} />
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

        {!isLoading && !isError && sortedFamilies.length === 0 && (
          <EmptyState
            message="Nenhuma família encontrada com os filtros atuais."
            action={<ActionButton onClick={handleClearFilters}>Limpar filtros</ActionButton>}
          />
        )}
      </PageList>

      <PageDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        title="Detalhes da família"
        maxWidth="lg"
        showClose
        closeLabel="Fechar detalhes"
      >
        {selectedFamily && (
          <FamilyDetailPanel
            family={selectedFamily}
            onStartRegistro={handleStartRegistro}
            onCompletarCadastro={handleCompletarCadastro}
            onNovaAtualizacao={handleNovaAtualizacao}
          />
        )}
      </PageDialog>

    </PageWrapper>
  )
}

export default FamiliesPage
