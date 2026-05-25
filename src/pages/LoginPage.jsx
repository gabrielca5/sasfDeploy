import ilustracao from '../assets/ilustracao.png'
import logoPng from '../assets/chicoLogo.png'
import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <AuthLayout
      illustrationSrc={ilustracao}
      logoSrc={logoPng}
      subtitle="Entre com seu email e senha"
      ariaLabel="Login de acesso"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage