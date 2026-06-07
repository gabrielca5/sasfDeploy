import { test as setup, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const authFile = path.join(__dirname, '../.auth/session.json')

setup('autenticar', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true })

  await page.goto('/login')
  await page.getByLabel('Email institucional').fill('gabriel@unas.org.br')
  await page.locator('input[name="senha"]').fill('Insper123!')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL(/dashboard\/visao-geral/, { timeout: 15_000 })
  await page.context().storageState({ path: authFile })
})
