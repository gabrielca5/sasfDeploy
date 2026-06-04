# Resumo da Integração — SASF Frontend

## O que foi feito

### 1. Autenticação JWT

**Arquivos criados:**
- `src/services/auth.service.js` — funções `login()`, `register()`, `logout()`, `getToken()`, `getUser()`
- `src/contexts/AuthContext.jsx` — `AuthProvider` + hook `useAuth()` com estado global do usuário
- `src/components/ProtectedRoute.jsx` — guarda rotas por autenticação e por papel (cargo)
- `.env` — `VITE_API_URL=http://98.89.223.51/api`

**Arquivos modificados:**
- `src/lib/apiClient.js` — injeta `Authorization: Bearer <token>` automaticamente em toda requisição
- `src/App.jsx` — envolve a app com `AuthProvider`, todas as rotas do dashboard protegidas com `ProtectedRoute`
- `src/components/LoginForm.jsx` — conectado ao `POST /api/usuario/login`, trata erro 401
- `src/components/RegisterForm.jsx` — campos completos conforme API (`cargo`, `telefone`, `endereco`, etc.), conectado ao `POST /api/usuario`, redireciona para `/login` com mensagem de sucesso
- `src/pages/LoginPage.jsx` — exibe alerta de sucesso quando vindo do registro
- `src/components/DashboardLayout.jsx` — exibe email e cargo real do usuário logado na sidebar, logout limpa o token

**Fluxo implementado:**
```
Login → POST /api/usuario/login → salva JWT no localStorage
Toda requisição → Authorization: Bearer <token> injetado automaticamente
Rota protegida sem token → redireciona para /login
Rota com cargo incorreto → redireciona para /dashboard/visao-geral
Logout → remove token, redireciona para /login
```

**RBAC configurado:**
- `/dashboard/usuarios` — apenas `ADMIN` e `GESTOR`
- Demais rotas do dashboard — qualquer usuário autenticado

---

### 2. Perfil do Usuário

**Arquivo modificado:** `src/pages/ProfilePage.jsx`

- Busca dados reais via `GET /api/usuario/{userId}` (userId extraído do JWT)
- Exibe: nome, cargo, email, CPF, telefone, endereço
- Botão **Editar perfil** abre modal com formulário
- Modal faz `PUT /api/usuario/{userId}` — campos editáveis: nome, email, telefone, CPF, endereço
- Após salvar, invalida o cache do React Query e atualiza a tela automaticamente
- Cargo e status `ativo` não são editáveis pelo próprio usuário (campo administrativo)

---

### 3. Google Calendar

**Arquivos criados:**
- `src/pages/CalendarioCallbackPage.jsx` — rota `/calendario/callback`, captura `?code=...&state=...` do redirect do Google e faz `POST /api/google-calendar/callback`

**Arquivo modificado:** `src/pages/CalendarioPage.jsx`
- Substituiu o placeholder estático pelo componente `GoogleCalendarCard`
- `GET /api/google-calendar/status` — verifica se está conectado e se as credenciais estão configuradas
- Botão **Conectar Google Agenda** → `GET /api/google-calendar/auth-url` → redireciona para o Google
- Quando conectado: exibe data de conexão, expiração do token e botão **Desconectar** (`DELETE /api/google-calendar/conexao`)
- Se credenciais não configuradas no servidor: avisa e desabilita o botão

**Fluxo OAuth implementado:**
```
1. Usuário clica "Conectar Google Agenda"
2. Frontend chama GET /api/google-calendar/auth-url
3. Redireciona para authorizationUrl (Google consent screen)
4. Google redireciona para /calendario/callback?code=...&state=...
5. Frontend faz POST /api/google-calendar/callback { code, state }
6. Backend troca pelo token e salva
7. Redireciona para /dashboard/calendario com status "Conectado"
```

**Configuração necessária no backend (`.env` do ECS):**
```
GOOGLE_CLIENT_ID=<client id do Google Cloud Console>
GOOGLE_CLIENT_SECRET=<client secret>
GOOGLE_REDIRECT_URI=http://localhost:5173/calendario/callback
```

**No Google Cloud Console:**
1. Criar projeto → ativar **Google Calendar API**
2. Configurar **OAuth consent screen**
3. Criar credencial **OAuth 2.0 Client ID** (Web application)
4. Adicionar URI autorizado: `http://localhost:5173/calendario/callback`

---

## Estrutura de arquivos adicionados/modificados

```
src/
├── contexts/
│   └── AuthContext.jsx          ← NOVO
├── services/
│   └── auth.service.js          ← NOVO
├── components/
│   ├── ProtectedRoute.jsx       ← NOVO
│   ├── LoginForm.jsx            ← MODIFICADO
│   ├── RegisterForm.jsx         ← MODIFICADO
│   └── DashboardLayout.jsx      ← MODIFICADO
├── pages/
│   ├── LoginPage.jsx            ← MODIFICADO
│   ├── ProfilePage.jsx          ← MODIFICADO
│   ├── CalendarioPage.jsx       ← MODIFICADO
│   └── CalendarioCallbackPage.jsx ← NOVO
├── lib/
│   └── apiClient.js             ← MODIFICADO
└── App.jsx                      ← MODIFICADO
.env                             ← NOVO
```
