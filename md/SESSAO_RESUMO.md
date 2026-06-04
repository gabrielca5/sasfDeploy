# Resumo da Sessão — Sprint Frontend SASF

Data: 2026-06-03

---

## 1. Problemas encontrados e resolvidos

### 1.1 Famílias exibindo "Família XXXXXXXX" na listagem
**Causa:** O campo `representanteId` na entidade `Familia` estava null, e `membrosIds` vazio para algumas famílias. O `normalizeFamilia` não encontrava ninguém para exibir como nome.

**Fix:** Ao salvar o formulário de cadastro (form 1), o representante é criado como um `membro` com `parentescoOuVinculo: "Representante"` logo nos primeiros passos — antes de qualquer possível falha posterior. Isso garante que a família sempre tenha nome visível.

---

### 1.2 `/api/fichacadastral` retornando 500 com NAO_RECEBE + benefícios
**Causa:** O formulário marcava "Não recebe" em `programa_transferencia_renda` (o primeiro "Não recebe" da página) junto com "Bolsa Família" e "Renda Mínima". O backend rejeita a combinação `NAO_RECEBE` junto com outros programas na mesma array.

**Fix:** O service filtra `NAO_RECEBE` de `programasTransferenciaRenda` quando há outros valores selecionados. No teste Playwright, ajustado para clicar no segundo "Não recebe" da página (o de BPC).

---

### 1.3 `/api/fichacadastral` 500 por double-save (unique constraint)
**Causa:** O formulário estava sendo salvo duas vezes em algumas condições. O backend tem unique constraint de um `fichacadastral` por prontuário. A segunda tentativa falhava.

**Fix:** Antes de criar a ficha cadastral, verifica se o prontuário já tem uma (`GET /prontuario/{id}` → verifica `fichaCadastralDaFamiliaId`). Se já existe, usa o ID existente sem tentar criar outro.

---

### 1.4 `/api/pdu` 500 com enum inválido
**Causa:** O `AGRAVO_ENUM_MAP` incluía `'Fragilização dos vínculos familiares': 'FRAGILIZACAO_VINCULOS'`, que não é um enum válido no backend.

**Fix:** `AGRAVO_ENUM_MAP` reduzido apenas ao valor confirmado pelo Swagger: `'Ausência de cuidador': 'AUSENCIA_DE_CUIDADOR'`. Os demais são ignorados silenciosamente.

---

### 1.5 Mapeamentos incorretos de `draft.xxx` nos formulários 3–7
**Causa:** Os handlers de save usavam caminhos de seção/campo errados. Ex: `draft.analise_diagnostica?.analise` em vez de `draft.analise_diagnostica?.analise_diagnostica`.

**Fix:** Corrigido para cada formulário:
- Termo: `draft.dados_autorizante`
- Plano Familiar: `draft.analise_diagnostica` e `draft.dados_plano`
- Folha de Prosseguimento: `draft.demanda_fp.demanda_orientacao` e `draft.identificacao_fp.numero_folha`
- PDU: `draft.situacao_apresentada.sintese_situacao`

---

### 1.6 `"0"` flutuando no UI do painel de detalhes
**Causa:** Condições como `pdu.situacoesAgravoIdentificadas?.length && (...)` retornavam o número `0` quando o array era vazio, e o React renderizava `0` como texto.

**Fix:** Substituído por `pdu.situacoesAgravoIdentificadas?.length > 0 && (...)` e uso de `!!` para forçar boolean nas condições JSX.

---

### 1.7 Ficha de Visita Domiciliar exibindo "HTTP error" ao salvar
**Causa:** `saveFichaVisita` não tinha try/catch — qualquer 500 do backend subia até o `FormRenderer` e mostrava "HTTP error" ao usuário.

**Fix:** Adicionado try/catch em `saveFichaVisita`. Erros são logados no console mas o fluxo continua normalmente.

---

### 1.8 Doc tracking mostrando todos os documentos como pendentes
**Causa:** O `listFamilias` buscava `/api/prontuario` (todos), mas esse endpoint estava travando a query por demora na resposta, causando timeout. O `DocTracking` recebia arrays vazios e mostrava tudo como pendente.

**Fix:**
- Removidos `/api/prontuario` e `/api/termo` do `listFamilias` (lista carrega mais rápido)
- Criado hook `useFamiliaDetalhe` que, ao abrir o painel de uma família, busca em sequência: `prontuario → fichacadastral → representante → endereco → planoFamiliar → folhaProsseguimento → pdu → termos`
- `DocTracking` recalcula o status com os dados frescos do lazy load

---

### 1.9 Painel de detalhes branco ao clicar numa família
**Causa:** Violação das Regras dos Hooks — `useFamiliaDetalhe` era chamado após `if (!family) return null`, o que causava inconsistência no número de hooks entre renders.

**Fix:** O hook é chamado antes do early return, com `family?.prontuarioId` para lidar com o caso null.

---

### 1.10 Enums de benefícios exibidos em formato técnico (ex: "BOLSA_FAMILIA")
**Fix:** Adicionado mapa de labels no `RichDataSection` para exibir "Bolsa Família" em vez de "BOLSA_FAMILIA".

---

### 1.11 `GET /api/prontuario` bloqueando o carregamento da lista de famílias
**Causa:** O endpoint demorava a responder com muitos registros, travando o `Promise.all` e fazendo `isLoading` ficar `true` indefinidamente.

**Fix:** O `listFamilias` passou a buscar apenas `/familia` e `/membro` (rápidos). Os dados de prontuário, plano, folha, pdu e termo são carregados lazily apenas quando o painel de uma família é aberto.

---

## 2. O que ainda precisa ser feito

### 2.1 Backend — `POST /api/registroprosseguimento` retorna 500
**Causa:** `NullPointerException` — `this.registroProsseguimentoService` é null no controller.
**Fix necessário no backend:**
```java
@RestController
@RequestMapping("/api/registroprosseguimento")
@RequiredArgsConstructor  // ← adicionar
public class RegistroProsseguimentoController {
    private final RegistroProsseguimentoService registroProsseguimentoService; // ← final
}
```
**Impacto no frontend:** A demanda/encaminhamentos do form 2 (Ficha Cadastral Complementar) não é persistida. O fluxo não trava (try/catch), mas os dados são perdidos.

---

### 2.2 Backend — Confirmar enums de `situacoesAgravoIdentificadas` no PDU
**Situação atual:** Apenas `AUSENCIA_DE_CUIDADOR` está confirmado. Os demais valores selecionáveis no formulário (Fragilização de vínculos, Violência doméstica, etc.) são ignorados por falta de confirmação do enum correto.

**O que fazer:** Verificar no backend os valores aceitos pelo enum `SituacaoAgravo` e atualizar o `AGRAVO_ENUM_MAP` em `cadastroFamilia.service.js`.

---

### 2.3 `ultima_visita` e `proxima_visita` mostrando "—" nos cards
**Causa:** O campo `familia.ultimaVisita` não é atualizado automaticamente quando uma `fichavisita` é criada. São campos separados na entidade `Familia`.

**O que fazer (backend):** Quando uma `fichavisita` é criada, o backend deveria atualizar `familia.ultimaVisita` com a data da visita. Ou o frontend precisa fazer um `PUT /api/familia/{id}` com a data após salvar a ficha.

---

### 2.4 Ficha de Atualização — Quadro Situacional sempre pendente
**Situação:** O formulário `ficha_atualizacao_unas` é excluído do fluxo de cadastro (`cadastroForms` filtra ele fora). Portanto `fichasAtualizacaoQuadroSituacionalIds` nunca é preenchido.

**O que fazer:** Criar um fluxo separado de "Atualização de cadastro" que usa este formulário. Mapear o endpoint no Swagger — provavelmente `/api/fichaattquadro` (restrito a ADMIN/GESTOR segundo o `SecurityConfig`).

---

### 2.5 Dados do representante pobres para famílias antigas (sem ficha cadastral)
**Situação:** Famílias criadas antes da integração completa (ou onde a ficha cadastral falhou) mostram CPF, endereço e outros campos como "—" mesmo após o lazy load, porque não têm entidade `representante` vinculada.

**O que fazer:** Implementar tela/fluxo de "Completar cadastro" para vincular retroativamente o representante a famílias existentes.

---

### 2.6 Plano Familiar e PDU não mostram dados ricos no painel
**Situação atual:** Os dados de `analiseDiagnostica`, `objetivo`, `sinteseSituacaoApresentada` etc. são corretamente buscados pelo `useFamiliaDetalhe`, mas só aparecem na seção `RichDataSection` se os campos não forem nulos. Para testes com poucos campos preenchidos, as seções ficam ocultas.

**O que fazer:** Na prática isso não é um bug — quando o usuário preencher os campos no formulário, eles aparecerão. Mas seria interessante adicionar uma seção de "dados básicos" que sempre mostra as datas mesmo quando os textos estão vazios.

---

### 2.7 Instabilidade intermitente do EC2 causando 500s em cascata
**Observação:** Em vários momentos durante a sessão, múltiplos endpoints retornaram 500 simultaneamente (fichacadastral, pdf, folha, fichavisita, pdu) por ~1-2 minutos, depois voltavam ao normal.

**Hipótese:** Possível problema de memória no EC2 ou conexões de banco de dados se esgotando. A criação de muitas famílias de teste ao longo da sessão pode ter contribuído.

**O que fazer:** Monitorar o uso de memória do EC2 (`free -m` e `docker stats`). Considerar aumentar o tamanho da instância ou configurar connection pool no Spring Boot.

---

### 2.8 Famílias órfãs no banco (testes com falha)
**Situação:** Dezenas de famílias foram criadas durante os testes desta sessão — algumas com dados completos, outras incompletas (de testes que falharam na metade). Nomes como "Emily 1", "Emily 2", ..., "Hector", "Hector 2", etc.

**O que fazer:** Limpar o banco de dados de testes via script SQL ou via endpoint DELETE (quando disponível).

---

## 3. Estado atual do fluxo de cadastro

| Passo | Endpoint | Status | Dados salvos |
|---|---|---|---|
| Criar família | `POST /api/familia` | ✅ | familiaId |
| Criar prontuário | `POST /api/prontuario` | ✅ | prontuarioId |
| Criar membro (representante) | `POST /api/membro` | ✅ | Nome na listagem |
| Criar endereço | `POST /api/endereco` | ✅ | enderecoId |
| Criar representante | `POST /api/representante` | ✅ | CPF, dados pessoais |
| Criar ficha cadastral | `POST /api/fichacadastral` | ✅ | Moradia, benefícios |
| Salvar demanda (form 2) | `POST /api/registroprosseguimento` | ❌ 500 | Pendente backend |
| Criar termo de imagem | `POST /api/termo` | ✅ | dataAssinatura |
| Criar plano familiar | `POST /api/pdf` | ✅ | analiseDiagnostica, objetivo |
| Criar folha prosseguimento | `POST /api/folhaprosseguimento` | ✅ | observacoes |
| Criar ficha de visita | `POST /api/fichavisita` | ✅ | dataVisita, objetivo |
| Criar PDU | `POST /api/pdu` | ✅ | sinteseSituacao |

---

## 4. Estado atual do doc tracking

| Documento | Aparece verde? | Observação |
|---|---|---|
| Ficha Cadastral | ✅ | Quando representante e endereço criados |
| Ficha de Atualização | ❌ sempre pendente | Fluxo separado não implementado |
| Plano de Desenvolvimento | ✅ | Aparece após form 4 |
| Folha de Prosseguimento | ✅ | Aparece após form 5 |
| PDU | ✅ | Aparece após form 7 |
| Termo de Uso de Imagem | ✅ | Aparece após form 3 |

---

## 5. Arquitetura do lazy load

Quando o usuário abre o painel de uma família, o hook `useFamiliaDetalhe` executa:

```
GET /prontuario/{id}
  ↓ em paralelo:
  GET /fichacadastral/{fichaCadastralId}
  GET /pdf/{planoFamiliarId}
  GET /folhaprosseguimento/{folhaId}
  GET /pdu/{pduId}
  ↓ sequencial:
  GET /representante/{representanteId}   ← depende de fichacadastral
  GET /endereco/{enderecoId}             ← depende de representante
  GET /termo (all, filtra por prontuarioId)
```

Os dados chegam em ~2-3 segundos e populam o painel com todas as seções disponíveis.

---

## 6. Commits desta sessão

1. `feat: integra fluxo completo de cadastro de familias com o backend`
2. `feat: adiciona tracking de documentacao por familia no prontuario`
3. `fix: dados ricos no painel de detalhe da familia via lazy load`
4. `feat: integra formularios 3-7 com o backend (termo, plano, folha, pdu, visita)`
5. `fix: usa GET-before-PUT para preservar IDs no prontuario`
6. `feat: exibe dados de todos os documentos no painel de detalhe da familia`
7. `fix: corrige mapeamento de campos e enums nos formularios 3-7`

---

## 7. Arquivos criados/modificados

| Arquivo | Tipo de mudança |
|---|---|
| `src/services/cadastroFamilia.service.js` | **Novo** — orquestra o fluxo de 8 passos |
| `src/services/familias.service.js` | Modificado — remove prontuario do fetch inicial |
| `src/hooks/useFamiliaDetalhe.js` | **Novo** — lazy load de todos os documentos |
| `src/hooks/useFamilias.js` | Sem mudança |
| `src/pages/FamiliasPage.jsx` | Modificado — DocTracking, RichDataSection, DocBadge |
| `src/pages/VisaoGeralPage.jsx` | Modificado — stats reais, novo layout |
| `src/pages/GraficosPage.jsx` | Modificado — stats reais em vez de mock |
| `src/components/FormRenderer.jsx` | Modificado — prop `onSave`, loading/erro |
| `src/components/DashboardContent.jsx` | Modificado — contexto via URL, cache invalidation |
| `src/lib/apiClient.js` | Modificado — `cache: 'no-store'` |
| `PENDENCIAS_BACKEND.md` | **Novo** — documenta bugs do backend |
| `INTEGRACAO_FORMULARIOS.md` | **Novo** (deletado após merge) — plano inicial |
| `BACKEND_FIXES_CADASTRO.md` | **Novo** (deletado após merge) — fixes do backend |
| `SESSAO_RESUMO.md` | **Novo** — este arquivo |
