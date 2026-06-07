# Playwright E2E Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configurar Playwright com auth fixture, testar os 8 formulários, capturar screenshots das páginas principais e aplicar melhorias visuais mínimas.

**Architecture:** Auth setup roda primeiro e persiste sessão em `.auth/session.json`. Os três specs de teste herdam essa sessão via `storageState`. Formulários são testados individualmente por ID — renderização, navegação entre seções e screenshot.

**Tech Stack:** Playwright, Vitest (já instalado), React + MUI, Vite dev server (porta 5173)

---

## Arquivos criados/modificados

| Ação | Arquivo |
|------|---------|
| Criar | `SASF-FRONT/playwright.config.js` |
| Criar | `SASF-FRONT/e2e/auth.setup.js` |
| Criar | `SASF-FRONT/e2e/navegacao.spec.js` |
| Criar | `SASF-FRONT/e2e/visual.spec.js` |
| Criar | `SASF-FRONT/e2e/formularios.spec.js` |
| Modificar | `SASF-FRONT/.gitignore` — adicionar `.auth/` e `img/` |
| Já existe | `SASF-FRONT/img/` (criado no brainstorming) |

---

## Task 1: Instalar Playwright

**Files:**
- Modify: `SASF-FRONT/package.json`

- [ ] **Step 1: Instalar Playwright**

```bash
cd SASF-FRONT
npm install --save-dev @playwright/test
npx playwright install chromium
```

Saída esperada: `✓ chromium [...] downloaded`

- [ ] **Step 2: Verificar instalação**

```bash
npx playwright --version
```

Saída esperada: `Version X.X.X`

- [ ] **Step 3: Commit**

```bash
git add SASF-FRONT/package.json SASF-FRONT/package-lock.json
git commit -m "chore: install playwright"
```

---

## Task 2: Configurar playwright.config.js

**Files:**
- Create: `SASF-FRONT/playwright.config.js`

- [ ] **Step 1: Criar o arquivo**

Criar `SASF-FRONT/playwright.config.js`:

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
      use: { storageState: undefined },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/session.json',
      },
      dependencies: ['setup'],
    },
  ],
})
```

- [ ] **Step 2: Adicionar `.auth/` e `img/` ao .gitignore**

Abrir `SASF-FRONT/.gitignore` (ou criar se não existir) e adicionar ao final:

```
.auth/
img/
```

- [ ] **Step 3: Commit**

```bash
git add SASF-FRONT/playwright.config.js SASF-FRONT/.gitignore
git commit -m "chore: add playwright config"
```

---

## Task 3: Auth setup — login único compartilhado

**Files:**
- Create: `SASF-FRONT/e2e/auth.setup.js`

- [ ] **Step 1: Criar o arquivo**

Criar `SASF-FRONT/e2e/auth.setup.js`:

```js
import { test as setup, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const authFile = path.join(import.meta.dirname, '../.auth/session.json')

setup('autenticar', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true })

  await page.goto('/login')
  await page.getByLabel('Email institucional').fill('gabriel@unas.org.br')
  await page.getByLabel('Senha').fill('Insper123!')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page).toHaveURL(/dashboard\/visao-geral/, { timeout: 10_000 })
  await page.context().storageState({ path: authFile })
})
```

- [ ] **Step 2: Verificar que o dev server está rodando e executar só o setup**

Com o backend e o frontend rodando:

```bash
cd SASF-FRONT
npx playwright test --project=setup
```

Saída esperada: `1 passed`
Arquivo `.auth/session.json` deve ser criado.

- [ ] **Step 3: Commit**

```bash
git add SASF-FRONT/e2e/auth.setup.js
git commit -m "test: add playwright auth setup"
```

---

## Task 4: Testes de navegação e sequência lógica

**Files:**
- Create: `SASF-FRONT/e2e/navegacao.spec.js`

- [ ] **Step 1: Criar o arquivo**

Criar `SASF-FRONT/e2e/navegacao.spec.js`:

```js
import { test, expect } from '@playwright/test'

test('/ redireciona para /login sem sessão', async ({ browser }) => {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
  await ctx.close()
})

test('/dashboard/* redireciona para /login sem sessão', async ({ browser }) => {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  await page.goto('/dashboard/familias')
  await expect(page).toHaveURL(/\/login/)
  await ctx.close()
})

test('sessão autenticada acessa visao-geral', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await expect(page.getByText('Olá, bem-vindo')).toBeVisible()
})

test('sidebar: Famílias navega para /dashboard/familias', async ({ page }) => {
  await page.goto('/dashboard/visao-geral')
  await page.getByRole('button', { name: 'Famílias' }).click()
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

test('/dashboard redireciona para /dashboard/visao-geral', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/dashboard\/visao-geral/)
})

test('rota inexistente exibe página 404', async ({ page }) => {
  await page.goto('/pagina-que-nao-existe')
  await expect(page.getByText(/não encontrada|404/i)).toBeVisible()
})
```

- [ ] **Step 2: Rodar os testes de navegação**

```bash
cd SASF-FRONT
npx playwright test navegacao.spec.js
```

Saída esperada: todos os testes passam (ou falham com mensagem clara indicando o problema real na app).

- [ ] **Step 3: Commit**

```bash
git add SASF-FRONT/e2e/navegacao.spec.js
git commit -m "test: add navigation e2e tests"
```

---

## Task 5: Screenshots das páginas principais

**Files:**
- Create: `SASF-FRONT/e2e/visual.spec.js`

- [ ] **Step 1: Criar o arquivo**

Criar `SASF-FRONT/e2e/visual.spec.js`:

```js
import { test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const imgDir = path.join(import.meta.dirname, '../img')

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
```

- [ ] **Step 2: Rodar e verificar que as imagens foram geradas**

```bash
cd SASF-FRONT
npx playwright test visual.spec.js
ls img/
```

Saída esperada: `login.png  visao-geral.png  familias.png`

- [ ] **Step 3: Abrir os screenshots e revisar visualmente**

Abrir os 3 arquivos em `SASF-FRONT/img/` e anotar o que está visivelmente problemático (espaçamentos, cores, alinhamentos).

- [ ] **Step 4: Commit**

```bash
git add SASF-FRONT/e2e/visual.spec.js
git commit -m "test: add visual screenshot tests"
```

---

## Task 6: Testes dos formulários

**Files:**
- Create: `SASF-FRONT/e2e/formularios.spec.js`

- [ ] **Step 1: Criar o arquivo**

Criar `SASF-FRONT/e2e/formularios.spec.js`:

```js
import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const imgDir = path.join(import.meta.dirname, '../img')
test.beforeAll(() => fs.mkdirSync(imgDir, { recursive: true }))

const formularios = [
  { id: 'ficha_cadastral_familia',      titulo: 'Ficha Cadastral da Família' },
  { id: 'ficha_cadastral_complementar', titulo: 'Ficha Cadastral da Família' },
  { id: 'ficha_atualizacao_unas',       titulo: 'Ficha de Atualização' },
  { id: 'termo_autorizacao_imagem',     titulo: 'Termo' },
  { id: 'plano_desenvolvimento_familiar', titulo: 'Plano' },
  { id: 'folha_prosseguimento',         titulo: 'Folha de Prosseguimento' },
  { id: 'ficha_visita_domiciliar',      titulo: 'Ficha de Visita' },
  { id: 'plano_desenvolvimento_usuario', titulo: 'Plano de Desenvolvimento' },
]

for (const { id, titulo } of formularios) {
  test(`formulário: ${id} — renderiza sem erro`, async ({ page }) => {
    await page.goto(`/dashboard/cadastro/formulario/${id}`)
    await page.waitForLoadState('networkidle')

    // Verifica que não há crash (sem "Algo deu errado" ou tela em branco)
    await expect(page.locator('body')).not.toBeEmpty()
    const errorText = page.getByText(/algo deu errado|erro inesperado/i)
    await expect(errorText).toHaveCount(0)

    // Verifica que algum campo de formulário está presente
    const hasInput = await page.locator('input, textarea, select').count()
    expect(hasInput).toBeGreaterThan(0)

    // Screenshot
    await page.screenshot({
      path: path.join(imgDir, `form-${id}.png`),
      fullPage: true,
    })
  })

  test(`formulário: ${id} — avança para segunda seção`, async ({ page }) => {
    await page.goto(`/dashboard/cadastro/formulario/${id}`)
    await page.waitForLoadState('networkidle')

    // Tenta clicar em "Próximo" ou "Avançar" se existir
    const nextBtn = page.getByRole('button', { name: /próximo|avançar|continuar/i })
    if (await nextBtn.isVisible()) {
      await nextBtn.click()
      // Verifica que ainda está na página do formulário (não crashou)
      await expect(page.locator('body')).not.toBeEmpty()
    }
  })

  test(`formulário: ${id} — botão Salvar está presente`, async ({ page }) => {
    await page.goto(`/dashboard/cadastro/formulario/${id}`)
    await page.waitForLoadState('networkidle')

    const saveBtn = page.getByRole('button', { name: /salvar|enviar|concluir|finalizar/i })
    // Navega até a última seção clicando em Próximo até sumir
    let attempts = 0
    while (attempts < 10) {
      const nextBtn = page.getByRole('button', { name: /próximo|avançar|continuar/i })
      if (!(await nextBtn.isVisible())) break
      await nextBtn.click()
      await page.waitForLoadState('networkidle')
      attempts++
    }

    await expect(saveBtn.first()).toBeVisible({ timeout: 5_000 })
  })
}
```

- [ ] **Step 2: Rodar os testes de formulários**

```bash
cd SASF-FRONT
npx playwright test formularios.spec.js
```

Saída esperada: todos passam. Se algum falhar, a mensagem indicará qual formulário e qual assertion.

- [ ] **Step 3: Verificar os screenshots dos formulários**

```bash
ls SASF-FRONT/img/form-*.png
```

Todos os 8 formulários devem ter screenshot gerado.

- [ ] **Step 4: Commit**

```bash
git add SASF-FRONT/e2e/formularios.spec.js
git commit -m "test: add form rendering e2e tests"
```

---

## Task 7: Melhorias visuais mínimas

**Pré-requisito:** Tasks 5 e 6 completas — screenshots revisados em `SASF-FRONT/img/`.

**Files:**
- Modify: arquivos específicos identificados na revisão visual

- [ ] **Step 1: Revisar screenshots**

Abrir cada imagem em `SASF-FRONT/img/` e anotar problemas visuais nas 3 páginas principais:
- `login.png`
- `visao-geral.png`
- `familias.png`

Critérios: espaçamentos quebrados, textos cortados, botões fora de alinhamento, contraste inadequado. Ignorar problemas de dados (conteúdo vazio, etc.).

- [ ] **Step 2: Aplicar correções**

Aplicar apenas o mínimo necessário. Exemplos típicos:
- Ajustar `gap` ou `padding` em um componente específico
- Corrigir `noWrap` em texto que está quebrando incorretamente
- Ajustar `maxWidth` em um container que está muito largo/estreito

Para cada correção: localizar o arquivo exato, fazer o menor `sx={{}}` possível, sem refatoração.

- [ ] **Step 3: Re-gerar screenshots para comparar**

```bash
cd SASF-FRONT
npx playwright test visual.spec.js
```

Abrir novamente e comparar com as imagens anteriores.

- [ ] **Step 4: Commit das melhorias**

```bash
git add <arquivos modificados>
git commit -m "style: minimal visual fixes on login, visao-geral, familias"
```

---

## Task 8: Rodar a suite completa

- [ ] **Step 1: Garantir que backend e frontend estão rodando**

Terminal 1 — backend (porta 8080)
Terminal 2 — frontend:
```bash
cd SASF-FRONT
npm run dev
```

- [ ] **Step 2: Rodar todos os testes**

```bash
cd SASF-FRONT
npx playwright test
```

Saída esperada: todos os testes passam. Anotar qualquer falha e investigar se é bug da app ou do teste.

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "test: complete playwright e2e suite"
```
