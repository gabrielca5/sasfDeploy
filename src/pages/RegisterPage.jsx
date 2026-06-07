import AuthLayout from '../components/AuthLayout'
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  return (
    <AuthLayout ariaLabel="Cadastro de acesso">
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
