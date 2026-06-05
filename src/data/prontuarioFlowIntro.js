import {
  FLOW_QUERY_PARAM,
  NOVO_PRONTUARIO_FLOW_ID,
  TRIAGEM_FORM_ID,
} from './formFlows'

export const FLOW_INTRO_TYPES = {
  ADICIONAR_FICHA: 'adicionarFicha',
  ABRIR_PRONTUARIO: 'abrirProntuario',
}

export const flowIntroConfigs = {
  [FLOW_INTRO_TYPES.ADICIONAR_FICHA]: {
    type: FLOW_INTRO_TYPES.ADICIONAR_FICHA,
    title: 'Adicionar ficha ao prontuário',
    subtitle: 'Entenda as etapas antes de incluir uma nova ficha em um prontuário existente.',
    steps: [
      {
        title: 'Selecionar família',
        description: 'Busque a família e verifique se você está adicionando a ficha ao prontuário correto.',
      },
      {
        title: 'Selecionar a ficha',
        description: 'Escolha o formulário que será preenchido e anexado ao prontuário.',
      },
      {
        title: 'Preencher as informações',
        description: 'Complete os campos necessários e revise os dados principais.',
      },
      {
        title: 'Salvar no prontuário',
        description: 'Ao finalizar, a ficha será vinculada ao prontuário existente.',
      },
    ],
    primaryActionLabel: 'Iniciar ficha',
    backLabel: 'Voltar',
    destinationPath: '/dashboard/cadastro?start=adicionarFicha',
    returnPath: '/dashboard/cadastro',
  },
  [FLOW_INTRO_TYPES.ABRIR_PRONTUARIO]: {
    type: FLOW_INTRO_TYPES.ABRIR_PRONTUARIO,
    title: 'Abrir novo prontuário',
    subtitle: 'Veja as etapas para iniciar um novo acompanhamento familiar.',
    steps: [
      {
        title: 'Triagem inicial',
        description: 'Preencha os dados iniciais, cadastrais e complementares da família.',
      },
      {
        title: 'Termo de uso',
        description: 'O termo de autorização de uso de imagem e áudio será preenchido automaticamente com os dados da triagem. Imprima o documento para assinatura do Representante.',
      },
      {
        title: 'Demanda e encaminhamentos',
        description: 'Registre a demanda, orientações e encaminhamentos do atendimento.',
      },
      {
        title: 'Plano de Desenvolvimento Familiar',
        description: 'Preencha a análise, objetivos e ações para o acompanhamento da família. Você pode salvar o plano mesmo sem finalizar o preenchimento, para continuar depois.',
      },
      {
        title: 'Impressão e assinatura',
        description: 'Revise o plano preenchido, imprima o documento e colete as assinaturas necessárias.',
      },
    ],
    primaryActionLabel: 'Iniciar prontuário',
    backLabel: 'Voltar',
    destinationPath: `/dashboard/cadastro/formulario/${TRIAGEM_FORM_ID}?${FLOW_QUERY_PARAM}=${NOVO_PRONTUARIO_FLOW_ID}`,
    returnPath: '/dashboard/cadastro',
  },
}

export function getFlowIntroConfig(type) {
  return flowIntroConfigs[type] ?? null
}
