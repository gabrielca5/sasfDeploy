const { chromium } = require('playwright')
const BASE = 'https://sasf-deploy-tpwe.vercel.app'
;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: false, slowMo: 120 }).catch(() => chromium.launch({ headless: false }))
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  const apiCalls = []
  page.on('response', (r) => { if (r.url().includes('/api/familia')) apiCalls.push(`${r.status()} ${r.url()}`) })
  try {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
    await page.getByLabel('Email institucional', { exact: true }).fill('gabriel@unas.org.br')
    await page.getByLabel('Senha', { exact: true }).fill('Insper123!')
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await page.waitForTimeout(5000)
    console.log('URL após login:', page.url())

    await page.goto(`${BASE}/dashboard/familias`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(3500)
    await page.screenshot({ path: 'e2e-screenshots-gabriel/prod-familias.png', fullPage: true })

    // conta cartões/linhas de família renderizados
    const corpo = await page.locator('body').innerText()
    const temGabriel = corpo.includes('GABRIEL TESTE')
    const temZero = /0 fam[ií]lias|Nenhuma fam/i.test(corpo)
    console.log('Chamadas /api/familia:', apiCalls.join(' | ') || '(nenhuma)')
    console.log('Página contém "GABRIEL TESTE":', temGabriel)
    console.log('Mostra "0 famílias / nenhuma":', temZero)
  } catch (e) {
    console.error('Erro:', e.message)
  } finally {
    await page.waitForTimeout(1500)
    await browser.close()
  }
})()
