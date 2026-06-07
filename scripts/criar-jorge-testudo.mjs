/**
 * Cria um registro de teste para "Jorge Testudo N" via API do SASF.
 * O N é determinado automaticamente somando 1 ao maior número existente.
 * Uso: node scripts/criar-jorge-testudo.mjs
 */

const API   = process.env.SASF_API_URL || 'http://98.89.223.51/api'
const EMAIL = process.env.SASF_EMAIL   || 'gabriel@unas.org.br'
const SENHA = process.env.SASF_SENHA   || 'Insper123!'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let token

async function req(path, opts = {}) {
  await sleep(150)
  for (let attempt = 1; attempt <= 4; attempt++) {
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
    if (res.ok) return data
    if (res.status < 500 || attempt === 4) {
      throw new Error(`${res.status} ${path} :: ${JSON.stringify(data)}`)
    }
    console.warn(`  ↻ retry ${attempt} em ${path} (${res.status})`)
    await sleep(300 * attempt)
  }
}

const post = (p, body) => req(p, { method: 'POST', body: JSON.stringify(body) })
const put  = (p, body) => req(p, { method: 'PUT',  body: JSON.stringify(body) })
const get  = (p)       => req(p, { method: 'GET' })
const del  = (p)       => req(p, { method: 'DELETE' })

async function nextJorgeNumber() {
  try {
    const data = await get('/representante?size=2000')
    const lista = Array.isArray(data) ? data : (data?.content ?? [])
    let max = 1
    for (const r of lista) {
      const m = r.nome?.match(/^Jorge Testudo\s*(\d+)?$/)
      if (m) {
        const n = m[1] ? Number(m[1]) : 1
        if (n >= max) max = n + 1
      }
    }
    return max
  } catch {
    return 2
  }
}

async function main() {
  console.log('🔐 Autenticando...')
  const auth = await post('/usuario/login', { email: EMAIL, senha: SENHA })
  token = auth.token ?? auth.accessToken ?? auth
  console.log('   OK')

  const n    = await nextJorgeNumber()
  const nome = `Jorge Testudo ${n}`
  const cpf  = String(98765432100 + n).padStart(11, '0')
  console.log(`\n📛 Nome: ${nome}`)

  const trash = []
  const track = (ep, obj) => { if (obj?.id) trash.push(`/${ep}/${obj.id}`); return obj }
  async function rollback() {
    console.log('\n⚠️  Rollback...')
    for (const path of [...trash].reverse()) {
      try { await del(path) } catch { /* best effort */ }
    }
  }

  try {
    // 1) Endereço
    console.log('\n📍 Endereço...')
    const endereco = track('endereco', await post('/endereco', {
      logradouro: 'Rua das Tartarugas',
      numero: String(40 + n),
      complemento: `Apto ${n}`,
      bairro: 'Heliópolis',
      cep: '04231-000',
      cidade: 'São Paulo',
      distrito: 'Sacomã',
      pontoReferencia: 'Próximo à UNAS',
    }))
    console.log(`   id: ${endereco.id}`)

    // 2) Representante
    console.log('👤 Representante...')
    const representante = track('representante', await post('/representante', {
      nome,
      dataNascimento: '1985-03-15',
      sexo: 'MASCULINO',
      nisNitNb: String(12345678901 + n).padStart(11, '0'),
      naturalidade: 'São Paulo/SP',
      corRaca: 'PARDA',
      possuiDeficiencia: false,
      cpf,
      rg: String(123456789 + n),
      orgaoEmissorRg: 'SSP',
      ufRg: 'SP',
      nomeMae: 'Maria Testudo',
      estadoCivil: 'SOLTEIRO',
      grauInstrucao: 'ENSINO_MEDIO_COMPLETO',
      profissao: 'Auxiliar de produção',
      ocupacao: 'EMPREGADO',
      renda: 1500,
      enderecoId: endereco.id,
      telefoneCelular: `11 99999-${String(n).padStart(4, '0')}`,
    }))
    console.log(`   id: ${representante.id}`)

    // 3) Família
    console.log('👨‍👩‍👦 Família...')
    const familia = track('familia', await post('/familia', {
      representanteId: representante.id,
      membrosIds: [],
      ativo: true,
      prioridade: 'MEDIA',
      ultimaVisita: '2026-05-10',
      proximaVisita: '2026-07-10',
    }))
    await get(`/familia/${familia.id}`)
    console.log(`   id: ${familia.id}`)

    // 4) Membro da composição familiar
    console.log('👥 Membro...')
    const membro = track('membro', await post('/membro', {
      numeroOrdem: 1,
      nome,
      dataNascimento: '1985-03-15',
      parentescoOuVinculo: 'Representante',
      profissao: 'Auxiliar de produção',
      ocupacao: 'Empregado(a)',
      renda: 1500,
      fatoresRiscoSocial: [],
      familiaId: familia.id,
    }))
    console.log(`   id: ${membro.id}`)

    // 5) Prontuário (sem vínculos por enquanto)
    console.log('📋 Prontuário...')
    const prontuario = track('prontuario', await post('/prontuario', {
      familiaId: familia.id,
      fichaCadastralDaFamiliaId: null,
      fichasAtualizacaoQuadroSituacionalIds: [],
      planosDesenvolvimentoFamiliarIds: [],
      folhasProsseguimentoIds: [],
      planosDesenvolvimentoUsuarioIds: [],
    }))
    console.log(`   id: ${prontuario.id}`)

    let fichaId = null
    const planoIds         = []
    const folhaIds         = []
    const pduIds           = []
    const fichaAtualizacaoIds = []

    // 6) Ficha cadastral
    console.log('📄 Ficha cadastral...')
    try {
      const ficha = track('fichacadastral', await post('/fichacadastral', {
        prontuarioId: prontuario.id,
        representanteId: representante.id,
        dataMatricula: '2026-05-10',
        numeroMatricula: String(4200 + n),
        condicoesMoradia: 'ALUGADA',
        valorAluguelOuFinanciamento: 800,
        tipoConstrucao: 'ALVENARIA',
        situacaoHabitacional: 'LOTEAMENTO_IRREGULAR',
        numeroComodos: 3,
        qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada: 0,
        qtdMulheresGestantesNaFamilia: 0,
        qtdGestantesComPreNatal: 0,
        programasTransferenciaRenda: ['BOLSA_FAMILIA'],
        beneficioPrestacaoContinuada: ['NAO_RECEBE'],
        composicaoFamiliarIds: [membro.id],
        informacoesComplementaresCriancasAdolescentesIds: [],
      }))
      fichaId = ficha.id
      console.log(`   id: ${fichaId}`)
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 7) Termo de autorização de uso de imagem
    console.log('📝 Termo de uso de imagem...')
    try {
      await post('/termo', {
        prontuarioId: prontuario.id,
        usuarioAutorizanteId: null,
        numeroCedulaIdentidade: String(123456789 + n),
        cpf,
        nomesCriancasAutorizadas: [],
        dataAssinatura: new Date('2026-05-10T12:00:00.000Z').toISOString(),
      })
      console.log('   OK')
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 8) Plano de Desenvolvimento Familiar
    console.log('📊 Plano de desenvolvimento familiar...')
    try {
      const plano = await post('/pdf', {
        familiaId: familia.id,
        analiseDiagnostica: 'Família em situação de vulnerabilidade socioeconômica, com histórico de desemprego e dificuldade de acesso a serviços básicos. Apresenta relações familiares preservadas e interesse na participação das atividades da UNAS.',
        objetivo: 'Promover acesso a programas de transferência de renda e qualificação profissional para o responsável familiar, visando à autonomia econômica.',
        numeroPlano: String(n).padStart(3, '0'),
        dataElaboracao: '2026-05-10',
        dataValidade: '2027-05-10',
        dataReavaliacao: '2026-11-10',
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
      if (plano?.id) { planoIds.push(plano.id); console.log(`   id: ${plano.id}`) }
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 9) Folha de prosseguimento
    console.log('📃 Folha de prosseguimento...')
    try {
      const folha = await post('/folhaprosseguimento', {
        prontuarioId: prontuario.id,
        numeroFolha: 1,
        registrosIds: [],
        observacoes: 'Família atendida na sede da UNAS. Foram discutidos encaminhamentos para programa de transferência de renda e matrícula escolar das crianças em idade escolar.',
        assinaturaTecnico: null,
        assinaturaOrientador: null,
      })
      if (folha?.id) { folhaIds.push(folha.id); console.log(`   id: ${folha.id}`) }
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 10) PDU — plano de desenvolvimento do usuário
    console.log('📈 PDU...')
    try {
      const pdu = await post('/pdu', {
        familiaId: familia.id,
        tipoBeneficiario: 'IDOSO',
        representanteId: null,
        tecnicoAcompanhamentoId: null,
        sinteseSituacaoApresentada: 'Usuário apresenta histórico de desemprego prolongado e dependência de programas de transferência de renda. Demonstra interesse em qualificação profissional e reinserção no mercado de trabalho local.',
        situacoesAgravoIdentificadas: [],
        outrasSituacoesAgravo: null,
        acoesPrevencaoRiscoOuGarantiaAcessoIds: [],
        acoesPactuadasIds: [],
        acoesIntersetoriaisSocioassistenciaisIds: [],
        numeroPlano: String(n).padStart(3, '0'),
        dataElaboracao: '2026-05-10',
        dataValidade: '2027-05-10',
        dataReavaliacao: '2026-11-10',
        sintesesPorAreaIds: [],
      })
      if (pdu?.id) { pduIds.push(pdu.id); console.log(`   id: ${pdu.id}`) }
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 11) Ficha de atualização do quadro situacional
    console.log('🗂️  Ficha de atualização...')
    try {
      const fichaAtt = await post('/fichaattquadro', {
        prontuarioId: prontuario.id,
        familiaId: familia.id,
        tecnicoResponsavelId: null,
        matricula: String(4200 + n),
        rf: null,
        nis: String(12345678901 + n).padStart(11, '0'),
        cpf,
        dataNascimentoResponsavel: '1985-03-15',
        faixaEtaria: {
          de0a5: 0, de6a14: 0, de15a17: 0,
          de18a29: 0, de30a59: 1, de60mais: 0,
          numeroPcd: 0,
        },
        beneficios: {
          bpcIdoso: 0, bpcPcd: 0, bolsaFamilia: 1,
          condicionalidades: null, status: 'ATIVO',
        },
        situacaoEscolar: {
          aguardando_vaga_cei_emei: 0, frequenta_cei: 0, frequenta_emei: 0,
          fora_escola_6_17: 0, aguardando_vaga_6_17: 0, ens_fundamental: 0,
          ensino_medio: 0, eja_mova: 0, pcd_ed_especial: 0, curso_superior: 0,
        },
        redeSocioassistencial: { cca: 0, cj: 0, cedesp: 0, nci: 0, naispd: 0 },
        saude: { criancasVacinacaoAtualizada: 0, mulheresGestantes: 0, gestantesComPreNatal: 0 },
        vulnerabilidadeSocial: {
          situacao_rua: 0, trabalho_infantil: 0, dependencia_alcool_drogas: 0,
          adolescente_mse_meio_aberto: 0, adolescente_mse_internacao: 0,
          adultos_privacao_liberdade: 0, crianca_adolescente_saica: 0,
          idoso_acolhimento: 0,
        },
        observacoes: 'Atendimento realizado para orientação sobre documentação necessária para acesso ao Bolsa Família.',
        tipoPlano: [],
        dataRegistro: '2026-05-10',
        tecnico: 'Ana Paula Martins',
        orientador: 'Orientador A — CRAS Heliópolis',
        responsavel: nome,
      })
      if (fichaAtt?.id) { fichaAtualizacaoIds.push(fichaAtt.id); console.log(`   id: ${fichaAtt.id}`) }
    } catch (e) {
      console.warn(`   (aviso) falhou: ${e.message}`)
    }

    // 12) Vincula todos os documentos ao prontuário
    console.log('🔗 Atualizando prontuário...')
    await put(`/prontuario/${prontuario.id}`, {
      familiaId: familia.id,
      fichaCadastralDaFamiliaId: fichaId,
      fichasAtualizacaoQuadroSituacionalIds: fichaAtualizacaoIds,
      planosDesenvolvimentoFamiliarIds: planoIds,
      folhasProsseguimentoIds: folhaIds,
      planosDesenvolvimentoUsuarioIds: pduIds,
    })
    console.log('   OK')

    // 13) Vincula membros e prontuário à família
    console.log('🔗 Atualizando família...')
    await put(`/familia/${familia.id}`, {
      representanteId: representante.id,
      membrosIds: [membro.id],
      prontuarioId: prontuario.id,
      ativo: true,
      prioridade: 'MEDIA',
      ultimaVisita: '2026-05-10',
      proximaVisita: '2026-07-10',
    })
    console.log('   OK')

    const cpfFmt = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    console.log(`\n✅ ${nome} criado com sucesso!`)
    console.log(`   CPF: ${cpfFmt}`)
    console.log(`   Endereço: Rua das Tartarugas, ${40 + n}, Apto ${n} — Heliópolis`)
    console.log(`   família:    ${familia.id}`)
    console.log(`   prontuário: ${prontuario.id}`)
    console.log(`   ficha:      ${fichaId ?? '(falhou)'}`)
    console.log(`   docs:  plano(${planoIds.length}) folha(${folhaIds.length}) pdu(${pduIds.length}) fichaAtt(${fichaAtualizacaoIds.length})`)

  } catch (err) {
    console.error('\n❌ Erro:', err.message)
    await rollback()
    process.exit(1)
  }
}

main()
