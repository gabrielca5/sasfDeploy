MODO: direto. Edite arquivos. Não explique.

TAREFA:
Padronizar a UI das pages do projeto inteiro.

OBJETIVO:
Remover CSS inline, `sx` gigante, estilos repetidos e layout solto dentro das páginas.
As páginas devem usar SOMENTE componentes reutilizáveis de UI.

PASTAS PADRÃO:

1. Preferir componentes em:
   `src/pages/ui`

2. Se não existir ou fizer mais sentido global:
   `src/components/ui`

REGRA PRINCIPAL:
Pages NÃO devem conter design complexo.
Pages devem apenas montar a tela usando componentes prontos.

REMOVER DAS PAGES:

* `sx` grande/repetido
* `style={{ ... }}`
* grids manuais repetidos
* Paper/Card customizado repetido
* Stack/Box com layout complexo duplicado
* filtros com estrutura repetida
* cards com estilos próprios
* sections com estilos próprios
* dialogs com estilos próprios

CRIAR/USAR COMPONENTES PADRÃO:

* `PageWrapper`
* `PageSection`
* `SectionBlock`
* `PageCard`
* `InfoGrid`
* `DetailItem`
* `FilterPanel`
* `EmptyState`
* `ActionCard`
* `PageDialog`
* `PageToolbar`
* `PageList`
* `PageListItem`
* `PageGrid`
* `StatusChip`
* `uiStyles.js` ou `styles.js` para tokens compartilhados

PADRÃO VISUAL:

Use o estilo atual de `FamiliasPage.jsx` como referência:

* fundo
* espaçamento
* border radius
* cards/Paper
* seções
* filtros
* chips
* dialogs
* typography
* hover
* responsividade
* grids
* alinhamento

REGRAS:

* Não mudar lógica.
* Não mudar hooks.
* Não mudar rotas.
* Não mudar chamadas de API.
* Não trocar MUI.
* Não inventar backend.
* Não apagar funcionalidades.
* Não criar visual novo diferente do padrão.
* Não deixar cada página com uma identidade diferente.
* Centralizar estilo comum.
* Reutilizar componentes sempre que possível.
* Se um componente não existir, crie.
* Se existir duplicado, consolide.

PROCESSO:

1. Inspecione as pastas do projeto.
2. Ache páginas com CSS inline/`sx` repetido.
3. Crie ou ajuste componentes em `src/pages/ui` ou `src/components/ui`.
4. Refatore as páginas para usar esses componentes.
5. Garanta coerência visual entre todas as páginas.

IMPORTANTE:

Não coloque código grande no chat.
Aplique as mudanças direto nos arquivos.

SAÍDA FINAL:

* Páginas padronizadas
* O que ainda ficou pendente

Começe por AtualizarUsuarioPage.jsx



---
Copia e cola no Codex terminal:

MODO: direto. Edite arquivos. Não escreva código grande no chat.

TAREFA:
Melhorar e padronizar a visualização de estados do sistema no frontend.

OBJETIVO:
Padronizar feedback visual para estados como:

* carregando
* salvando
* sucesso
* erro
* vazio
* sem permissão
* offline/falha de conexão
* dados não encontrados
* formulário inválido

FAÇA:

1. Criar/reusar componentes globais em `src/pages/ui` ou `src/components/ui`:

   * `LoadingState`
   * `SavingState`
   * `ErrorState`
   * `SuccessState`
   * `EmptyState`
   * `PermissionState`
   * `OfflineState`
   * `StatusBanner`
   * `InlineFeedback`
   * `PageSkeleton`
   * `ButtonLoading`
   * `PageState`

2. Usar ícones MUI coerentes:

   * loading: spinner/skeleton
   * saving: progress pequeno
   * success: check
   * error: warning/error
   * empty: inbox/search
   * offline: wifi off
   * permission: lock

3. Padronizar onde aparecem:

   * página inteira: `PageState`
   * dentro de card/lista: `EmptyState` / `ErrorState`
   * dentro de formulário: `InlineFeedback`
   * botão salvando: `ButtonLoading`
   * topo da página: `StatusBanner`

4. Aplicar nas páginas principais:

   * listas
   * formulários
   * modais
   * login/register
   * páginas com hooks/API

5. Melhorar loading:

   * trocar textos soltos tipo “Carregando...” por componente visual
   * usar skeleton quando houver lista/card
   * usar spinner compacto quando for ação pequena

6. Melhorar erros:

   * mensagem clara
   * ícone
   * botão “Tentar novamente” quando existir `refetch`/callback
   * não deixar erro só no console

7. Melhorar sucesso:

   * feedback visual após salvar/criar/editar
   * usar banner/snackbar/componente padrão se já existir

8. Melhorar vazio:

   * lista vazia deve ter ícone + mensagem + ação quando fizer sentido
   * exemplo: “Nenhuma família encontrada” + “Limpar filtros” se houver callback

9. Melhorar formulário inválido:

   * mostrar erro inline
   * mostrar mensagem geral no topo/rodapé se necessário
   * destacar campos inválidos
   * não deixar falha silenciosa

REGRAS:

* Não mudar lógica de negócio.
* Não mudar rotas.
* Não mudar API.
* Não trocar MUI.
* Não inventar backend.
* Não usar CSS inline.
* Não deixar `sx` gigante nas pages.
* Centralizar estilos nos componentes/tokens.
* Manter coerência com design system atual.
* Manter acessibilidade básica: `aria-live`, textos claros, botões acessíveis.
* Não criar lógica fake só para mostrar erro.
* Não alterar contrato dos hooks sem necessidade.
* Se algum estado não puder ser integrado com segurança, apenas liste no final.

IMPORTANTE:
Para erros/estados que ainda não estiverem integrados por falta de lógica, hook, callback, API ou contexto, NÃO invente implementação.

No final, liste uma seção chamada:

“Erros/estados ainda não integrados”

Para cada item, informe:

* arquivo/componente
* estado faltante
* motivo
* o que precisa existir para integrar

Formato obrigatório:

* `Arquivo`: ...
* `Estado`: ...
* `Motivo`: ...
* `Necessário`: ...

Exemplo:

* `Arquivo`: `FamiliasPage.jsx`
* `Estado`: erro de carregamento da lista
* `Motivo`: hook não expõe `error` ou `refetch`
* `Necessário`: expor `error` e `refetch` no hook `useFamilias`

RODE:

* lint/build se disponível.

SAÍDA FINAL:

* Arquivos criados/alterados
* Estados padronizados
* Erros/estados ainda não integrados
* Pendências, se houver
