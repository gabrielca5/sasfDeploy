import apiClient from '../lib/apiClient'
import { getUser } from './auth.service'

// ─── Mapeamentos de enum (label do form → valor do backend) ──────────────────

const CONDICAO_MORADIA_MAP = {
  'Própria': 'PROPRIA',
  'Alugada': 'ALUGADA',
  'Cedida': 'CEDIDA',
}

const TIPO_CONSTRUCAO_MAP = {
  'Alvenaria': 'ALVENARIA',
  'Madeira': 'MADEIRA',
  'Mista': 'MISTA',
}

const SITUACAO_HABITACIONAL_MAP = {
  'Cortiço': 'CORTICO',
  'Favela': 'FAVELA',
  'Loteamento irregular': 'LOTEAMENTO_IRREGULAR',
}

const PROGRAMA_RENDA_MAP = {
  'Não recebe': 'NAO_RECEBE',
  'Renda Mínima': 'RENDA_MINIMA',
  'Bolsa Família': 'BOLSA_FAMILIA',
  'Renda Cidadã': 'RENDA_CIDADA',
  'Ação Jovem': 'ACAO_JOVEM',
  'PETI': 'PETI',
}

const BPC_MAP = {
  'Não recebe': 'NAO_RECEBE',
  'Idoso': 'IDOSO',
  'Pessoa com deficiência': 'PCD',
}

const FATOR_RISCO_MAP = {
  '1 - Alcoolismo': 'ALCOOLISMO',
  '2 - Deficiência auditiva': 'DEFICIENCIA_AUDITIVA',
  '3 - Deficiência física': 'DEFICIENCIA_FISICA',
  '4 - Deficiência mental': 'DEFICIENCIA_MENTAL',
  '5 - Deficiência visual': 'DEFICIENCIA_VISUAL',
  '6 - Desemprego': 'DESEMPREGO',
  '7 - Drogadição': 'DROGADICAO',
  '8 - HIV+': 'HIV',
  '9 - Problemas psiquiátricos': 'PROBLEMAS_PSIQUIATRICOS',
  '10 - Situação de rua': 'SITUACAO_DE_RUA',
  '11 - Trabalho infantil': 'TRABALHO_INFANTIL',
  '12 - Violência doméstica': 'VIOLENCIA_DOMESTICA',
  '13 - Medida Socioeducativa': 'MEDIDA_SOCIOEDUCATIVA',
  '14 - Privação de liberdade': 'PRIVACAO_DE_LIBERDADE',
  '15 - Acolhimento Institucional': 'ACOLHIMENTO_INSTITUCIONAL',
  '16 - Outro': 'OUTRO',
}

function toEnum(value, map) {
  if (value && !map[value]) {
    console.error(`Mapeamento enum não encontrado para o valor: "${value}". Verifique o Swagger.`)
  }
  return map[value] ?? null
}

function toEnumArray(arr, map) {
  if (!Array.isArray(arr)) return []
  return arr
    .map((v) => {
      const mapped = map[v]
      if (v && !mapped) {
        console.error(`Mapeamento enum não encontrado para o valor: "${v}". Verifique o Swagger.`)
      }
      return mapped
    })
    .filter(Boolean)
}

function todayIsoDate() {
  return new Date().toISOString().split('T')[0]
}

function toIsoDate(value) {
  const text = String(value || '').trim()
  if (!text) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const brDate = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (brDate) {
    return `${brDate[3]}-${brDate[2]}-${brDate[1]}`
  }

  return text
}

function toIsoDateOrToday(value) {
  return toIsoDate(value) || todayIsoDate()
}

function toIsoDateTime(value) {
  const date = toIsoDate(value)
  return date ? new Date(`${date}T12:00:00`).toISOString() : null
}

function createSaveError(message, err) {
  const error = new Error(message)
  error.cause = err
  return error
}

function toNumeric(value) {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') return value
  const digits = String(value).replace(/\D/g, '')
  if (!digits) return null
  return Number(digits) / 100
}

// ─── Handlers por formulário ─────────────────────────────────────────────────

async function saveFichaCadastralFamilia(draft, context = {}) {
  const moradia = draft.moradia ?? {}
  const beneficios = draft.beneficios ?? {}
  const representante = draft.dados_representante ?? {}
  const composicao = draft.composicao_familiar ?? []

  // Modo "completar cadastro": quando a família e o prontuário já existem
  // (ex.: família antiga sem representante/ficha cadastral), reutilizamos os
  // IDs recebidos via contexto em vez de criar registros novos.
  const isCompletar = Boolean(context.familiaId && context.prontuarioId)

  // 1. Cria a família (ou reutiliza a existente em modo completar)
  const familia = isCompletar
    ? { id: context.familiaId }
    : await apiClient.post('/familia', {
        ativo: true,
        prioridade: 'MEDIA',
      })

  // 2. Cria o prontuário vinculado à família (ou reutiliza o existente)
  const prontuario = isCompletar
    ? { id: context.prontuarioId }
    : await apiClient.post('/prontuario', {
        familiaId: familia.id,
        fichaCadastralDaFamiliaId: null,
        fichasAtualizacaoQuadroSituacionalIds: [],
        planosDesenvolvimentoFamiliarIds: [],
        folhasProsseguimentoIds: [],
        planosDesenvolvimentoUsuarioIds: [],
      })

  // 3a. Cria o representante como membro (garante que a família sempre tenha nome
  //     visível na listagem, independente de /api/representante funcionar)
  const membroIds = []
  const nomeRepresentante = representante.nome_representante?.trim()
  if (nomeRepresentante) {
    const membroRep = await apiClient.post('/membro', {
      numeroOrdem: 1,
      nome: nomeRepresentante,
      nomeSocial: null,
      dataNascimento: toIsoDate(representante.data_nascimento),
      parentescoOuVinculo: 'Representante',
      profissao: representante.profissao || null,
      ocupacao: null,
      renda: toNumeric(representante.renda),
      fatoresRiscoSocial: [],
      familiaId: familia.id,
    })
    membroIds.push(membroRep.id)
  }

  // 3b. Cria demais membros da composição familiar (ignora linhas sem nome)
  const linhasValidas = composicao.filter((row) => row.nome?.trim())
  for (let i = 0; i < linhasValidas.length; i++) {
    const row = linhasValidas[i]
    const membro = await apiClient.post('/membro', {
      numeroOrdem: membroIds.length + 1,
      nome: row.nome,
      nomeSocial: null,
      dataNascimento: toIsoDate(row.data_nascimento),
      parentescoOuVinculo: row.parentesco_vinculo || null,
      profissao: row.profissao || null,
      ocupacao: row.ocupacao || null,
      renda: toNumeric(row.renda),
      fatoresRiscoSocial: toEnumArray(row.fatores_risco, FATOR_RISCO_MAP),
      familiaId: familia.id,
    })
    membroIds.push(membro.id)
  }

  const endereco = draft.endereco ?? {}

  // 4 & 5. Cria endereço e representante — envolvidos em try/catch porque
  //        /api/endereco ainda pode estar instável.
  //        Se falharem, o fluxo continua sem representanteId na ficha.
  let representanteId = null
  try {
    const enderecoObj = await apiClient.post('/endereco', {
      logradouro: endereco.endereco || null,
      numero: endereco.numero || null,
      complemento: endereco.complemento || null,
      cep: endereco.cep || null,
      cidade: endereco.cidade || null,
      bairro: endereco.bairro || null,
      distrito: endereco.distrito || null,
    })
    const representanteObj = await apiClient.post('/representante', {
      nome: representante.nome_representante || null,
      dataNascimento: toIsoDate(representante.data_nascimento),
      sexo: representante.sexo === 'F' ? 'FEMININO' : representante.sexo === 'M' ? 'MASCULINO' : null,
      nisNitNb: representante.nis_nit_nb || null,
      naturalidade: representante.naturalidade || null,
      corRaca: toEnum(representante.cor_raca, {
        'Branca': 'BRANCA', 'Preta': 'PRETA', 'Amarela': 'AMARELA',
        'Parda': 'PARDA', 'Indígena': 'INDIGENA', 'Sem declaração': 'SEM_DECLARACAO',
      }),
      possuiDeficiencia: representante.pessoa_deficiencia === 'Sim',
      cpf: representante.cpf || null,
      rg: representante.rg || null,
      dataEmissaoRg: toIsoDate(representante.ctps_emissao),
      orgaoEmissorRg: representante.orgao_emissor || null,
      ufRg: representante.uf || null,
      ctpsNumero: representante.ctps_numero || null,
      ctpsSerie: representante.ctps_serie || null,
      nomeMae: representante.mae || null,
      nomePai: representante.pai || null,
      estadoCivil: toEnum(representante.estado_civil, {
        'Solteiro': 'SOLTEIRO', 'Casado': 'CASADO', 'Separado': 'SEPARADO',
        'Divorciado': 'DIVORCIADO', 'Viúvo': 'VIUVO',
      }),
      grauInstrucao: toEnum(representante.grau_instrucao, {
        'Analfabeto': 'ANALFABETO',
        'Ensino Fundamental Completo': 'ENSINO_FUNDAMENTAL_COMPLETO',
        'Ensino Fundamental Incompleto': 'ENSINO_FUNDAMENTAL_INCOMPLETO',
        'Ensino Médio Completo': 'ENSINO_MEDIO_COMPLETO',
        'Ensino Médio Incompleto': 'ENSINO_MEDIO_INCOMPLETO',
        'Ensino Superior Completo': 'ENSINO_SUPERIOR_COMPLETO',
        'Ensino Superior Incompleto': 'ENSINO_SUPERIOR_INCOMPLETO',
      }),
      profissao: representante.profissao || null,
      ocupacao: toEnum(representante.ocupacao_situacao, {
        'Empregado': 'EMPREGADO', 'Desempregado': 'DESEMPREGADO',
        'Aposentado': 'APOSENTADO', 'Pensionista': 'PENSIONISTA',
      }),
      renda: toNumeric(representante.renda),
      enderecoId: enderecoObj.id,
      telefoneResidencial: endereco.telefone_residencial || null,
      telefoneCelular: endereco.telefone_celular || null,
      telefone: endereco.telefone_outro || null,
    })
    representanteId = representanteObj.id
  } catch (err) {
    console.warn('Não foi possível criar endereço/representante:', err?.message)
  }

  // 6 & 7. Cria a ficha cadastral e vincula ao prontuário (idempotente).
  // Verifica se o prontuário já tem uma ficha antes de criar (evita erro
  // de unicidade caso o formulário seja salvo duas vezes).
  let fichaCadastralId
  try {
    const prontuarioAtual = await apiClient.get(`/prontuario/${prontuario.id}`).catch(() => null)
    if (prontuarioAtual?.fichaCadastralDaFamiliaId) {
      fichaCadastralId = prontuarioAtual.fichaCadastralDaFamiliaId
    } else {
    const fichaCadastral = await apiClient.post('/fichacadastral', {
      prontuarioId: prontuario.id,
      representanteId,
      dataMatricula: toIsoDate(representante.data_matricula),
      numeroMatricula: representante.numero_matricula || null,
      dataDesligamento: toIsoDate(representante.data_desligamento),
      condicoesMoradia: toEnum(moradia.condicao_moradia, CONDICAO_MORADIA_MAP),
      valorAluguelOuFinanciamento: toNumeric(moradia.valor_aluguel_financiamento),
      tipoConstrucao: toEnum(moradia.tipo_construcao, TIPO_CONSTRUCAO_MAP),
      situacaoHabitacional:
        toEnumArray(moradia.situacao_habitacional, SITUACAO_HABITACIONAL_MAP)[0] ?? null,
      outraSituacaoHabitacional: null,
      numeroComodos: moradia.numero_comodos ? Number(moradia.numero_comodos) : null,
      qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada: 0,
      qtdMulheresGestantesNaFamilia: 0,
      qtdGestantesComPreNatal: 0,
      programasTransferenciaRenda: (() => {
        const arr = toEnumArray(beneficios.programa_transferencia_renda, PROGRAMA_RENDA_MAP)
        return arr.length > 1 ? arr.filter(p => p !== 'NAO_RECEBE') : arr
      })(),
      outroProgramaTransferenciaRenda: beneficios.programa_outro || null,
      beneficioPrestacaoContinuada: toEnumArray(beneficios.beneficio_prestacao_continuada, BPC_MAP),
      composicaoFamiliarIds: membroIds,
      informacoesComplementaresCriancasAdolescentesIds: [],
    })
      fichaCadastralId = fichaCadastral.id
      // Preserva quaisquer documentos já vinculados (importante no modo
      // completar, onde o prontuário pode já ter plano/folha/pdu).
      await apiClient.put(`/prontuario/${prontuario.id}`, {
        familiaId: familia.id,
        fichaCadastralDaFamiliaId: fichaCadastralId,
        fichasAtualizacaoQuadroSituacionalIds: prontuarioAtual?.fichasAtualizacaoQuadroSituacionalIds ?? [],
        planosDesenvolvimentoFamiliarIds: prontuarioAtual?.planosDesenvolvimentoFamiliarIds ?? [],
        folhasProsseguimentoIds: prontuarioAtual?.folhasProsseguimentoIds ?? [],
        planosDesenvolvimentoUsuarioIds: prontuarioAtual?.planosDesenvolvimentoUsuarioIds ?? [],
      })
    }
  } catch (err) {
    console.warn('Não foi possível criar fichacadastral:', err?.message)
    throw createSaveError('Não foi possível criar o prontuário. Tente novamente.', err)
  }

  return {
    familiaId: familia.id,
    prontuarioId: prontuario.id,
    fichaCadastralId,
  }
}

async function saveFichaCadastralComplementar(draft, context) {
  const demandas = Array.isArray(draft.demanda_encaminhamentos) ? draft.demanda_encaminhamentos : []
  const dados = draft.dados_atendimento ?? {}
  const user = getUser()

  // Concatena as linhas da tabela em uma string formatada
  const textoFormatado = demandas
    .filter(row => row.demanda?.trim() || row.orientacoes?.trim() || row.encaminhamentos?.trim())
    .map((row, idx) => {
      const partes = []
      if (row.demanda?.trim()) partes.push(`DEMANDA: ${row.demanda.trim()}`)
      if (row.orientacoes?.trim()) partes.push(`ORIENTAÇÃO: ${row.orientacoes.trim()}`)
      if (row.encaminhamentos?.trim()) partes.push(`ENCAMINHAMENTO: ${row.encaminhamentos.trim()}`)
      return `ITEM ${idx + 1}:\n${partes.join('\n')}`
    })
    .join('\n\n')

  try {
    // 1. Cria registro de prosseguimento (histórico)
    if (textoFormatado.trim()) {
      await apiClient.post('/registroprosseguimento', {
        dataRegistro: toIsoDateOrToday(dados.data_atendimento),
        demanda: textoFormatado,
        tecnicoResponsavelId: user?.userId ?? null,
      })
    }

    // 2. Atualiza a Ficha Cadastral com a demanda (conclusão da ficha)
    if (context.fichaCadastralId && textoFormatado.trim()) {
      const currentFicha = await apiClient.get(`/fichacadastral/${context.fichaCadastralId}`)
      await apiClient.put(`/fichacadastral/${context.fichaCadastralId}`, {
        ...currentFicha,
        demandaApresentadaOrientacoesEncaminhamentos: textoFormatado,
      })
    }
  } catch (err) {
    console.warn('Não foi possível salvar demanda na ficha:', err?.message)
    throw createSaveError('Não foi possível salvar a demanda do prontuário. Tente novamente.', err)
  }

  return context
}

async function saveFichaVisita(draft, context) {
  const identificacao = draft.identificacao_visita ?? {}
  const conteudo = draft.conteudo_visita ?? {}
  const demandas = Array.isArray(draft.demandas_detalhadas) ? draft.demandas_detalhadas : []

  // Data da visita em formato YYYY-MM-DD (usada também para atualizar a família)
  const dataVisitaISO = toIsoDateOrToday(identificacao.data_visita)

  // Concatena as linhas da tabela em uma string formatada
  const textoFormatado = demandas
    .filter(row => row.demanda?.trim() || row.orientacoes?.trim() || row.encaminhamentos?.trim())
    .map((row, idx) => {
      const partes = []
      if (row.demanda?.trim()) partes.push(`DEMANDA: ${row.demanda.trim()}`)
      if (row.orientacoes?.trim()) partes.push(`ORIENTAÇÃO: ${row.orientacoes.trim()}`)
      if (row.encaminhamentos?.trim()) partes.push(`ENCAMINHAMENTO: ${row.encaminhamentos.trim()}`)
      return `ITEM ${idx + 1}:\n${partes.join('\n')}`
    })
    .join('\n\n')

  try {
    await apiClient.post('/fichavisita', {
      prontuarioId: context.prontuarioId,
      orientadorResponsavelId: null,
      representanteVisitadoId: null,
      dataVisita: new Date(`${dataVisitaISO}T12:00:00`).toISOString(),
      objetivoDaVisita: conteudo.objetivo_visita || '',
      pessoasFamiliaQueConversaram: conteudo.pessoas_presentes || '',
      demandasOrientacoesEncaminhamentos: textoFormatado,
    })
    // O backend não propaga a data da visita para a entidade Familia, então
    // atualizamos `ultimaVisita` aqui para que os cards/listagem reflitam a visita.
    await atualizaUltimaVisita(context.familiaId, dataVisitaISO)
  } catch (err) {
    console.warn('Não foi possível salvar ficha de visita:', err?.message)
    throw createSaveError('Não foi possível criar a ficha de visita. Tente novamente.', err)
  }

  return context
}

// Atualiza `ultimaVisita` da família preservando os demais campos (GET-before-PUT).
async function atualizaUltimaVisita(familiaId, dataVisitaISO) {
  if (!familiaId) return
  try {
    const familia = await apiClient.get(`/familia/${familiaId}`).catch(() => null)
    await apiClient.put(`/familia/${familiaId}`, {
      ...(familia ?? {}),
      ativo: familia?.ativo ?? true,
      prioridade: familia?.prioridade ?? 'MEDIA',
      ultimaVisita: dataVisitaISO,
    })
  } catch (err) {
    console.warn('Não foi possível atualizar ultimaVisita da família:', err?.message)
  }
}

// Helper: atualiza o prontuário adicionando o novo ID sem apagar os existentes
async function atualizaProntuario(context, field, newId) {
  if (!context.prontuarioId || !newId) return
  try {
    const atual = await apiClient.get(`/prontuario/${context.prontuarioId}`)
    const merge = (existing = [], id) =>
      Array.isArray(existing) && !existing.includes(id) ? [...existing, id] : existing

    await apiClient.put(`/prontuario/${context.prontuarioId}`, {
      familiaId: context.familiaId,
      fichaCadastralDaFamiliaId: atual.fichaCadastralDaFamiliaId ?? context.fichaCadastralId ?? null,
      fichasAtualizacaoQuadroSituacionalIds: field === 'atualizacao'
        ? merge(atual.fichasAtualizacaoQuadroSituacionalIds, newId)
        : atual.fichasAtualizacaoQuadroSituacionalIds ?? [],
      planosDesenvolvimentoFamiliarIds: field === 'plano'
        ? merge(atual.planosDesenvolvimentoFamiliarIds, newId)
        : atual.planosDesenvolvimentoFamiliarIds ?? [],
      folhasProsseguimentoIds: field === 'folha'
        ? merge(atual.folhasProsseguimentoIds, newId)
        : atual.folhasProsseguimentoIds ?? [],
      planosDesenvolvimentoUsuarioIds: field === 'pdu'
        ? merge(atual.planosDesenvolvimentoUsuarioIds, newId)
        : atual.planosDesenvolvimentoUsuarioIds ?? [],
    })
  } catch (err) {
    console.warn('Não foi possível atualizar prontuário:', err?.message)
    throw createSaveError('Não foi possível vincular a ficha ao prontuário. Tente novamente.', err)
  }
}

async function saveTermo(draft, context) {
  const user = getUser()
  const campos = draft.dados_autorizante ?? {}
  try {
    const nomes = campos.nomes_criancas
      ? campos.nomes_criancas.split('\n').map(s => s.trim()).filter(Boolean)
      : []
    await apiClient.post('/termo', {
      prontuarioId: context.prontuarioId,
      usuarioAutorizanteId: user?.userId ?? null,
      numeroCedulaIdentidade: campos.rg_autorizante || null,
      cpf: campos.cpf_autorizante || null,
      nomesCriancasAutorizadas: nomes,
      dataAssinatura: toIsoDateTime(campos.data_assinatura) ?? new Date().toISOString(),
    })
  } catch (err) {
    if (err.status === 409) {
      console.info('Termo já existe para este prontuário (409 Conflict). Prosseguindo...')
    } else {
      console.warn('Falha ao salvar termo (não fatal):', err?.message)
    }
    // Não lançamos erro para não interromper o fluxo do usuário
  }
  return context
}

async function savePlanoFamiliar(draft, context) {
  const user = getUser()
  const dadosPlano = draft.dados_plano ?? {}
  const analise = draft.analise_diagnostica ?? {}
  try {
    const plano = await apiClient.post('/pdf', {
      familiaId: context.familiaId,
      analiseDiagnostica: analise.analise_diagnostica || null,
      objetivo: analise.objetivo || null,
      numeroPlano: dadosPlano.plano_numero || null,
      dataElaboracao: toIsoDateOrToday(dadosPlano.data_elaboracao),
      dataValidade: toIsoDate(dadosPlano.data_validade),
      dataReavaliacao: toIsoDate(dadosPlano.data_reavaliacao),
      composicaoFamiliar: null,
      moradia: null,
      saude: null,
      educacao: null,
      renda: null,
      observacoes: null,
      itensPlanoIds: [],
      assinaturaResponsavelFamilia: null,
      tecnicoReferenciaId: user?.userId ?? null,
    })
    await atualizaProntuario(context, 'plano', plano?.id)
    return { ...context, planoFamiliarId: plano?.id }
  } catch (err) {
    console.warn('Não foi possível salvar plano familiar:', err?.message)
    throw createSaveError('Não foi possível criar o Plano de Desenvolvimento Familiar. Tente novamente.', err)
  }
}

async function saveFolhaProsseguimento(draft, context) {
  const fp = draft.identificacao_fp ?? {}
  const demanda = draft.demanda_fp ?? {}
  try {
    const folha = await apiClient.post('/folhaprosseguimento', {
      prontuarioId: context.prontuarioId,
      numeroFolha: fp.numero_folha ? Number(fp.numero_folha) : 1,
      registrosIds: [],
      observacoes: demanda.demanda_orientacao || null,
      assinaturaTecnico: null,
      assinaturaOrientador: null,
    })
    await atualizaProntuario(context, 'folha', folha?.id)
    return { ...context, folhaId: folha?.id }
  } catch (err) {
    console.warn('Não foi possível salvar folha de prosseguimento:', err?.message)
    throw createSaveError('Não foi possível criar a folha de prosseguimento. Tente novamente.', err)
  }
}

// Apenas enums confirmados pelo Swagger. Outros são ignorados silenciosamente.
const AGRAVO_ENUM_MAP = {
  'Ausência de cuidador': 'AUSENCIA_DE_CUIDADOR',
}

async function savePdu(draft, context) {
  const user = getUser()
  const dadosPdu = draft.identificacao_pdu ?? {}
  const situacaoAp = draft.situacao_apresentada ?? {}
  const agravo = draft.situacoes_agravo ?? {}
  const situacoesEnum = toEnumArray(agravo.situacoes_agravo, AGRAVO_ENUM_MAP)
  try {
    const pdu = await apiClient.post('/pdu', {
      familiaId: context.familiaId,
      representanteId: null,
      tecnicoAcompanhamentoId: user?.userId ?? null,
      sinteseSituacaoApresentada: situacaoAp.sintese_situacao || null,
      situacoesAgravoIdentificadas: situacoesEnum,
      outrasSituacoesAgravo: agravo.outras_situacoes || null,
      acoesPrevencaoRiscoOuGarantiaAcessoIds: [],
      acoesPactuadasIds: [],
      acoesIntersetoriaisSocioassistenciaisIds: [],
      numeroPlano: dadosPdu.numero_plano || null,
      dataElaboracao: toIsoDateOrToday(dadosPdu.data_elaboracao),
      dataValidade: toIsoDate(dadosPdu.data_validade),
      dataReavaliacao: toIsoDate(dadosPdu.data_reavaliacao),
      sintesesPorAreaIds: [],
    })
    await atualizaProntuario(context, 'pdu', pdu?.id)
    return { ...context, pduId: pdu?.id }
  } catch (err) {
    console.warn('Não foi possível salvar PDU:', err?.message)
    throw createSaveError('Não foi possível criar o Plano de Desenvolvimento do Usuário. Tente novamente.', err)
  }
}

// Endpoint da Ficha de Atualização (Quadro Situacional).
// NOTE: o nome exato do endpoint e o contrato do DTO precisam ser confirmados
// contra o Swagger da API (o backend EC2 estava indisponível nesta sessão).
// Pela convenção dos demais controllers e pelo campo do prontuário
// `fichasAtualizacaoQuadroSituacionalIds`, o caminho provável é este.
const FICHA_ATUALIZACAO_ENDPOINT = '/fichaattquadro'

const toInt = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

// Constrói um objeto { chave: inteiro } apenas com as colunas informadas,
// evitando vazar a linha-template (índice 0) que o FormRenderer cria para
// seções do tipo tabela_quantidades.
const pickInts = (obj = {}, keys = []) =>
  keys.reduce((acc, key) => {
    acc[key] = toInt(obj[key])
    return acc
  }, {})

async function saveFichaAtualizacao(draft, context) {
  const user = getUser()
  const ident = draft.identificacao ?? {}
  const faixa = draft.faixa_etaria ?? {}
  const beneficios = draft.beneficios_situacao ?? {}
  const escolar = draft.situacao_escolar ?? {}
  const rede = draft.rede_socioassistencial ?? {}
  const saude = draft.saude ?? {}
  const vulnerabilidade = draft.vulnerabilidade_social ?? {}
  const obs = draft.observacoes_unas ?? {}

  try {
    // Payload montado a partir das seções do formulário. As tabelas de
    // quantidades são enviadas como inteiros. Ajustar nomes de campos quando
    // o DTO do backend for confirmado.
    const ficha = await apiClient.post(FICHA_ATUALIZACAO_ENDPOINT, {
      prontuarioId: context.prontuarioId,
      familiaId: context.familiaId,
      tecnicoResponsavelId: user?.userId ?? null,
      matricula: ident.matricula || null,
      rf: ident.rf || null,
      nis: ident.nis || null,
      cpf: ident.cpf || null,
      dataNascimentoResponsavel: toIsoDate(ident.data_nascimento_rf),
      faixaEtaria: {
        de0a5: toInt(faixa.faixa_0_5),
        de6a14: toInt(faixa.faixa_6_14),
        de15a17: toInt(faixa.faixa_15_17),
        de18a29: toInt(faixa.faixa_18_29),
        de30a59: toInt(faixa.faixa_30_59),
        de60mais: toInt(faixa.faixa_60_mais),
        numeroPcd: toInt(faixa.numero_pcd),
      },
      beneficios: {
        bpcIdoso: toInt(beneficios.bpc_idoso),
        bpcPcd: toInt(beneficios.bpc_pcd),
        bolsaFamilia: toInt(beneficios.bolsa_familia),
        condicionalidades: beneficios.condicionalidades || null,
        status: beneficios.status_beneficio || null,
      },
      situacaoEscolar: pickInts(escolar, [
        'aguardando_vaga_cei_emei', 'frequenta_cei', 'frequenta_emei',
        'fora_escola_6_17', 'aguardando_vaga_6_17', 'ens_fundamental',
        'ensino_medio', 'eja_mova', 'pcd_ed_especial', 'curso_superior',
      ]),
      redeSocioassistencial: pickInts(rede, ['cca', 'cj', 'cedesp', 'nci', 'naispd']),
      saude: {
        criancasVacinacaoAtualizada: toInt(saude.criancas_vacinacao_atualizada),
        mulheresGestantes: toInt(saude.mulheres_gestantes),
        gestantesComPreNatal: toInt(saude.gestantes_pre_natal),
      },
      vulnerabilidadeSocial: pickInts(vulnerabilidade, [
        'situacao_rua', 'trabalho_infantil', 'dependencia_alcool_drogas',
        'adolescente_mse_meio_aberto', 'adolescente_mse_internacao',
        'adultos_privacao_liberdade', 'crianca_adolescente_saica', 'idoso_acolhimento',
      ]),
      observacoes: obs.observacoes || null,
      tipoPlano: Array.isArray(obs.tipo_plano) ? obs.tipo_plano : [],
      dataRegistro: toIsoDateOrToday(obs.data_registro),
      tecnico: obs.tecnico || null,
      orientador: obs.orientador || null,
      responsavel: obs.responsavel || null,
    })
    await atualizaProntuario(context, 'atualizacao', ficha?.id)
    return { ...context, fichaAtualizacaoId: ficha?.id }
  } catch (err) {
    console.warn('Não foi possível salvar ficha de atualização:', err?.message)
    throw createSaveError('Não foi possível criar a ficha de atualização. Tente novamente.', err)
  }
}

// ─── Dispatcher principal ────────────────────────────────────────────────────

export async function saveFormStep(formId, draft, context = {}) {
  switch (formId) {
    case 'ficha_cadastral_familia':
      return saveFichaCadastralFamilia(draft, context)
    case 'ficha_cadastral_complementar':
      return saveFichaCadastralComplementar(draft, context)
    case 'termo_autorizacao_imagem':
      return saveTermo(draft, context)
    case 'plano_desenvolvimento_familiar':
      return savePlanoFamiliar(draft, context)
    case 'folha_prosseguimento':
      return saveFolhaProsseguimento(draft, context)
    case 'ficha_visita_domiciliar':
      return saveFichaVisita(draft, context)
    case 'plano_desenvolvimento_usuario':
      return savePdu(draft, context)
    case 'ficha_atualizacao_unas':
      return saveFichaAtualizacao(draft, context)
    default:
      console.info(`Formulário "${formId}" salvo localmente.`)
      return context
  }
}
