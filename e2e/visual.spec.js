import { test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '../img')

test.beforeAll(() => fs.mkdirSync(imgDir, { recursive: true }))

function img(name) {
  return path.join(imgDir, name)
}

test('screenshot: login', async ({ browser }) => {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  await page.goto('/login')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: img('login.png'), fullPage: true })
  await ctx.close()
})

test('screenshot: visao-geral', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: img('visao-geral.png'), fullPage: true })
})

test('screenshot: familias', async ({ page }) => {
  await page.goto('/dashboard/familias')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: img('familias.png'), fullPage: true })
})
