import { Box, ButtonBase, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { textSx } from './uiStyles'

function PageActionItem({
  title,
  description,
  hint,
  icon: Icon,
  selected = false,
  disabled = false,
  onClick,
}) {
  const interactive = Boolean(onClick) && !disabled

  return (
    <ButtonBase
      component={Paper}
      elevation={0}
      variant="outlined"
      disabled={!interactive}
      focusRipple={interactive}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        textAlign: 'left',
        gap: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2.5,
        border: '1.6px solid',
        borderColor: disabled ? 'divider' : selected ? 'primary.main' : 'rgba(30, 136, 229, 0.32)',
        backgroundColor: '#ffffff',
        cursor: interactive ? 'pointer' : 'default',
        opacity: disabled ? 0.55 : 1,
        boxShadow: interactive ? '0 1px 4px rgba(17,24,39,0.04)' : 'none',
        transition: 'border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        outline: 'none',
        minWidth: 0,
        ...(interactive
          ? {
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: '0 4px 14px rgba(17,24,39,0.10)',
                transform: 'translateY(-1px)',
              },
              '&:focus-visible': {
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(25,118,210,0.18)',
              },
            }
          : {}),
      }}
    >
      {Icon ? (
        <Box
          sx={{
            width: { xs: 44, sm: 52 },
            height: { xs: 44, sm: 52 },
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: disabled ? '#e5e7eb' : 'primary.50',
            color: disabled ? '#9ca3af' : 'primary.main',
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: { xs: 22, sm: 26 } }} />
        </Box>
      ) : null}

      <Stack spacing={0.4} sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={800} color={disabled ? 'text.disabled' : 'text.primary'} sx={textSx}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" color="text.secondary" sx={textSx}>
            {description}
          </Typography>
        ) : null}
        {hint ? (
          <Typography variant="caption" color={disabled ? 'text.disabled' : 'primary.main'} fontWeight={700} sx={textSx}>
            {hint}
          </Typography>
        ) : null}
      </Stack>

      <Box sx={{ flexShrink: 0, color: disabled ? 'text.disabled' : 'primary.main' }}>
        {disabled ? (
          <LockOutlinedIcon sx={{ fontSize: 18 }} />
        ) : (
          <ArrowForwardRoundedIcon
            sx={{
              fontSize: 22,
              transition: 'transform 180ms ease',
              '.MuiPaper-root:hover &': { transform: 'translateX(4px)' },
            }}
          />
        )}
      </Box>
    </ButtonBase>
  )
}

export default PageActionItem
