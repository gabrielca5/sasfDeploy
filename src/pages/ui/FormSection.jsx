import { Paper, Stack, Typography } from '@mui/material'
import { formSectionSx, sectionTitleTextSx, textSx } from './uiStyles'

function FormSection({ title, description, children, sx = {} }) {
  return (
    <Paper elevation={0} sx={{ ...formSectionSx, ...sx }}>
      <Stack spacing={1.35} sx={{ minWidth: 0 }}>
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" color="primary" sx={sectionTitleTextSx}>
            {title}
          </Typography>
          {description ? (
            <Typography variant="body2" color="text.secondary" sx={textSx}>
              {description}
            </Typography>
          ) : null}
        </Stack>
        {children}
      </Stack>
    </Paper>
  )
}

export default FormSection
