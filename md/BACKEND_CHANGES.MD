# Mudanças necessárias no Backend

## Status atual dos endpoints

| Endpoint | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/familia` | ✅ | ✅ | ✅ | ? |
| `/api/membro` | ✅ | ✅ | ? | ? |
| `/api/prontuario` | ✅ | ✅ | ? | ? |
| `/api/usuario` | ✅ | ✅ | ✅ | ? |
| `/api/google-calendar/*` | ✅ | ✅ | — | ✅ |
| `/api/representante` | ❌ 500 | ❌ 500 | — | — |
| `/api/endereco` | ❌ 500 | ❌ 500 | — | — |

---

## Fix 1 — Controladores /api/representante e /api/endereco retornam 500

**Erro:** ambos GET e POST retornam `INTERNAL_ERROR` em produção.

Verificar o stack trace no Docker:
```bash
docker logs sasf-backend-1 --follow
# Em outro terminal:
curl http://localhost:80/api/representante -H "Authorization: Bearer $TOKEN"
```

O log vai revelar a causa — provavelmente `NullPointerException` no mapeamento de entidade ou migração de banco faltando para essas tabelas.

---

## Fix 2 — Adicionar nomeRepresentante ao FamiliaResponseDTO

**Contexto:** `FamiliaResponseDTO` retorna apenas `representanteId` (UUID). O frontend exibe o nome do membro com `parentescoOuVinculo = "Representante"` como fallback, mas o ideal é ter o nome direto na resposta da família.

**Fix sugerido:**

```java
public class FamiliaResponseDTO {
    private UUID id;
    private UUID representanteId;
    private String nomeRepresentante; // NOVO — buscar via representante.getNome()
    private List<UUID> membrosIds;
    private UUID prontuarioId;
    private Boolean ativo;
    private Prioridade prioridade;
    private LocalDate ultimaVisita;
    private LocalDate proximaVisita;
    private UUID orientadorId;
}
```

Quando esse campo existir, o frontend (`familias.service.js`) já está preparado — usa `f.nomeRepresentante` se disponível, senão cai para o membro representante, senão para `"Família {id}"`.

---

## Resumo de prioridade

| # | Fix | Impacto |
|---|---|---|
| 1 | GET/POST `/representante` e `/endereco` — 500 | Famílias com nome e endereço reais via seed |
| 2 | `nomeRepresentante` no `FamiliaResponseDTO` | Nome real na listagem sem requisição extra |
