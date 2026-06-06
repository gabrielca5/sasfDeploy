/**
 * Seed de dados MVP para o SASF (UNAS / Heliópolis).
 *
 * Cria um conjunto coerente de orientadores, representantes (com endereço),
 * famílias, membros da composição familiar e prontuários — tudo via a própria
 * API (validações, enums e FKs respeitados).
 *
 * Uso:
 *   node scripts/seed-mvp.mjs            # limpa o banco e popula
 *   node scripts/seed-mvp.mjs --no-wipe  # só adiciona, sem apagar
 *   node scripts/seed-mvp.mjs --wipe-only
 *
 * Config por env (com defaults de teste):
 *   SASF_API_URL  (default http://98.89.223.51/api)
 *   SASF_EMAIL    (default gabriel@unas.org.br)
 *   SASF_SENHA    (default Insper123!)
 *   SASF_FAMILIAS (default 15)
 */

const API = process.env.SASF_API_URL || 'http://98.89.223.51/api'
const EMAIL = process.env.SASF_EMAIL || 'gabriel@unas.org.br'
const SENHA = process.env.SASF_SENHA || 'Insper123!'
const N_FAMILIAS = Number(process.env.SASF_FAMILIAS || 15)
const WIPE = !process.argv.includes('--no-wipe')
const WIPE_ONLY = process.argv.includes('--wipe-only')

// ---------------------------------------------------------------- HTTP -------
// O backend EC2 é instável sob carga: retorna 500 de forma intermitente em
// qualquer endpoint (não é payload — confirmado por probes). Mitigamos com um
// pequeno throttle entre chamadas + retry com backoff em erros 5xx.
let token
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const THROTTLE_MS = 150
const MAX_RETRY = 4

async function rawReq(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
      ...opts.headers,
    },
  })
  const text = await res.text()
  let data
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  return { status: res.status, ok: res.ok, data }
}

async function req(path, opts = {}) {
  await sleep(THROTTLE_MS)
  let last
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    last = await rawReq(path, opts)
    if (last.ok) return last.data
    // Só vale a pena repetir erros transitórios do servidor (5xx).
    if (last.status < 500 || attempt === MAX_RETRY) break
    await sleep(300 * attempt)
  }
  const err = new Error(`${last.status} ${path} :: ${typeof last.data === 'string' ? last.data : JSON.stringify(last.data)}`)
  err.status = last.status
  throw err
}
const get = (p) => req(p, { method: 'GET' })
const post = (p, body) => req(p, { method: 'POST', body: JSON.stringify(body) })
const put = (p, body) => req(p, { method: 'PUT', body: JSON.stringify(body) })
const del = (p) => req(p, { method: 'DELETE' })

function asArray(r) {
  if (Array.isArray(r)) return r
  if (Array.isArray(r?.content)) return r.content
  return []
}

// ------------------------------------------------------------ RNG seedado ----
let _seed = 20260605
function rnd() {
  _seed = (_seed * 1103515245 + 12345) & 0x7fffffff
  return _seed / 0x7fffffff
}
const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
const pickN = (arr, n) => {
  const copy = [...arr]
  const out = []
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(rnd() * copy.length), 1)[0])
  return out
}
const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
const chance = (p) => rnd() < p

// --------------------------------------------------------------- Pools -------
const SOBRENOMES = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Costa', 'Ferreira', 'Rodrigues', 'Almeida', 'Nascimento', 'Gomes', 'Ribeiro', 'Carvalho', 'Araújo', 'Barbosa', 'Cardoso', 'Rocha', 'Dias', 'Moreira', 'Cruz', 'Teixeira', 'Vieira', 'Monteiro', 'Mendes', 'Cavalcante', 'Lopes', 'Freitas']
const FEM = ['Maria', 'Ana', 'Francisca', 'Rita', 'Joana', 'Vera', 'Cláudia', 'Adriana', 'Sandra', 'Patrícia', 'Luciana', 'Fernanda', 'Juliana', 'Aparecida', 'Rosângela', 'Tereza', 'Marlene', 'Sônia', 'Edna', 'Cristiane', 'Débora', 'Simone', 'Antônia', 'Lúcia']
const MASC = ['José', 'João', 'Antônio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Luiz', 'Marcos', 'Rafael', 'Daniel', 'Marcelo', 'Eduardo', 'Sérgio', 'Roberto', 'Cláudio', 'Vagner', 'Anderson', 'Júlio', 'Severino', 'Raimundo']
const CRIANCAS = ['Miguel', 'Arthur', 'Heitor', 'Bernardo', 'Davi', 'Théo', 'Gael', 'Ravi', 'Helena', 'Alice', 'Laura', 'Maria Luiza', 'Sophia', 'Manuela', 'Valentina', 'Cecília', 'Isabela', 'Lorenzo', 'Enzo', 'Nicolas', 'Lara', 'Heloísa', 'Kauã', 'Emanuelly']

const RUAS = ['Rua da Mina', 'Rua Coronel Silva Castro', 'Estrada das Lágrimas', 'Rua São João Clímaco', 'Rua da Paz', 'Rua dos Cravos', 'Rua Embira', 'Rua Vai e Volta', 'Rua Pastor José Manoel', 'Rua Mugiana', 'Rua Cônego Aristides', 'Rua das Acácias', 'Beco do Macedônio', 'Rua Manuel Gaya']

const PROF_FEM = ['Diarista', 'Doméstica', 'Costureira', 'Cozinheira', 'Cuidadora de idosos', 'Auxiliar de limpeza', 'Manicure', 'Recepcionista', 'Auxiliar de cozinha', 'Vendedora']
const PROF_MASC = ['Pedreiro', 'Pintor', 'Motorista', 'Vigilante', 'Auxiliar de produção', 'Entregador', 'Ajudante geral', 'Eletricista', 'Servente', 'Catador de recicláveis']

// Backend valida fatoresRiscoSocial como enum (não texto livre) — ver FATOR_RISCO_MAP
// em cadastroFamilia.service.js. Usar apenas estes códigos.
const FATORES = ['DESEMPREGO', 'VIOLENCIA_DOMESTICA', 'ALCOOLISMO', 'DROGADICAO', 'PROBLEMAS_PSIQUIATRICOS', 'DEFICIENCIA_FISICA', 'SITUACAO_DE_RUA', 'OUTRO']

const COR_RACA = ['BRANCA', 'PRETA', 'PARDA', 'PARDA', 'PRETA', 'AMARELA', 'SEM_DECLARACAO']
const GRAU = ['ANALFABETO', 'ENSINO_FUNDAMENTAL_INCOMPLETO', 'ENSINO_FUNDAMENTAL_COMPLETO', 'ENSINO_MEDIO_INCOMPLETO', 'ENSINO_MEDIO_COMPLETO']
const ESTADO_CIVIL = ['SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO']

const CONDICAO_MORADIA = ['PROPRIA', 'ALUGADA', 'CEDIDA']
const TIPO_CONSTRUCAO = ['ALVENARIA', 'ALVENARIA', 'MADEIRA', 'MISTA']
const SITUACAO_HAB = ['FAVELA', 'FAVELA', 'CORTICO', 'LOTEAMENTO_IRREGULAR']
const PROGRAMAS_RENDA = ['BOLSA_FAMILIA', 'RENDA_MINIMA', 'RENDA_CIDADA', 'ACAO_JOVEM', 'PETI']
const BPC = ['IDOSO', 'PCD']

const TECNICOS = ['Ana Paula Martins', 'Ricardo Santos', 'Cláudia Ferreira', 'Marcos Oliveira', 'Patrícia Lima', 'Eduardo Costa']
const ORIENTADORES = ['Orientador A — CRAS Heliópolis', 'Orientador B — CRAS Sacomã', 'Orientador C — CRAS São João Clímaco']

const ANALISES_DIAGNOSTICAS = [
  'Família em situação de vulnerabilidade socioeconômica, com histórico de desemprego e dificuldade de acesso a serviços básicos. Apresenta relações familiares preservadas e interesse na participação das atividades da UNAS.',
  'Família monoparental chefiada por mulher, com filhos menores em idade escolar. Situação de instabilidade habitacional e renda insuficiente para suprir necessidades básicas. Boa receptividade ao atendimento técnico.',
  'Família com presença de idoso dependente e renda proveniente exclusivamente de aposentadoria. Necessidade de suporte para acesso a benefícios e acompanhamento de saúde da pessoa idosa.',
  'Família em situação de vulnerabilidade decorrente de violência doméstica. Representante em processo de reorganização da vida e superação das situações de risco. Demanda suporte psicossocial e jurídico.',
  'Família migrante com dificuldades de inserção no mercado de trabalho local. Crianças em acompanhamento escolar. Necessidade de orientação para acesso a documentação e benefícios sociais.',
  'Família com histórico de dependência química. Representante em acompanhamento no CAPS. Crianças sob guarda dos avós. Situação habitacional precária em área de favela com risco de deslizamento.',
  'Família com membros em situação de deficiência física, sem acesso ao BPC. Renda informal e irregular. Necessidade urgente de encaminhamento para serviços de saúde e reabilitação.',
  'Família numerosa com renda per capita abaixo do mínimo. Crianças em situação de risco nutricional. Participação em programa Bolsa Família, porém com condicionalidades em risco por falta de acompanhamento.',
]

const OBJETIVOS_PLANO = [
  'Promover acesso a programas de transferência de renda e qualificação profissional para o responsável familiar, visando à autonomia econômica.',
  'Fortalecer vínculos familiares e comunitários, garantindo acompanhamento periódico pelo CRAS e participação em grupos socioeducativos.',
  'Assegurar acesso a benefícios socioassistenciaisdevidos e acompanhamento integral das crianças em idade escolar e pré-escolar.',
  'Acompanhar o processo de superação da situação de violência doméstica, articulando rede de proteção e garantindo acesso a serviços especializados.',
  'Apoiar a inserção laboral do responsável familiar por meio de encaminhamentos para cursos de qualificação e intermediação de emprego.',
  'Garantir o acesso da pessoa idosa dependente aos serviços de saúde, benefícios e atividades de convivência adequadas à sua condição.',
  'Monitorar as condicionalidades do Programa Bolsa Família, orientando a família sobre frequência escolar e acompanhamento de saúde.',
]

const SINTESES_PDU = [
  'Usuário apresenta histórico de desemprego prolongado e dependência de programas de transferência de renda. Demonstra interesse em qualificação profissional e reinserção no mercado de trabalho local.',
  'Usuária em situação de vulnerabilidade decorrente de violência doméstica. Em processo de superação, necessitando de suporte psicossocial contínuo e acesso à rede de proteção especializada.',
  'Usuário com histórico de dependência química em fase de recuperação. Participa regularmente do CAPS. Necessita de apoio para retomada de vínculos familiares e inserção laboral gradual.',
  'Usuária idosa com limitações físicas e dependência de cuidador informal. Não acessa o BPC. Necessita de orientação jurídica e encaminhamentos para serviços de saúde e reabilitação.',
  'Usuário egresso do sistema prisional em processo de reintegração social. Enfrenta dificuldades de empregabilidade e retomada de vínculos familiares. Demanda acompanhamento intensivo.',
  'Usuária com filhos menores sob risco de trabalho infantil. Renda familiar insuficiente. Demanda ações de proteção às crianças e orientação sobre direitos e benefícios disponíveis.',
]

const OBSERVACOES_FOLHA = [
  'Família atendida na sede da UNAS. Foram discutidos encaminhamentos para programa de transferência de renda e matrícula escolar das crianças em idade escolar.',
  'Visita domiciliar realizada conforme agendamento. Família apresenta estabilidade relativa, mantendo rotina e participação nas atividades comunitárias ofertadas.',
  'Atendimento realizado para orientação sobre documentação necessária para acesso ao Bolsa Família. Representante encaminhada ao CRAS para abertura de cadastro.',
  'Reunião de acompanhamento do Plano de Desenvolvimento Familiar. Metas parcialmente cumpridas. Próximo atendimento agendado para 30 dias.',
  'Atendimento de urgência solicitado pela família. Situação de conflito familiar identificada. Encaminhamento para serviço especializado de mediação e apoio psicossocial realizado.',
  'Família participou de grupo socioeducativo sobre violência doméstica. Representante demonstrou interesse em dar continuidade ao processo de acompanhamento.',
]

// --------------------------------------------------------------- Utils -------
function cpf() {
  let s = ''
  for (let i = 0; i < 11; i++) s += int(0, 9)
  return s
}
function dateISO(yearsAgoMin, yearsAgoMax) {
  const now = new Date('2026-06-05')
  const d = new Date(now)
  d.setFullYear(now.getFullYear() - int(yearsAgoMin, yearsAgoMax))
  d.setMonth(int(0, 11))
  d.setDate(int(1, 28))
  return d.toISOString().slice(0, 10)
}
function dateBetween(startISO, endISO) {
  const a = new Date(startISO).getTime()
  const b = new Date(endISO).getTime()
  return new Date(a + rnd() * (b - a)).toISOString().slice(0, 10)
}
function ageIn2026(dataNasc) {
  return 2026 - new Date(dataNasc).getFullYear()
}

// --------------------------------------------------------------- Wipe --------
async function wipe() {
  // Sem cascade no backend: apaga cada entidade. Ordem dos filhos -> pais.
  const ordem = [
    'membro', 'fichavisita', 'termo', 'folhaprosseguimento', 'pdu',
    'pdf', 'fichaattquadro', 'fichacadastral', 'prontuario',
    'familia', 'representante', 'endereco', 'orientador',
  ]
  for (const ent of ordem) {
    let itens
    try { itens = asArray(await get(`/${ent}?size=2000`)) } catch { itens = [] }
    let ok = 0, fail = 0
    for (const it of itens) {
      try { await del(`/${ent}/${it.id}`); ok++ } catch { fail++ }
    }
    if (ok || fail) console.log(`  wipe ${ent}: ${ok} apagados${fail ? `, ${fail} falhas` : ''}`)
  }
}

// Nota: o endpoint /orientador está quebrado no backend (500) e o app real
// nunca o usa — na listagem o "orientador" exibido é derivado por hash do id
// da família (ver getOrientadorInfo em FamiliasPage.jsx). Por isso o seed não
// cria orientadores nem preenche familia.orientadorId, espelhando o fluxo de
// cadastro real (cadastroFamilia.service.js).

// --------------------------------------------------------- Família + cia -----
async function criarFamilia(idx) {
  const sobrenome = pick(SOBRENOMES)
  const chefeFem = chance(0.7) // maioria chefiada por mulheres (perfil SASF)
  const chefeNome = `${chefeFem ? pick(FEM) : pick(MASC)} ${sobrenome}`
  const chefeIdade = int(28, 58)
  const ocupacaoChefe = pick(['EMPREGADO', 'DESEMPREGADO', 'DESEMPREGADO', 'OUTRO', 'APOSENTADO'])
  const rendaChefe = ocupacaoChefe === 'DESEMPREGADO' ? int(0, 600)
    : ocupacaoChefe === 'APOSENTADO' ? 1412
    : int(900, 2200)

  // Valores gerados antes dos POSTs para reutilizar em documentos posteriores
  const chefeCpf = cpf()
  const chefeRg = String(int(100000000, 499999999))
  const chefeNascimento = dateISO(chefeIdade, chefeIdade)

  // Rastreia tudo que foi criado para conseguir desfazer um cadastro parcial
  // caso algum passo falhe de vez (após os retries) — evita órfãos no banco.
  const trash = []
  const track = (ep, obj) => { if (obj?.id) trash.push(`/${ep}/${obj.id}`); return obj }
  async function rollback() {
    for (const path of trash.reverse()) { try { await del(path) } catch { /* best effort */ } }
  }

  try {
  // 1) endereço
  const endereco = track('endereco', await post('/endereco', {
    logradouro: pick(RUAS),
    numero: String(int(1, 980)),
    complemento: chance(0.4) ? `Casa ${int(1, 4)}` : null,
    bairro: 'Heliópolis',
    cep: `0423${int(1, 9)}-${String(int(0, 999)).padStart(3, '0')}`,
    cidade: 'São Paulo',
    distrito: 'Sacomã',
    pontoReferencia: chance(0.3) ? 'Próximo à UNAS' : null,
  }))

  // 2) representante (chefe da família)
  const representante = track('representante', await post('/representante', {
    nome: chefeNome,
    dataNascimento: chefeNascimento,
    sexo: chefeFem ? 'FEMININO' : 'MASCULINO',
    nisNitNb: String(int(10000000000, 99999999999)),
    naturalidade: pick(['São Paulo/SP', 'Salvador/BA', 'Recife/PE', 'Fortaleza/CE', 'Maceió/AL', 'Teresina/PI']),
    corRaca: pick(COR_RACA),
    possuiDeficiencia: chance(0.12),
    cpf: chefeCpf,
    rg: chefeRg,
    orgaoEmissorRg: 'SSP',
    ufRg: 'SP',
    nomeMae: `${pick(FEM)} ${pick(SOBRENOMES)}`,
    estadoCivil: pick(ESTADO_CIVIL),
    grauInstrucao: pick(GRAU),
    profissao: chefeFem ? pick(PROF_FEM) : pick(PROF_MASC),
    ocupacao: ocupacaoChefe,
    renda: rendaChefe,
    enderecoId: endereco.id,
    telefoneCelular: `11 9${int(4000, 9999)}-${int(1000, 9999)}`,
  }))

  // 3) família
  const prioridade = pick(['ALTA', 'ALTA', 'MEDIA', 'MEDIA', 'BAIXA'])
  const familia = track('familia', await post('/familia', {
    representanteId: representante.id,
    membrosIds: [],
    ativo: chance(0.85),
    prioridade,
    ultimaVisita: dateBetween('2026-03-01', '2026-05-30'),
    proximaVisita: dateBetween('2026-06-10', '2026-08-20'),
  }))
  // Confirma que a família persistiu (o backend às vezes responde 200 sem gravar).
  await get(`/familia/${familia.id}`)

  // 4) membros da composição familiar (inclui o chefe como Representante)
  const membros = []
  let ordem = 1
  membros.push({
    numeroOrdem: ordem++,
    nome: chefeNome,
    dataNascimento: representante.dataNascimento ?? chefeNascimento,
    parentescoOuVinculo: 'Representante',
    profissao: representante.profissao,
    ocupacao: ocupacaoChefe === 'DESEMPREGADO' ? 'Desempregado(a)' : ocupacaoChefe === 'APOSENTADO' ? 'Aposentado(a)' : 'Empregado(a)',
    renda: rendaChefe,
    fatoresRiscoSocial: pickN(FATORES, int(1, 3)),
    familiaId: familia.id,
  })

  // cônjuge (parte das famílias)
  if (chance(0.45)) {
    const conjFem = !chefeFem
    membros.push({
      numeroOrdem: ordem++,
      nome: `${conjFem ? pick(FEM) : pick(MASC)} ${sobrenome}`,
      dataNascimento: dateISO(chefeIdade - 4, chefeIdade + 6),
      parentescoOuVinculo: 'Cônjuge/Companheiro(a)',
      profissao: conjFem ? pick(PROF_FEM) : pick(PROF_MASC),
      ocupacao: pick(['Empregado(a)', 'Trabalho informal', 'Desempregado(a)']),
      renda: chance(0.5) ? int(0, 1500) : 0,
      fatoresRiscoSocial: pickN(FATORES, int(0, 2)),
      familiaId: familia.id,
    })
  }

  // filhos
  const nFilhos = int(1, 4)
  for (let i = 0; i < nFilhos; i++) {
    const idade = int(0, 19)
    membros.push({
      numeroOrdem: ordem++,
      nome: `${pick(CRIANCAS)} ${sobrenome}`,
      dataNascimento: dateISO(idade, idade),
      parentescoOuVinculo: pick(['Filho(a)', 'Filho(a)', 'Enteado(a)']),
      profissao: idade >= 16 ? pick([...PROF_FEM, ...PROF_MASC, 'Estudante']) : 'Estudante',
      ocupacao: idade >= 16 ? pick(['Estudante', 'Trabalho informal', 'Desempregado(a)']) : 'Estudante',
      renda: 0,
      fatoresRiscoSocial: idade < 18 && chance(0.25) ? ['TRABALHO_INFANTIL'] : [],
      familiaId: familia.id,
    })
  }

  // idoso dependente em algumas famílias
  if (chance(0.2)) {
    const fem = chance(0.6)
    membros.push({
      numeroOrdem: ordem++,
      nome: `${fem ? pick(FEM) : pick(MASC)} ${pick(SOBRENOMES)}`,
      dataNascimento: dateISO(66, 84),
      parentescoOuVinculo: pick(['Mãe', 'Pai', 'Sogro(a)', 'Avó/Avô']),
      profissao: 'Aposentado(a)',
      ocupacao: 'Aposentado(a)',
      renda: 1412,
      fatoresRiscoSocial: chance(0.4) ? ['DEFICIENCIA_FISICA'] : [],
      familiaId: familia.id,
    })
  }

  const membrosCriados = []
  for (const m of membros) membrosCriados.push(track('membro', await post('/membro', m)))
  const nCriancas = membros.filter((m) => /Filho|Enteado/.test(m.parentescoOuVinculo)).length

  // 5) prontuário vinculado
  const prontuario = track('prontuario', await post('/prontuario', {
    familiaId: familia.id,
    fichaCadastralDaFamiliaId: null,
    fichasAtualizacaoQuadroSituacionalIds: [],
    planosDesenvolvimentoFamiliarIds: [],
    folhasProsseguimentoIds: [],
    planosDesenvolvimentoUsuarioIds: [],
  }))

  // Estado acumulado dos IDs para o PUT final do prontuário
  let fichaId = null
  const planoIds = []
  const folhaIds = []
  const pduIds = []
  const fichaAtualizacaoIds = []
  const docsOk = []

  // 6) ficha cadastral da família
  //    /fichacadastral é instável no backend (500 intermitente) — tratamos sem abortar.
  try {
    const ficha = track('fichacadastral', await post('/fichacadastral', {
      prontuarioId: prontuario.id,
      representanteId: representante.id,
      dataMatricula: dateBetween('2024-06-01', '2026-04-01'),
      numeroMatricula: String(int(1000, 9999)),
      condicoesMoradia: pick(CONDICAO_MORADIA),
      valorAluguelOuFinanciamento: chance(0.4) ? int(300, 900) : 0,
      tipoConstrucao: pick(TIPO_CONSTRUCAO),
      situacaoHabitacional: pick(SITUACAO_HAB),
      numeroComodos: int(1, 5),
      qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada: Math.min(nCriancas, int(0, 2)),
      qtdMulheresGestantesNaFamilia: chance(0.1) ? 1 : 0,
      qtdGestantesComPreNatal: 0,
      programasTransferenciaRenda: chance(0.7) ? pickN(PROGRAMAS_RENDA, int(1, 2)) : ['NAO_RECEBE'],
      beneficioPrestacaoContinuada: chance(0.2) ? [pick(BPC)] : ['NAO_RECEBE'],
      composicaoFamiliarIds: membrosCriados.map((m) => m.id),
      informacoesComplementaresCriancasAdolescentesIds: [],
    }))
    fichaId = ficha.id
    docsOk.push('ficha')
  } catch (e) {
    console.warn(`    (aviso) ficha cadastral falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 7) termo de autorização de imagem
  try {
    const criancaNomes = membros
      .filter((m) => /Filho|Enteado/.test(m.parentescoOuVinculo) && ageIn2026(m.dataNascimento) < 18)
      .map((m) => m.nome)
    await post('/termo', {
      prontuarioId: prontuario.id,
      usuarioAutorizanteId: null,
      numeroCedulaIdentidade: chefeRg,
      cpf: chefeCpf,
      nomesCriancasAutorizadas: criancaNomes,
      dataAssinatura: new Date(`${dateBetween('2024-06-01', '2026-04-01')}T12:00:00.000Z`).toISOString(),
    })
    docsOk.push('termo')
  } catch (e) {
    console.warn(`    (aviso) termo falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 8) plano de desenvolvimento familiar (POST /pdf)
  try {
    const dataElab = dateBetween('2024-06-01', '2026-03-01')
    const plano = await post('/pdf', {
      familiaId: familia.id,
      analiseDiagnostica: pick(ANALISES_DIAGNOSTICAS),
      objetivo: pick(OBJETIVOS_PLANO),
      numeroPlano: String(int(1, 99)).padStart(3, '0'),
      dataElaboracao: dataElab,
      dataValidade: dateBetween('2026-06-01', '2027-06-01'),
      dataReavaliacao: dateBetween('2026-06-01', '2026-12-01'),
      composicaoFamiliar: null,
      moradia: null,
      saude: null,
      educacao: null,
      renda: null,
      observacoes: null,
      itensPlanoIds: [],
      assinaturaResponsavelFamilia: null,
      tecnicoReferenciaId: null,
    })
    if (plano?.id) { planoIds.push(plano.id); docsOk.push('plano') }
  } catch (e) {
    console.warn(`    (aviso) plano familiar falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 9) folha de prosseguimento
  try {
    const folha = await post('/folhaprosseguimento', {
      prontuarioId: prontuario.id,
      numeroFolha: 1,
      registrosIds: [],
      observacoes: pick(OBSERVACOES_FOLHA),
      assinaturaTecnico: null,
      assinaturaOrientador: null,
    })
    if (folha?.id) { folhaIds.push(folha.id); docsOk.push('folha') }
  } catch (e) {
    console.warn(`    (aviso) folha prosseguimento falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 10) PDU — plano de desenvolvimento do usuário
  try {
    const pdu = await post('/pdu', {
      familiaId: familia.id,
      representanteId: null,
      tecnicoAcompanhamentoId: null,
      sinteseSituacaoApresentada: pick(SINTESES_PDU),
      situacoesAgravoIdentificadas: [],
      outrasSituacoesAgravo: null,
      acoesPrevencaoRiscoOuGarantiaAcessoIds: [],
      acoesPactuadasIds: [],
      acoesIntersetoriaisSocioassistenciaisIds: [],
      numeroPlano: String(int(1, 99)).padStart(3, '0'),
      dataElaboracao: dateBetween('2024-06-01', '2026-03-01'),
      dataValidade: dateBetween('2026-06-01', '2027-06-01'),
      dataReavaliacao: dateBetween('2026-06-01', '2026-12-01'),
      sintesesPorAreaIds: [],
    })
    if (pdu?.id) { pduIds.push(pdu.id); docsOk.push('pdu') }
  } catch (e) {
    console.warn(`    (aviso) PDU falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 11) ficha de atualização do quadro situacional
  try {
    const fichaAtt = await post('/fichaattquadro', {
      prontuarioId: prontuario.id,
      familiaId: familia.id,
      tecnicoResponsavelId: null,
      matricula: String(int(1000, 9999)),
      rf: null,
      nis: representante.nisNitNb ?? String(int(10000000000, 99999999999)),
      cpf: chefeCpf,
      dataNascimentoResponsavel: chefeNascimento,
      faixaEtaria: {
        de0a5:   membros.filter(m => { const a = ageIn2026(m.dataNascimento); return a >= 0 && a <= 5   }).length,
        de6a14:  membros.filter(m => { const a = ageIn2026(m.dataNascimento); return a >= 6 && a <= 14  }).length,
        de15a17: membros.filter(m => { const a = ageIn2026(m.dataNascimento); return a >= 15 && a <= 17 }).length,
        de18a29: membros.filter(m => { const a = ageIn2026(m.dataNascimento); return a >= 18 && a <= 29 }).length,
        de30a59: membros.filter(m => { const a = ageIn2026(m.dataNascimento); return a >= 30 && a <= 59 }).length,
        de60mais: membros.filter(m => ageIn2026(m.dataNascimento) >= 60).length,
        numeroPcd: membros.filter(m => m.fatoresRiscoSocial?.some(f => f.includes('DEFICIENCIA'))).length,
      },
      beneficios: {
        bpcIdoso: chance(0.15) ? 1 : 0,
        bpcPcd: chance(0.1) ? 1 : 0,
        bolsaFamilia: chance(0.6) ? 1 : 0,
        condicionalidades: null,
        status: pick(['ATIVO', 'SUSPENSO', null]),
      },
      situacaoEscolar: {
        aguardando_vaga_cei_emei: 0,
        frequenta_cei: int(0, 1),
        frequenta_emei: int(0, 1),
        fora_escola_6_17: 0,
        aguardando_vaga_6_17: 0,
        ens_fundamental: int(0, 2),
        ensino_medio: int(0, 1),
        eja_mova: 0,
        pcd_ed_especial: 0,
        curso_superior: 0,
      },
      redeSocioassistencial: { cca: int(0, 1), cj: 0, cedesp: 0, nci: 0, naispd: 0 },
      saude: {
        criancasVacinacaoAtualizada: Math.min(nCriancas, int(0, 2)),
        mulheresGestantes: chance(0.1) ? 1 : 0,
        gestantesComPreNatal: 0,
      },
      vulnerabilidadeSocial: {
        situacao_rua: 0,
        trabalho_infantil: membros.some(m => m.fatoresRiscoSocial?.includes('TRABALHO_INFANTIL')) ? 1 : 0,
        dependencia_alcool_drogas: membros.some(m => m.fatoresRiscoSocial?.some(f => ['ALCOOLISMO', 'DROGADICAO'].includes(f))) ? 1 : 0,
        adolescente_mse_meio_aberto: 0,
        adolescente_mse_internacao: 0,
        adultos_privacao_liberdade: 0,
        crianca_adolescente_saica: 0,
        idoso_acolhimento: 0,
      },
      observacoes: pick(OBSERVACOES_FOLHA),
      tipoPlano: [],
      dataRegistro: dateBetween('2024-06-01', '2026-05-01'),
      tecnico: pick(TECNICOS),
      orientador: pick(ORIENTADORES),
      responsavel: chefeNome,
    })
    if (fichaAtt?.id) { fichaAtualizacaoIds.push(fichaAtt.id); docsOk.push('fichaAtt') }
  } catch (e) {
    console.warn(`    (aviso) fichaAttQuadro falhou p/ ${chefeNome}: ${e.status ?? ''}`)
  }

  // 12) vincula todos os documentos ao prontuário em um único PUT
  await put(`/prontuario/${prontuario.id}`, {
    familiaId: familia.id,
    fichaCadastralDaFamiliaId: fichaId,
    fichasAtualizacaoQuadroSituacionalIds: fichaAtualizacaoIds,
    planosDesenvolvimentoFamiliarIds: planoIds,
    folhasProsseguimentoIds: folhaIds,
    planosDesenvolvimentoUsuarioIds: pduIds,
  })

  // 13) fecha o vínculo: membros/prontuário na família
  await put(`/familia/${familia.id}`, {
    representanteId: representante.id,
    membrosIds: membrosCriados.map((m) => m.id),
    prontuarioId: prontuario.id,
    ativo: familia.ativo,
    prioridade,
    ultimaVisita: familia.ultimaVisita,
    proximaVisita: familia.proximaVisita,
  })

  console.log(`  [${idx + 1}/${N_FAMILIAS}] ${chefeNome} — ${membrosCriados.length} membros, prioridade ${prioridade}, docs: [${docsOk.join(', ')}]`)
  } catch (e) {
    console.warn(`    (falha) ${chefeNome}: ${e.message?.slice(0, 80)} — desfazendo parcial`)
    await rollback()
    throw e
  }
}

// --------------------------------------------------------------- Main --------
async function main() {
  console.log(`API: ${API}`)
  const login = await post('/usuario/login', { email: EMAIL, senha: SENHA })
  token = login.token
  console.log('Login OK')

  if (WIPE || WIPE_ONLY) {
    console.log('Limpando dados existentes...')
    await wipe()
  }
  if (WIPE_ONLY) { console.log('Concluído (wipe-only).'); return }

  console.log(`Criando ${N_FAMILIAS} famílias...`)
  let sucessos = 0
  const maxTentativas = N_FAMILIAS * 2
  for (let tentativa = 0; sucessos < N_FAMILIAS && tentativa < maxTentativas; tentativa++) {
    try {
      await criarFamilia(sucessos)
      sucessos++
    } catch {
      // criarFamilia já desfez o parcial; tenta a próxima
    }
  }
  if (sucessos < N_FAMILIAS) console.warn(`Atenção: só ${sucessos}/${N_FAMILIAS} famílias criadas (backend instável).`)

  // resumo
  console.log('\nResumo final:')
  for (const e of ['familia', 'representante', 'membro', 'prontuario', 'fichacadastral', 'pdf', 'folhaprosseguimento', 'pdu', 'fichaattquadro', 'termo', 'endereco']) {
    try {
      console.log(`  ${e}: ${asArray(await get(`/${e}?size=2000`)).length}`)
    } catch {
      console.log(`  ${e}: (endpoint sem listagem)`)
    }
  }
  console.log('Seed concluído.')
}

main().catch((e) => { console.error('FALHA:', e.message); process.exit(1) })
