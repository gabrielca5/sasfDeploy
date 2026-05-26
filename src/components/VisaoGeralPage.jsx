import { Button, Paper, Stack, Typography } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'

const actions = [
  {
    slug: 'cadastrar-usuario',
    label: 'Cadastrar Usuário',
    help: 'Acesso rápido para abrir o fluxo de novo cadastro.',
    icon: <PersonAddAlt1OutlinedIcon fontSize="small" />,
  },
  {
    slug: 'atualizar-usuario',
    label: 'Atualizar Usuário',
    help: 'Espaço para manutenção e atualização de dados cadastrais.',
    icon: <ManageAccountsOutlinedIcon fontSize="small" />,
  },
  {
    slug: 'transcricao-audio',
    label: 'Transcrição de Áudio',
    help: 'Página preparada para futuro fluxo de transcrição assistida.',
    icon: <GraphicEqOutlinedIcon fontSize="small" />,
  },
]

function VisaoGeralPage({ onOpenAction }) {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1120 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="overline" color="primary" letterSpacing={1.8}>
          Visão geral
        </Typography>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Central de ações rápidas
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
          Mantivemos a tela inicial mais objetiva. Use os botões abaixo para acessar rapidamente os fluxos principais do painel.
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Stack spacing={1.25}>
          {actions.map((action) => (
            <Button
              key={action.slug}
              variant="outlined"
              onClick={() => onOpenAction(action.slug)}
              startIcon={action.icon}
              sx={{
                justifyContent: 'flex-start',
                borderRadius: 2,
                py: 1.2,
                px: 1.6,
                textTransform: 'none',
              }}
            >
              <Stack spacing={0.15} alignItems="flex-start" sx={{ minWidth: 0 }}>
                <Typography variant="body1" fontWeight={700} color="text.primary">
                  {action.label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'normal', textAlign: 'left' }}>
                  {action.help}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}

export default VisaoGeralPage
