import { Box, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { hoverRowSx, textSx } from './uiStyles'

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

  const handleKeyDown = (event) => {
    if (!interactive) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        borderColor: selected && !disabled ? 'primary.main' : 'divider',
        backgroundColor: selected && !disabled ? 'primary.50' : '#ffffff',
        cursor: interactive ? 'pointer' : 'default',
        opacity: disabled ? 0.6 : 1,
        outline: 'none',
        minWidth: 0,
        ...(interactive ? hoverRowSx : {}),
        '&:focus-visible': {
          borderColor: 'primary.main',
          boxShadow: '0 0 0 3px rgba(25,118,210,0.18)',
        },
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
            backgroundColor: selected && !disabled ? 'primary.main' : disabled ? '#e5e7eb' : 'primary.50',
            color: selected && !disabled ? '#ffffff' : disabled ? '#9ca3af' : 'primary.main',
            flexShrink: 0,
          }}
        >
          <Icon fontSize="small" />
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

      <Box sx={{ flexShrink: 0, color: disabled ? 'text.disabled' : selected ? 'primary.main' : 'text.secondary' }}>
        {disabled ? <LockOutlinedIcon fontSize="small" /> : <ArrowForwardRoundedIcon fontSize="small" />}
      </Box>
    </Paper>
  )
}

export default PageActionItem
