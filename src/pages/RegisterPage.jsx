import ilustracao from '../assets/ilustracao.png'
import logoPng from '../assets/chicoLogo.png'
import AuthLayout from '../components/AuthLayout'
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  return (
    <AuthLayout
      illustrationSrc={ilustracao}
      logoSrc={logoPng}
      subtitle="Preencha o cadastro para solicitar acesso"
      ariaLabel="Cadastro de acesso"
    >
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage