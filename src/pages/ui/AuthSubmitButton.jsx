import { authSubmitButtonSx } from './uiStyles'
import ButtonLoading from './ButtonLoading'

function AuthSubmitButton({ children, loading = false, loadingLabel, ...props }) {
  return (
    <ButtonLoading
      type="submit"
      fullWidth
      size="large"
      variant="contained"
      loading={loading}
      loadingLabel={loadingLabel}
      sx={authSubmitButtonSx}
      {...props}
    >
      {children}
    </ButtonLoading>
  )
}

export default AuthSubmitButton
