import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { downloadFichaProntuarioPdf, FICHA_PDF_TYPES } from '../services/prontuarioPdf.service'
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
  const [downloadError, setDownloadError] = useState(null)

  const canDownloadPdf = Boolean(pdfDownloadContext?.prontuarioId && pdfDownloadContext?.fichaId)

  const handlePdfAction = async () => {
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
                Clique no botão abaixo para baixar o arquivo PDF.
              </Typography>
            </Box>

            <ButtonLoading
              type="button"
              variant="outlined"
              size="large"
              startIcon={<GetAppRoundedIcon />}
              loading={downloadingPdf}
              loadingLabel="Gerando PDF..."
              onClick={handlePdfAction}
              disabled={!canDownloadPdf}
              sx={{ minWidth: 280, height: 56, borderRadius: 2 }}
            >
              Baixar Plano Familiar (PDF)
            </ButtonLoading>

            <InlineFeedback
              severity="info"
              message="Você deve imprimir este documento, coletar as assinaturas do representante e do técnico, e anexar ao prontuário físico."
              compact
            />
          </Box>
        </FormCard>
      </PageSection>
    </FormFlowLayout>
  )
}


export default PlanoFamiliarPrintStep
