import { Button, Paper, Stack, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

function TranscricaoAudioPage({ onBack }) {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 900 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}
      >
        <Typography variant="overline" color="primary" letterSpacing={1.8}>
          Áudio
        </Typography>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Transcrição de Áudio
        </Typography>
        <Typography color="text.secondary">
          Página criada e reservada para o fluxo de transcrição de áudio.
        </Typography>
      </Paper>

      <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onBack} sx={{ alignSelf: 'flex-start' }}>
        Voltar para visão geral
      </Button>
    </Stack>
  )
}

export default TranscricaoAudioPage
