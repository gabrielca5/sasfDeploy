import { Box, Typography } from '@mui/material'
import { formActionsFooterMetaSx, formActionsFooterSx, formActionsFooterToolbarSx } from './uiStyles'
import PageToolbar from './PageToolbar'

function FormActionsFooter({ leading, meta, actions, sx = {} }) {
  return (
    <Box sx={{ ...formActionsFooterSx, ...sx }}>
      <PageToolbar
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={formActionsFooterToolbarSx}
        helper={
          meta ? (
            <Typography variant="body2" color="text.secondary" sx={formActionsFooterMetaSx}>
              {meta}
            </Typography>
          ) : null
        }
        actions={actions}
      >
        {leading}
      </PageToolbar>
    </Box>
  )
}

export default FormActionsFooter
