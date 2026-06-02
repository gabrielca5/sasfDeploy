import Button from '../../components/ui/button'
import { actionButtonSx } from './uiStyles'

function ActionButton({ children, variant = 'outlined', ...props }) {
  return (
    <Button variant={variant} sx={actionButtonSx} {...props}>
      {children}
    </Button>
  )
}

export default ActionButton
