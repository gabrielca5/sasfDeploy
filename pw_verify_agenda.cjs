/** Verifica se a aba "Minha Agenda" abre sem tela branca / erro de runtime. */
const { chromium } = require('playwright')
const BASE = (process.env.BASE_URL || 'http://localhost:5173').replace(/\/$/, '')
const EMAIL = process.env.SASF_EMAIL || 'gabriel@gmail.com'
const SENHA = process.env.SASF_SENHA || 'insper123'

;(async () => {
  const pageErrors = []
  let browser
  try { browser = await chromium.launch({ channel: 'chrome', headless: false, slowMo: 80 }) }
  catch { browser = await chromium.launch({ headless: false, slowMo: 80 }) }
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  page.on('pageerror', (e) => pageErrors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') pageErrors.push('console: ' + m.text()) })
  try {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
    await page.getByLabel('Email institucional', { exact: true }).fill(EMAIL)
    await page.getByLabel('Senha', { exact: true }).fill(SENHA)
    await page.getByRole('button', { name: /Entrar/ }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 15000 })

    await page.getByRole('link', { name: 'Minha Agenda', exact: true }).click()
      .catch(() => page.goto(`${BASE}/dashboard/calendario`, { waitUntil: 'networkidle' }))
    await page.waitForTimeout(2500)
    await page.screenshot({ path: 'e2e-screenshots-gabriel/verify-agenda.png', fullPage: true })

    const tituloVisivel = await page.getByText('Calendário de atendimentos', { exact: false }).isVisible().catch(() => false)
    const calendarioVisivel = await page.locator('.rbc-calendar').isVisible().catch(() => false)
    const erroFatal = pageErrors.some((e) => /is not a function|Cannot read|undefined/.test(e))

    console.log(`Título visível:    ${tituloVisivel}`)
    console.log(`Calendário visível: ${calendarioVisivel}`)
    console.log(`Erros de runtime:   ${pageErrors.length}`)
    pageErrors.slice(0, 8).forEach((e) => console.log('   • ' + e))
    const ok = tituloVisivel && calendarioVisivel && !erroFatal
    console.log(ok ? '\n✅ Minha Agenda abre normalmente (sem tela branca).' : '\n❌ Ainda há problema na Minha Agenda.')
    process.exitCode = ok ? 0 : 1
  } catch (e) {
    console.error('Erro:', e.message)
    process.exitCode = 1
  } finally {
    await page.waitForTimeout(1200)
    await browser.close()
  }
})()
