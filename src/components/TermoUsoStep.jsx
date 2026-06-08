import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { downloadFichaProntuarioPdf, getFichaProntuarioPdfData, FICHA_PDF_TYPES } from '../services/prontuarioPdf.service'
import PdfViewerModal from './PdfViewerModal'
import {
  ActionButton,
  ButtonLoading,
  FormActionsFooter,
  FormCard,
  FormFlowLayout,
  FormStepper,
  InlineFeedback,
  PageSection,
  PageToolbar,
} from '../pages/ui'
import {
  formCardPlainSx,
  formPageHeaderTopSx,
} from '../pages/ui/uiStyles'

function TermoUsoStep({
  form,
  flowForms,
  termDraft: initialTermDraft,
  onBack,
  onPrevious,
  onContinue,
  onSelectFlowForm,
  pdfDownloadContext,
  stepperTitle,
  stepperSubtitle,
}) {
  const prontuarioId = pdfDownloadContext?.prontuarioId
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [viewingPdf, setViewingPdf] = useState(false)
  const [downloadError, setDownloadError] = useState(null)
  const [creatingTermo, setCreatingTermo] = useState(false)
  const [pdfModal, setPdfModal] = useState({ open: false, url: '', filename: '' })

  const handleContinueAction = async () => {
    setCreatingTermo(true)
    try {
      await onContinue(initialTermDraft)
    } finally {
      setCreatingTermo(false)
    }
  }

  const handleDownloadPdfAction = async () => {
    if (!prontuarioId) return

    setDownloadingPdf(true)
    setDownloadError(null)
    try {
      await downloadFichaProntuarioPdf({
        prontuarioId,
        tipoFicha: FICHA_PDF_TYPES.TERMO_AUTORIZACAO_IMAGEM,
        print: false,
      })
    } catch (err) {
      setDownloadError(err?.message || 'Não foi possível baixar o PDF. Tente novamente.')
    } finally {
      setDownloadingPdf(false)
    }
  }

  const handleViewPdfAction = async () => {
    if (!prontuarioId) return

    setViewingPdf(true)
    setDownloadError(null)
    try {
      const { url, filename } = await getFichaProntuarioPdfData({
        prontuarioId,
        tipoFicha: FICHA_PDF_TYPES.TERMO_AUTORIZACAO_IMAGEM,
      })
      setPdfModal({ open: true, url, filename })
    } catch (err) {
      setDownloadError(err?.message || 'Não foi possível visualizar o PDF. Tente novamente.')
    } finally {
      setViewingPdf(false)
    }
  }

  const handleClosePdfModal = () => {
    if (pdfModal.url) {
      URL.revokeObjectURL(pdfModal.url)
    }
    setPdfModal({ open: false, url: '', filename: '' })
  }

  return (
    <FormFlowLayout>
      <PageSection
        top={
          <Box sx={formPageHeaderTopSx}>
            <PageToolbar justifyContent="flex-start">
              <ActionButton
                type="button"
                variant="text"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={onBack}
              >
                Voltar ao catálogo
              </ActionButton>
            </PageToolbar>

            <FormStepper
              forms={flowForms}
              activeFormId={form.id}
              onSelectForm={onSelectFlowForm}
              title={stepperTitle}
              subtitle={stepperSubtitle}
            />
          </Box>
        }
        eyebrow={form.orgao}
        title={form.titulo}
        description="Gere o documento oficial para assinatura do representante familiar."
        childrenSx={{ mt: 2 }}
      >
        <FormCard
          variant="plain"
          sx={formCardPlainSx}
          footer={
            <FormActionsFooter
              leading={
                <ActionButton
                  type="button"
                  variant="outlined"
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={onPrevious}
                >
                  Etapa anterior
                </ActionButton>
              }
              actions={
                <ButtonLoading
                  type="button"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  loading={creatingTermo}
                  onClick={handleContinueAction}
                >
                  Continuar
                </ButtonLoading>
              }
            />
          }
        >
          {downloadError && (
            <InlineFeedback severity="error" message={downloadError} compact />
          )}

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
            gap: 3
          }}>
            <Box>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Pronto para impressão
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
                O termo de autorização de uso de imagem e áudio utiliza os dados já preenchidos na triagem.
                Visualize ou baixe o arquivo PDF antes da coleta da assinatura.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              <ButtonLoading
                type="button"
                variant="outlined"
                size="large"
                startIcon={<VisibilityRoundedIcon />}
                loading={viewingPdf}
                loadingLabel="Abrindo PDF..."
                onClick={handleViewPdfAction}
                disabled={!prontuarioId || downloadingPdf}
                sx={{ minWidth: 220, height: 56, borderRadius: 2 }}
              >
                Visualizar Termo
              </ButtonLoading>
              <ButtonLoading
                type="button"
                variant="outlined"
                size="large"
                startIcon={<GetAppRoundedIcon />}
                loading={downloadingPdf}
                loadingLabel="Gerando PDF..."
                onClick={handleDownloadPdfAction}
                disabled={!prontuarioId || viewingPdf}
                sx={{ minWidth: 220, height: 56, borderRadius: 2 }}
              >
                Baixar Termo
              </ButtonLoading>
            </Box>

            <InlineFeedback
              severity="info"
              message="Você deve imprimir este documento, coletar a assinatura e anexar ao prontuário físico."
              compact
            />
          </Box>
        </FormCard>
      </PageSection>

      <PdfViewerModal
        open={pdfModal.open}
        onClose={handleClosePdfModal}
        pdfUrl={pdfModal.url}
        filename={pdfModal.filename}
      />
    </FormFlowLayout>
  )
}

export default TermoUsoStep
