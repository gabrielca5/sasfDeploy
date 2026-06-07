# Sessão: Refino de Design SASF-FRONT

## Contexto do Projeto

App React (Vite) chamado SASF-FRONT — sistema de assistência social para assistentes sociais.
Autenticação: JWT em localStorage (`sasf_token`). Login: gabriel@unas.org.br / Insper123!

---

## Stack já instalada (use APENAS estas libs, sem instalar novas)

| Lib | Versão | Uso |
|-----|--------|-----|
| `@mui/material` + `@mui/icons-material` | v9 | Componente base de tudo |
| `tailwindcss` | v4 | Utilitários pontuais |
| `recharts` | v3 | Gráficos em GraficosPage |
| `react-big-calendar` | v1 | Agenda em CalendarioPage |
| `lucide-react` | v1 | Ícones alternativos ao MUI |
| `date-fns` | v4 | Manipulação de datas |
| `react` + `react-router-dom` + `@tanstack/react-query` | 19 / 7 / 4 | Core |

---

## Estado atual do visual (o que já foi feito)

### DashboardLayout.jsx — sidebar
- Fundo escuro `SIDEBAR_BG = '#0f1729'`
- Itens de nav com hover/selected em rgba branco
- Ícone selecionado `#60a5fa`, barra indicadora lateral
- Footer com Avatar do usuário + botão logout vermelho
- Fundo do conteúdo principal: `#f3f6fa`

### VisaoGeralPage.jsx — dashboard
- 4 StatCards com `borderTop` colorida (azul / vermelho / verde / âmbar)
- Lista de ações rápidas "Eu quero..."
- Cards com sombra sutil e bordas leves

### LoginPage / BrandHeader / uiStyles.js
- Gradiente escuro: `135deg, #0f1729 → #1a2744 → #1e3a5f → #1565c0`
- Card branco com sombra forte
- Logo colorida original (sem filtro)
- Texto branco no header do card

---

## Arquivos-chave

```
src/
├── components/
│   ├── DashboardLayout.jsx     ← layout principal + sidebar
│   ├── BrandHeader.jsx         ← header do login
│   ├── FormRenderer.jsx        ← renderiza os 8 formulários via forms.json
│   └── DashboardContent.jsx    ← roteador interno do dashboard
├── pages/
│   ├── VisaoGeralPage.jsx
│   ├── FamiliasPage.jsx
│   ├── GraficosPage.jsx
│   ├── CalendarioPage.jsx
│   ├── ProfilePage.jsx
│   ├── TranscricaoAudioPage.jsx
│   └── ui/                     ← ~50 componentes reutilizáveis
│       ├── uiStyles.js         ← constantes do auth shell
│       ├── PageWrapper, PageSection, PageGrid, PageStack
│       ├── FormCard, FormProgress, FormStepper, FormActionsFooter
│       ├── StatusChip, FilterPanel, PageListItem
│       ├── ChartFrame, ChartTooltipCard
│       ├── EmptyState, ErrorState, LoadingState
│       └── ...
```

---

## O que precisa de refino (prioridade alta → baixa)

### 1. FamiliasPage — lista de famílias
- Lista básica; melhorar tipografia, chips de status, hover states, filtros
- Usar `StatusChip`, `FilterPanel`, `PageListItem` já existentes

### 2. GraficosPage — gráficos
- Recharts instalado; melhorar containers, títulos, espaçamento
- Usar `ChartFrame`, `PageSection` existentes

### 3. Formulários multi-etapa (FormFlowLayout / FormCard / FormProgress)
- 8 formulários via FormRenderer
- Verificar consistência visual: barra de progresso, botões próximo/voltar, campos obrigatórios
- Usar `FormActionsFooter`, `FormProgress`, `FormStepper` existentes

### 4. CalendarioPage
- `react-big-calendar` tem estilo próprio; integrar visualmente com o tema do sistema

### 5. Estados (EmptyState, ErrorState, LoadingState)
- Garantir visual coeso: ícones MUI, cores do sistema

### 6. ProfilePage
- Verificar apresentação: avatar, campos de informação, layout geral

---

## Regras obrigatórias

> Violar qualquer regra abaixo pode quebrar o visual ou a funcionalidade existente.

1. **NUNCA aplicar `filter: brightness(0) invert(1)` na logo** — `chicoLogo.png` é colorida e deve aparecer com cores naturais
2. **Priorizar componentes já existentes em `src/pages/ui/`** antes de criar qualquer coisa nova
3. **MUI `sx` prop** como primeira opção de estilo; Tailwind só para ajustes pontuais
4. **Sem instalar novas dependências** — tudo necessário já está disponível
5. **Mudanças incrementais** — uma página/componente por vez, verificar no browser antes de continuar
6. **Não refatorar lógica de dados** — apenas estilo e apresentação visual

---

## Como iniciar

```bash
# 1. Subir o frontend
cd SASF-FRONT
npm run dev

# 2. Logar
# URL: http://localhost:5173/login
# Email: gabriel@unas.org.br
# Senha: Insper123!

# 3. Percorrer cada página e avaliar visualmente

# 4. Para capturar screenshots de todas as páginas
npx playwright test visual.spec.js --project=chromium
# Screenshots salvos em: SASF-FRONT/img/
```

---

## Objetivo

Visual **coeso, profissional e consistente** em todas as páginas — aproveitando ao máximo o que já existe, sem aumentar a complexidade do projeto.
