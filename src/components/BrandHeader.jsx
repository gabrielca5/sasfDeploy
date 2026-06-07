import { Box, Stack, Typography } from '@mui/material'

function BrandHeader({ logoSrc, subtitle }) {
  return (
    <Stack spacing={1.5} alignItems="center" sx={{ mb: 3, textAlign: 'center' }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={logoSrc}
          alt="Logo SASF"
          sx={{ width: 88, height: 88, objectFit: 'contain', display: 'block' }}
        />
      </Box>

      <Box>
        <Typography
          component="h1"
          sx={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.2 }}
        >
          SASF Chico Mendes
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.25, lineHeight: 1.5, color: 'rgba(255,255,255,0.5)' }}>
          Serviço de Assistência Social à Família
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5, color: '#90caf9' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}

export default BrandHeader
