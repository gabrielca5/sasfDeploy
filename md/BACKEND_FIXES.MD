# Backend Fixes Necessários

## 1. OAuth Callback — Duplicate Key (CRÍTICO)

**Arquivo:** `GoogleCalendarService.java:144`  
**Erro:** `duplicate key value violates unique constraint "uk6cyuth00fhxa30dns02ukkxdc"`

O método `conectar` sempre faz INSERT. Se o usuário já conectou antes, quebra na segunda tentativa.

**Fix:** upsert em vez de insert cego.

```java
// GoogleCalendarService.conectar()
GoogleCalendarConnection conn = repository.findByUsuarioId(usuarioId)
    .orElse(new GoogleCalendarConnection());
// atualiza os campos: accessToken, refreshToken, expiresAt, scope, etc.
conn.setAccessToken(...);
conn.setRefreshToken(...);
// ...
repository.save(conn);
```

---

## 2. POST /api/google-calendar/eventos — Formato de Data Inválido

**Arquivo:** `GoogleCalendarService.java:218`  
**Erro:** `NumberFormatException: Invalid date/time format: 2026-06-10T17:00Z`

O Google SDK Java (`google-http-client`) exige RFC 3339 **com segundos**:
- ✅ `2026-06-10T17:00:00Z`
- ❌ `2026-06-10T17:00Z` (sem segundos)
- ❌ `2026-06-10T17:00:00.000Z` (com milissegundos)

O frontend já envia `2026-06-10T17:00:00Z` corretamente. O backend está convertendo o valor recebido e perdendo os segundos no processo.

**Fix:** ao construir o `EventDateTime`, garantir que o formato tenha segundos:

```java
// Opção A — receber como String e passar direto ao SDK
new DateTime(inicioStr); // funciona se inicioStr = "2026-06-10T17:00:00Z"

// Opção B — se o backend usa OffsetDateTime internamente, formatar com segundos
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
String formatted = offsetDateTime.format(fmt); // → "2026-06-10T17:00:00Z"
new DateTime(formatted);
```

Verificar onde `inicio`/`fim` são recebidos no controller/DTO e rastrear até a linha 218 para ver qual conversão está removendo os segundos.

---

## 3. GET /api/google-calendar/eventos?timeMin=...&timeMax=... — 500

**Hipótese:** `timeMin`/`timeMax` chegam como `@RequestParam LocalDateTime` e o backend passa direto ao Google SDK via `new DateTime(timeMin.toString())`. `LocalDateTime.toString()` omite segundos quando são zero (ex: `2026-06-01T00:00` → sem segundos e sem timezone → SDK rejeita).

**Fix:** garantir que o valor passado ao SDK tenha segundos e timezone:

```java
// Se o parâmetro for LocalDateTime, converter para OffsetDateTime antes de passar ao SDK
ZonedDateTime zdt = timeMin.atZone(ZoneId.of("America/Sao_Paulo"));
String formatted = zdt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX"));
new DateTime(formatted); // → "2026-06-01T00:00:00-03:00"
```
