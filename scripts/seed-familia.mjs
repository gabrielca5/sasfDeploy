/**
 * Seed: cria uma família completa com todos os documentos vinculados.
 *
 * Uso:
 *   node scripts/seed-familia.mjs
 *   node scripts/seed-familia.mjs --base http://98.89.223.51
 */

const baseArg = process.argv.find(a => a.startsWith('--base='))
const BASE = baseArg ? baseArg.split('=').slice(1).join('=') : 'http://98.89.223.51'

const EMAIL = 'gabriel@unas.org.br'
const SENHA = 'Insper123!'

// ─── helpers ────────────────────────────────────────────────────────────────

function api(path, opts = {}) {
  return `${BASE}/api${path}`
}

async function req(path, method, body, token, attempt = 1) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(api(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!res.ok) {
    if (res.status === 500 && attempt < 4) {
      const wait = attempt * 800
      process.stdout.write(`  ↺ ${method} ${path} → 500, retry ${attempt}/3 em ${wait}ms...\n`)
      await new Promise(r => setTimeout(r, wait))
      return req(path, method, body, token, attempt + 1)
    }
    console.error(`  ✗ ${method} ${path} → ${res.status}`)
    console.error('  body:', JSON.stringify(data, null, 2))
    throw new Error(`${method} ${path} failed with ${res.status}`)
  }
  return data
}

const post = (path, body, token) => req(path, 'POST', body, token)
const put  = (path, body, token) => req(path, 'PUT',  body, token)
const get  = (path, token)       => req(path, 'GET',  null, token)

function today() {
  return new Date().toISOString().slice(0, 10)
}

function dateIn(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function log(msg) { console.log(`  ${msg}`) }

// ─── main ────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🌱  Seed — ${BASE}\n`)

  // 1. Login
  log('1. Login...')
  const auth = await post('/usuario/login', { email: EMAIL, senha: SENHA })
  const token = auth.token ?? auth.accessToken ?? auth.jwt ?? auth
  if (!token || typeof token !== 'string') {
    console.error('Não foi possível extrair o token. Resposta:', auth)
    process.exit(1)
  }
  log(`   token: ${token.slice(0, 40)}...`)

  // Extrair userId do JWT payload
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  const userId = payload.userId ?? payload.sub ?? null
  log(`   userId: ${userId}`)

  // 2. Endereço
  log('2. Criando endereço...')
  const endereco = await post('/endereco', {
    logradouro: 'Rua das Flores',
    numero: '123',
    complemento: 'Apto 4',
    bairro: 'Centro',
    cep: '01001-000',
    cidade: 'São Paulo',
    distrito: 'Sé',
    pontoReferencia: 'Próximo à praça',
  }, token)
  log(`   enderecoId: ${endereco.id}`)

  // 3. Representante
  log('3. Criando representante...')
  const representante = await post('/representante', {
    nome: 'Maria da Silva',
    dataNascimento: '1985-06-15',
    sexo: 'FEMININO',
    estadoCivil: 'SOLTEIRO',
    grauInstrucao: 'ENSINO_MEDIO_COMPLETO',
    ocupacao: 'EMPREGADO',
    corRaca: 'PARDA',
    possuiDeficiencia: false,
    renda: 1320.00,
    naturalidade: 'São Paulo',
    telefoneCelular: '11999998888',
    enderecoId: endereco.id,
  }, token)
  log(`   representanteId: ${representante.id}`)

  // 4. Família
  log('4. Criando família...')
  const familia = await post('/familia', {
    ativo: true,
    prioridade: 'MEDIA',
    ultimaVisita: today(),
    proximaVisita: dateIn(30),
    orientadorId: null,
    representanteId: representante.id,
    membrosIds: [],
    prontuarioId: null,
  }, token)
  log(`   familiaId: ${familia.id}`)

  // 5. Prontuário
  log('5. Criando prontuário...')
  const prontuario = await post('/prontuario', {
    familiaId: familia.id,
    fichaCadastralDaFamiliaId: null,
    fichasAtualizacaoQuadroSituacionalIds: [],
    planosDesenvolvimentoFamiliarIds: [],
    folhasProsseguimentoIds: [],
    planosDesenvolvimentoUsuarioIds: [],
  }, token)
  log(`   prontuarioId: ${prontuario.id}`)

  // 6. Ficha Cadastral
  log('6. Criando ficha cadastral...')
  const fichaCadastral = await post('/fichacadastral', {
    prontuarioId: prontuario.id,
    representanteId: representante.id,
    dataMatricula: today(),
    numeroMatricula: 'FC-2026-001',
    dataDesligamento: null,
    condicoesMoradia: 'ALUGADA',
    valorAluguelOuFinanciamento: 800.00,
    tipoConstrucao: 'ALVENARIA',
    situacaoHabitacional: 'OUTRO',
    outraSituacaoHabitacional: null,
    numeroComodos: 3,
    qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada: 0,
    qtdMulheresGestantesNaFamilia: 0,
    qtdGestantesComPreNatal: 0,
    programasTransferenciaRenda: [],
    outroProgramaTransferenciaRenda: null,
    beneficioPrestacaoContinuada: [],
    composicaoFamiliarIds: [],
    informacoesComplementaresCriancasAdolescentesIds: [],
  }, token)
  log(`   fichaCadastralId: ${fichaCadastral.id}`)

  // 7. Vincular ficha ao prontuário
  log('7. Vinculando ficha ao prontuário...')
  await put(`/prontuario/${prontuario.id}`, {
    familiaId: familia.id,
    fichaCadastralDaFamiliaId: fichaCadastral.id,
    fichasAtualizacaoQuadroSituacionalIds: [],
    planosDesenvolvimentoFamiliarIds: [],
    folhasProsseguimentoIds: [],
    planosDesenvolvimentoUsuarioIds: [],
  }, token)
  log('   OK')

  // 8. Termo de autorização de imagem
  log('8. Criando termo de autorização...')
  const termo = await post('/termo', {
    prontuarioId: prontuario.id,
    usuarioAutorizanteId: userId,
    numeroCedulaIdentidade: '12.345.678-9',
    cpf: '123.456.789-00',
    nomesCriancasAutorizadas: ['Lucas da Silva', 'Ana da Silva'],
    dataAssinatura: new Date().toISOString(),
  }, token)
  log(`   termoId: ${termo.id ?? '(sem id na resposta)'}`)

  // 9. Folha de Prosseguimento
  log('9. Criando folha de prosseguimento...')
  const folha = await post('/folhaprosseguimento', {
    prontuarioId: prontuario.id,
    numeroFolha: 1,
    registrosIds: [],
    observacoes: 'Família acompanhada regularmente. Situação estável.',
    assinaturaTecnico: null,
    assinaturaOrientador: null,
  }, token)
  log(`   folhaId: ${folha.id}`)

  // 10. Visita Domiciliar
  log('10. Criando visita domiciliar...')
  const visita = await post('/fichavisita', {
    prontuarioId: prontuario.id,
    orientadorResponsavelId: null,
    representanteVisitadoId: representante.id,
    dataVisita: new Date(`${today()}T10:00:00`).toISOString(),
    objetivoDaVisita: 'Verificar condições de moradia e bem-estar familiar.',
    pessoasFamiliaQueConversaram: 'Maria da Silva e filhos',
    demandasOrientacoesEncaminhamentos: 'Orientada sobre benefícios disponíveis.',
  }, token)
  log(`   visitaId: ${visita.id}`)

  // 11. Plano de Desenvolvimento Familiar (/pdf)
  log('11. Criando plano de desenvolvimento familiar...')
  const plano = await post('/pdf', {
    familiaId: familia.id,
    analiseDiagnostica: 'Família em situação de vulnerabilidade econômica com potencial de superação.',
    objetivo: 'Garantir acesso a renda, moradia digna e educação para os filhos.',
    composicaoFamiliar: 'Mãe solo com dois filhos menores.',
    moradia: 'Residência alugada em condições regulares.',
    saude: 'Todos os membros com acompanhamento básico de saúde.',
    educacao: 'Crianças matriculadas na escola pública.',
    renda: 'Renda mensal de R$ 1.320,00 (salário mínimo).',
    observacoes: 'Plano elaborado em parceria com a família.',
    numeroPlano: 'PDF-2026-001',
    dataElaboracao: today(),
    dataValidade: dateIn(365),
    dataReavaliacao: dateIn(180),
    itensPlanoIds: [],
    tecnicoReferenciaId: userId,
    assinaturaResponsavelFamilia: null,
  }, token)
  log(`   planoId: ${plano.id}`)

  // 12. Plano de Desenvolvimento do Usuário (/pdu)
  log('12. Criando PDU...')
  const pdu = await post('/pdu', {
    familiaId: familia.id,
    beneficiarioId: representante.id,
    tipoBeneficiario: 'IDOSO',
    representanteId: representante.id,
    cuidadorId: null,
    tecnicoAcompanhamentoId: userId,
    tecnicoReferenciaId: userId,
    sinteseSituacaoApresentada: 'Usuária idosa com necessidade de acompanhamento social.',
    situacoesAgravoIdentificadas: ['FRAGILIZACAO_DOS_VINCULOS_FAMILIARES'],
    outrasSituacoesAgravo: null,
    acoesPrevencaoRiscoOuGarantiaAcessoIds: [],
    acoesPactuadasIds: [],
    acoesIntersetoriaisSocioassistenciaisIds: [],
    sintesesPorAreaIds: [],
    numeroPlano: 'PDU-2026-001',
    dataElaboracao: today(),
    dataValidade: dateIn(365),
    dataReavaliacao: dateIn(180),
    assinaturaResponsavelFamilia: false,
    observacoes: 'PDU elaborado com participação da beneficiária.',
  }, token)
  log(`   pduId: ${pdu.id}`)

  // 13. Resumo
  console.log('\n✅  Família criada com sucesso!\n')
  console.log('  IDs criados:')
  console.log(`    familiaId:        ${familia.id}`)
  console.log(`    prontuarioId:     ${prontuario.id}`)
  console.log(`    fichaCadastralId: ${fichaCadastral.id}`)
  console.log(`    folhaId:          ${folha.id}`)
  console.log(`    visitaId:         ${visita.id}`)
  console.log(`    planoId:          ${plano.id}`)
  console.log(`    pduId:            ${pdu.id}`)
  console.log()
}

run().catch((err) => {
  console.error('\n❌  Erro:', err.message)
  process.exit(1)
})
