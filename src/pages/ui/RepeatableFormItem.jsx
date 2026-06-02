import { Chip, Paper, Stack } from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ActionButton from './ActionButton'
import {
  formRepeatableHeaderSx,
  formRepeatableLabelSx,
  formRepeatableRemoveButtonSx,
  formRepeatableRowSx,
} from './uiStyles'

function RepeatableFormItem({ label, canRemove = false, onRemove, children }) {
  return (
    <Paper elevation={0} variant="outlined" sx={formRepeatableRowSx}>
      <Stack spacing={0.85} sx={{ minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={formRepeatableHeaderSx}>
          <Chip label={label} size="small" sx={formRepeatableLabelSx} />
          {canRemove ? (
            <ActionButton
              variant="text"
              color="error"
              size="sm"
              startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
              onClick={onRemove}
              sx={formRepeatableRemoveButtonSx}
            >
              Remover
            </ActionButton>
          ) : null}
        </Stack>

        {children}
      </Stack>
    </Paper>
  )
}

export default RepeatableFormItem
