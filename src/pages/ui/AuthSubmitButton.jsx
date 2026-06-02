import Button from '../../components/ui/button'
import { authSubmitButtonSx } from './uiStyles'

function AuthSubmitButton({ children, ...props }) {
  return (
    <Button type="submit" fullWidth size="large" sx={authSubmitButtonSx} {...props}>
      {children}
    </Button>
  )
}

export default AuthSubmitButton
