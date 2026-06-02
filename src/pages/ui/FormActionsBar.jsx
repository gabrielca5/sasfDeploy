import { Paper } from '@mui/material'
import { formActionsBarSx } from './uiStyles'
import PageToolbar from './PageToolbar'

function FormActionsBar({ leading, actions, sx = {} }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ ...formActionsBarSx, ...sx }}>
      <PageToolbar
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        actions={actions}
      >
        {leading}
      </PageToolbar>
    </Paper>
  )
}

export default FormActionsBar
