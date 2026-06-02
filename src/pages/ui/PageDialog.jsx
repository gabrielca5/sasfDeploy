import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { dialogActionsSx, dialogTitleSx } from './uiStyles'

function PageDialog({
  open,
  onClose,
  title,
  titleIcon,
  children,
  actions,
  maxWidth = 'sm',
  closeLabel = 'Fechar',
  showClose = false,
  dividers = true,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle sx={dialogTitleSx}>
        {titleIcon ? (
          <Stack direction="row" spacing={1} alignItems="center">
            {titleIcon}
            <span>{title}</span>
          </Stack>
        ) : (
          title
        )}
        {showClose ? (
          <IconButton onClick={onClose} aria-label={closeLabel}>
            <CloseRoundedIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers={dividers}>{children}</DialogContent>
      {actions ? <DialogActions sx={dialogActionsSx}>{actions}</DialogActions> : null}
    </Dialog>
  )
}

export default PageDialog
