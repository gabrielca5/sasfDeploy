import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import PageState from './PageState'

function EmptyState({
  message = 'Nenhum resultado encontrado.',
  hint,
  icon = <InboxOutlinedIcon fontSize="small" />,
  action,
  compact = true,
}) {
  return (
    <PageState
      type="empty"
      message={message}
      hint={hint}
      icon={icon}
      action={action}
      compact={compact}
    />
  )
}

export default EmptyState
