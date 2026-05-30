import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const profile = {
  nome: 'Mariana Souza Pereira',
  cargo: 'Orientadora social',
  email: 'mariana.pereira@sasf.sp.gov.br',
}

function ProfileField({ label, value, icon }) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2.5,
        borderColor: 'divider',
        backgroundColor: '#ffffff',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: '#fffaf0',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            {label}
          </Typography>
          <Typography variant="body1" fontWeight={800} sx={{ overflowWrap: 'anywhere' }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

function ProfilePage() {
  const initials = profile.nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 4,
        background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.08) 0%, rgba(243, 244, 246, 1) 55%, rgba(255, 255, 255, 1) 100%)',
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 720,
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 4,
          borderColor: 'divider',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: 'primary.main',
                fontWeight: 800,
                fontSize: '1.4rem',
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="overline" color="primary" letterSpacing={1.6}>
                Perfil
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {profile.nome}
              </Typography>
              <Typography color="text.secondary">
                Informações básicas de acesso e identificação.
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1.5}>
            <ProfileField label="Nome" value={profile.nome} icon={<PersonOutlineOutlinedIcon fontSize="small" />} />
            <ProfileField label="Cargo" value={profile.cargo} icon={<WorkOutlineOutlinedIcon fontSize="small" />} />
            <ProfileField label="Email" value={profile.email} icon={<EmailOutlinedIcon fontSize="small" />} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ProfilePage
