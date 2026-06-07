# Playwright E2E — Design Spec

**Data:** 2026-06-06

## Objetivo

Criar uma suite de testes E2E com Playwright para validar:
1. Sequência lógica de navegação entre páginas
2. Renderização e submissão dos 8 formulários do sistema
3. Screenshots das 3 páginas principais para revisão visual

## Escopo

- Usuário único: `gabriel@unas.org.br` / `Insper123!`
- Backend: real, rodando localmente em `http://localhost:8080`
- Frontend: `http://localhost:5173` (Vite dev server)
- Browser: Chromium (Desktop)

## Formulários cobertos

| ID | Título |
|----|--------|
| `ficha_cadastral_familia` | Ficha Cadastral da Família |
| `ficha_cadastral_complementar` | Ficha Cadastral (Informações Complementares) |
| `ficha_atualizacao_unas` | Ficha de Atualização — Quadro Situacional |
| `termo_autorizacao_imagem` | Termo de Autorização de Imagem |
| `plano_desenvolvimento_familiar` | Plano de Desenvolvimento Familiar |
| `folha_prosseguimento` | Folha de Prosseguimento |
| `ficha_visita_domiciliar` | Ficha de Visita Domiciliar |
| `plano_desenvolvimento_usuario` | Plano de Desenvolvimento do Usuário (PDU) |

## Estrutura de arquivos

```
SASF-FRONT/
├── img/                      ← screenshots (já criado)
├── e2e/
│   ├── auth.setup.js         ← login único, salva .auth/session.json
│   ├── navegacao.spec.js     ← sequência lógica e redirecionamentos
│   ├── visual.spec.js        ← screenshots fullpage das 3 páginas principais
│   └── formularios.spec.js   ← renderização + navegação de cada formulário
└── playwright.config.js
```

## Estratégia de autenticação

`auth.setup.js` roda antes de todos os testes, loga uma única vez e persiste o `storageState` em `.auth/session.json`. Todos os specs herdam essa sessão via `use: { storageState }` no `playwright.config.js`. Testes que precisam de contexto sem autenticação criam um `browser.newContext()` sem storageState.

## Melhorias visuais

Aplicar apenas após revisar os screenshots gerados por `visual.spec.js`. Mudanças mínimas, somente nas páginas login → visão-geral → famílias, somente onde houver problema visual claro.
