import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
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
  PageStack,
  PageToolbar,
  SuccessState,
} from '../pages/ui'
import {
  formCardPlainSx,
  formPageHeaderTopSx,
  termDetailItemSx,
  termDetailLabelSx,
  termDetailValueSx,
  termDetailsGridSx,
  termDocumentTitleSx,
  termParagraphSx,
  termPrintSurfaceSx,
  termSignatureGridSx,
  termSignatureLabelSx,
  termSignatureLineSx,
} from '../pages/ui/uiStyles'

function valueOrDash(value) {
  return value || '—'
}

function PlanoDetail({ label, value }) {
  return (
    <Box sx={termDetailItemSx}>
      <Typography variant="caption" sx={termDetailLabelSx}>
        {label}
      </Typography>
      <Typography variant="body2" sx={termDetailValueSx}>
        {valueOrDash(value)}
      </Typography>
    </Box>
  )
}

function SignatureLine({ label }) {
  return (
    <Box sx={termSignatureLineSx}>
      <Box sx={termSignatureLabelSx}>
        <Typography variant="caption" color="text.secondary" fontWeight={800}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

function PlanoFamiliarPrintStep({
  form,
  flowForms,
  planoDraft,
  onBack,
  onPrevious,
  onFinish,
  onSelectFlowForm,
  notice,
  pdfDownloadContext,
  stepperTitle,
  stepperSubtitle,
}) {
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [downloadError, setDownloadError] = useState(null)
  const identificacao = planoDraft?.identificacao_pdf ?? {}
  const analise = planoDraft?.analise_diagnostica ?? {}
  const dadosPlano = planoDraft?.dados_plano ?? {}
  const estrategias = Array.isArray(planoDraft?.estrategias_intervencao)
    ? planoDraft.estrategias_intervencao
    : []
  const canDownloadPdf = Boolean(pdfDownloadContext?.prontuarioId && pdfDownloadContext?.fichaId)

  const handlePdfAction = async () => {
    if (!canDownloadPdf) {
      window.print()
      return
    }

    setDownloadingPdf(true)
    setDownloadError(null)
    try {
      await downloadFichaProntuarioPdf({
        prontuarioId: pdfDownloadContext.prontuarioId,
        tipoFicha: FICHA_PDF_TYPES.PLANO_DESENVOLVIMENTO_FAMILIAR,
        fichaId: pdfDownloadContext.fichaId,
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
        description="Revise o plano preenchido, imprima o documento e colete as assinaturas necessárias."
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
                <PageToolbar
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  justifyContent="flex-end"
                >
                  <ButtonLoading
                    type="button"
                    variant="outlined"
                    startIcon={<PrintRoundedIcon />}
                    loading={downloadingPdf}
                    loadingLabel="Baixando..."
                    onClick={handlePdfAction}
                  >
                    {canDownloadPdf ? 'Baixar PDF' : 'Imprimir'}
                  </ButtonLoading>
                  <ActionButton
                    type="button"
                    variant="contained"
                    startIcon={<CheckRoundedIcon />}
                    onClick={onFinish}
                  >
                    Concluir
                  </ActionButton>
                </PageToolbar>
              }
            />
          }
        >
          {notice && (
            notice.severity === 'success'
              ? <SuccessState message={notice.message} compact />
              : <InlineFeedback severity={notice.severity} message={notice.message} />
          )}

          {downloadError && (
            <InlineFeedback severity="error" message={downloadError} compact />
          )}

          <Box sx={termPrintSurfaceSx}>
            <Typography variant="h6" sx={termDocumentTitleSx}>
              Plano de Desenvolvimento Familiar
            </Typography>

            <Box sx={termDetailsGridSx}>
              <PlanoDetail label="Representante" value={identificacao.nome_representante} />
              <PlanoDetail label="Matrícula" value={identificacao.numero_matricula} />
              <PlanoDetail label="NIS/BDC" value={identificacao.nis_bdc} />
              <PlanoDetail label="RG" value={identificacao.rg} />
              <PlanoDetail label="Plano nº" value={dadosPlano.plano_numero} />
              <PlanoDetail label="Data de elaboração" value={dadosPlano.data_elaboracao} />
              <PlanoDetail label="Validade" value={dadosPlano.data_validade} />
              <PlanoDetail label="Reavaliação" value={dadosPlano.data_reavaliacao} />
            </Box>

            <PageStack spacing={1}>
              <Typography variant="subtitle2" color="text.primary" fontWeight={800}>
                Análise diagnóstica
              </Typography>
              <Typography variant="body1" sx={termParagraphSx}>
                {valueOrDash(analise.analise_diagnostica)}
              </Typography>
            </PageStack>

            <PageStack spacing={1}>
              <Typography variant="subtitle2" color="text.primary" fontWeight={800}>
                Objetivo
              </Typography>
              <Typography variant="body1" sx={termParagraphSx}>
                {valueOrDash(analise.objetivo)}
              </Typography>
            </PageStack>

            <PageStack spacing={1}>
              <Typography variant="subtitle2" color="text.primary" fontWeight={800}>
                Estratégias de intervenção
              </Typography>
              {estrategias.length ? (
                estrategias.map((row, index) => (
                  <Box key={`${row.estrategia ?? 'estrategia'}-${index}`} sx={termDetailItemSx}>
                    <Typography variant="body2" sx={termDetailValueSx}>
                      {index + 1}. {valueOrDash(row.estrategia)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      CRAS: {valueOrDash(row.acoes_cras)} | Família: {valueOrDash(row.acoes_familia)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Prazo: {valueOrDash(row.prazo)} | Resultado esperado: {valueOrDash(row.resultados_esperados)}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  —
                </Typography>
              )}
            </PageStack>

            <Box sx={termSignatureGridSx}>
              <SignatureLine label="Assinatura do responsável pela família" />
              <SignatureLine label="Técnico de referência" />
            </Box>
          </Box>
        </FormCard>
      </PageSection>
    </FormFlowLayout>
  )
}

export default PlanoFamiliarPrintStep
