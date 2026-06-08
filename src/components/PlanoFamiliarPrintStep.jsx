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

function PlanoFamiliarPrintStep({
  form,
  flowForms,
  onBack,
  onPrevious,
  onFinish,
  onSelectFlowForm,
  pdfDownloadContext,
  stepperTitle,
  stepperSubtitle,
}) {
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [viewingPdf, setViewingPdf] = useState(false)
  const [downloadError, setDownloadError] = useState(null)
  const [pdfModal, setPdfModal] = useState({ open: false, url: '', filename: '' })

  const canDownloadPdf = Boolean(pdfDownloadContext?.prontuarioId && pdfDownloadContext?.fichaId)

  const handleDownloadPdfAction = async () => {
    if (!canDownloadPdf) return

    setDownloadingPdf(true)
    setDownloadError(null)
    try {
      await downloadFichaProntuarioPdf({
        prontuarioId: pdfDownloadContext.prontuarioId,
        tipoFicha: FICHA_PDF_TYPES.PLANO_DESENVOLVIMENTO_FAMILIAR,
        fichaId: pdfDownloadContext.fichaId,
        print: false,
      })
    } catch (err) {
      setDownloadError(err?.message || 'Não foi possível baixar o PDF do plano familiar. Tente novamente.')
    } finally {
      setDownloadingPdf(false)
    }
  }

  const handleViewPdfAction = async () => {
    if (!canDownloadPdf) return

    setViewingPdf(true)
    setDownloadError(null)
    try {
      const { url, filename } = await getFichaProntuarioPdfData({
        prontuarioId: pdfDownloadContext.prontuarioId,
        tipoFicha: FICHA_PDF_TYPES.PLANO_DESENVOLVIMENTO_FAMILIAR,
        fichaId: pdfDownloadContext.fichaId,
      })
      setPdfModal({ open: true, url, filename })
    } catch (err) {
      setDownloadError(err?.message || 'Não foi possível visualizar o PDF do plano familiar. Tente novamente.')
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
        description="Gere o documento oficial do Plano de Desenvolvimento Familiar para assinatura."
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
                <ActionButton
                  type="button"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={onFinish}
                >
                  Concluir
                </ActionButton>
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
                O Plano de Desenvolvimento Familiar utiliza os dados já preenchidos nas etapas anteriores.
                Visualize ou baixe o arquivo PDF antes da coleta das assinaturas.
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
                disabled={!canDownloadPdf || downloadingPdf}
                sx={{ minWidth: 220, height: 56, borderRadius: 2 }}
              >
                Visualizar Plano
              </ButtonLoading>
              <ButtonLoading
                type="button"
                variant="outlined"
                size="large"
                startIcon={<GetAppRoundedIcon />}
                loading={downloadingPdf}
                loadingLabel="Gerando PDF..."
                onClick={handleDownloadPdfAction}
                disabled={!canDownloadPdf || viewingPdf}
                sx={{ minWidth: 220, height: 56, borderRadius: 2 }}
              >
                Baixar Plano
              </ButtonLoading>
            </Box>

            <InlineFeedback
              severity="info"
              message="Você deve imprimir este documento, coletar as assinaturas do representante e do técnico, e anexar ao prontuário físico."
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


export default PlanoFamiliarPrintStep
