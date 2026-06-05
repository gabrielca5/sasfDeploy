import { getFormById } from './formsCatalog'

export const ADD_FICHA_FLOW_ID = 'add_ficha'
export const NOVO_PRONTUARIO_FLOW_ID = 'novo_prontuario'
export const TRIAGEM_FORM_ID = 'triagem_novo_prontuario'
export const DEMANDA_FORM_ID = 'demanda_novo_prontuario'
export const TERMO_USO_FORM_ID = 'termo_autorizacao_imagem'
export const PLANO_FAMILIAR_FORM_ID = 'plano_desenvolvimento_familiar'
export const PLANO_FAMILIAR_PRINT_FORM_ID = 'plano_desenvolvimento_familiar_impressao'
export const FLOW_QUERY_PARAM = 'flow'

const ADD_FICHA_FLOW_FORM_IDS = [
  'folha_prosseguimento',
  'ficha_atualizacao_unas',
  'ficha_visita_domiciliar',
  'plano_desenvolvimento_usuario',
]

const TRIAGEM_REPRESENTANTE_FIELDS = [
  'nome_representante',
  'cpf',
  'rg',
  'data_nascimento',
  'cor_raca',
  'naturalidade',
  'estado_civil',
  'sexo',
  'pessoa_deficiencia',
]

const TRIAGEM_TERMO_FIELDS = ['data_assinatura']

const DEMANDA_SECTION_REFS = [
  ['ficha_cadastral_familia', 'identificacao_servico'],
  ['ficha_cadastral_familia', 'dados_representante'],
  ['ficha_cadastral_familia', 'endereco'],
  ['ficha_cadastral_familia', 'moradia'],
  ['ficha_cadastral_familia', 'beneficios'],
  ['ficha_cadastral_familia', 'composicao_familiar'],
  ['ficha_cadastral_complementar', 'informacoes_complementares', { titulo: 'Ficha complementar' }],
  ['ficha_cadastral_complementar', 'demanda_encaminhamentos'],
]

// TODO: confirmar com o backend/produto se ADMIN deve contar como perfil de gestão.
const GESTAO_CARGOS = ['GESTOR', 'ADMIN']

function normalizeCargo(cargo) {
  return String(cargo || '').trim().toUpperCase()
}

export function isGestaoProfile(cargo) {
  return GESTAO_CARGOS.includes(normalizeCargo(cargo))
}

function findSection(formId, sectionId) {
  return getFormById(formId)?.secoes?.find((section) => section.id === sectionId) ?? null
}

function cloneSection(section, overrides = {}) {
  if (!section) {
    return null
  }

  return {
    ...section,
    ...overrides,
    campos: Array.isArray(section.campos) ? section.campos.map((field) => ({ ...field })) : section.campos,
    colunas: Array.isArray(section.colunas) ? section.colunas.map((field) => ({ ...field })) : section.colunas,
    campos_por_item: Array.isArray(section.campos_por_item)
      ? section.campos_por_item.map((field) => ({ ...field }))
      : section.campos_por_item,
    campo: section.campo ? { ...section.campo } : section.campo,
  }
}

function cloneSectionById(formId, sectionId, overrides = {}) {
  return cloneSection(findSection(formId, sectionId), overrides)
}

function cloneSectionWithFields(formId, sectionId, fieldIds, overrides = {}) {
  const section = findSection(formId, sectionId)
  if (!section || !Array.isArray(section.campos)) {
    return null
  }

  const fields = fieldIds
    .map((fieldId) => section.campos.find((field) => field.id === fieldId))
    .filter(Boolean)
    .map((field) => ({ ...field }))

  return {
    ...section,
    ...overrides,
    campos: fields,
  }
}

function cloneForm(form, overrides = {}) {
  if (!form) {
    return null
  }

  return {
    ...form,
    ...overrides,
    secoes: form.secoes?.map((section) => cloneSection(section)).filter(Boolean) ?? [],
  }
}

function buildTriagemForm() {
  const fichaCadastral = getFormById('ficha_cadastral_familia')
  const menoresField = findSection('termo_autorizacao_imagem', 'dados_autorizante')
    ?.campos
    ?.find((field) => field.id === 'nomes_criancas')

  return {
    id: TRIAGEM_FORM_ID,
    titulo: 'Triagem',
    orgao: fichaCadastral?.orgao ?? '',
    secoes: [
      cloneSectionWithFields('ficha_cadastral_familia', 'dados_representante', TRIAGEM_REPRESENTANTE_FIELDS, {
        titulo: 'Dados do representante',
      }),
      cloneSectionWithFields('termo_autorizacao_imagem', 'dados_autorizante', TRIAGEM_TERMO_FIELDS, {
        titulo: 'Dados para o termo',
      }),
      menoresField
        ? {
            id: 'menores_acompanhantes',
            titulo: 'Menores acompanhantes',
            tipo: 'lista_repetivel',
            max_itens: 12,
            campos_por_item: [
              {
                ...menoresField,
                label: 'Nome do menor acompanhante',
                tipo: 'text',
              },
            ],
          }
        : null,
    ].filter(Boolean),
  }
}

function buildDemandaForm() {
  const fichaCadastral = getFormById('ficha_cadastral_familia')

  return {
    id: DEMANDA_FORM_ID,
    titulo: 'Demanda',
    orgao: fichaCadastral?.orgao ?? '',
    secoes: DEMANDA_SECTION_REFS
      .map(([formId, sectionId, overrides]) => cloneSectionById(formId, sectionId, overrides))
      .filter(Boolean),
  }
}

const triagemNovoProntuarioForm = buildTriagemForm()
const demandaNovoProntuarioForm = buildDemandaForm()
const termoUsoFlowStep = cloneForm(getFormById(TERMO_USO_FORM_ID), { titulo: 'Termo de uso' })
const planoFamiliarFlowStep = cloneForm(getFormById(PLANO_FAMILIAR_FORM_ID))
const planoFamiliarPrintFlowStep = {
  id: PLANO_FAMILIAR_PRINT_FORM_ID,
  titulo: 'Impressão e assinatura',
  orgao: planoFamiliarFlowStep?.orgao ?? '',
  secoes: [],
}

export const addFichaFlow = {
  id: ADD_FICHA_FLOW_ID,
  label: 'Adicionar ficha ao prontuário',
  getForms: ({ cargo } = {}) =>
    ADD_FICHA_FLOW_FORM_IDS
      .filter((formId) => formId !== 'ficha_atualizacao_unas' || isGestaoProfile(cargo))
      .map((formId) => getFormById(formId))
      .filter(Boolean),
}

export const novoProntuarioFlow = {
  id: NOVO_PRONTUARIO_FLOW_ID,
  label: 'Abrir novo prontuário',
  getForms: () => [
    triagemNovoProntuarioForm,
    termoUsoFlowStep,
    demandaNovoProntuarioForm,
    planoFamiliarFlowStep,
    planoFamiliarPrintFlowStep,
  ].filter(Boolean),
}

const flows = {
  [ADD_FICHA_FLOW_ID]: addFichaFlow,
  [NOVO_PRONTUARIO_FLOW_ID]: novoProntuarioFlow,
}

export function getFormFlow(flowId) {
  return flows[flowId] ?? null
}

export function getFlowForms(flowId, options = {}) {
  return getFormFlow(flowId)?.getForms(options) ?? []
}

export function getFlowFormById(flowId, formId, options = {}) {
  return getFlowForms(flowId, options).find((form) => form.id === formId) ?? null
}
