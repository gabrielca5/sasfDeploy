import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

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
    <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="overline" color="primary" letterSpacing={1.8}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 1.25,
          }}
        >
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
                sx={{
                  p: 1.5,
                  borderRadius: 2.5,
                  borderColor: isActive ? 'primary.main' : isCompleted ? 'rgba(47, 122, 84, 0.45)' : 'divider',
                  backgroundColor: isActive ? '#edf5f0' : isCompleted ? '#f4faf6' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 160ms ease, background-color 160ms ease, transform 160ms ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <Chip
                      size="small"
                      label={`Etapa ${index + 1}`}
                      sx={{
                        fontWeight: 700,
                        backgroundColor: isActive ? 'primary.main' : isCompleted ? '#d9ecdf' : '#eef2f7',
                        color: isActive ? '#ffffff' : 'text.primary',
                      }}
                    />
                  </Stack>

                  <Typography variant="body2" fontWeight={800} sx={{ lineHeight: 1.35 }}>
                    {form.titulo}
                  </Typography>
                </Stack>
              </Paper>
            )
          })}
        </Box>

        {showNavigation && hasActiveForm && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => previousForm && onSelectForm?.(previousForm.id)}
              disabled={!previousForm}
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
            >
              Etapa anterior
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
              {activeStepIndex + 1} de {forms.length}
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => nextForm && onSelectForm?.(nextForm.id)}
              disabled={!nextForm}
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-end' } }}
            >
              Próxima etapa
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

export default FlowStepper