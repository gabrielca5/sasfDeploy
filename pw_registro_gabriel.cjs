/**
 * Script de browser (Playwright) — fluxo COMPLETO de novo registro de família.
 *
 * O que faz:
 *   1. Abre o Chrome em http://localhost:5173 e faz login
 *      (gabriel@gmail.com / insper123).
 *   2. Clica em "Novo Registro" na navegação lateral.
 *   3. Clica em "Abrir novo prontuário" → "Continuar" (Ficha Cadastral).
 *   4. Preenche e salva TODAS as 7 fichas do fluxo de cadastro, usando
 *      "GABRIEL TESTE" como nome do representante da família.
 *   5. Confere a família recém-criada na listagem (/dashboard/familias).
 *
 * Uso:
 *   node pw_registro_gabriel.js
 *
 * Variáveis de ambiente (opcionais):
 *   BASE_URL     URL do front (default http://localhost:5173)
 *   SASF_EMAIL   email de login (default gabriel@gmail.com)
 *   SASF_SENHA   senha de login (default insper123)
 *   HEADLESS     "1" para rodar sem janela (default mostra o navegador)
 *   SLOWMO       ms de atraso entre ações (default 120)
 */
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const BASE = (process.env.BASE_URL || 'http://localhost:5173').replace(/\/$/, '')
const EMAIL = process.env.SASF_EMAIL || 'gabriel@gmail.com'
const SENHA = process.env.SASF_SENHA || 'insper123'
const HEADLESS = process.env.HEADLESS === '1'
const SLOWMO = Number(process.env.SLOWMO || 120)

const SHOT_DIR = path.join(__dirname, 'e2e-screenshots-gabriel')
const NOME_REPRESENTANTE = 'GABRIEL TESTE'
const NOME_MEMBRO = 'GABRIEL TESTE FILHO'
const CPF = '11122233344'
const HOJE_ISO = new Date().toISOString().split('T')[0]

const apiErrors = []
const consoleErrors = []
const failures = []
const warnings = []
let shotN = 0

function log(...a) { console.log('  ', ...a) }
function step(msg) { console.log(`\n▶ ${msg}`) }
function assert(cond, msg) {
  if (cond) { log(`✓ ${msg}`) } else { failures.push(msg); console.log(`   ✗ FALHA: ${msg}`) }
}

async function shot(page, name) {
  shotN += 1
  const file = path.join(SHOT_DIR, `${String(shotN).padStart(2, '0')}-${name}.png`)
  try { await page.screenshot({ path: file, fullPage: true }) } catch { /* ignore */ }
}

async function fill(page, label, value, which = 'first') {
  try {
    const loc = page.getByLabel(label, { exact: true })
    const target = which === 'last' ? loc.last() : loc.first()
    await target.fill(String(value), { timeout: 8000 })
  } catch (e) {
    failures.push(`Não consegui preencher "${label}": ${e.message.split('\n')[0]}`)
    log(`   ⚠ campo "${label}" não preenchido`)
  }
}

async function chooseRadio(page, optionLabel) {
  try {
    await page.getByRole('radio', { name: optionLabel, exact: true }).first().check({ timeout: 6000 })
  } catch (e) {
    failures.push(`Radio "${optionLabel}" não selecionado: ${e.message.split('\n')[0]}`)
  }
}

async function checkBox(page, optionLabel) {
  try {
    await page.getByRole('checkbox', { name: optionLabel, exact: true }).first().check({ timeout: 6000 })
  } catch (e) {
    failures.push(`Checkbox "${optionLabel}" não marcado: ${e.message.split('\n')[0]}`)
  }
}

async function selectOption(page, label, optionText) {
  try {
    let combo = page.getByRole('combobox', { name: label, exact: true })
    if (!(await combo.count())) combo = page.getByLabel(label, { exact: true }).first()
    await combo.click({ timeout: 6000 })
    await page.getByRole('option', { name: optionText, exact: true }).click({ timeout: 6000 })
  } catch (e) {
    warnings.push(`Select "${label}" → "${optionText}" não preenchido: ${e.message.split('\n')[0]}`)
  }
}

async function salvar(page, { aguardarLabel = null, nome = 'ficha' } = {}) {
  step(`Salvando ${nome}`)
  await page.locator('button[type="submit"]').first().click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor({ state: 'visible', timeout: 8000 })
  await dialog.getByRole('button', { name: 'Salvar', exact: true }).click()

  if (aguardarLabel) {
    await page.getByLabel(aguardarLabel, { exact: true }).first()
      .waitFor({ state: 'visible', timeout: 25000 })
      .catch(() => failures.push(`Não avançou para o próximo formulário (esperava "${aguardarLabel}")`))
  } else {
    await page.getByText('Dados salvos com sucesso', { exact: false })
      .waitFor({ state: 'visible', timeout: 25000 })
      .catch(() => log('   (aviso de sucesso não detectado no último passo)'))
  }
  await page.waitForTimeout(800)
  await shot(page, `salvo-${nome}`)
}

;(async () => {
  fs.mkdirSync(SHOT_DIR, { recursive: true })
  console.log(`\n=== Novo registro de família (Playwright) ===`)
  console.log(`Base: ${BASE} | Login: ${EMAIL} | Representante: ${NOME_REPRESENTANTE}\n`)

  let browser
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: HEADLESS, slowMo: SLOWMO })
    console.log('Navegador: Google Chrome (channel=chrome)')
  } catch (e) {
    console.log('Chrome não encontrado, usando Chromium do Playwright:', e.message.split('\n')[0])
    browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO })
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  page.on('response', (res) => {
    const url = res.url()
    if (url.includes('/api/') && res.status() >= 400) {
      apiErrors.push({ status: res.status(), method: res.request().method(), url })
      console.log(`   🌐 ${res.status()} ${res.request().method()} ${url.replace(BASE, '')}`)
    }
  })
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`))

  try {
    // ── 1. LOGIN ──────────────────────────────────────────────────────────────
    step('Login')
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
    await shot(page, 'login')
    await page.getByLabel('Email institucional', { exact: true }).fill(EMAIL)
      .catch(() => page.fill('input[type="email"]', EMAIL))
    await page.getByLabel('Senha', { exact: true }).fill(SENHA)
      .catch(() => page.fill('input[type="password"]', SENHA))
    await page.getByRole('button', { name: /Entrar/ }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 15000 })
      .catch(() => failures.push('Login não redirecionou para /dashboard (credenciais?)'))
    await page.waitForTimeout(1000)
    await shot(page, 'apos-login')
    assert(/\/dashboard/.test(page.url()), 'Login efetuado e redirecionado ao dashboard')

    // ── 2. NAVEGAR PELA UI: Novo Registro → Abrir novo prontuário → Continuar ──
    step('Abrindo "Novo Registro" pela navegação')
    await page.getByRole('link', { name: 'Novo Registro', exact: true }).click()
      .catch(() => page.goto(`${BASE}/dashboard/cadastro`, { waitUntil: 'networkidle' }))
    await page.waitForTimeout(600)
    await shot(page, 'cadastro-landing')

    await page.getByRole('button', { name: 'Abrir prontuário', exact: true }).click()
      .catch(() => page.getByRole('button', { name: /Abrir novo prontuário/ }).click())
    const dlg = page.getByRole('dialog')
    await dlg.waitFor({ state: 'visible', timeout: 8000 })
    await shot(page, 'dialog-novo-prontuario')
    // Ficha Cadastral já vem selecionada como tipo de ficha padrão
    await dlg.getByRole('button', { name: 'Continuar', exact: true }).click()

    // ── 3. FICHA CADASTRAL DA FAMÍLIA (form 1) ────────────────────────────────
    step('Ficha Cadastral da Família')
    await page.getByLabel('Nome do Representante da Família', { exact: true })
      .waitFor({ state: 'visible', timeout: 15000 })

    await fill(page, 'Nome do Serviço SASF', 'SASF Chico Mendes')
    await fill(page, 'CAS', 'CAS Ipiranga')
    await fill(page, 'CRAS', 'CRAS Sacomã')
    await fill(page, 'Nome do Representante da Família', NOME_REPRESENTANTE)
    await chooseRadio(page, 'M')
    await fill(page, 'Data de Matrícula', '2024-01-10')
    await fill(page, 'Nº de Matrícula', 'MAT-GAB-001')
    await fill(page, 'Nº NIS/NIT/NB', '12345678901')
    await fill(page, 'Data de Nascimento', '1990-05-20', 'first')
    await fill(page, 'Naturalidade (Município/Estado)', 'São Paulo/SP')
    await selectOption(page, 'Cor/Raça', 'Parda')
    await chooseRadio(page, 'Não') // pessoa com deficiência
    await fill(page, 'CPF', CPF)
    await fill(page, 'RG', '12.345.678-9')
    await fill(page, 'Órgão Emissor', 'SSP')
    await fill(page, 'UF', 'SP')
    await fill(page, 'Mãe', 'Maria Teste')
    await fill(page, 'Pai', 'José Teste')
    await chooseRadio(page, 'Solteiro')
    await chooseRadio(page, 'Ensino Médio Completo')
    await fill(page, 'Profissão', 'Pedreiro', 'first')
    await chooseRadio(page, 'Empregado')
    await fill(page, 'Renda (R$)', '1500', 'first')
    await fill(page, 'Endereço', 'Rua das Flores')
    await fill(page, 'Nº', '123')
    await fill(page, 'Complemento', 'Apto 1')
    await fill(page, 'Cidade', 'São Paulo')
    await fill(page, 'Bairro', 'Centro')
    await fill(page, 'Distrito', 'Sé')
    await fill(page, 'Telefone Celular', '11999990000')
    await chooseRadio(page, 'Alugada')
    await fill(page, 'Nº de Cômodos', '4')
    await fill(page, 'Valor do Aluguel ou Financiamento (R$)', '800')
    await chooseRadio(page, 'Alvenaria')
    await checkBox(page, 'Favela')
    await checkBox(page, 'Bolsa Família')
    // Composição familiar (linha 1) — labels colidem com o representante → last
    await fill(page, 'Nome', NOME_MEMBRO)
    await fill(page, 'Data de Nascimento', '2015-03-03', 'last')
    await fill(page, 'Parentesco / Vínculo', 'Filho')
    await shot(page, 'form1-preenchido')
    await salvar(page, { aguardarLabel: 'Demanda / Orientações / Encaminhamentos', nome: 'ficha-cadastral' })

    // ── 4. INFORMAÇÕES COMPLEMENTARES (form 2) ────────────────────────────────
    step('Ficha Cadastral Complementar')
    await fill(page, 'Demanda / Orientações / Encaminhamentos', 'Acompanhamento familiar — GABRIEL TESTE.')
    await fill(page, 'Técnico de Referência do Atendimento', 'Técnico Teste')
    await fill(page, 'Data', HOJE_ISO)
    await shot(page, 'form2-preenchido')
    await salvar(page, { aguardarLabel: 'Nome do Autorizante', nome: 'complementar' })

    // ── 5. TERMO DE AUTORIZAÇÃO DE IMAGEM (form 3) ────────────────────────────
    step('Termo de Autorização de Imagem')
    await fill(page, 'Nome do Autorizante', NOME_REPRESENTANTE)
    await fill(page, 'Cédula de Identidade (RG)', '12.345.678-9')
    await fill(page, 'CPF', CPF)
    await fill(page, 'Nome(s) da(s) criança(s) sob responsabilidade (se houver)', NOME_MEMBRO)
    await fill(page, 'Data de Assinatura', HOJE_ISO)
    await shot(page, 'form3-preenchido')
    await salvar(page, { aguardarLabel: 'Objetivo', nome: 'termo' })

    // ── 6. PLANO DE DESENVOLVIMENTO FAMILIAR (form 4) ─────────────────────────
    step('Plano de Desenvolvimento Familiar')
    await fill(page, 'Análise Diagnóstica (síntese do histórico familiar apresentado / atualizações)',
      'Análise diagnóstica — GABRIEL TESTE.')
    await fill(page, 'Objetivo', 'Promover autonomia financeira da família.')
    await fill(page, 'Plano Nº', 'PDF-GAB-1')
    await fill(page, 'Data de Elaboração do Plano', HOJE_ISO)
    await shot(page, 'form4-preenchido')
    await salvar(page, { aguardarLabel: 'Nº da Folha de Prosseguimento', nome: 'plano-familiar' })

    // ── 7. FOLHA DE PROSSEGUIMENTO (form 5) ───────────────────────────────────
    step('Folha de Prosseguimento')
    await fill(page, 'Nº da Folha de Prosseguimento', '1')
    await fill(page, 'Demanda / Orientação / Encaminhamentos (com data e técnico responsável)',
      'Folha de prosseguimento — GABRIEL TESTE.')
    await shot(page, 'form5-preenchido')
    await salvar(page, { aguardarLabel: 'Objetivo da Visita', nome: 'folha-prosseguimento' })

    // ── 8. FICHA DE VISITA DOMICILIAR (form 6) ────────────────────────────────
    step('Ficha de Visita Domiciliar')
    await fill(page, 'Data da Visita', HOJE_ISO)
    await fill(page, 'Objetivo da Visita', 'Verificar condições de moradia.')
    await fill(page, 'Pessoa(s) da Família que Conversou(aram) com o Técnico', NOME_REPRESENTANTE)
    await fill(page, 'Demandas Apresentadas / Orientações / Encaminhamentos', 'Encaminhado ao CRAS.')
    await shot(page, 'form6-preenchido')
    await salvar(page, { aguardarLabel: 'Nome do Beneficiário', nome: 'ficha-visita' })

    // ── 9. PDU (form 7) ───────────────────────────────────────────────────────
    step('Plano de Desenvolvimento do Usuário (PDU)')
    await fill(page, 'Nome do Beneficiário', NOME_REPRESENTANTE)
    await fill(page, 'Síntese da Situação Apresentada', 'Síntese — GABRIEL TESTE.')
    await checkBox(page, 'Ausência de cuidador')
    await fill(page, 'Plano Nº', 'PDU-GAB-1')
    await fill(page, 'Data de Elaboração do Plano', HOJE_ISO)
    await shot(page, 'form7-preenchido')
    await salvar(page, { nome: 'pdu' }) // último: sem próximo formulário

    // ── 10. VERIFICAÇÃO NA LISTAGEM ───────────────────────────────────────────
    step('Verificando a família na listagem')
    await page.goto(`${BASE}/dashboard/familias`, { waitUntil: 'networkidle' })
    await page.getByLabel('Buscar', { exact: true }).first().fill(NOME_REPRESENTANTE).catch(() => {})
    await page.waitForTimeout(1500)
    const card = page.getByText(NOME_REPRESENTANTE, { exact: false }).first()
    const apareceu = await card.isVisible().catch(() => false)
    assert(apareceu, `Família "${NOME_REPRESENTANTE}" aparece na listagem`)
    await shot(page, 'listagem')
  } catch (err) {
    failures.push(`Exceção não tratada: ${err.message}`)
    console.error('\n💥 Exceção:', err)
    await shot(page, 'erro-fatal')
  } finally {
    console.log('\n========== RELATÓRIO ==========')
    console.log(`Screenshots: ${SHOT_DIR}`)
    const erros5xx = apiErrors.filter((e) => e.status >= 500)
    console.log(`\nErros de API (>=400): ${apiErrors.length}  | 5xx: ${erros5xx.length}`)
    apiErrors.forEach((e) => console.log(`   ${e.status} ${e.method} ${e.url.replace(BASE, '')}`))
    if (consoleErrors.length) {
      console.log(`\nErros de console: ${consoleErrors.length}`)
      consoleErrors.slice(0, 10).forEach((e) => console.log(`   ${e}`))
    }
    if (warnings.length) {
      console.log(`\nAvisos (não-críticos): ${warnings.length}`)
      warnings.forEach((w) => console.log(`   ⚠ ${w}`))
    }
    console.log(`\nAsserções com falha: ${failures.length}`)
    failures.forEach((f) => console.log(`   ✗ ${f}`))
    const ok = failures.length === 0
    console.log(`\n${ok ? '✅ PASSOU' : '❌ FALHOU'} (${failures.length} asserções com falha)`)
    await browser.close()
    process.exit(ok ? 0 : 1)
  }
})()
