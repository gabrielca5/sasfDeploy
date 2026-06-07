import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '../img')

test.beforeAll(() => fs.mkdirSync(imgDir, { recursive: true }))

function img(name) {
  return path.join(imgDir, name)
}

const formularios = [
  { id: 'ficha_cadastral_familia',       titulo: 'Ficha Cadastral da Família' },
  { id: 'ficha_cadastral_complementar',  titulo: 'Ficha Cadastral (Complementar)' },
  { id: 'ficha_atualizacao_unas',        titulo: 'Ficha de Atualização' },
  { id: 'termo_autorizacao_imagem',      titulo: 'Termo de Autorização' },
  { id: 'plano_desenvolvimento_familiar', titulo: 'Plano de Desenvolvimento Familiar' },
  { id: 'folha_prosseguimento',          titulo: 'Folha de Prosseguimento' },
  { id: 'ficha_visita_domiciliar',       titulo: 'Ficha de Visita Domiciliar' },
  { id: 'plano_desenvolvimento_usuario', titulo: 'Plano de Desenvolvimento do Usuário' },
]

for (const { id } of formularios) {
  test(`formulário [${id}]: renderiza sem erro`, async ({ page }) => {
    await page.goto(`/dashboard/cadastro/formulario/${id}`)
    await page.waitForLoadState('networkidle')

    // Não há crash nem tela de erro
    const errorText = page.getByText(/algo deu errado|erro inesperado/i)
    await expect(errorText).toHaveCount(0)

    // Pelo menos um campo de input está presente
    const inputCount = await page.locator('input, textarea, select').count()
    expect(inputCount).toBeGreaterThan(0)

    await page.screenshot({ path: img(`form-${id}.png`), fullPage: true })
  })

  test(`formulário [${id}]: avança seções sem crash`, async ({ page }) => {
    await page.goto(`/dashboard/cadastro/formulario/${id}`)
    await page.waitForLoadState('networkidle')

    let attempts = 0
    while (attempts < 15) {
      const nextBtn = page.getByRole('button', { name: /próximo|avançar|continuar/i }).first()
      if (!(await nextBtn.isVisible())) break
      await nextBtn.click()
      await page.waitForLoadState('networkidle')
      attempts++
    }

    // Após navegar, ainda está na página (não crashou)
    await expect(page.locator('body')).not.toBeEmpty()
    const errorText = page.getByText(/algo deu errado|erro inesperado/i)
    await expect(errorText).toHaveCount(0)
  })
}
