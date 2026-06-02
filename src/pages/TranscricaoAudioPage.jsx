import Button from '../components/ui/button'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { PageSection, PageToolbar, PageWrapper } from './ui'

function TranscricaoAudioPage({ onBack }) {
  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <PageSection
        eyebrow="Áudio"
        title="Transcrição de Áudio"
        description="Página criada e reservada para o fluxo de transcrição de áudio."
      />

      <PageToolbar justifyContent="flex-start">
        <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={onBack}>
          Voltar para visão geral
        </Button>
      </PageToolbar>
    </PageWrapper>
  )
}

export default TranscricaoAudioPage
