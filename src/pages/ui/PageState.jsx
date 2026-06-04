import { Box, Paper, Stack, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded'
import {
  containedChildrenSx,
  pageStateCenteredSx,
  pageStateCompactSx,
  pageStateIconCompactSx,
  pageStateIconSx,
  pageStateSx,
  textSx,
} from './uiStyles'

const stateConfig = {
  loading: {
    title: 'Carregando',
    message: 'Aguarde enquanto os dados são carregados.',
    color: 'primary.main',
    backgroundColor: 'primary.50',
    icon: <CircularProgress size={20} />,
    ariaLive: 'polite',
  },
  saving: {
    title: 'Salvando',
    message: 'Aguarde enquanto as alterações são salvas.',
    color: 'primary.main',
    backgroundColor: 'primary.50',
    icon: <CircularProgress size={18} />,
    ariaLive: 'polite',
  },
  success: {
    title: 'Tudo certo',
    message: 'A ação foi concluída com sucesso.',
    color: 'success.main',
    backgroundColor: 'success.light',
    icon: <CheckCircleRoundedIcon fontSize="small" />,
    ariaLive: 'polite',
  },
  error: {
    title: 'Erro',
    message: 'Não foi possível concluir a ação.',
    color: 'error.main',
    backgroundColor: 'error.light',
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
    ariaLive: 'assertive',
  },
  empty: {
    title: 'Nenhum resultado',
    message: 'Não há dados para exibir.',
    color: 'text.secondary',
    backgroundColor: '#f3f4f6',
    icon: <InboxOutlinedIcon fontSize="small" />,
    ariaLive: 'polite',
  },
  notFound: {
    title: 'Dados não encontrados',
    message: 'Não encontramos dados para esta visualização.',
    color: 'text.secondary',
    backgroundColor: '#f3f4f6',
    icon: <SearchOffRoundedIcon fontSize="small" />,
    ariaLive: 'polite',
  },
  permission: {
    title: 'Sem permissão',
    message: 'Você não tem permissão para acessar esta área.',
    color: 'warning.main',
    backgroundColor: 'warning.light',
    icon: <LockOutlinedIcon fontSize="small" />,
    ariaLive: 'assertive',
  },
  offline: {
    title: 'Falha de conexão',
    message: 'Verifique sua conexão e tente novamente.',
    color: 'error.main',
    backgroundColor: 'error.light',
    icon: <WifiOffRoundedIcon fontSize="small" />,
    ariaLive: 'assertive',
  },
}

function PageState({
  type = 'empty',
  title,
  message,
  hint,
  icon,
  action,
  compact = false,
  centered = false,
  surface = true,
}) {
  const config = stateConfig[type] ?? stateConfig.empty
  const Root = surface ? Paper : Box
  const rootProps = surface ? { elevation: 0, variant: 'outlined' } : {}

  return (
    <Root
      {...rootProps}
      role={type === 'error' || type === 'offline' || type === 'permission' ? 'alert' : 'status'}
      aria-live={config.ariaLive}
      sx={{
        ...(compact ? pageStateCompactSx : pageStateSx),
        ...(centered ? pageStateCenteredSx : {}),
      }}
    >
      <Stack
        direction={centered ? 'column' : { xs: 'column', sm: 'row' }}
        spacing={compact ? 1 : 1.5}
        alignItems={centered ? 'center' : { xs: 'flex-start', sm: 'center' }}
        sx={{ minWidth: 0, ...containedChildrenSx }}
      >
        <Box
          sx={{
            ...(compact ? pageStateIconCompactSx : pageStateIconSx),
            color: config.color,
            backgroundColor: config.backgroundColor,
          }}
        >
          {icon ?? config.icon}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant={compact ? 'subtitle2' : 'subtitle1'} fontWeight={800} sx={textSx}>
            {title ?? config.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={textSx}>
            {message ?? config.message}
          </Typography>
          {hint ? (
            <Typography variant="caption" color="text.disabled" sx={textSx}>
              {hint}
            </Typography>
          ) : null}
        </Box>

        {action ? <Box sx={{ flexShrink: 0, minWidth: 0 }}>{action}</Box> : null}
      </Stack>
    </Root>
  )
}

export default PageState
