# Seed de Famílias — Instruções para o Backend

## Por que é necessário

`FamiliaSaveDTO` exige `representanteId`, que por sua vez exige `enderecoId`.
A ordem obrigatória é: **Endereço → Representante → Família → Membros → Prontuário**.

---

## Passo 0 — Obter token

```bash
TOKEN=$(curl -s -X POST http://localhost:80/api/usuario/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","senha":"suasenha"}' | jq -r '.token')

echo $TOKEN
```

> Substitua `email` e `senha` por uma conta válida já cadastrada.

---

## Passo 1 — Criar Endereço

**POST** `/api/endereco`

```bash
ENDERECO_ID=$(curl -s -X POST http://localhost:80/api/endereco \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "logradouro": "Rua das Flores",
    "numero": "124",
    "complemento": "Apto 12",
    "bairro": "Heliópolis",
    "cep": "04212-300",
    "distrito": "Ipiranga",
    "pontoReferencia": "Próximo ao mercado"
  }' | jq -r '.id')

echo "Endereço: $ENDERECO_ID"
```

---

## Passo 2 — Criar Representante

**POST** `/api/representante`

```bash
REPRESENTANTE_ID=$(curl -s -X POST http://localhost:80/api/representante \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nome": "Mariana Souza Pereira",
    "dataNascimento": "1987-09-21",
    "sexo": "FEMININO",
    "nisNitNb": "123.45678.90-1",
    "naturalidade": "São Paulo",
    "corRaca": "PARDA",
    "possuiDeficiencia": false,
    "cpf": "123.456.789-00",
    "rg": "45.678.901-2",
    "orgaoEmissorRg": "SSP/SP",
    "ufRg": "SP",
    "ctpsNumero": "789654",
    "ctpsSerie": "012",
    "nomeMae": "Lucia Souza",
    "nomePai": "Carlos Pereira",
    "estadoCivil": "CASADO",
    "grauInstrucao": "ENSINO_MEDIO_COMPLETO",
    "profissao": "Auxiliar administrativa",
    "ocupacao": "EMPREGADO",
    "renda": 2380.00,
    "enderecoId": "'$ENDERECO_ID'",
    "telefoneResidencial": "(11) 3333-1122",
    "telefoneCelular": "(11) 98888-2233"
  }' | jq -r '.id')

echo "Representante: $REPRESENTANTE_ID"
```

---

## Passo 3 — Criar Família

**POST** `/api/familia`

```bash
FAMILIA_ID=$(curl -s -X POST http://localhost:80/api/familia \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "representanteId": "'$REPRESENTANTE_ID'",
    "ativo": true,
    "prioridade": "ALTA",
    "ultimaVisita": "2026-05-15",
    "proximaVisita": "2026-07-10",
    "membrosIds": [],
    "prontuarioId": null
  }' | jq -r '.id')

echo "Família: $FAMILIA_ID"
```

---

## Passo 4 — Criar Membros (opcional, enriquece os dados)

**POST** `/api/membro`

```bash
MEMBRO1_ID=$(curl -s -X POST http://localhost:80/api/membro \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "numeroOrdem": 1,
    "nome": "João Pereira",
    "dataNascimento": "2010-03-15",
    "parentescoOuVinculo": "Filho",
    "profissao": "Estudante",
    "ocupacao": "Estudante",
    "renda": 0,
    "fatoresRiscoSocial": [],
    "familiaId": "'$FAMILIA_ID'"
  }' | jq -r '.id')

echo "Membro 1: $MEMBRO1_ID"
```

---

## Passo 5 — Criar Prontuário (opcional, mas necessário para registros)

**POST** `/api/prontuario`

```bash
PRONTUARIO_ID=$(curl -s -X POST http://localhost:80/api/prontuario \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "familiaId": "'$FAMILIA_ID'",
    "fichasAtualizacaoQuadroSituacionalIds": [],
    "planosDesenvolvimentoFamiliarIds": [],
    "folhasProsseguimentoIds": [],
    "planosDesenvolvimentoUsuarioIds": []
  }' | jq -r '.id')

echo "Prontuário: $PRONTUARIO_ID"
```

---

## Passo 6 — Atualizar Família com membros e prontuário

**PUT** `/api/familia/{id}`

```bash
curl -s -X PUT http://localhost:80/api/familia/$FAMILIA_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "representanteId": "'$REPRESENTANTE_ID'",
    "membrosIds": ["'$MEMBRO1_ID'"],
    "prontuarioId": "'$PRONTUARIO_ID'",
    "ativo": true,
    "prioridade": "ALTA",
    "ultimaVisita": "2026-05-15",
    "proximaVisita": "2026-07-10"
  }'
```

---

## Repetir para mais famílias

Execute os passos 1–6 novamente com dados diferentes para criar mais famílias de teste. O mínimo viável são os passos 1, 2 e 3.

---

## Verificar

```bash
# Listar todas as famílias criadas
curl -s http://localhost:80/api/familia \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## Observações

- `jq` precisa estar instalado para extrair os IDs automaticamente. Se não tiver, copie o `id` manualmente de cada resposta.
- Todos os campos marcados como `null` ou `[]` nos DTOs são opcionais — os passos 4, 5 e 6 só são necessários se quiser dados completos.
- O frontend exibe `Família {id-truncado}` enquanto o `FamiliaResponseDTO` não retornar `nome`. Para mostrar o nome, o backend precisa incluir o nome do representante na resposta — veja `BACKEND_FIXES.MD` se quiser adicionar esse campo.
