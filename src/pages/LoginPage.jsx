import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import logoPng from '../assets/chicoLogo.png'
import AuthLayout from '../components/AuthLayout'
import BrandHeader from '../components/BrandHeader'
import LoginForm from '../components/LoginForm'
import Button from '../components/ui/button'
import { PageDialog } from './ui'

function LoginPage() {
  const location = useLocation()
  const registered = location.state?.registered
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(Boolean(registered))

  useEffect(() => {
    if (registered) setApprovalDialogOpen(true)
  }, [registered])

  return (
    <AuthLayout ariaLabel="Login de acesso">
      <BrandHeader logoSrc={logoPng}/>
      <LoginForm />
      <PageDialog
        open={approvalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)}
        title="Acesso pendente"
        titleIcon={<WarningAmberRoundedIcon color="warning" />}
        actions={
          <Button variant="contained" onClick={() => setApprovalDialogOpen(false)}>
            Entendi
          </Button>
        }
      >
        <Typography color="text.secondary">
          Cadastro enviado. Aguarde a aprovação do administrativo para fazer login.
        </Typography>
      </PageDialog>
    </AuthLayout>
  )
}

export default LoginPage
