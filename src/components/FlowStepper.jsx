import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import Button from './ui/button'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import {
  formStepCardSx,
  formStepChipSx,
  formStepperGridSx,
  formStepperNavigationButtonSx,
  formStepperNavigationCountSx,
  formStepperNavigationSx,
  formStepperShellSx,
  textSx,
} from '../pages/ui/uiStyles'

function FlowStepper({
  forms = [],
  activeFormId,
  onSelectForm,
  title = 'Fluxo de etapas',
  subtitle = 'Escolha qualquer etapa para navegar diretamente pelo processo.',
  showNavigation = false,
}) {
  if (!forms.length) {
    return null
  }

  const activeStepIndex = Math.max(0, forms.findIndex((form) => form.id === activeFormId))
  const hasActiveForm = activeStepIndex >= 0 && activeStepIndex < forms.length
  const previousForm = hasActiveForm ? forms[activeStepIndex - 1] : undefined
  const nextForm = hasActiveForm ? forms[activeStepIndex + 1] : undefined

  return (
    <Paper elevation={0} variant="outlined" sx={formStepperShellSx}>
      <Stack spacing={1.25}>
        <Box>
          <Typography variant="overline" color="primary" letterSpacing={1.8}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, ...textSx }}>
            {subtitle}
          </Typography>
        </Box>

        <Box sx={formStepperGridSx}>
          {forms.map((form, index) => {
            const isActive = index === activeStepIndex
            const isCompleted = index < activeStepIndex

            return (
              <Paper
                key={form.id}
                component="button"
                type="button"
                onClick={() => onSelectForm?.(form.id)}
                elevation={0}
                variant="outlined"
                sx={formStepCardSx({ isActive, isCompleted })}
              >
                <Stack spacing={0.75}>
                  <Stack direction="row" justifyContent="space-between"   spacing={1}>
                    <Chip
                      size="small"
                      label={`Etapa ${index + 1}`}
                      sx={formStepChipSx({ isActive, isCompleted })}
                    />
                  </Stack>

                  <Typography variant="body2" fontWeight={800} sx={{ lineHeight: 1.25, ...textSx }}>
                    {form.titulo}
                  </Typography>
                </Stack>
              </Paper>
            )
          })}
        </Box>

        {showNavigation && hasActiveForm && (
          <Box sx={formStepperNavigationSx}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => previousForm && onSelectForm?.(previousForm.id)}
              disabled={!previousForm}
              sx={formStepperNavigationButtonSx}
            >
              Etapa anterior
            </Button>

            <Typography variant="body2" color="text.secondary" sx={formStepperNavigationCountSx}>
              {activeStepIndex + 1} de {forms.length}
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => nextForm && onSelectForm?.(nextForm.id)}
              disabled={!nextForm}
              sx={formStepperNavigationButtonSx}
            >
              Próxima etapa
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}

export default FlowStepper
