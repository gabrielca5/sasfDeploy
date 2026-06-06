import Button from '../../components/ui/button'
import { actionButtonSx } from './uiStyles'

function ActionButton({ children, variant = 'outlined', sx, ...props }) {
  return (
    <Button variant={variant} sx={[actionButtonSx, sx]} {...props}>
      {children}
    </Button>
  )
}

export default ActionButton
