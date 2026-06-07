import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { downloadFichaProntuarioPdf, FICHA_PDF_TYPES } from '../services/prontuarioPdf.service'
import { getBlob } from '../lib/apiClient'
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
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(false)

  const identificacao = planoDraft?.identificacao_pdf ?? {}
  const analise = planoDraft?.analise_diagnostica ?? {}
  const dadosPlano = planoDraft?.dados_plano ?? {}
  const estrategias = Array.isArray(planoDraft?.estrategias_intervencao)
    ? planoDraft.estrategias_intervencao
    : []
  const canDownloadPdf = Boolean(pdfDownloadContext?.prontuarioId && pdfDownloadContext?.fichaId)

  const handlePdfAction = async (print = false) => {
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
        print,
      })
    } catch (err) {
      setDownloadError(err?.message || 'Não foi possível baixar o PDF do plano familiar. Tente novamente.')
    } finally {
      setDownloadingPdf(false)
    }
  }

  const handleFetchPreview = async () => {
    if (!canDownloadPdf) return
    setLoadingPreview(true)
    setDownloadError(null)
    try {
      const path = `/prontuarios/${pdfDownloadContext.prontuarioId}/fichas/${FICHA_PDF_TYPES.PLANO_DESENVOLVIMENTO_FAMILIAR}/${pdfDownloadContext.fichaId}/pdf`
      const { blob } = await getBlob(path, {
        headers: { Accept: 'application/pdf' },
      })
      const url = URL.createObjectURL(blob)
      setPdfPreviewUrl(url)
    } catch (err) {
      setDownloadError('Não foi possível carregar a prévia do PDF. Tente baixar o arquivo.')
      console.error(err)
    } finally {
      setLoadingPreview(false)
    }
  }

  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl)
    }
  }, [pdfPreviewUrl])

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
        description="Revise o plano preenchido, visualize o PDF oficial e colete as assinaturas necessárias."
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
                    startIcon={<VisibilityRoundedIcon />}
                    loading={loadingPreview}
                    loadingLabel="Carregando..."
                    onClick={handleFetchPreview}
                    disabled={!canDownloadPdf}
                  >
                    Visualizar PDF
                  </ButtonLoading>
                  <ButtonLoading
                    type="button"
                    variant="outlined"
                    startIcon={canDownloadPdf ? <PrintRoundedIcon /> : <PrintRoundedIcon />}
                    loading={downloadingPdf}
                    loadingLabel="Baixando..."
                    onClick={() => handlePdfAction(!canDownloadPdf)}
                  >
                    {canDownloadPdf ? 'Imprimir PDF' : 'Imprimir'}
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {pdfPreviewUrl ? (
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 500, md: 700 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                <iframe
                  src={`${pdfPreviewUrl}#toolbar=0&navpanes=0`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="Prévia do Plano Familiar"
                />
              </Box>
            ) : (
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
            )}

            {!pdfPreviewUrl && (
              <InlineFeedback
                severity="info"
                message="A prévia acima é uma representação simplificada. Clique em 'Visualizar PDF' para ver o documento oficial que será impresso."
              />
            )}
          </Box>
        </FormCard>
      </PageSection>
    </FormFlowLayout>
  )
}

export default PlanoFamiliarPrintStep
