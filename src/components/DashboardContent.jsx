import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useMemo, useState, useCallback } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { saveFormStep } from '../services/cadastroFamilia.service'
import { dashboardSections } from '../data/dashboardSections'
import { getFormById, forms } from '../data/formsCatalog'
import {
  ADD_FICHA_FLOW_ID,
  DEMANDA_FORM_ID,
  FLOW_QUERY_PARAM,
  NOVO_PRONTUARIO_FLOW_ID,
  PLANO_FAMILIAR_FORM_ID,
  PLANO_FAMILIAR_PRINT_FORM_ID,
  TERMO_USO_FORM_ID,
  TRIAGEM_FORM_ID,
  getFlowForms,
} from '../data/formFlows'
import { FLOW_INTRO_TYPES, getFlowIntroConfig } from '../data/prontuarioFlowIntro'
import { usersCatalog } from '../data/usersCatalog'
import useFamilias from '../hooks/useFamilias'
import AtualizarUsuarioPage from '../pages/AtualizarUsuarioPage'
import CadastrarUsuarioPage from '../pages/CadastrarUsuarioPage'
import CalendarioPage from '../pages/CalendarioPage'
import FamiliasPage from '../pages/FamiliasPage'
import ProntuarioFlowIntroContent from '../pages/ProntuarioFlowIntroContent'
import ProntuarioFlowIntroDialog from '../pages/ProntuarioFlowIntroDialog'
import ProntuarioFlowIntroPage from '../pages/ProntuarioFlowIntroPage'
import FormRenderer from './FormRenderer'
import GraficosPage from '../pages/GraficosPage'
import PlanoFamiliarPrintStep from './PlanoFamiliarPrintStep'
import TranscricaoAudioPage from '../pages/TranscricaoAudioPage'
import VisaoGeralPage from '../pages/VisaoGeralPage'
import ProfilePage from '../pages/ProfilePage'
import TermoUsoStep from './TermoUsoStep'
import {
  ActionButton,
  ButtonLoading,
  DetailItem,
  EmptyState,
  ErrorState,
  LoadingState,
  PageCard,
  PageDialog,
  PageGrid,
  PageList,
  PageListItem,
  PermissionState,
  PageSection,
  PageStack,
  PageText,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
} from '../pages/ui'

function getTodayFormattedDate() {
  const now = new Date()
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  const [year, month, day] = localDate.toISOString().slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}

function readFlowDrafts(storageKey) {
  if (!storageKey || typeof window === 'undefined') {
    return {}
  }

  try {
    return JSON.parse(window.sessionStorage.getItem(storageKey)) || {}
  } catch {
    return {}
  }
}

function writeFlowDrafts(storageKey, drafts) {
  if (!storageKey || typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(storageKey, JSON.stringify(drafts))
}

function clearFlowDrafts(storageKey) {
  if (!storageKey || typeof window === 'undefined') {
    return
  }

  window.sessionStorage.removeItem(storageKey)
}

function buildTermDraftFromTriagem(triagemDraft = {}) {
  const representante = triagemDraft.dados_representante ?? {}
  const termo = triagemDraft.dados_autorizante ?? {}
  const menores = Array.isArray(triagemDraft.menores_acompanhantes)
    ? triagemDraft.menores_acompanhantes
        .map((row) => row?.nomes_criancas)
        .filter(Boolean)
        .join('\n')
    : ''

  return {
    dados_autorizante: {
      nome_autorizante: representante.nome_representante ?? '',
      rg_autorizante: representante.rg ?? '',
      cpf_autorizante: representante.cpf ?? '',
      nomes_criancas: termo.nomes_criancas ?? menores,
      data_assinatura: termo.data_assinatura || getTodayFormattedDate(),
      assinatura_autorizante: termo.assinatura_autorizante ?? '',
    },
  }
}

function buildDemandaInitialDraft(demandaDraft = {}, triagemDraft = {}) {
  return {
    ...triagemDraft,
    ...demandaDraft,
    dados_representante: {
      ...(triagemDraft.dados_representante ?? {}),
      ...(demandaDraft.dados_representante ?? {}),
    },
    demanda_encaminhamentos: {
      ...(triagemDraft.demanda_encaminhamentos ?? {}),
      ...(demandaDraft.demanda_encaminhamentos ?? {}),
    },
  }
}

function getFormSaveMessages({ activeFlowId, formId, isAtualizacaoForm }) {
  if (activeFlowId === ADD_FICHA_FLOW_ID) {
    return {
      success: 'Ficha criada e vinculada ao prontuário com sucesso.',
      error: 'Não foi possível criar a ficha no prontuário. Tente novamente.',
    }
  }

  if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && formId === DEMANDA_FORM_ID) {
    return {
      success: 'Prontuário criado com sucesso.',
      error: 'Não foi possível criar o prontuário. Revise os dados e tente novamente.',
    }
  }

  if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && formId === PLANO_FAMILIAR_FORM_ID) {
    return {
      success: 'Plano de Desenvolvimento Familiar criado com sucesso.',
      error: 'Não foi possível criar o Plano de Desenvolvimento Familiar. Tente novamente.',
    }
  }

  if (isAtualizacaoForm) {
    return {
      success: 'Ficha de atualização criada com sucesso.',
      error: 'Não foi possível criar a ficha de atualização. Tente novamente.',
    }
  }

  return {
    success: 'Dados salvos com sucesso.',
    error: 'Erro ao salvar. Verifique sua conexão e tente novamente.',
  }
}

function NovoRegistroDialog({ open, mode, onClose, onStartForm, formsList, showIntroFirst = false }) {
  const [query, setQuery] = useState('')
  const [selectedFamilyId, setSelectedFamilyId] = useState('')
  const [selectedFormId, setSelectedFormId] = useState(formsList[0]?.id ?? '')
  const [dialogStep, setDialogStep] = useState(showIntroFirst ? 'intro' : 'selection')
  const { data: familiasData = [], isLoading, isError, refetch } = useFamilias()

  const familiasList = useMemo(() => (Array.isArray(familiasData) ? familiasData : []), [familiasData])
  const effectiveSelectedFormId = formsList.some((form) => form.id === selectedFormId)
    ? selectedFormId
    : formsList[0]?.id ?? ''

  const resetState = () => {
    setQuery('')
    setSelectedFamilyId('')
    setSelectedFormId(formsList[0]?.id ?? '')
    setDialogStep(showIntroFirst ? 'intro' : 'selection')
  }
  const handleClose = () => {
    resetState()
    onClose()
  }
  const handleContinue = () => {
    const payload = {
      mode,
      familyId: selectedFamilyId,
      prontuarioId: selectedFamily?.prontuarioId,
      formId: effectiveSelectedFormId,
    }
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

  const selectedFamily = familiasList.find((family) => family.id === selectedFamilyId) ?? null
  const canContinue = mode === 'novo' ? Boolean(effectiveSelectedFormId) : Boolean(selectedFamilyId && effectiveSelectedFormId)
  const addFichaIntroConfig = mode === 'existente' ? getFlowIntroConfig(FLOW_INTRO_TYPES.ADICIONAR_FICHA) : null
  const isIntroStep = Boolean(addFichaIntroConfig && dialogStep === 'intro')
  const isLoadingFamilies = mode === 'existente' && !isIntroStep && isLoading

  return (
    <PageDialog
      open={open}
      onClose={handleClose}
      title={isIntroStep ? addFichaIntroConfig.title : mode === 'novo' ? 'Abrir novo prontuário' : 'Adicionar ficha a um prontuário'}
      maxWidth="lg"
      showClose
      closeLabel="Fechar seleção de prontuário"
      actions={
        isIntroStep ? (
          <>
            <ActionButton variant="outlined" onClick={handleClose}>
              {addFichaIntroConfig.backLabel}
            </ActionButton>
            <ActionButton variant="contained" onClick={() => setDialogStep('selection')}>
              {addFichaIntroConfig.primaryActionLabel}
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton variant="outlined" onClick={handleClose}>
              Cancelar
            </ActionButton>
            <ButtonLoading
              variant="contained"
              loading={isLoadingFamilies}
              loadingLabel="Carregando famílias..."
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continuar
            </ButtonLoading>
          </>
        )
      }
    >
      {isIntroStep ? (
        <ProntuarioFlowIntroContent config={addFichaIntroConfig} showHeader />
      ) : (
        <PageStack spacing={2.25}>
        <PageText>
          {mode === 'novo'
            ? 'Crie um novo prontuário selecionando a ficha inicial. Os dados serão preenchidos a partir do formulário escolhido.'
            : 'Busque a família, confirme o prontuário e escolha a ficha que deseja adicionar.'}
        </PageText>

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
                {isError ? (
                  <ErrorState
                    title="Não foi possível carregar famílias"
                    message="Tente novamente para selecionar um prontuário."
                    onRetry={refetch}
                    compact
                  />
                ) : isLoading ? (
                  <LoadingState message="Carregando famílias..." compact surface={false} />
                ) : filteredFamilies.map((family) => {
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

                {!isLoading && !isError && filteredFamilies.length === 0 && (
                  <EmptyState
                    message="Nenhuma família encontrada."
                    action={<ActionButton onClick={() => setQuery('')}>Limpar busca</ActionButton>}
                  />
                )}
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
              value={effectiveSelectedFormId}
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
      )}
    </PageDialog>
  )
}

function CadastroLandingPage({ onStartForm, onStartFlowIntro, addFichaForms, startMode }) {
  const [dialogMode, setDialogMode] = useState(startMode ?? null)
  const [introType, setIntroType] = useState(null)
  const introConfig = getFlowIntroConfig(introType)

  const handleStartIntroFlow = () => {
    if (!introConfig) {
      return
    }

    setIntroType(null)

    onStartFlowIntro(introConfig.type)
  }

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
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
            <ActionButton variant="contained" onClick={() => setDialogMode('existente')}>
              Iniciar seleção
            </ActionButton>
          }
        />

        <PageCard
          title="Abrir novo prontuário"
          subtitle="Crie um prontuário do zero e preencha a ficha cadastral da família com os dados iniciais."
          footer={
            <ActionButton
              variant="contained"
              onClick={() => setIntroType(FLOW_INTRO_TYPES.ABRIR_PRONTUARIO)}
            >
              Abrir prontuário
            </ActionButton>
          }
        />
      </PageGrid>

      <ProntuarioFlowIntroDialog
        open={Boolean(introConfig)}
        config={introConfig}
        onClose={() => setIntroType(null)}
        onStart={handleStartIntroFlow}
      />

      <NovoRegistroDialog
        key={dialogMode ?? 'closed'}
        open={Boolean(dialogMode)}
        mode={dialogMode}
        onClose={() => setDialogMode(null)}
        formsList={addFichaForms}
        showIntroFirst={dialogMode === 'existente'}
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
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const activeFlowId = searchParams.get(FLOW_QUERY_PARAM)
  const flowIntroType = searchParams.get('tipo')
  const cadastroForms = useMemo(() => forms.filter((form) => form.id !== 'ficha_atualizacao_unas'), [])
  const addFichaForms = useMemo(() => getFlowForms(ADD_FICHA_FLOW_ID, { cargo: user?.cargo }), [user?.cargo])
  const novoProntuarioForms = useMemo(() => getFlowForms(NOVO_PRONTUARIO_FLOW_ID), [])
  const activeFlowForms = useMemo(
    () => getFlowForms(activeFlowId, { cargo: user?.cargo }),
    [activeFlowId, user?.cargo],
  )

  const formContext = useMemo(() => ({
    familiaId: searchParams.get('familiaId'),
    prontuarioId: searchParams.get('prontuarioId'),
    fichaCadastralId: searchParams.get('fichaCadastralId'),
    planoFamiliarId: searchParams.get('planoFamiliarId'),
    folhaId: searchParams.get('folhaId'),
    pduId: searchParams.get('pduId'),
  }), [searchParams])

  const flowDraftStorageKey = useMemo(() => {
    if (!activeFlowId) {
      return null
    }

    return `sasf-form-flow:${activeFlowId}:${formContext.prontuarioId ?? formContext.familiaId ?? 'novo'}`
  }, [activeFlowId, formContext.familiaId, formContext.prontuarioId])

  const [flowDrafts, setFlowDrafts] = useState(() => readFlowDrafts(flowDraftStorageKey))
  const [formNotice, setFormNotice] = useState(null)

  const persistFlowDraft = useCallback((draftFormId, draft) => {
    setFlowDrafts((currentDrafts) => {
      const nextDrafts = { ...currentDrafts, [draftFormId]: draft }
      writeFlowDrafts(flowDraftStorageKey, nextDrafts)
      return nextDrafts
    })
  }, [flowDraftStorageKey, setFlowDrafts])

  const navigateToForm = useCallback((nextFormId, context = formContext, flowId = activeFlowId) => {
    const params = new URLSearchParams()
    if (flowId) params.set(FLOW_QUERY_PARAM, flowId)
    const keys = ['familiaId', 'prontuarioId', 'fichaCadastralId', 'planoFamiliarId', 'folhaId', 'pduId']
    keys.forEach(k => { if (context[k]) params.set(k, context[k]) })
    const query = params.toString()
    navigate(`/dashboard/cadastro/formulario/${nextFormId}${query ? `?${query}` : ''}`)
  }, [navigate, formContext, activeFlowId])

  const currentSection = useMemo(() => {
    return dashboardSections.find((section) => section.slug === sectionSlug) ?? dashboardSections[0]
  }, [sectionSlug])

  const hasActiveFlow = Boolean(activeFlowId && activeFlowForms.length)
  const currentForm = useMemo(() => {
    if (hasActiveFlow) {
      return activeFlowForms.find((flowForm) => flowForm.id === formId) ?? null
    }

    return getFormById(formId)
  }, [activeFlowForms, formId, hasActiveFlow])

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

  if (isCadastroSection && actionSlug === 'fluxo') {
    const flowIntroConfig = getFlowIntroConfig(flowIntroType)

    if (!flowIntroConfig) {
      return <Navigate to="/dashboard/cadastro" replace />
    }

    return (
      <ProntuarioFlowIntroPage
        config={flowIntroConfig}
        onBack={() => navigate(flowIntroConfig.returnPath)}
        onStart={() => {
          if (flowIntroConfig.type === FLOW_INTRO_TYPES.ABRIR_PRONTUARIO) {
            clearFlowDrafts(`sasf-form-flow:${NOVO_PRONTUARIO_FLOW_ID}:novo`)
            setFlowDrafts({})
          }

          navigate(flowIntroConfig.destinationPath)
        }}
      />
    )
  }

  if (isCadastroSection && hasActiveFlow && formId && !currentForm) {
    return (
      <PageWrapper maxWidth={900} spacing={3}>
        <PermissionState message="Esta ficha não está disponível para o seu perfil neste fluxo." />
      </PageWrapper>
    )
  }

  if (isCadastroSection && currentForm) {
    const isAtualizacaoForm = currentForm.id === 'ficha_atualizacao_unas'
    const flowForms = hasActiveFlow ? activeFlowForms : isAtualizacaoForm ? [currentForm] : cadastroForms
    const saveMessages = getFormSaveMessages({ activeFlowId, formId: currentForm.id, isAtualizacaoForm })
    const stepperTitle = activeFlowId === ADD_FICHA_FLOW_ID ? 'Fichas disponíveis' : activeFlowId === NOVO_PRONTUARIO_FLOW_ID ? 'Novo prontuário' : ' '
    const stepperSubtitle = activeFlowId === ADD_FICHA_FLOW_ID
      ? 'Escolha qualquer ficha para preencher. A ordem exibida não bloqueia o preenchimento.'
      : activeFlowId === NOVO_PRONTUARIO_FLOW_ID
        ? 'Triagem, termo de uso, demanda e plano familiar.'
        : ' '
    const storedDraft = flowDrafts[currentForm.id] ?? {}
    const initialDraft = activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === TRIAGEM_FORM_ID
      ? {
          ...storedDraft,
          dados_autorizante: {
            data_assinatura: getTodayFormattedDate(),
            ...(storedDraft.dados_autorizante ?? {}),
          },
        }
      : activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === DEMANDA_FORM_ID
        ? buildDemandaInitialDraft(storedDraft, flowDrafts[TRIAGEM_FORM_ID] ?? {})
        : storedDraft

    const handleFormSave = async (draft) => {
      let newContext = formContext
      if (hasActiveFlow) {
        persistFlowDraft(currentForm.id, draft)
      }

      if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === TRIAGEM_FORM_ID) {
        persistFlowDraft(currentForm.id, draft)
      } else if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === DEMANDA_FORM_ID) {
        const triagemDraft = flowDrafts[TRIAGEM_FORM_ID] ?? {}
        const demandaDraft = buildDemandaInitialDraft(draft, triagemDraft)

        newContext = await saveFormStep('ficha_cadastral_familia', demandaDraft, formContext)
        newContext = await saveFormStep('ficha_cadastral_complementar', demandaDraft, newContext)
        await saveFormStep(TERMO_USO_FORM_ID, buildTermDraftFromTriagem(triagemDraft), newContext)
      } else {
        newContext = await saveFormStep(currentForm.id, draft, formContext)
      }

      queryClient.invalidateQueries({ queryKey: ['familias'] })
      queryClient.invalidateQueries({ queryKey: ['familia-detalhe'] })

      if (activeFlowId === ADD_FICHA_FLOW_ID || isAtualizacaoForm) {
        return
      }

      const currentIndex = flowForms.findIndex((f) => f.id === currentForm.id)
      const nextForm = flowForms[currentIndex + 1]
      if (nextForm) {
        setFormNotice({
          formId: nextForm.id,
          message: saveMessages.success,
          severity: 'success',
        })
        navigateToForm(nextForm.id, newContext)
      }
    }

    if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === TERMO_USO_FORM_ID) {
      const currentIndex = flowForms.findIndex((flowForm) => flowForm.id === currentForm.id)
      const previousForm = flowForms[currentIndex - 1]
      const nextForm = flowForms[currentIndex + 1]

      return (
        <TermoUsoStep
          form={currentForm}
          flowForms={flowForms}
          termDraft={buildTermDraftFromTriagem(flowDrafts[TRIAGEM_FORM_ID] ?? {})}
          onBack={() => navigate('/dashboard/cadastro')}
          onPrevious={() => previousForm && navigateToForm(previousForm.id)}
          onContinue={() => nextForm && navigateToForm(nextForm.id)}
          onSelectFlowForm={(nextFormId) => navigateToForm(nextFormId)}
          pdfDownloadContext={{ prontuarioId: formContext.prontuarioId }}
          stepperTitle={stepperTitle}
          stepperSubtitle={stepperSubtitle}
        />
      )
    }

    if (activeFlowId === NOVO_PRONTUARIO_FLOW_ID && currentForm.id === PLANO_FAMILIAR_PRINT_FORM_ID) {
      const currentIndex = flowForms.findIndex((flowForm) => flowForm.id === currentForm.id)
      const previousForm = flowForms[currentIndex - 1]
      const storedPrintDrafts = readFlowDrafts(flowDraftStorageKey)
      const planoPrintDraft = flowDrafts[PLANO_FAMILIAR_FORM_ID] ?? storedPrintDrafts[PLANO_FAMILIAR_FORM_ID] ?? {}

      return (
        <PlanoFamiliarPrintStep
          form={currentForm}
          flowForms={flowForms}
          planoDraft={planoPrintDraft}
          notice={formNotice?.formId === currentForm.id ? formNotice : null}
          onBack={() => navigate('/dashboard/cadastro')}
          onPrevious={() => previousForm && navigateToForm(previousForm.id)}
          onFinish={() => {
            clearFlowDrafts(flowDraftStorageKey)
            setFlowDrafts({})
            navigate('/dashboard/cadastro')
          }}
          onSelectFlowForm={(nextFormId) => navigateToForm(nextFormId)}
          pdfDownloadContext={{
            prontuarioId: formContext.prontuarioId,
            fichaId: formContext.planoFamiliarId,
          }}
          stepperTitle={stepperTitle}
          stepperSubtitle={stepperSubtitle}
        />
      )
    }

    return (
      <FormRenderer
        key={currentForm.id}
        form={currentForm}
        flowForms={flowForms}
        initialDraft={initialDraft}
        onDraftChange={hasActiveFlow ? persistFlowDraft : undefined}
        onSelectFlowForm={(nextFormId) => navigateToForm(nextFormId)}
        onBack={() => navigate(hasActiveFlow ? '/dashboard/cadastro' : isAtualizacaoForm ? '/dashboard/cadastro/atualizar' : '/dashboard/cadastro/novo')}
        onSave={handleFormSave}
        notice={formNotice?.formId === currentForm.id ? formNotice : null}
        successMessage={saveMessages.success}
        errorMessage={saveMessages.error}
        stepperTitle={stepperTitle}
        stepperSubtitle={stepperSubtitle}
        stepperShowsCompleted={activeFlowId !== ADD_FICHA_FLOW_ID}
      />
    )
  }

  if (isCadastroSection) {
    const startMode = searchParams.get('start') === FLOW_INTRO_TYPES.ADICIONAR_FICHA ? 'existente' : null

    return (
      <CadastroLandingPage
        key={startMode ?? 'catalogo'}
        startMode={startMode}
        onStartFlowIntro={(type) => {
          const config = getFlowIntroConfig(type)

          if (!config) {
            return
          }

          if (type === FLOW_INTRO_TYPES.ABRIR_PRONTUARIO) {
            clearFlowDrafts(`sasf-form-flow:${NOVO_PRONTUARIO_FLOW_ID}:novo`)
            setFlowDrafts({})
          }

          navigate(config.destinationPath)
        }}
        onStartForm={({ mode, flowId, formId: nextFormId, familyId, prontuarioId }) => {
          const resolvedFlowId = flowId ?? (mode === 'existente' ? ADD_FICHA_FLOW_ID : NOVO_PRONTUARIO_FLOW_ID)
          const resolvedFlowForms = resolvedFlowId === ADD_FICHA_FLOW_ID ? addFichaForms : novoProntuarioForms
          const resolvedFormId = nextFormId ?? resolvedFlowForms[0]?.id

          if (!resolvedFormId) {
            return
          }

          const params = new URLSearchParams()
          params.set(FLOW_QUERY_PARAM, resolvedFlowId)
          if (familyId) params.set('familiaId', familyId)
          if (prontuarioId) params.set('prontuarioId', prontuarioId)
          clearFlowDrafts(`sasf-form-flow:${resolvedFlowId}:${prontuarioId ?? familyId ?? 'novo'}`)
          setFlowDrafts({})
          navigate(`/dashboard/cadastro/formulario/${resolvedFormId}?${params.toString()}`)
        }}
        addFichaForms={addFichaForms}
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

  if (isVisaoGeralSection && actionSlug === 'acessar-mensario') {
    return <Navigate to="/dashboard/familias" replace />
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
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow={currentSection.title}
        title="Área em preparação"
        description="Esta seção está reservada e ainda não possui conteúdo específico."
      />
    </PageWrapper>
  )
}

export default DashboardContent
