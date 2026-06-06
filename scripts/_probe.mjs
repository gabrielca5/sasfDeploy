const API = 'http://98.89.223.51/api'
let token
async function req(path, opts = {}) {
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.body ? { 'Content-Type': 'application/json' } : {}), ...opts.headers } })
  const text = await res.text()
  let data; try { data = text ? JSON.parse(text) : null } catch { data = text }
  return { status: res.status, data }
}
const login = await req('/usuario/login', { method: 'POST', body: JSON.stringify({ email: 'gabriel@unas.org.br', senha: 'Insper123!' }) })
token = login.data.token

// criar um representante real para usar o id
const end = await req('/endereco', { method: 'POST', body: JSON.stringify({ logradouro: 'Rua X', numero: '1', bairro: 'Heliópolis' }) })
const rep = await req('/representante', { method: 'POST', body: JSON.stringify({ nome: 'Rep Teste', cpf: '11122233344', enderecoId: end.data.id }) })
const repId = rep.data.id
console.log('representante', rep.status, repId)

async function mkProntuario() {
  const fam = await req('/familia', { method: 'POST', body: JSON.stringify({ ativo: true, prioridade: 'MEDIA' }) })
  const pr = await req('/prontuario', { method: 'POST', body: JSON.stringify({ familiaId: fam.data.id, fichasAtualizacaoQuadroSituacionalIds: [], planosDesenvolvimentoFamiliarIds: [], folhasProsseguimentoIds: [], planosDesenvolvimentoUsuarioIds: [] }) })
  return { famId: fam.data.id, prId: pr.data.id }
}

const tests = {
  comRepresentante: (p) => ({ prontuarioId: p, representanteId: repId, condicoesMoradia: 'ALUGADA', tipoConstrucao: 'ALVENARIA', situacaoHabitacional: 'FAVELA', numeroComodos: 3, programasTransferenciaRenda: ['BOLSA_FAMILIA'], beneficioPrestacaoContinuada: ['NAO_RECEBE'], composicaoFamiliarIds: [], informacoesComplementaresCriancasAdolescentesIds: [] }),
  comDataMatricula: (p) => ({ prontuarioId: p, condicoesMoradia: 'ALUGADA', dataMatricula: '2025-03-10', numeroMatricula: '1234', tipoConstrucao: 'ALVENARIA', situacaoHabitacional: 'FAVELA', numeroComodos: 3, programasTransferenciaRenda: ['BOLSA_FAMILIA'], beneficioPrestacaoContinuada: ['NAO_RECEBE'], composicaoFamiliarIds: [], informacoesComplementaresCriancasAdolescentesIds: [] }),
  comQtd: (p) => ({ prontuarioId: p, condicoesMoradia: 'ALUGADA', tipoConstrucao: 'ALVENARIA', situacaoHabitacional: 'FAVELA', numeroComodos: 3, qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada: 1, qtdMulheresGestantesNaFamilia: 0, qtdGestantesComPreNatal: 0, valorAluguelOuFinanciamento: 500, programasTransferenciaRenda: ['BOLSA_FAMILIA'], beneficioPrestacaoContinuada: ['NAO_RECEBE'], composicaoFamiliarIds: [], informacoesComplementaresCriancasAdolescentesIds: [] }),
  doisProgramas: (p) => ({ prontuarioId: p, condicoesMoradia: 'ALUGADA', tipoConstrucao: 'ALVENARIA', situacaoHabitacional: 'FAVELA', numeroComodos: 3, programasTransferenciaRenda: ['BOLSA_FAMILIA','RENDA_MINIMA'], beneficioPrestacaoContinuada: ['IDOSO'], composicaoFamiliarIds: [], informacoesComplementaresCriancasAdolescentesIds: [] }),
}
for (const [k, build] of Object.entries(tests)) {
  const { prId } = await mkProntuario()
  const r = await req('/fichacadastral', { method: 'POST', body: JSON.stringify(build(prId)) })
  console.log(k.padEnd(18), '->', r.status)
}
