import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Stack spacing={2} sx={{ maxWidth: 720, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 900 }}>
          404
        </Typography>

        <Typography variant="h5" fontWeight={800}>
          Página não encontrada
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          A página que você tentou acessar não existe ou foi removida. Verifique o endereço ou volte para a área principal.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="center">
          <Button variant="contained" onClick={() => navigate('/dashboard')}>Ir para o painel</Button>
          <Button variant="outlined" onClick={() => navigate('/login')}>Voltar ao login</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default NotFoundPage
