import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FlowStepper from '../components/FlowStepper'
import { ActionButton, PageSection, PageToolbar, PageWrapper } from './ui'

function CadastrarUsuarioPage({ forms = [], onBack, onOpenForm }) {
  const firstFormId = forms[0]?.id

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Cadastro"
        title="Cadastrar novo usuário"
        description="O cadastro agora segue a ordem dos formulários definida no forms.json. Isso ajuda a equipe a preencher as etapas sem pular campos importantes."
      />

      <FlowStepper
        forms={forms}
        activeFormId={firstFormId}
        onSelectForm={onOpenForm}
        title="Fluxo em ordem"
        subtitle="Cada etapa abaixo aparece na sequência em que deve ser aplicada. Você pode abrir qualquer uma diretamente."
      />

      <PageToolbar justifyContent="flex-start">
        <ActionButton startIcon={<ArrowBackRoundedIcon />} onClick={onBack}>
          Voltar para cadastro
        </ActionButton>
      </PageToolbar>
    </PageWrapper>
  )
}

export default CadastrarUsuarioPage
