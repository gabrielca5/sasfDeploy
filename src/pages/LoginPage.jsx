import logoPng from '../assets/chicoLogo.png'
import AuthLayout from '../components/AuthLayout'
import BrandHeader from '../components/BrandHeader'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <AuthLayout ariaLabel="Login de acesso">
      <BrandHeader logoSrc={logoPng}/>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
