import { Box } from '@mui/material'
import PageWrapper from './PageWrapper'
import { formFlowFormSx, formFlowLayoutContentSx, formFlowLayoutSx } from './uiStyles'

function FormFlowLayout({ children, maxWidth = 1200, spacing = 3, contentSx = {}, sx = {}, component, ...props }) {
  return (
    <PageWrapper
      maxWidth={maxWidth}
      spacing={spacing}
      contentSx={{ ...formFlowLayoutContentSx, ...contentSx }}
      sx={{ ...formFlowLayoutSx, ...sx }}
    >
      {component ? (
        <Box component={component} sx={formFlowFormSx} {...props}>
          {children}
        </Box>
      ) : (
        children
      )}
    </PageWrapper>
  )
}

export default FormFlowLayout
