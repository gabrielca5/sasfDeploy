# Próxima Sessão — O que fazer

## Estado atual

| Feature | Status |
|---|---|
| Login / JWT / RBAC | ✅ Funcionando |
| Perfil (GET + PUT) | ✅ Funcionando |
| Google Calendar OAuth (conectar/desconectar) | ✅ Funcionando |
| Google Calendar — exibir eventos | ⚠️ Depende do backend fix #3 |
| Google Calendar — criar evento (POST) | ⚠️ Depende do backend fix #2 |
| Famílias — listagem com dados reais | ✅ Funcionando (nome via membro) |
| Famílias — nome do representante real | ⚠️ Depende do backend fix `representante` |
| Famílias — endereço real | ⚠️ Depende do backend fix `endereco` |
| Calendário — exibir PDUs do usuário | ✅ Implementado |

---

## Prioridade 1 — Aguardar backend e testar

Quando o backend corrigir os endpoints listados em `BACKEND_CHANGES.MD`, testar:

### 1. Famílias com representante real
Após `/api/representante` funcionar, criar representantes via `SEED_FAMILIAS.MD` (passos 1–3) e verificar se o `normalizeFamilia` em `familias.service.js` exibe corretamente.

Se o backend expuser `nomeRepresentante` direto no `FamiliaResponseDTO`, atualizar `normalizeFamilia`:
```js
// familias.service.js — normalizeFamilia()
nome_representante: f.nomeRepresentante ?? representante?.nome ?? `Família ${f.id?.slice(0,8)}`,
```

### 2. Google Calendar — eventos aparecendo
Verificar no deploy se `GET /api/google-calendar/eventos?timeMin=...&timeMax=...` retorna 200.
- O frontend já envia o formato correto: `2026-06-01T00:00:00-03:00`
- Se ainda retornar 500, consultar `BACKEND_CHANGES.MD` item #2

### 3. Criar evento no Google Calendar
Testar o fluxo de agendamento no deploy. O frontend envia `2026-06-10T17:00:00Z`.
- Se ainda retornar 500, consultar `BACKEND_CHANGES.MD` item #1

---

## Prioridade 2 — Melhorias de UX pendentes

### Login não redireciona de volta ao callback OAuth
**Arquivo:** `SASF-FRONT/src/components/LoginForm.jsx:37`

Se o JWT expirar durante o fluxo OAuth, o usuário vai para `/login` mas ao logar é redirecionado para `/dashboard/visao-geral` em vez de voltar ao `/calendario/callback?code=...`.

Fix:
```js
// LoginForm.jsx
import { useLocation, useNavigate } from 'react-router-dom'

const location = useLocation()
// dentro do onSubmit, após login:
const from = location.state?.from?.pathname + (location.state?.from?.search ?? '')
navigate(from || '/dashboard/visao-geral')
```

### Famílias — filtros de distrito/benefício hardcoded
`FamiliasPage.jsx` tem `districtOptions` e `benefitOptions` hardcoded. Quando o banco tiver dados reais de endereço, derivar esses filtros dinamicamente da lista de famílias.

### Calendário — professionalName inicializa vazio
`CalendarioPage.jsx` usa `useEffect` para preencher `professionalName` quando o perfil carrega. Se o perfil demorar, o campo começa vazio. Considerar mostrar um skeleton/loading no campo.

---

## Prioridade 3 — Funcionalidades futuras

- **Criar família pelo frontend** — rota `/dashboard/familias/nova` com formulário multi-step
- **Detalhe com endereço real** — quando `/api/endereco` funcionar, enriquecer `normalizeFamilia` com logradouro, bairro, CEP
- **PDU com nome da família** — o card de tarefas no calendário mostra apenas `PDU Nº{num}`. Quando famílias tiverem nome real, cruzar `pdu.familiaId` para exibir o nome
- **Paginação de famílias** — se o banco crescer, implementar paginação no `GET /api/familia`
