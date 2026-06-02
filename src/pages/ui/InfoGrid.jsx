import { Box } from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import DetailItem from './DetailItem'
import { gridInfoSx } from './uiStyles'

/**
 * InfoGrid
 * Responsive grid of DetailItem cells.
 * Pattern from FamiliasPage: xs=1 / sm=2 / lg=3 columns.
 *
 * Props:
 *   items      – array of [label, value] tuples, or array of { label, value, icon }
 *   defaultIcon – fallback icon when item has no icon (default: BadgeOutlinedIcon)
 *   sx          – Box sx overrides
 */
function InfoGrid({ items = [], defaultIcon, detailVariant = 'default', sx = {} }) {
  const FallbackIcon = defaultIcon ?? <BadgeOutlinedIcon fontSize="small" color="primary" />

  return (
    <Box sx={{ ...gridInfoSx, ...sx }}>
      {items.map((item) => {
        const isArray = Array.isArray(item)
        const label = isArray ? item[0] : item.label
        const value = isArray ? item[1] : item.value
        const icon = (!isArray && item.icon) ? item.icon : FallbackIcon

        return (
          <DetailItem key={label} label={label} value={value} icon={icon} variant={detailVariant} />
        )
      })}
    </Box>
  )
}

export default InfoGrid
