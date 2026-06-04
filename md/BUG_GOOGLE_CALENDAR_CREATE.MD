# Bug: POST /api/google-calendar/eventos retorna 500

## Diagnóstico

- `GET /api/google-calendar/eventos` → **funciona** (eventos do Google retornados corretamente)
- `POST /api/google-calendar/eventos` → **500 INTERNAL_ERROR** sempre
- Testado diretamente na EC2 (sem Vercel), com token válido e múltiplos formatos de datetime
- Backend não loga nenhum stack trace — exception handler está engolindo o erro silenciosamente

**Conclusão: bug no código Java do backend, não no frontend.**

---

## O que o backend precisa fazer

### 1. Expor o stack trace no log

Encontrar o `@ControllerAdvice` / exception handler global e adicionar log antes de retornar `INTERNAL_ERROR`:

```java
log.error("Erro não tratado: {}", e.getMessage(), e);
```

### 2. Rebuildar e republicar

```bash
# Na máquina de desenvolvimento do backend
docker build -t gabrielca5/sasf-app:latest .
docker push gabrielca5/sasf-app:latest

# Na EC2
cd ~/sasf
docker compose pull
docker compose up -d
```

### 3. Reproduzir o erro e ler o log

```bash
# Na EC2 — deixa rodando
docker logs sasf-backend-1 --follow

# Em outro terminal, dispara o POST
TOKEN="eyJ..."
curl -s -X POST http://localhost:80/api/google-calendar/eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"titulo":"TESTE","inicio":"2026-06-10T14:00:00.000-03:00","fim":"2026-06-10T15:00:00.000-03:00","fusoHorario":"America/Sao_Paulo","calendarId":"primary"}'
```

O stack trace vai aparecer no `--follow` e revelar a causa raiz.

---

## Hipóteses mais prováveis

| Hipótese | Sintoma esperado no stack trace |
|---|---|
| `DateTimeParseException` — parsing do campo `inicio`/`fim` | `java.time.format.DateTimeParseException` |
| Token do Google expirado / sem refresh | `TokenResponseException` ou `GoogleJsonResponseException 401` |
| Falta de permissão de escrita no scope OAuth | `GoogleJsonResponseException 403` |
| NullPointerException no serviço | `NullPointerException` em `GoogleCalendarService` |

---

## Status do frontend

Frontend está correto e pronto. Quando o backend for corrigido, o agendamento funcionará automaticamente sem nenhuma alteração no frontend.
