import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { saveFormStep } from '../services/cadastroFamilia.service'
import { dashboardSections } from '../data/dashboardSections'
import { getFormById, forms } from '../data/formsCatalog'
import { usersCatalog } from '../data/usersCatalog'
import useFamilias from '../hooks/useFamilias'
import AtualizarUsuarioPage from '../pages/AtualizarUsuarioPage'
import CadastrarUsuarioPage from '../pages/CadastrarUsuarioPage'
import CalendarioPage from '../pages/CalendarioPage'
import FamiliasPage from '../pages/FamiliasPage'
import FormRenderer from './FormRenderer'
import GraficosPage from '../pages/GraficosPage'
import TranscricaoAudioPage from '../pages/TranscricaoAudioPage'
import VisaoGeralPage from '../pages/VisaoGeralPage'
import ProfilePage from '../pages/ProfilePage'
import {
  ActionButton,
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
} from '../pages/ui'

function NovoRegistroDialog({ open, mode, onClose, onStartForm, formsList }) {
  const [query, setQuery] = useState('')
  const [selectedFamilyId, setSelectedFamilyId] = useState('')
  const [selectedFormId, setSelectedFormId] = useState(formsList[0]?.id ?? '')
  const { data: familiasData = [] } = useFamilias()

  const familiasList = Array.isArray(familiasData) ? familiasData : []
  const resetState = () => {
    setQuery('')
    setSelectedFamilyId('')
    setSelectedFormId(formsList[0]?.id ?? '')
  }
  const handleClose = () => {
    resetState()
    onClose()
  }
  const handleContinue = () => {
    const payload = { mode, familyId: selectedFamilyId, formId: selectedFormId }
    resetState()
    onStartForm(payload)
  }

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return familiasList
    }

    return familiasList.filter((family) =>
      [family.nome_representante, family.cpf, family.endereco, family.bairro]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [familiasList, query])

  const selectedFamily = filteredFamilies.find((family) => family.id === selectedFamilyId) ?? null
  const canContinue = mode === 'novo' ? Boolean(selectedFormId) : Boolean(selectedFamilyId && selectedFormId)

  return (
    <PageDialog
      open={open}
      onClose={handleClose}
      title={mode === 'novo' ? 'Abrir novo prontuário' : 'Adicionar ficha a um prontuário'}
      maxWidth="lg"
      showClose
      closeLabel="Fechar seleção de prontuário"
      actions={
        <>
          <ActionButton variant="outlined" onClick={handleClose}>
            Cancelar
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continuar
          </ActionButton>
        </>
      }
    >
      <PageStack spacing={2.25}>
        <Typography variant="body2" color="text.secondary">
          {mode === 'novo'
            ? 'Crie um novo prontuário selecionando a ficha inicial. Os dados serão preenchidos a partir do formulário escolhido.'
            : 'Busque a família, confirme o prontuário e escolha a ficha que deseja adicionar.'}
        </Typography>

        {mode === 'existente' && (
          <SectionBlock title="Buscar família" variant="plain">
            <PageStack spacing={1.25}>
              <TextField
                label="Buscar família"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome do representante ou CPF"
              />

              <PageList variant="embedded">
                {filteredFamilies.map((family) => {
                  const selected = family.id === selectedFamilyId

                  return (
                    <PageListItem
                      key={family.id}
                      title={family.nome_representante}
                      subtitle={
                        family.endereco && family.endereco !== '—'
                          ? `${family.endereco}${family.numero !== '—' ? `, ${family.numero}` : ''}${family.bairro !== '—' ? ` • ${family.bairro}` : ''}`
                          : null
                      }
                      selected={selected}
                      onClick={() => setSelectedFamilyId(family.id)}
                      variant="compact"
                      footer={
                        <PageToolbar justifyContent="flex-start">
                          {family.cpf && family.cpf !== '—' && <StatusChip label={family.cpf} />}
                          <StatusChip label={`Prioridade ${family.prioridade}`} />
                        </PageToolbar>
                      }
                    />
                  )
                })}

                {filteredFamilies.length === 0 && <EmptyState message="Nenhuma família encontrada." />}
              </PageList>
            </PageStack>
          </SectionBlock>
        )}

        {mode === 'existente' && (
          <SectionBlock title="Fichas já registradas" variant="plain">
            <PageToolbar justifyContent="flex-start">
              {/* TODO: buscar fichas existentes do prontuário via prontuario-controller */}
              {formsList.slice(0, 3).map((form) => (
                <StatusChip key={form.id} label={form.titulo} />
              ))}
            </PageToolbar>
          </SectionBlock>
        )}

        <SectionBlock title="Tipo de ficha" variant="plain">
          <FormControl fullWidth>
            <InputLabel>Tipo de ficha</InputLabel>
            <Select
              value={selectedFormId}
              label="Tipo de ficha"
              onChange={(event) => setSelectedFormId(event.target.value)}
            >
              {formsList.map((form) => (
                <MenuItem key={form.id} value={form.id}>
                  {form.titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SectionBlock>

        {mode === 'existente' && selectedFamily && (
          <SectionBlock title="Prontuário selecionado" variant="compact">
            <PageGrid variant="detail2">
              <DetailItem label="Representante" value={selectedFamily.nome_representante} variant="plain" />
              <DetailItem label="CPF" value={selectedFamily.cpf} variant="plain" />
            </PageGrid>
          </SectionBlock>
        )}
      </PageStack>
    </PageDialog>
  )
}

function CadastroLandingPage({ onStartForm, formsList }) {
  const [dialogMode, setDialogMode] = useState(null)

  return (
    <PageWrapper maxWidth={1200} spacing={2.5}>
      <PageSection
        eyebrow="Novo registro"
        title="Como você deseja iniciar o atendimento?"
        description="Escolha entre adicionar uma ficha ao prontuário já existente ou abrir um novo prontuário para iniciar o acompanhamento."
      />

      <PageGrid variant="detail2">
        <PageCard
          title="Adicionar ficha ao prontuário"
          subtitle="Busque a família, revise as fichas já existentes e adicione uma nova etapa ao prontuário atual."
          footer={
            <Button variant="contained" onClick={() => setDialogMode('existente')}>
              Iniciar seleção
            </Button>
          }
        />

        <PageCard
          title="Abrir novo prontuário"
          subtitle="Crie um prontuário do zero e preencha a ficha cadastral da família com os dados iniciais."
          footer={
            <Button variant="contained" onClick={() => setDialogMode('novo')}>
              Abrir prontuário
            </Button>
          }
        />
      </PageGrid>

      <NovoRegistroDialog
        open={Boolean(dialogMode)}
        mode={dialogMode}
        onClose={() => setDialogMode(null)}
        formsList={formsList}
        onStartForm={(payload) => {
          setDialogMode(null)
          onStartForm(payload)
        }}
      />
    </PageWrapper>
  )
}

function DashboardContent({ sectionSlug, formId, actionSlug }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const cadastroForms = useMemo(() => forms.filter((form) => form.id !== 'ficha_atualizacao_unas'), [])

  const formContext = useMemo(() => ({
    familiaId: searchParams.get('familiaId'),
    prontuarioId: searchParams.get('prontuarioId'),
    fichaCadastralId: searchParams.get('fichaCadastralId'),
    planoFamiliarId: searchParams.get('planoFamiliarId'),
    folhaId: searchParams.get('folhaId'),
    pduId: searchParams.get('pduId'),
  }), [searchParams])

  const navigateToForm = useCallback((nextFormId, context = formContext) => {
    const params = new URLSearchParams()
    const keys = ['familiaId', 'prontuarioId', 'fichaCadastralId', 'planoFamiliarId', 'folhaId', 'pduId']
    keys.forEach(k => { if (context[k]) params.set(k, context[k]) })
    const query = params.toString()
    navigate(`/dashboard/cadastro/formulario/${nextFormId}${query ? `?${query}` : ''}`)
  }, [navigate, formContext])

  const currentSection = useMemo(() => {
    return dashboardSections.find((section) => section.slug === sectionSlug) ?? dashboardSections[0]
  }, [sectionSlug])

  const currentForm = useMemo(() => getFormById(formId), [formId])

  const isCadastroSection = currentSection.slug === 'cadastro'
  const isCalendarioSection = currentSection.slug === 'calendario'
  const isFamiliasSection = currentSection.slug === 'familias'
  const isGraficosSection = currentSection.slug === 'graficos'
  const isVisaoGeralSection = currentSection.slug === 'visao-geral'
  const isPerfilSection = currentSection.slug === 'perfil'

  if (isFamiliasSection) {
    return <FamiliasPage />
  }

  if (isCalendarioSection) {
    return <CalendarioPage />
  }

  if (isGraficosSection) {
    return <GraficosPage />
  }

  if (isCadastroSection && actionSlug === 'novo') {
    return (
      <CadastrarUsuarioPage
        forms={cadastroForms}
        onBack={() => navigate('/dashboard/cadastro')}
        onOpenForm={(nextFormId) => navigate(`/dashboard/cadastro/formulario/${nextFormId}`)}
      />
    )
  }

  if (isCadastroSection && actionSlug === 'atualizar') {
    return (
      <AtualizarUsuarioPage
        users={usersCatalog}
        onBack={() => navigate('/dashboard/cadastro')}
        onOpenForm={() => navigate('/dashboard/cadastro/formulario/ficha_atualizacao_unas')}
      />
    )
  }

  if (isCadastroSection && currentForm) {
    const isAtualizacaoForm = currentForm.id === 'ficha_atualizacao_unas'

    const handleFormSave = async (draft) => {
      const newContext = await saveFormStep(currentForm.id, draft, formContext)
      // Invalida os caches para que listagem e painel de detalhe reflitam o novo cadastro
      queryClient.invalidateQueries({ queryKey: ['familias'] })
      queryClient.invalidateQueries({ queryKey: ['familia-detalhe'] })
      const currentIndex = cadastroForms.findIndex((f) => f.id === currentForm.id)
      const nextForm = cadastroForms[currentIndex + 1]
      if (nextForm) {
        navigateToForm(nextForm.id, newContext)
      }
    }

    // Ficha de atualização é um fluxo de etapa única: persiste e mantém o
    // usuário na página com o aviso de sucesso (sem avançar para outra ficha).
    const handleAtualizacaoSave = async (draft) => {
      await saveFormStep('ficha_atualizacao_unas', draft, formContext)
      queryClient.invalidateQueries({ queryKey: ['familias'] })
      queryClient.invalidateQueries({ queryKey: ['familia-detalhe'] })
    }

    return (
      <FormRenderer
        key={currentForm.id}
        form={currentForm}
        flowForms={isAtualizacaoForm ? [currentForm] : cadastroForms}
        onSelectFlowForm={(nextFormId) => navigateToForm(nextFormId)}
        onBack={() => navigate(isAtualizacaoForm ? '/dashboard/cadastro/atualizar' : '/dashboard/cadastro/novo')}
        onSave={isAtualizacaoForm ? handleAtualizacaoSave : handleFormSave}
      />
    )
  }

  if (isCadastroSection) {
    return (
      <CadastroLandingPage
        onStartForm={({ formId: nextFormId }) => {
          // TODO: enviar identificador de família/prontuário para pré-preenchimento.
          navigate(`/dashboard/cadastro/formulario/${nextFormId}`)
        }}
        formsList={cadastroForms}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'cadastrar-usuario') {
    return (
      <CadastrarUsuarioPage
        forms={cadastroForms}
        onBack={() => navigate('/dashboard/visao-geral')}
        onOpenForm={(nextFormId) => navigateToForm(nextFormId)}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'atualizar-usuario') {
    return (
      <AtualizarUsuarioPage
        users={usersCatalog}
        onBack={() => navigate('/dashboard/visao-geral')}
        onOpenForm={() => navigate('/dashboard/cadastro/formulario/ficha_atualizacao_unas')}
      />
    )
  }

  if (isVisaoGeralSection && actionSlug === 'transcricao-audio') {
    return <TranscricaoAudioPage onBack={() => navigate('/dashboard/visao-geral')} />
  }

  if (isVisaoGeralSection) {
    return <VisaoGeralPage onOpenAction={(slug) => navigate(`/dashboard/visao-geral/${slug}`)} />
  }

  if (isPerfilSection) {
    return <ProfilePage />
  }

  return (
    <PageWrapper maxWidth={1200}>
      <PageSection
        eyebrow={currentSection.title}
        title="Área em preparação"
        description="Esta seção está reservada e ainda não possui conteúdo específico."
      />
    </PageWrapper>
  )
}

export default DashboardContent
