# Correções necessárias no backend — Rastreamento de documentos por prontuário

Este documento descreve três problemas encontrados ao construir a tela de detalhes de famílias,
onde o status de documentos (Completo / Pendente) é determinado pelo frontend consultando o backend.

---

## Problema 1 — Visita Domiciliar nunca aparece como "Completo"

### O que acontece

`POST /api/fichavisita` aceita `prontuarioId` no corpo e salva a visita corretamente.
Porém, o `ProntuarioResponseDTO` **não tem nenhum campo que liste os IDs das visitas**.
O prontuário sabe que pertence a uma família, mas a família/prontuário não sabe quais visitas existem.

### Impacto no frontend

O frontend não consegue saber se um prontuário tem visitas registradas sem buscar
**todas** as visitas do sistema (`GET /api/fichavisita?size=200`) e filtrar por
`prontuarioId` no cliente. Isso é ineficiente e não escala.

### Correção solicitada

**Opção A (preferida):** Adicionar o campo `fichasVisitaDomiciliarIds` ao `ProntuarioResponseDTO`:

```json
{
  "id": "uuid",
  "familiaId": "uuid",
  "fichasVisitaDomiciliarIds": ["uuid1", "uuid2"],
  ...
}
```

E populá-lo automaticamente sempre que uma `FichaVisitaDomiciliar` for criada
para aquele prontuário (sem necessitar PUT manual do frontend).

**Opção B (alternativa):** Adicionar filtro por `prontuarioId` no endpoint de listagem:

```
GET /api/fichavisita?prontuarioId={prontuarioId}&size=1
```

Mesmo retornar `page.totalElements > 0` já seria suficiente.

---

## Problema 2 — `planosDesenvolvimentoFamiliarIds` não é populado automaticamente

### O que acontece

O `ProntuarioResponseDTO` tem o campo `planosDesenvolvimentoFamiliarIds` (correto).
Mas ao criar um Plano via `POST /api/pdf` (com `familiaId` no corpo), **o backend não
atualiza automaticamente** o prontuário correspondente.

O frontend precisou implementar uma lógica manual de "GET prontuário → merge IDs → PUT prontuário"
para fazer esse vínculo após cada criação. Essa lógica é frágil: se o GET falhar, os IDs
existentes são sobrescritos com `[]`.

### Impacto no frontend

- Famílias criadas antes dessa lógica existir têm `planosDesenvolvimentoFamiliarIds: []` no prontuário,
  então o documento aparece como "Pendente" mesmo que o plano exista.
- Workaround atual: buscar `GET /api/pdf?size=200` e filtrar por `familiaId` no cliente.

### Correção solicitada

Quando `POST /api/pdf` recebe um `familiaId`, o backend deve:

1. Buscar o prontuário ativo da família (`prontuario.familiaId == familiaId`)
2. Adicionar o ID do novo plano a `prontuario.planosDesenvolvimentoFamiliarIds`
3. Salvar o prontuário atualizado

O frontend **não deveria precisar** fazer o `PUT /prontuario` manualmente após criar um documento.

Alternativamente, adicionar filtro no endpoint de listagem:

```
GET /api/pdf?familiaId={familiaId}&size=1
```

---

## Problema 3 — `planosDesenvolvimentoUsuarioIds` não é populado automaticamente

### O que acontece

Idêntico ao Problema 2, mas para o PDU.

`POST /api/pdu` recebe `familiaId`, mas **não atualiza** `prontuario.planosDesenvolvimentoUsuarioIds`.

### Correção solicitada

Mesma lógica do Problema 2: ao criar um PDU, o backend deve vincular automaticamente
o ID ao prontuário ativo da família.

Ou adicionar filtro:

```
GET /api/pdu?familiaId={familiaId}&size=1
```

---

## Resumo das correções

| Endpoint | Problema | Correção |
|---|---|---|
| `POST /api/fichavisita` | Não vincula ao prontuário | Auto-vincular ou adicionar `fichasVisitaDomiciliarIds` no `ProntuarioResponseDTO` |
| `POST /api/pdf` | Não vincula ao prontuário | Auto-vincular `planosDesenvolvimentoFamiliarIds` no prontuário da família |
| `POST /api/pdu` | Não vincula ao prontuário | Auto-vincular `planosDesenvolvimentoUsuarioIds` no prontuário da família |
| `GET /api/fichavisita` | Sem filtro por `prontuarioId` | Adicionar parâmetro de query `prontuarioId` |
| `GET /api/pdf` | Sem filtro por `familiaId` | Adicionar parâmetro de query `familiaId` |
| `GET /api/pdu` | Sem filtro por `familiaId` | Adicionar parâmetro de query `familiaId` |

### Prioridade recomendada

1. **Auto-vínculo no POST** — resolve o problema de forma definitiva e permanente
2. **Filtro nos GETs** — permite que o frontend detecte documentos existentes com uma query leve

Enquanto o backend não implementar essas correções, o frontend está fazendo buscas em lote
(`size=200`) e filtrando no cliente, o que **não é viável em produção com volume de dados real**.
