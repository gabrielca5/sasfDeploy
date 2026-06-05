import { Box, Stack, Typography } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import FormProgress from './FormProgress'
import {
  formStepButtonSx,
  formStepIndicatorSx,
  formStepItemSx,
  formStepLabelSx,
  formStepperGridSx,
  formStepperMobileProgressSx,
  formStepperShellSx,
} from './uiStyles'

function FormStepper({
  forms = [],
  activeFormId,
  onSelectForm,
  title = 'Fluxo do cadastro',
  showCompleted = true,
}) {
  if (!forms.length) {
    return null
  }

  const rawActiveIndex = forms.findIndex((form) => form.id === activeFormId)
  const activeStepIndex = rawActiveIndex >= 0 ? rawActiveIndex : 0
  const activeForm = forms[activeStepIndex] ?? forms[0]
  const progressValue = ((activeStepIndex + 1) / forms.length) * 100

  return (
    <Box sx={formStepperShellSx}>
      <Stack spacing={0.75} sx={{ minWidth: 0 }}>
        <FormProgress
          label={`Etapa ${activeStepIndex + 1} de ${forms.length} — ${activeForm.titulo}`}
          value={progressValue}
          sx={formStepperMobileProgressSx}
        />

        <Box sx={formStepperGridSx} aria-label={title}>
          {forms.map((form, index) => {
            const isActive = index === activeStepIndex
            const isCompleted = showCompleted && index < activeStepIndex
            const isLast = index === forms.length - 1

            return (
              <Box key={form.id} sx={formStepItemSx({ isCompleted, isLast })}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => onSelectForm?.(form.id)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Abrir etapa ${index + 1}: ${form.titulo}`}
                  title={form.titulo}
                  sx={formStepButtonSx({ isActive, isCompleted })}
                >
                  <Box className="flow-step-indicator" sx={formStepIndicatorSx({ isActive, isCompleted })}>
                    {isCompleted ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : index + 1}
                  </Box>

                </Box>
              </Box>
            )
          })}
        </Box>
      </Stack>
    </Box>
  )
}

export default FormStepper
