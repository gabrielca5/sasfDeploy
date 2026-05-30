import { Box, Card, CardActionArea, CardContent, Chip, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'

const actions = [
  {
    slug: 'cadastrar-usuario',
    label: 'Cadastrar usuário',
    help: 'Abrir o fluxo de novo cadastro com orientações claras passo a passo.',
    detail: 'Ideal quando a pessoa ainda não existe no sistema.',
    badge: 'Mais usado',
    tone: 'primary',
    icon: <PersonAddAlt1OutlinedIcon fontSize="small" />,
  },
  {
    slug: 'atualizar-usuario',
    label: 'Atualizar cadastro',
    help: 'Encontrar e corrigir informações já registradas.',
    detail: 'Use para ajustar dados, documentos ou contatos.',
    badge: 'Consulta e edição',
    tone: 'secondary',
    icon: <ManageAccountsOutlinedIcon fontSize="small" />,
  },
  {
    slug: 'transcricao-audio',
    label: 'Transcrição de áudio',
    help: 'Acessar o espaço preparado para organizar áudios e anotações.',
    detail: 'Pensado para apoiar registros sem exigir conhecimento técnico.',
    badge: 'Em preparação',
    tone: 'neutral',
    icon: <GraphicEqOutlinedIcon fontSize="small" />,
  },
]

function ActionCard({ action, onOpenAction }) {
  const toneStyles = {
    primary: {
      borderColor: 'primary.main',
      backgroundColor: alpha('#1e88e5', 0.08),
    },
    secondary: {
      borderColor: 'rgba(30, 136, 229, 0.28)',
      backgroundColor: '#ffffff',
    },
    neutral: {
      borderColor: 'divider',
      backgroundColor: '#ffffff',
    },
  }

  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: '100%',
        ...toneStyles[action.tone],
        transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 30px rgba(17, 24, 39, 0.08)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea onClick={() => onOpenAction(action.slug)} sx={{ height: '100%', alignItems: 'stretch' }}>
        <CardContent sx={{ p: 2.5, height: '100%' }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  color: action.tone === 'primary' ? 'primary.main' : 'text.primary',
                  backgroundColor: action.tone === 'primary' ? alpha('#1e88e5', 0.14) : '#f8faf9',
                  flex: '0 0 auto',
                }}
              >
                {action.icon}
              </Box>
              <Chip
                label={action.badge}
                size="small"
                sx={{
                  fontWeight: 700,
                  backgroundColor: action.tone === 'primary' ? alpha('#1e88e5', 0.12) : '#fffaf0',
                  color: action.tone === 'neutral' ? 'text.secondary' : 'primary.dark',
                }}
              />
            </Stack>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={800} gutterBottom sx={{ lineHeight: 1.15 }}>
                {action.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {action.help}
              </Typography>
            </Box>

            <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" fontWeight={700} color="text.primary">
                {action.detail}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Toque para abrir esta etapa.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function VisaoGeralPage({ onOpenAction }) {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 1180 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          borderRadius: 3,
          borderColor: 'divider',
          background:
            'linear-gradient(135deg, rgba(30, 136, 229, 0.08) 0%, rgba(255, 255, 255, 1) 42%, rgba(237, 245, 240, 0.9) 100%)',
        }}
      >
        <Stack spacing={2.5}>
          <Box sx={{ maxWidth: 820 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.8}>
              Visão geral
            </Typography>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Qual serviço você quer fazer agora?
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Esta tela foi organizada para reduzir dúvidas: escolha pela tarefa, não pelo nome do sistema. As opções abaixo seguem a mesma estrutura visual para facilitar a leitura e evitar erros.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} flexWrap="wrap">
            <Chip label="Acesso guiado" sx={{ backgroundColor: '#fffaf0', color: 'primary.dark', fontWeight: 700 }} />
            <Chip label="3 caminhos principais" variant="outlined" />
            <Chip label="Pensado para usuários não técnicos" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
        {actions.map((action) => (
          <ActionCard key={action.slug} action={action} onOpenAction={onOpenAction} />
        ))}
      </Box>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="primary">
            Como usar esta tela
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            1. Leia a descrição de cada card para identificar o objetivo.
            2. Toque no card correspondente para abrir a próxima etapa.
            3. Se estiver em dúvida, comece por cadastrar usuário e volte quando precisar ajustar ou registrar áudio.
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default VisaoGeralPage
