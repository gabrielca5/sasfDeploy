import { useLocation } from 'react-router-dom'
import logoPng from '../assets/chicoLogo.png'
import AuthLayout from '../components/AuthLayout'
import BrandHeader from '../components/BrandHeader'
import LoginForm from '../components/LoginForm'
import { AuthAlert } from './ui'

function LoginPage() {
  const location = useLocation()
  const registered = location.state?.registered

  return (
    <AuthLayout ariaLabel="Login de acesso">
      <BrandHeader logoSrc={logoPng}/>
      {registered && (
        <AuthAlert severity="success">Conta criada com sucesso! Faça login para continuar.</AuthAlert>
      )}
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
