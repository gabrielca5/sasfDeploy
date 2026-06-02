import { Box, IconButton, Stack, Typography } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import {
  detailItemCopyButtonSx,
  detailItemIconSx,
  detailItemLabelSx,
  detailItemRootSx,
  detailItemValueSx,
  surfaceDetailCompactSx,
  surfaceDetailPlainSx,
  surfaceDetailSoftSx,
  surfaceDetailSx,
} from './uiStyles'

async function copyTextToClipboard(text) {
  if (!text || text === '—') return

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

/**
 * DetailItem
 * Labeled field cell with icon, value, and a copy-to-clipboard button.
 * Pattern from FamiliasPage: used in all info grids and address/benefit sections.
 *
 * Props:
 *   label – field label (caption, text.secondary, fontWeight 600)
 *   value – field value (body2, fontWeight 700); shows "—" when falsy
 *   icon  – MUI icon node placed to the left (color: primary.main)
 *   sx    – Box sx overrides for the outer container
 */
const variantStyles = {
  default: surfaceDetailSx,
  compact: surfaceDetailCompactSx,
  soft: surfaceDetailSoftSx,
  plain: surfaceDetailPlainSx,
}

function DetailItem({ label, value, icon, variant = 'default', sx = {} }) {
  const copyValue = typeof value === 'string' ? value : String(value ?? '')
  const canCopy = Boolean(copyValue && copyValue !== '—')
  const surfaceSx = variantStyles[variant] ?? variantStyles.default

  return (
    <Box sx={{ ...surfaceSx, ...detailItemRootSx, ...sx }}>
      <Stack direction="row" spacing={0.9} alignItems="flex-start" sx={{ minWidth: 0 }}>
        {icon ? (
          <Box sx={detailItemIconSx}>{icon}</Box>
        ) : null}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={detailItemLabelSx}
          >
            {label}
          </Typography>
          <Typography variant="body2" sx={detailItemValueSx}>
            {value || '—'}
          </Typography>
        </Box>

        {canCopy ? (
          <IconButton
            className="DetailItem-copyButton"
            size="small"
            aria-label={`Copiar ${label}`}
            onClick={() => copyTextToClipboard(copyValue)}
            sx={detailItemCopyButtonSx}
          >
            <ContentCopyOutlinedIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </Stack>
    </Box>
  )
}

export default DetailItem
