import { test, expect } from '@playwright/test'

test('/ redireciona para /login sem sessão', async ({ browser }) => {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
  await ctx.close()
})

test('/dashboard/* redireciona para /login sem sessão', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: { cookies: [], origins: [] } })
  const page = await ctx.newPage()
  await page.goto('/dashboard/familias')
  await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })
  await ctx.close()
})

test('sessão autenticada acessa visao-geral', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await expect(page.getByText('Olá, bem-vindo')).toBeVisible()
})

test('/dashboard redireciona para /dashboard/visao-geral', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/dashboard\/visao-geral/)
})

test('sidebar: Famílias navega para /dashboard/familias', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.getByRole('button', { name: 'Famílias', exact: true }).click()
  await expect(page).toHaveURL(/\/dashboard\/familias/)
  await expect(page.getByText('Acompanhamento de famílias')).toBeVisible()
})

test('sidebar: Novo Registro navega para /dashboard/cadastro', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.getByRole('button', { name: 'Novo Registro' }).click()
  await expect(page).toHaveURL(/\/dashboard\/cadastro/)
})

test('sidebar: Minha Agenda navega para /dashboard/calendario', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.getByRole('button', { name: 'Minha Agenda' }).click()
  await expect(page).toHaveURL(/\/dashboard\/calendario/)
})

test('sidebar: Meu Perfil navega para /dashboard/perfil', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.getByRole('button', { name: 'Meu Perfil' }).click()
  await expect(page).toHaveURL(/\/dashboard\/perfil/)
})

test('rota inexistente exibe página 404', async ({ page }) => {
  await page.goto('/pagina-que-nao-existe')
  await expect(page.getByText(/não encontrada|404/i)).toBeVisible()
})
