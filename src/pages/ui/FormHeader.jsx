import { Box, Chip, Paper, Typography } from '@mui/material'
import {
  formBackLinkSx,
  formHeaderGridSx,
  formHeaderMetaSx,
  formHeaderShellSx,
  formMetaChipSx,
  textSx,
} from './uiStyles'
import ActionButton from './ActionButton'

function FormHeader({ eyebrow = 'Formulário', title, subtitle, meta, backLabel, backIcon, onBack }) {
  return (
    <Paper elevation={0} sx={formHeaderShellSx}>
      <Box sx={formHeaderGridSx}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" color="primary" letterSpacing={1.4} sx={textSx}>
            {eyebrow}
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={textSx}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography color="text.secondary" sx={{ maxWidth: 1440, ...textSx }}>
              {subtitle}
            </Typography>
          ) : null}
          {backLabel ? (
            <ActionButton variant="text" size="sm" startIcon={backIcon} onClick={onBack} sx={formBackLinkSx}>
              {backLabel}
            </ActionButton>
          ) : null}
        </Box>

        {meta ? (
          <Box sx={formHeaderMetaSx}>
            <Chip label={meta} size="small" sx={formMetaChipSx} />
          </Box>
        ) : null}
      </Box>
    </Paper>
  )
}

export default FormHeader
