/**
 * Script de browser (Playwright) — popula N famílias pelo fluxo REAL da UI atual.
 *
 * O fluxo "Abrir novo prontuário" hoje tem as etapas:
 *   Triagem → Termo de uso → Demanda → Plano → Impressão.
 * A família é criada no backend ao salvar a etapa **Demanda** (que dispara
 * ficha_cadastral_familia + complementar + termo, ver cadastroFamilia.service.js).
 * Por isso o script preenche Triagem, avança pelo Termo e salva a Demanda —
 * o suficiente para criar a pessoa/família. Roda num laço trocando o nome do
 * representante a cada volta, numa única sessão de navegador.
 *
 * Uso:
 *   node pw_popular_familias.cjs
 *
 * Env (opcionais):
 *   BASE_URL (default http://localhost:5173)
 *   SASF_EMAIL / SASF_SENHA (default gabriel@unas.org.br / Insper123!)
 *   QTD (default 20)
 *   HEADLESS "0" para ver o navegador (default headless)
 *   SLOWMO ms entre ações (default 0)
 */
const { chromium } = require('playwright')

const BASE = (process.env.BASE_URL || 'http://localhost:5173').replace(/\/$/, '')
const EMAIL = process.env.SASF_EMAIL || 'gabriel@unas.org.br'
const SENHA = process.env.SASF_SENHA || 'Insper123!'
const QTD = Number(process.env.QTD || 20)
const HEADLESS = process.env.HEADLESS !== '0'
const SLOWMO = Number(process.env.SLOWMO || 0)
const HOJE_ISO = new Date().toISOString().split('T')[0]

// ── 20 representantes (nome, sexo F/M, profissão, renda, naturalidade) ───────
const PESSOAS = [
  ['Maria das Graças Pereira', 'F', 'Diarista', '1200', 'Salvador/BA'],
  ['Antônio Carlos Ferreira', 'M', 'Pedreiro', '1800', 'São Paulo/SP'],
  ['Josefa Maria dos Santos', 'F', 'Costureira', '1000', 'Recife/PE'],
  ['Sebastião Rodrigues Lima', 'M', 'Vigilante', '2100', 'Teresina/PI'],
  ['Rita de Cássia Oliveira', 'F', 'Cuidadora de idosos', '1400', 'Fortaleza/CE'],
  ['João Batista de Souza', 'M', 'Motorista', '2300', 'São Paulo/SP'],
  ['Francisca Alves da Silva', 'F', 'Doméstica', '1100', 'Maceió/AL'],
  ['Raimundo Nonato Gomes', 'M', 'Ajudante geral', '1600', 'Teresina/PI'],
  ['Aparecida Conceição Dias', 'F', 'Manicure', '1300', 'São Paulo/SP'],
  ['Marcos Vinícius Cardoso', 'M', 'Eletricista', '2500', 'Salvador/BA'],
  ['Luzia Helena Barbosa', 'F', 'Auxiliar de limpeza', '1250', 'Recife/PE'],
  ['Carlos Eduardo Monteiro', 'M', 'Pintor', '1900', 'São Paulo/SP'],
  ['Vera Lúcia Nascimento', 'F', 'Cozinheira', '1350', 'Fortaleza/CE'],
  ['Paulo Sérgio Teixeira', 'M', 'Entregador', '1700', 'São Paulo/SP'],
  ['Sandra Regina Moreira', 'F', 'Recepcionista', '1500', 'Maceió/AL'],
  ['José Carlos da Cruz', 'M', 'Servente', '1550', 'Teresina/PI'],
  ['Cláudia Maria Ribeiro', 'F', 'Vendedora', '1450', 'Salvador/BA'],
  ['Anderson Luiz Carvalho', 'M', 'Ajudante de obras', '900', 'São Paulo/SP'],
  ['Tereza Cristina Almeida', 'F', 'Auxiliar de cozinha', '1150', 'Recife/PE'],
  ['Wesley Fernandes Rocha', 'M', 'Auxiliar de produção', '1750', 'São Paulo/SP'],
]

const failures = []
const apiErrors = []
function step(msg) { console.log(`  ▸ ${msg}`) }

// O formulário valida o dígito verificador do CPF ("CPF inválido." bloqueia o
// submit), então geramos um CPF realmente válido.
function gerarCpf() {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  const calc = (arr) => {
    let peso = arr.length + 1
    const soma = arr.reduce((acc, d) => acc + d * peso--, 0)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  const d1 = calc(n)
  const d2 = calc([...n, d1])
  return [...n, d1, d2].join('')
}

function makeHelpers(page) {
  async function fill(label, value, which = 'first') {
    try {
      const loc = page.getByLabel(label, { exact: true })
      const target = which === 'last' ? loc.last() : loc.first()
      await target.fill(String(value), { timeout: 6000 })
    } catch { /* campo ausente nesta etapa */ }
  }
  async function chooseRadio(optionLabel) {
    try { await page.getByRole('radio', { name: optionLabel, exact: true }).first().check({ timeout: 5000 }) } catch { /* */ }
  }
  async function selectOption(label, optionText) {
    try {
      let combo = page.getByRole('combobox', { name: label, exact: true })
      if (!(await combo.count())) combo = page.getByLabel(label, { exact: true }).first()
      await combo.click({ timeout: 5000 })
      await page.getByRole('option', { name: optionText, exact: true }).click({ timeout: 5000 })
    } catch { /* */ }
  }
  // Submete um FormRenderer: botão "Salvar" (type=submit) → diálogo de confirmação "Salvar".
  async function salvarFormRenderer({ esperaResposta = null } = {}) {
    const waitResp = esperaResposta
      ? page.waitForResponse(esperaResposta, { timeout: 30000 }).catch(() => null)
      : Promise.resolve(null)
    await page.locator('button[type="submit"]').first().click({ timeout: 8000 })
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible', timeout: 8000 })
    await dialog.getByRole('button', { name: 'Salvar', exact: true }).click({ timeout: 8000 })
    return waitResp
  }
  return { fill, chooseRadio, selectOption, salvarFormRenderer }
}

async function cadastrarFamilia(page, pessoa, i) {
  const [nome, sexo, profissao, renda, naturalidade] = pessoa
  const cpf = gerarCpf()
  const { fill, chooseRadio, selectOption, salvarFormRenderer } = makeHelpers(page)

  // Abrir novo prontuário
  await page.goto(`${BASE}/dashboard/cadastro`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Abrir prontuário', exact: true }).click({ timeout: 10000 })
  const dlg = page.getByRole('dialog')
  await dlg.waitFor({ state: 'visible', timeout: 8000 })
  await dlg.getByRole('button', { name: 'Iniciar prontuário', exact: true }).click({ timeout: 8000 })

  // ── Etapa 1: Triagem ──
  await page.getByLabel('Nome do Representante da Família', { exact: true })
    .waitFor({ state: 'visible', timeout: 15000 })
  await fill('Nome do Representante da Família', nome)
  await fill('CPF', cpf)
  await fill('RG', '12.345.678-9')
  await fill('Data de Nascimento', '1988-04-15')
  await selectOption('Cor/Raça', 'Parda')
  await fill('Naturalidade (Município/Estado)', naturalidade)
  await chooseRadio('Solteiro')
  await chooseRadio(sexo)
  await chooseRadio('Não') // pessoa com deficiência
  await fill('Data de Assinatura', HOJE_ISO)
  await salvarFormRenderer() // triagem só persiste rascunho e avança

  // ── Etapa 2: Termo de uso (componente próprio, sem save) → Continuar ──
  await page.getByRole('button', { name: 'Continuar', exact: true })
    .click({ timeout: 15000 })

  // ── Etapa 3: Demanda → ao salvar, cria a família no backend ──
  await page.getByLabel('Nome do Representante da Família', { exact: true })
    .waitFor({ state: 'visible', timeout: 15000 })
  // Campos vêm pré-preenchidos da triagem; complementamos alguns.
  await fill('Profissão', profissao, 'first')
  await fill('Renda (R$)', renda, 'first')
  await fill('Endereço', 'Rua da Mina')
  await fill('Nº', String(100 + i))
  await fill('Cidade', 'São Paulo')
  await fill('Bairro', 'Heliópolis')
  await fill('Distrito', 'Sacomã')
  const resp = await salvarFormRenderer({
    esperaResposta: (r) => r.url().includes('/api/familia') && r.request().method() === 'POST',
  })
  const criou = await resp
  if (!criou || !criou.ok()) {
    throw new Error(`POST /familia ${criou ? criou.status() : 'sem resposta'}`)
  }
  // pequena folga para os saves encadeados (membro/representante/ficha)
  await page.waitForTimeout(1500)
}

;(async () => {
  console.log(`\n=== Populando ${QTD} famílias pelo formulário (Playwright) ===`)
  console.log(`Base: ${BASE} | Login: ${EMAIL} | headless: ${HEADLESS}\n`)

  let browser
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: HEADLESS, slowMo: SLOWMO })
  } catch {
    browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO })
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  page.on('response', (res) => {
    if (res.url().includes('/api/') && res.status() >= 500) apiErrors.push(res.status())
  })

  // Login
  step('Login')
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.getByLabel('Email institucional', { exact: true }).fill(EMAIL)
    .catch(() => page.fill('input[type="email"]', EMAIL))
  await page.getByLabel('Senha', { exact: true }).fill(SENHA)
    .catch(() => page.fill('input[type="password"]', SENHA))
  await page.getByRole('button', { name: /Entrar/ }).click()
  await page.waitForURL(/\/dashboard/, { timeout: 15000 })
    .catch(() => { throw new Error('Login falhou — verifique credenciais (@unas.org.br)') })
  console.log('  ✓ Login OK\n')

  let ok = 0
  const lista = PESSOAS.slice(0, QTD)
  for (let i = 0; i < lista.length; i++) {
    const nome = lista[i][0]
    process.stdout.write(`[${i + 1}/${lista.length}] ${nome} ... `)
    try {
      await cadastrarFamilia(page, lista[i], i)
      ok++
      console.log('OK')
    } catch (e) {
      failures.push(`${nome}: ${e.message.split('\n')[0]}`)
      console.log(`FALHOU (${e.message.split('\n')[0].slice(0, 70)})`)
      await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' }).catch(() => {})
    }
  }

  console.log(`\n========== RESULTADO ==========`)
  console.log(`Famílias criadas: ${ok}/${lista.length}`)
  console.log(`Erros 5xx de API observados: ${apiErrors.length}`)
  if (failures.length) {
    console.log(`Falhas:`)
    failures.forEach((f) => console.log(`   ✗ ${f}`))
  }
  await browser.close()
  process.exit(ok === 0 ? 1 : 0)
})()
