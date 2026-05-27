import { Button, Paper, Stack, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FlowStepper from './FlowStepper'

function CadastrarUsuarioPage({ forms = [], onBack, onOpenForm }) {
  const firstFormId = forms[0]?.id

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1120 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="overline" color="primary" letterSpacing={1.8}>
          Cadastro
        </Typography>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Cadastrar novo usuário
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.7 }}>
          O cadastro agora segue a ordem dos formulários definida no forms.json. Isso ajuda a equipe a preencher as etapas sem pular campos importantes.
        </Typography>
      </Paper>

      <FlowStepper
        forms={forms}
        activeFormId={firstFormId}
        onSelectForm={onOpenForm}
        title="Fluxo em ordem"
        subtitle="Cada etapa abaixo aparece na sequência em que deve ser aplicada. Você pode abrir qualquer uma diretamente."
      />

      <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onBack} sx={{ alignSelf: 'flex-start' }}>
        Voltar para cadastro
      </Button>
    </Stack>
  )
}

export default CadastrarUsuarioPage
