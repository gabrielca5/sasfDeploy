import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded'
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
  const [downloadError, setDownloadError] = useState(null)
  const [creatingTermo, setCreatingTermo] = useState(false)

  const handleContinueAction = async () => {
    setCreatingTermo(true)
    try {
      await onContinue(initialTermDraft)
    } finally {
      setCreatingTermo(false)
    }
  }

  const handlePdfAction = async () => {
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
              disabled={!prontuarioId}
              sx={{ minWidth: 280, height: 56, borderRadius: 2 }}
            >
              Baixar Termo (PDF)
            </ButtonLoading>

            <InlineFeedback
              severity="info"
              message="Você deve imprimir este documento, coletar a assinatura e anexar ao prontuário físico."
              compact
            />
          </Box>
        </FormCard>
      </PageSection>
    </FormFlowLayout>
  )
}

export default TermoUsoStep
