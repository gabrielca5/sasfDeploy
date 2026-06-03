import apiClient from '../lib/apiClient'

const PRIORIDADE_LABEL = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' }

function normalizeFamilia(f, membros = []) {
  // Mock data already has nome_representante — pass through unchanged
  if (f.nome_representante) return f

  // Find the representative member for this family
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
    prontuarioId: f.prontuarioId ?? null,
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

export async function listFamilias(params = {}) {
  const query = new URLSearchParams(params).toString()
  const [familias, membros] = await Promise.all([
    apiClient.get(`/familia${query ? `?${query}` : ''}`),
    apiClient.get('/membro').catch(() => []),
  ])
  const famArray = Array.isArray(familias) ? familias : []
  const memArray = Array.isArray(membros) ? membros : []
  return famArray.map((f) => normalizeFamilia(f, memArray))
}

export async function getFamilia(id) {
  const [familia, membros] = await Promise.all([
    apiClient.get(`/familia/${id}`),
    apiClient.get('/membro').catch(() => []),
  ])
  return normalizeFamilia(familia, membros)
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

export default { listFamilias, getFamilia, createFamilia, updateFamilia, deleteFamilia }
