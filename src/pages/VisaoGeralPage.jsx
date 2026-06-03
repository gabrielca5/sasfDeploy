import { Box, Paper, Typography } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  PageSection,
  PageStack,
  PageWrapper,
} from './ui'

const actions = [
  {
    slug: 'cadastrar-usuario',
    label: 'Cadastrar uma família nova',
    description: 'Para famílias que ainda não têm registro no sistema.',
    hint: 'Ideal para o primeiro atendimento',
    icon: PersonAddAlt1OutlinedIcon,
    available: true,
  },
  {
    slug: 'atualizar-usuario',
    label: 'Atualizar dados de uma família',
    description: 'Para corrigir ou completar informações como endereço, documentos ou contatos.',
    hint: 'Quando algo mudou ou precisa ser ajustado',
    icon: ManageAccountsOutlinedIcon,
    available: true,
  },
  {
    slug: 'transcricao-audio',
    label: 'Registrar anotação em áudio',
    description: 'Organize gravações e anotações de visitas sem precisar digitar.',
    hint: 'Em preparação — em breve disponível',
    icon: GraphicEqOutlinedIcon,
    available: false,
  },
]

function ActionRow({ action, onClick, isFirst }) {
  const Icon = action.icon
  const disabled = !action.available

  return (
    <Paper
      variant="outlined"
      onClick={disabled ? undefined : onClick}
      role={disabled ? undefined : 'button'}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        borderColor: isFirst && !disabled ? 'primary.main' : 'divider',
        backgroundColor: isFirst && !disabled ? '#f0f7ff' : '#ffffff',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'all 180ms ease',
        outline: 'none',
        ...(!disabled && {
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: isFirst ? '#e8f2ff' : '#f5f9ff',
            boxShadow: '0 2px 12px rgba(17,24,39,0.08)',
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(25,118,210,0.18)',
          },
        }),
      }}
    >
      {/* Ícone */}
      <Box
        sx={{
          width: { xs: 44, sm: 52 },
          height: { xs: 44, sm: 52 },
          borderRadius: 2,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: isFirst && !disabled ? 'primary.main' : disabled ? '#e5e7eb' : 'primary.50',
          color: isFirst && !disabled ? '#ffffff' : disabled ? '#9ca3af' : 'primary.main',
        }}
      >
        <Icon sx={{ fontSize: { xs: 22, sm: 26 } }} />
      </Box>

      {/* Texto */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color={disabled ? 'text.disabled' : 'text.primary'}
          sx={{ lineHeight: 1.3 }}
        >
          {action.label}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.4, lineHeight: 1.45 }}
        >
          {action.description}
        </Typography>
        <Typography
          variant="caption"
          color={disabled ? 'text.disabled' : 'primary.main'}
          sx={{ mt: 0.5, display: 'block', fontWeight: 600 }}
        >
          {action.hint}
        </Typography>
      </Box>

      {/* Ação */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {disabled ? (
          <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
        ) : (
          <ArrowForwardRoundedIcon
            sx={{
              fontSize: 22,
              color: isFirst ? 'primary.main' : 'text.secondary',
              transition: 'transform 180ms ease',
              '.MuiPaper-root:hover &': { transform: 'translateX(4px)' },
            }}
          />
        )}
      </Box>
    </Paper>
  )
}

function VisaoGeralPage({ onOpenAction }) {
  return (
    <PageWrapper maxWidth={720} spacing={3}>
      <PageSection
        eyebrow="Visão geral"
        title="Eu quero..."
        description="Escolha o que você precisa fazer. Cada opção abre um passo a passo."
      />

      <PageStack spacing={1.5}>
        {actions.map((action, index) => (
          <ActionRow
            key={action.slug}
            action={action}
            isFirst={index === 0}
            onClick={() => onOpenAction(action.slug)}
          />
        ))}
      </PageStack>
    </PageWrapper>
  )
}

export default VisaoGeralPage
