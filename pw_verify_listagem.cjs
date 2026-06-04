/** Verifica (sem criar nada) se "GABRIEL TESTE" aparece na listagem de famílias. */
const { chromium } = require('playwright')
const BASE = (process.env.BASE_URL || 'http://localhost:5173').replace(/\/$/, '')
const EMAIL = process.env.SASF_EMAIL || 'gabriel@gmail.com'
const SENHA = process.env.SASF_SENHA || 'insper123'

;(async () => {
  let browser
  try { browser = await chromium.launch({ channel: 'chrome', headless: false, slowMo: 80 }) }
  catch { browser = await chromium.launch({ headless: false, slowMo: 80 }) }
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  try {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
    await page.getByLabel('Email institucional', { exact: true }).fill(EMAIL)
    await page.getByLabel('Senha', { exact: true }).fill(SENHA)
    await page.getByRole('button', { name: /Entrar/ }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 15000 })

    await page.goto(`${BASE}/dashboard/familias`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await page.getByLabel('Buscar', { exact: true }).first().fill('GABRIEL TESTE').catch(() => {})
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'e2e-screenshots-gabriel/verify-listagem.png', fullPage: true })

    const visivel = await page.getByText('GABRIEL TESTE', { exact: false }).first().isVisible().catch(() => false)
    console.log(visivel
      ? '✅ "GABRIEL TESTE" aparece na listagem de famílias.'
      : '❌ "GABRIEL TESTE" NÃO encontrado na listagem.')
    process.exitCode = visivel ? 0 : 1
  } catch (e) {
    console.error('Erro:', e.message)
    process.exitCode = 1
  } finally {
    await page.waitForTimeout(1500)
    await browser.close()
  }
})()
