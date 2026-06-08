import apiClient from '../lib/apiClient'

const PRIORIDADE_LABEL = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' }

// O backend passou a devolver coleções paginadas (Spring Page: { content: [...] }).
// Esta helper aceita tanto o array puro (formato antigo) quanto o envelope paginado.
function asArray(res) {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.content)) return res.content
  return []
}

// O page size padrão do Spring é 20; sem isto a listagem só mostraria as 20
// primeiras famílias/membros. Pedimos uma página grande para trazer tudo.
const PAGE_SIZE = 2000

// Acrescenta ?size=PAGE_SIZE preservando params já existentes.
function withPageSize(path, params = {}) {
  const search = new URLSearchParams(params)
  if (!search.has('size')) search.set('size', String(PAGE_SIZE))
  return `${path}?${search.toString()}`
}

export const DOCS_CONFIG = [
  { key: 'fichaCadastral',      label: 'Ficha Cadastral',            check: (p) => !!p?.fichaCadastralDaFamiliaId },
  { key: 'fichaAtualizacao',    label: 'Ficha de Atualização',       check: (p) => (p?.fichasAtualizacaoQuadroSituacionalIds?.length ?? 0) > 0 },
  { key: 'planoFamiliar',       label: 'Plano de Desenvolvimento',   check: (p) => (p?.planosDesenvolvimentoFamiliarIds?.length ?? 0) > 0 },
  { key: 'folhaProsseguimento', label: 'Folha de Prosseguimento',    check: (p) => (p?.folhasProsseguimentoIds?.length ?? 0) > 0 },
  { key: 'pdu',                 label: 'PDU',                        check: (p) => (p?.planosDesenvolvimentoUsuarioIds?.length ?? 0) > 0 },
  { key: 'termo',               label: 'Termo de Uso de Imagem',     check: (p, termos) => termos.some((t) => t.prontuarioId === p?.id) },
]

function buildDocumentacao(prontuario, termos) {
  return DOCS_CONFIG.map(({ key, label, check }) => ({
    key,
    label,
    presente: check(prontuario, termos),
  }))
}

function normalizeFamilia(f, membros = [], prontuarios = [], termos = []) {
  // Mock data already has nome_representante — pass through unchanged
  if (f.nome_representante) return f

  const prontuario = prontuarios.find((p) => p.id === f.prontuarioId || p.familiaId === f.id) ?? null
  const membrosFamily = membros.filter((m) => m.familiaId === f.id)
  const representante = membrosFamily.find((m) =>
    m.parentescoOuVinculo?.toLowerCase().includes('representante'),
  ) ?? membrosFamily[0]

  const nomeRepresentante = representante?.nome ?? `Família ${f.id?.slice(0, 8) ?? f.id}`

  return {
    id: f.id,
    nome_representante: nomeRepresentante,
    cpf: representante?.cpf ?? '—',
    endereco: '—',
    numero: '—',
    complemento: '',
    bairro: '—',
    distrito: '—',
    cras: '—',
    cas: '—',
    prioridade: PRIORIDADE_LABEL[f.prioridade] ?? f.prioridade ?? '—',
    ativo: f.ativo ?? true,
    status: f.ativo === false ? 'Inativo' : 'Ativo',
    ultima_visita: f.ultimaVisita ?? null,
    proxima_visita: f.proximaVisita ?? null,
    ultima_atualizacao: f.ultimaVisita ?? null,
    orientadorId: f.orientadorId ?? null,
    representanteId: f.representanteId ?? null,
    prontuarioId: f.prontuarioId ?? prontuario?.id ?? null,
    documentacao: buildDocumentacao(prontuario, termos),
    tags: [],
    composicao_familiar: membrosFamily.map((m) => ({
      nome: m.nome ?? '—',
      parentesco: m.parentescoOuVinculo ?? '—',
      idade: m.dataNascimento
        ? Math.floor((Date.now() - new Date(m.dataNascimento + 'T00:00:00')) / 3.15576e10)
        : '—',
      renda: m.renda != null ? String(m.renda) : '—',
      fator: m.fatoresRiscoSocial?.join(', ') || '—',
    })),
    situacao_habitacional: [],
    programa_transferencia_renda: [],
    beneficio_prestacao_continuada: [],
    // Detail fields not available from this endpoint
    sexo: '—', data_matricula: '—', numero_matricula: '—',
    data_nascimento: representante?.dataNascimento ?? '—',
    naturalidade: '—', cor_raca: '—', pessoa_deficiencia: '—',
    rg: '—', orgao_emissor: '—', uf: '—',
    ctps_numero: '—', ctps_serie: '—', ctps_emissao: '—',
    mae: '—', pai: '—', estado_civil: '—',
    grau_instrucao: '—', profissao: representante?.profissao ?? '—',
    ocupacao_descricao: '—', ocupacao_situacao: '—',
    renda: representante?.renda != null ? String(representante.renda) : '—',
    cep: '—', telefone_residencial: '—',
    telefone_celular: '—', telefone_outro: '—', ponto_referencia: '—',
    condicao_moradia: '—', numero_comodos: '—',
    valor_aluguel_financiamento: '—', tipo_construcao: '—',
    escola: '—', saude: '—', vulnerabilidade: '—', nis_nit_nb: '—',
    nome_servico_sasf: '—', data_desligamento: '',
  }
}

function realValue(value, fallback) {
  return value !== undefined && value !== null && value !== '' && value !== '—' ? value : fallback
}

function mergeFamiliaContato(family, contato) {
  const rep = contato?.representante
  const end = contato?.endereco

  return {
    ...family,
    nome_representante: realValue(rep?.nome, family.nome_representante),
    cpf: realValue(rep?.cpf, family.cpf),
    endereco: realValue(end?.logradouro, family.endereco),
    numero: realValue(end?.numero, family.numero),
    complemento: realValue(end?.complemento, family.complemento),
    bairro: realValue(end?.bairro, family.bairro),
    distrito: realValue(end?.distrito, family.distrito),
    cep: realValue(end?.cep, family.cep),
    telefone_residencial: realValue(rep?.telefoneResidencial, family.telefone_residencial),
    telefone_celular: realValue(rep?.telefoneCelular, family.telefone_celular),
    telefone_outro: realValue(rep?.telefoneOutro ?? rep?.telefone, family.telefone_outro),
  }
}

async function getContatoByProntuario(prontuario, prontuarioId) {
  const prontuarioAtual = prontuario ?? (
    prontuarioId ? await apiClient.get(`/prontuario/${prontuarioId}`).catch(() => null) : null
  )
  const fichaCadastral = prontuarioAtual?.fichaCadastralDaFamiliaId
    ? await apiClient.get(`/fichacadastral/${prontuarioAtual.fichaCadastralDaFamiliaId}`).catch(() => null)
    : null
  const representante = fichaCadastral?.representanteId
    ? await apiClient.get(`/representante/${fichaCadastral.representanteId}`).catch(() => null)
    : null
  const endereco = representante?.enderecoId
    ? await apiClient.get(`/endereco/${representante.enderecoId}`).catch(() => null)
    : null

  return { representante, endereco }
}

export async function listFamilias(params = {}) {
  const [familias, membros, prontuarios, orientadores] = await Promise.all([
    apiClient.get(withPageSize('/familia', params)),
    apiClient.get(withPageSize('/membro')).catch(() => []),
    apiClient.get(withPageSize('/prontuario')).catch(() => []),
    apiClient.get('/orientador?size=2000').catch(() => []),
  ])
  const famArray = asArray(familias)
  const memArray = asArray(membros)
  const prontuarioArray = asArray(prontuarios)
  const orientadorArray = asArray(orientadores)

  const normalized = famArray.map((f) => {
    const family = normalizeFamilia(f, memArray, prontuarioArray, [])
    // Encontrar o orientador completo para pegar a cor e outros dados
    if (f.orientadorId) {
      family.orientador = orientadorArray.find(o => (o.id === f.orientadorId || o.userId === f.orientadorId)) || { id: f.orientadorId }
    }
    return family
  })

  return Promise.all(normalized.map(async (family) => {
    const prontuario = prontuarioArray.find((p) => p.id === family.prontuarioId || p.familiaId === family.id)
    const contato = await getContatoByProntuario(prontuario, family.prontuarioId)
    return mergeFamiliaContato(family, contato)
  }))
}

export async function getFamilia(id) {
  const [familia, membros, prontuarios, termos] = await Promise.all([
    apiClient.get(`/familia/${id}`),
    apiClient.get(withPageSize('/membro')).catch(() => []),
    apiClient.get(withPageSize('/prontuario')).catch(() => []),
    apiClient.get(withPageSize('/termo')).catch(() => []),
  ])
  return normalizeFamilia(familia, asArray(membros), asArray(prontuarios), asArray(termos))
}

export async function getFamiliaContato(prontuarioId) {
  if (!prontuarioId) return null
  return getContatoByProntuario(null, prontuarioId)
}

export async function createFamilia(payload) {
  return apiClient.post('/familia', payload)
}

export async function updateFamilia(id, payload) {
  return apiClient.put(`/familia/${id}`, payload)
}

export async function deleteFamilia(id) {
  return apiClient.delete(`/familia/${id}`)
}

export default { listFamilias, getFamilia, getFamiliaContato, createFamilia, updateFamilia, deleteFamilia }
