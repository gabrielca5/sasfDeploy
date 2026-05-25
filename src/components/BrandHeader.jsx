import { Box, Stack, Typography } from '@mui/material'

function BrandHeader({ logoSrc, subtitle }) {
  return (
    <Stack spacing={1.2} alignItems="center" sx={{ mb: 2.5, textAlign: 'center' }}>
      <Box
        component="img"
        src={logoSrc}
        alt="Logo SASF"
        sx={{ width: 64, height: 64, objectFit: 'contain' }}
      />
      <Typography
        component="h1"
        variant="h5"
        sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}
      >
        SASF Chico Mendes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
        Serviço de Assistência Social à Família e Proteção Social Básica no Domicílio
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  )
}

export default BrandHeader