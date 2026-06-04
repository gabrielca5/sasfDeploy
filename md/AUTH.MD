# Autenticação — SASF Backend

Documentação do fluxo de autenticação para integração com o frontend.

---

## Visão Geral

O sistema usa **JWT stateless** com RBAC de 4 papéis: `ADMIN`, `GESTOR`, `TECNICO`, `ORIENTADOR`.  
Senhas são armazenadas com **BCrypt** (custo 12). O token expira em **24 horas**.

---

## Endpoints de Autenticação

### Login

```
POST /api/usuario/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "usuario@email.com",
  "senha": "minhasenha123"
}
```

**Resposta 200 OK:**
```json
{
  "token": "<JWT>"
}
```

**Erros:**
| HTTP | `codigoErro`   | Situação                              |
|------|---------------|---------------------------------------|
| 401  | `UNAUTHORIZED` | Email não existe, senha errada, ou usuário com `ativo=false` |

---

### Registro de Usuário

```
POST /api/usuario
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nome Completo",
  "email": "usuario@email.com",
  "senha": "minhasenha123",
  "cargo": "TECNICO",
  "telefone": "11999999999",
  "cpf": "000.000.000-00",
  "endereco": "Rua X, 123",
  "dataDeInclusao": "2024-01-01",
  "ultimaAtualizacao": "2024-01-01",
  "ativo": true
}
```

Campos obrigatórios: `name`, `email`, `senha` (mín. 8 chars), `cargo`.

**Resposta 200 OK:** objeto `UsuarioResponseDTO` (sem campo `senha`).

**Erros:**
| HTTP | `codigoErro`             | Situação               |
|------|--------------------------|------------------------|
| 409  | `USUARIO_ALREADY_EXISTS` | Email já cadastrado    |

---

## Usando o Token nas Requisições

Todas as rotas protegidas exigem o header:

```
Authorization: Bearer <token>
```

Sem o header (ou com token inválido/expirado), a API retorna **401 Unauthorized**.

---

## Estrutura do JWT

O token é um JWT assinado com HMAC-SHA. Payload contém:

| Campo          | Tipo     | Descrição                        |
|---------------|----------|----------------------------------|
| `sub`          | string   | Email do usuário                 |
| `userId`       | string   | UUID do usuário                  |
| `cargoUsuario` | string   | Papel: `ADMIN`, `GESTOR`, `TECNICO`, `ORIENTADOR` |
| `iat`          | number   | Timestamp de emissão             |
| `exp`          | number   | Timestamp de expiração (iat + 24h) |

---

## Papéis e Permissões (Resumo)

| Rota / Recurso           | ADMIN | GESTOR | TECNICO | ORIENTADOR |
|--------------------------|:-----:|:------:|:-------:|:----------:|
| Gestão de usuários (CRUD)| ✅    | ✅     | ❌      | ❌         |
| Núcleo familiar (leitura)| ✅    | ✅     | ✅      | ✅         |
| Núcleo familiar (escrita)| ✅    | ✅     | ✅      | ❌         |
| Prontuário (leitura)     | ✅    | ✅     | ✅      | ✅         |
| Prontuário (escrita)     | ✅    | ✅     | ✅      | ❌         |
| Fichas (leitura)         | ✅    | ✅     | ✅      | ✅         |
| Fichas (escrita)         | ✅    | ✅     | ✅      | ❌         |
| Ficha visita domiciliar  | ✅    | ✅     | ✅*     | ✅         |
| Google Calendar          | ✅    | ✅     | ✅      | ✅         |
| Deleção (qualquer)       | ✅    | ✅     | ❌      | ❌         |

\* TECNICO pode apenas **ler** fichas de visita.

---

## Formato de Erro Padrão

Todos os erros seguem este formato:

```json
{
  "mensagem": "Não autorizado",
  "data": "2024-01-01T12:00:00",
  "codigoHttp": 401,
  "codigoErro": "UNAUTHORIZED",
  "path": "/api/usuario/login"
}
```

---

## Fluxo Completo para o Frontend

```
1. POST /api/usuario/login  →  recebe { token }
2. Armazena o token (localStorage ou cookie seguro)
3. Inclui em toda requisição: Authorization: Bearer <token>
4. Se receber 401, redirecionar para tela de login
5. Token expira após 24h — fazer novo login
```

---

## Enum `CargoUsuario`

Valores aceitos nos campos `cargo`:

- `ADMIN`
- `GESTOR`
- `TECNICO`
- `ORIENTADOR`

---

## Notas para a IA do Frontend

- O campo de senha no backend se chama **`senha`** (não `password`).
- O token retornado está diretamente em `response.token` (não dentro de um objeto `data`).
- Não existe refresh token — quando o token expirar, o usuário deve fazer login novamente.
- CORS está liberado para todas as origens (`allowedOriginPatterns: *`), então não há problema de CORS em desenvolvimento local.
- Para decodificar o token no frontend (sem verificar assinatura), qualquer biblioteca JWT padrão funciona — o payload contém `userId`, `sub` (email) e `cargoUsuario`.
