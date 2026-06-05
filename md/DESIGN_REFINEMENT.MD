Vamos mudar um pouco o fluxo de preenchimento do formulario.
Temos dois botões na tela Novo Registo:
1. Adicionar Ficha ao prontuário
2. Abrir um novo prontuário

### Botão 1. Adicionar Ficha ao prontuário
Temos esse fluxo: 
Mantem a parte de buscar familia e etc IGUAL COMO ESTÁ
Mas ao abrir a tela do formulario, o fluxo é:
Plano desenvolvimento familiar,
folha de prosseguimento,
ficha de atualização do quadro situacional (só gestão),
ficha de visita domiciliar,
plano de desenvolvimento do usuario


### Botão 2. Abrir um novo prontuário
Temos esse fluxo (que deve refletir no stepper inclusive):
Triagem -> termos de uso -> Demanda
Triagem:  pegamos os dados necessários pra imprimir o termo
    {
"secoes": [
        {
          "id": "dados_autorizante",
          "titulo": "Dados do Autorizante",
          "campos": [
            { "id": "nome_autorizante", "label": "Nome do Autorizante", "tipo": "text" },
            { "id": "rg_autorizante", "label": "Cédula de Identidade (RG)", "tipo": "text" },
            { "id": "cpf_autorizante", "label": "CPF", "tipo": "text", "mascara": "000.000.000-00" },
            { "id": "nomes_criancas", "label": "Nome(s) da(s) criança(s) sob responsabilidade (se houver)", "tipo": "textarea", "linhas": 3 },
            { "id": "data_assinatura", "label": "Data de Assinatura", "tipo": "date" } (AUTO-PREENCHIDO COM A DATA ATUAL)
          ]
        }
      ]
    },
Termos de uso:
Renderizamos o termo preenchido e aparece o botão para imprimir. Depois disso já pode continuar
Demanda:
Preenche tudo que ainda precisamos para a Ficha Cadastral da Família
"campos": [
            { "id": "nome_representante", "label": "Nome do Representante da Família", "tipo": "text" },
            {
              "id": "sexo", "label": "Sexo", "tipo": "radio",
              "opcoes": ["F", "M"]
            },
            { "id": "data_matricula", "label": "Data de Matrícula", "tipo": "date" },
            { "id": "numero_matricula", "label": "Nº de Matrícula", "tipo": "text" },
            { "id": "data_desligamento", "label": "Data de Desligamento", "tipo": "date" },
            { "id": "nis_nit_nb", "label": "Nº NIS/NIT/NB", "tipo": "text" },
            { "id": "data_nascimento", "label": "Data de Nascimento", "tipo": "date" },
            { "id": "naturalidade", "label": "Naturalidade (Município/Estado)", "tipo": "text" },
            {
              "id": "cor_raca", "label": "Cor/Raça", "tipo": "select",
              "nota": "(a) branca; preta; amarela; parda; indígena; sem declaração",
              "opcoes": ["Branca", "Preta", "Amarela", "Parda", "Indígena", "Sem declaração"]
            },
            {
              "id": "pessoa_deficiencia", "label": "Pessoa com Deficiência", "tipo": "radio",
              "opcoes": ["Sim", "Não"]
            },
            { "id": "cpf", "label": "CPF", "tipo": "text", "mascara": "000.000.000-00" },
            { "id": "rg", "label": "RG", "tipo": "text" },
            { "id": "orgao_emissor", "label": "Órgão Emissor", "tipo": "text" },
            { "id": "uf", "label": "UF", "tipo": "text", "max_length": 2 },
            { "id": "ctps_numero", "label": "CTPS Nº", "tipo": "text" },
            { "id": "ctps_serie", "label": "Série", "tipo": "text" },
            { "id": "ctps_emissao", "label": "Emissão", "tipo": "date" },
            { "id": "mae", "label": "Mãe", "tipo": "text" },
            { "id": "pai", "label": "Pai", "tipo": "text" },
            {
              "id": "estado_civil", "label": "Estado Civil", "tipo": "radio",
              "opcoes": ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"]
            },
            {
              "id": "grau_instrucao", "label": "Grau de Instrução", "tipo": "radio",
              "opcoes": [
                "Analfabeto",
                "Ensino Fundamental Completo",
                "Ensino Fundamental Incompleto",
                "Ensino Médio Completo",
                "Ensino Médio Incompleto",
                "Ensino Superior Completo",
                "Ensino Superior Incompleto"
              ]
            },
            { "id": "profissao", "label": "Profissão", "tipo": "text" },
            { "id": "ocupacao_descricao", "label": "Ocupação", "tipo": "text" },
            {
              "id": "ocupacao_situacao", "label": "Situação Ocupacional", "tipo": "radio",
              "opcoes": ["Empregado", "Desempregado", "Aposentado", "Pensionista"]
            },
            { "id": "renda", "label": "Renda (R$)", "tipo": "number", "min": 0 }
          ]
        ,
        {
          "id": "endereco",
          "titulo": "Endereço",
          "campos": [
            { "id": "cep", "label": "CEP", "tipo": "text", "mascara": "00000-000" },
            { "id": "endereco", "label": "Endereço", "tipo": "text" },
            { "id": "numero", "label": "Nº", "tipo": "text" },
            { "id": "complemento", "label": "Complemento", "tipo": "text" },
            { "id": "cidade", "label": "Cidade", "tipo": "text" },
            { "id": "bairro", "label": "Bairro", "tipo": "text" },
            { "id": "distrito", "label": "Distrito", "tipo": "text" },
            { "id": "telefone_residencial", "label": "Telefone Residencial", "tipo": "tel" },
            { "id": "telefone_celular", "label": "Telefone Celular", "tipo": "tel" },
            { "id": "telefone_outro", "label": "Outro Telefone", "tipo": "tel" },
            { "id": "ponto_referencia", "label": "Ponto de Referência", "tipo": "text" }
          ]
        },
        {
          "id": "moradia",
          "titulo": "Condições de Moradia",
          "campos": [
            {
              "id": "condicao_moradia", "label": "Condições de Moradia", "tipo": "radio",
              "opcoes": ["Própria", "Alugada", "Cedida"]
            },
            { "id": "numero_comodos", "label": "Nº de Cômodos", "tipo": "number", "min": 1 },
            { "id": "valor_aluguel_financiamento", "label": "Valor do Aluguel ou Financiamento (R$)", "tipo": "number", "min": 0 },
            {
              "id": "tipo_construcao", "label": "Tipo de Construção", "tipo": "radio",
              "opcoes": ["Alvenaria", "Madeira", "Mista"]
            },
            {
              "id": "situacao_habitacional", "label": "Situação Habitacional", "tipo": "checkbox",
              "opcoes": ["Cortiço", "Favela", "Loteamento irregular"]
            }
          ]
        },
        {
          "id": "beneficios",
          "titulo": "Benefícios",
          "campos": [
            {
              "id": "programa_transferencia_renda",
              "label": "Recebe Programa de Transferência de Renda?",
              "tipo": "checkbox",
              "opcoes": ["Não recebe", "Renda Mínima", "Bolsa Família", "Renda Cidadã", "Ação Jovem", "PETI"]
            },
            { "id": "programa_outro", "label": "Outro programa (especificar)", "tipo": "text" },
            {
              "id": "beneficio_prestacao_continuada",
              "label": "Recebe Benefício de Prestação Continuada (BPC)?",
              "tipo": "checkbox",
              "opcoes": ["Não recebe", "Idoso", "Pessoa com deficiência"]
            }
          ]
        },
        {
          "id": "composicao_familiar",
          "titulo": "Composição Familiar",
          "tipo": "tabela",
          "max_linhas": 12,
          "colunas": [
            { "id": "numero", "label": "Nº", "tipo": "static" },
            { "id": "nome", "label": "Nome", "tipo": "text" },
            { "id": "data_nascimento", "label": "Data de Nascimento", "tipo": "date" },
            { "id": "parentesco_vinculo", "label": "Parentesco / Vínculo", "tipo": "text" },
            { "id": "profissao", "label": "Profissão", "tipo": "text" },
            { "id": "ocupacao", "label": "Ocupação", "tipo": "text" },
            { "id": "renda", "label": "Renda (R$)", "tipo": "number" },
            {
              "id": "fatores_risco",
              "label": "Fator(es) de Risco Social",
              "tipo": "multiselect",
              "nota": "(b) 1-Alcoolismo; 2-Def. auditiva; 3-Def. física; 4-Def. mental; 5-Def. visual; 6-Desemprego; 7-Drogadição; 8-HIV+; 9-Prob. psiquiátricos; 10-Situação de rua; 11-Trabalho infantil; 12-Violência doméstica; 13-Medida Socioeducativa; 14-Privação de liberdade; 15-Acolhimento Institucional; 16-Outro",
              "opcoes": [
                "1 - Alcoolismo",
                "2 - Deficiência auditiva",
                "3 - Deficiência física",
                "4 - Deficiência mental",
                "5 - Deficiência visual",
                "6 - Desemprego",
                "7 - Drogadição",
                "8 - HIV+",
                "9 - Problemas psiquiátricos",
                "10 - Situação de rua",
                "11 - Trabalho infantil",
                "12 - Violência doméstica",
                "13 - Medida Socioeducativa",
                "14 - Privação de liberdade",
                "15 - Acolhimento Institucional",
                "16 - Outro"
              ]
            }
          ]
        }
      ,
    {
      "id": "ficha_cadastral_complementar",
      "titulo": "Ficha Cadastral da Família (Informações Complementares)",
      "folhas": "2/2",
      "orgao": "SMADS/CPSB — Serviço de Assistência Social à Família e Proteção Social Básica no Domicílio",
      "secoes": [
        {
          "id": "informacoes_complementares",
          "titulo": "Informações Complementares da Família",
          "tipo": "tabela",
          "max_linhas": 12,
          "colunas": [
            { "id": "numero", "label": "Nº", "tipo": "static" },
            { "id": "nome", "label": "Nome", "tipo": "text" },
            { "id": "estuda", "label": "Estuda", "tipo": "radio", "opcoes": ["Sim", "Não"] },
            { "id": "grau_instrucao", "label": "Grau de Instrução", "tipo": "text" },
            { "id": "inserido_cca", "label": "Inserido em CCA", "tipo": "radio", "opcoes": ["Sim", "Não"] },
            { "id": "inserido_cj", "label": "Inserido em CJ", "tipo": "radio", "opcoes": ["Sim", "Não"] },
            { "id": "inserido_cedesp", "label": "Inserido em CEDESP", "tipo": "radio", "opcoes": ["Sim", "Não"] },
            { "id": "inserido_nci", "label": "Inserido em NCI", "tipo": "radio", "opcoes": ["Sim", "Não"] },
            { "id": "outros_servicos", "label": "Inserido em outros serviços (especificar)", "tipo": "text" }
          ]
        },
        {
          "id": "demanda_encaminhamentos",
          "titulo": "Demanda Apresentada / Orientações / Encaminhamentos",
          "campos": [
            { "id": "demanda_texto", "label": "Demanda / Orientações / Encaminhamentos", "tipo": "textarea", "linhas": 20 },
            { "id": "tecnico_referencia", "label": "Técnico de Referência do Atendimento", "tipo": "text" },
            { "id": "data_atendimento", "label": "Data", "tipo": "date" }
          ]
        }
      ]
    },
    



    { "id": "nome_representante", "label": "Nome do Representante da Família", "tipo": "text" },
            {
              "id": "sexo", "label": "Sexo", "tipo": "radio",
              "opcoes": ["F", "M"]
            },
            { "id": "data_nascimento", "label": "Data de Nascimento", "tipo": "date" },
            { "id": "naturalidade", "label": "Naturalidade (Município/Estado)", "tipo": "text" },
            {
              "id": "cor_raca", "label": "Cor/Raça", "tipo": "select",
              "nota": "(a) branca; preta; amarela; parda; indígena; sem declaração",
              "opcoes": ["Branca", "Preta", "Amarela", "Parda", "Indígena", "Sem declaração"]
            },
            {
              "id": "pessoa_deficiencia", "label": "Pessoa com Deficiência", "tipo": "radio",
              "opcoes": ["Sim", "Não"]
            },
            { "id": "cpf", "label": "CPF", "tipo": "text", "mascara": "000.000.000-00" },
              "id": "estado_civil", "label": "Estado Civil", "tipo": "radio",
              "opcoes": ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"]
            