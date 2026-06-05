import { Box, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import {
  ActionButton,
  FormActionsFooter,
  FormCard,
  FormFlowLayout,
  FormStepper,
  PageSection,
  PageStack,
  PageToolbar,
} from '../pages/ui'
import {
  termDetailItemSx,
  termDetailLabelSx,
  termDetailsGridSx,
  termDetailValueSx,
  termDocumentTitleSx,
  termInlineValueSx,
  formCardPlainSx,
  formPageHeaderTopSx,
  termParagraphSx,
  termPrintSurfaceSx,
  termSignatureGridSx,
  termSignatureLabelSx,
  termSignatureLineSx,
} from '../pages/ui/uiStyles'

function valueOrDash(value) {
  return value || '—'
}

function TermDetail({ label, value }) {
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

function TermoUsoStep({
  form,
  flowForms,
  termDraft,
  onBack,
  onPrevious,
  onContinue,
  onSelectFlowForm,
  stepperTitle,
  stepperSubtitle,
}) {
  const fields = termDraft?.dados_autorizante ?? {}

  const handlePrint = () => {
    window.print()
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
        description="Revise o termo preenchido com os dados da triagem, imprima o documento e avance para registrar a demanda."
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
                  <ActionButton
                    type="button"
                    variant="outlined"
                    startIcon={<PrintRoundedIcon />}
                    onClick={handlePrint}
                  >
                    Imprimir
                  </ActionButton>
                  <ActionButton
                    type="button"
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={onContinue}
                  >
                    Continuar
                  </ActionButton>
                </PageToolbar>
              }
            />
          }
        >
          <Box sx={termPrintSurfaceSx}>
            <Typography variant="h6" sx={termDocumentTitleSx}>
              {form.titulo}
            </Typography>

            <Typography variant="body1" sx={termParagraphSx}>
              Eu, <Box component="span" sx={termInlineValueSx}>{valueOrDash(fields.nome_autorizante)}</Box>,
              portador(a) do RG <Box component="span" sx={termInlineValueSx}>{valueOrDash(fields.rg_autorizante)}</Box>
              {' '}e CPF <Box component="span" sx={termInlineValueSx}>{valueOrDash(fields.cpf_autorizante)}</Box>,
              autorizo o uso de imagem conforme os termos do acompanhamento realizado pelo serviço.
            </Typography>

            <PageStack spacing={1}>
              <Typography variant="subtitle2" color="text.primary">
                Dados preenchidos
              </Typography>
              <Box sx={termDetailsGridSx}>
                <TermDetail label="Nome do autorizante" value={fields.nome_autorizante} />
                <TermDetail label="CPF" value={fields.cpf_autorizante} />
                <TermDetail label="RG" value={fields.rg_autorizante} />
                <TermDetail label="Data de assinatura" value={fields.data_assinatura} />
                <TermDetail label="Crianças autorizadas" value={fields.nomes_criancas} />
              </Box>
            </PageStack>

            <Box sx={termSignatureGridSx}>
              <SignatureLine label="Assinatura do autorizante" />
            </Box>
          </Box>
        </FormCard>
      </PageSection>
    </FormFlowLayout>
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

export default TermoUsoStep
