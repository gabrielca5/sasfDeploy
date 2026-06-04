# Handoff — Debug Google Calendar GET/POST 500

## Situação atual

Tanto `GET /api/google-calendar/eventos?timeMin=...&timeMax=...` quanto
`POST /api/google-calendar/eventos` retornam 500.

**GET sem parâmetros funciona** — retorna eventos corretamente.
**GET com timeMin/timeMax falha** — 500.
**POST sempre falha** — 500.

---

## Causa raiz identificada (via docker logs)

```
java.lang.NumberFormatException: Invalid date/time format: 2026-06-10T17:00Z
    at com.google.api.client.util.DateTime.parseRfc3339(DateTime.java:277)
    at GoogleCalendarService.criarEvento(GoogleCalendarService.java:218)
```

O Google API Client Java (`google-http-client`) exige RFC 3339 **com segundos**:
- ✅ `2026-06-10T17:00:00Z`
- ❌ `2026-06-10T17:00Z` (sem segundos — o que o backend gerava ao converter offset)
- ❌ `2026-06-10T17:00:00.000Z` (com milissegundos)
- ❌ `2026-06-01T03:00:00Z` (suspeita: backend tenta parsear como `LocalDateTime` que não aceita `Z`)

---

## O que o frontend já tentou (CalendarioPage.jsx)

| Formato enviado | Resultado |
|---|---|
| `2026-06-10T14:00:00-03:00` | 500 — backend converte para `17:00Z` sem segundos |
| `2026-06-10T14:00:00.000-03:00` | 500 — mesmo problema |
| `2026-06-10T14:00:00` | 500 |
| `2026-06-10T17:00:00Z` | 500 (ainda não confirmado via curl) |
| `timeMin=2026-06-01T03:00:00Z` | 500 |
| `timeMin=2026-06-01T00:00:00` | 500 (último teste, sem Z) |

---

## Próximos passos para debug

### 1. Testar o POST com UTC sem milissegundos via curl

```bash
TOKEN="eyJ..."  # pega novo token do localStorage do browser
curl -s -w "\nHTTP:%{http_code}" -X POST http://localhost:80/api/google-calendar/eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"titulo":"TESTE","inicio":"2026-06-10T17:00:00Z","fim":"2026-06-10T18:00:00Z","fusoHorario":"America/Sao_Paulo","calendarId":"primary"}'
```

### 2. Testar o GET com LocalDateTime sem Z via curl

```bash
curl -s -w "\nHTTP:%{http_code}" \
  "http://localhost:80/api/google-calendar/eventos?timeMin=2026-06-01T00:00:00&timeMax=2026-06-30T23:59:59" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Se ambos ainda derem 500 — ver o log

```bash
# Terminal 1
docker logs sasf-backend-1 --follow

# Terminal 2 — rodar o curl acima
```

O stack trace vai revelar o formato exato que o backend espera.

---

## Estado atual do código frontend (CalendarioPage.jsx)

```js
// timeMin/timeMax — formato LocalDateTime sem timezone
const timeMin = format(startOfMonth(currentDate), "yyyy-MM-dd'T'HH:mm:ss")
const timeMax = format(endOfMonth(currentDate), "yyyy-MM-dd'T'23:59:59")

// POST — UTC sem milissegundos
const toUTCSeconds = (localDateTimeStr) =>
  new Date(`${localDateTimeStr}:00`).toISOString().replace(/\.\d+Z$/, 'Z')

scheduleMutation.mutate({
  titulo: eventTitle,
  inicio: toUTCSeconds(selectedDateTime),   // ex: 2026-06-10T17:00:00Z
  fim: fimDate.toISOString().replace(/\.\d+Z$/, 'Z'),
  fusoHorario: 'America/Sao_Paulo',
  descricao: `Família: ${selectedFamily?.nome_representante ?? ''}`,
})
```

---

## Hipótese mais provável para o GET ainda falhar

O `timeMin`/`timeMax` chegam ao backend como `@RequestParam LocalDateTime` ou
`@RequestParam String` e são passados diretamente ao Google SDK via
`new DateTime(timeMin)`. Se o backend tenta `new DateTime("2026-06-01T00:00:00")`
sem timezone, o SDK pode rejeitar por falta de `Z` ou offset.

**Formato que provavelmente funciona:** `2026-06-01T00:00:00-03:00`
(com offset explícito, mas sem conversão para UTC que perde os segundos)

### Teste a fazer no curl:

```bash
curl -s -w "\nHTTP:%{http_code}" \
  "http://localhost:80/api/google-calendar/eventos?timeMin=2026-06-01T00:00:00-03:00&timeMax=2026-06-30T23:59:59-03:00" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Resumo do que está funcionando

- ✅ Login / JWT
- ✅ Registro
- ✅ Perfil (GET + PUT)
- ✅ Proteção de rotas (RBAC)
- ✅ Google Calendar OAuth (conectar/desconectar)
- ✅ `GET /api/google-calendar/eventos` **sem parâmetros**
- ✅ Calendário react-big-calendar renderizando
- ❌ `GET /api/google-calendar/eventos?timeMin=...` — 500
- ❌ `POST /api/google-calendar/eventos` — 500
